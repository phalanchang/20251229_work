// やりたいことコントローラー
import pool from '../config/database.js';

/**
 * やりたいこと一覧取得
 * GET /api/todos
 */
export const getTodos = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // やりたいこと一覧を取得（タグも含める）
    const [todos] = await pool.execute(
      `SELECT 
        t.id,
        t.title,
        t.url,
        t.status,
        t.registered_date AS registeredDate,
        t.updated_date AS updatedDate,
        t.priority,
        t.memo
      FROM todos t
      WHERE t.user_id = ?
      ORDER BY t.updated_date DESC, t.id DESC`,
      [userId]
    );

    // 各やりたいことにタグを取得
    for (const todo of todos) {
      const [tags] = await pool.execute(
        `SELECT t.name
        FROM tags t
        INNER JOIN todo_tags tt ON t.id = tt.tag_id
        WHERE tt.todo_id = ?`,
        [todo.id]
      );
      todo.tags = tags.map(tag => tag.name);
    }

    res.status(200).json({
      success: true,
      todos: todos
    });
  } catch (error) {
    console.error('Get todos error:', error);
    next(error);
  }
};

/**
 * やりたいこと新規登録
 * POST /api/todos
 */
export const createTodo = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { title, url, status, tags, priority, memo } = req.body;

    // バリデーション
    if (!title || !url || !tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'タイトル、URL、タグは必須です'
      });
    }

    // URL形式チェック
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(url)) {
      return res.status(400).json({
        success: false,
        message: '有効なURLを入力してください（http://またはhttps://で始まる）'
      });
    }

    // ステータスと優先度のデフォルト値
    const todoStatus = status || '未着手';
    const todoPriority = priority || '中';

    // 登録日と更新日を設定
    const today = new Date().toISOString().split('T')[0];

    // トランザクション開始
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // やりたいことを登録
      const [result] = await connection.execute(
        `INSERT INTO todos (user_id, title, url, status, registered_date, updated_date, priority, memo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, title, url, todoStatus, today, today, todoPriority, memo || null]
      );

      const todoId = result.insertId;

      // タグを登録または取得
      const tagIds = [];
      for (const tagName of tags) {
        const trimmedTagName = tagName.trim();
        if (!trimmedTagName) continue;

        // タグが存在するか確認
        let [existingTags] = await connection.execute(
          'SELECT id FROM tags WHERE name = ?',
          [trimmedTagName]
        );

        let tagId;
        if (existingTags.length > 0) {
          tagId = existingTags[0].id;
        } else {
          // タグが存在しない場合は新規作成
          const [tagResult] = await connection.execute(
            'INSERT INTO tags (name) VALUES (?)',
            [trimmedTagName]
          );
          tagId = tagResult.insertId;
        }

        tagIds.push(tagId);
      }

      // やりたいこととタグの関連を登録
      for (const tagId of tagIds) {
        await connection.execute(
          'INSERT INTO todo_tags (todo_id, tag_id) VALUES (?, ?)',
          [todoId, tagId]
        );
      }

      // トランザクションコミット
      await connection.commit();

      // 登録したやりたいことを取得
      const [newTodos] = await connection.execute(
        `SELECT 
          t.id,
          t.title,
          t.url,
          t.status,
          t.registered_date AS registeredDate,
          t.updated_date AS updatedDate,
          t.priority,
          t.memo
        FROM todos t
        WHERE t.id = ?`,
        [todoId]
      );

      const newTodo = newTodos[0];

      // タグを取得
      const [tagRows] = await connection.execute(
        `SELECT t.name
        FROM tags t
        INNER JOIN todo_tags tt ON t.id = tt.tag_id
        WHERE tt.todo_id = ?`,
        [todoId]
      );
      newTodo.tags = tagRows.map(tag => tag.name);

      connection.release();

      res.status(201).json({
        success: true,
        todo: newTodo
      });
    } catch (error) {
      // トランザクションロールバック
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Create todo error:', error);
    next(error);
  }
};

/**
 * やりたいこと更新
 * PUT /api/todos/:id
 */
export const updateTodo = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const todoId = parseInt(req.params.id);
    const { title, url, status, tags, priority, memo } = req.body;

    // バリデーション
    if (!title || !url || !tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'タイトル、URL、タグは必須です'
      });
    }

    // URL形式チェック
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(url)) {
      return res.status(400).json({
        success: false,
        message: '有効なURLを入力してください（http://またはhttps://で始まる）'
      });
    }

    // やりたいことが存在し、ユーザーが所有しているか確認
    const [existingTodos] = await pool.execute(
      'SELECT id FROM todos WHERE id = ? AND user_id = ?',
      [todoId, userId]
    );

    if (existingTodos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'やりたいことが見つかりません'
      });
    }

    // 更新日を設定
    const today = new Date().toISOString().split('T')[0];

    // トランザクション開始
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // やりたいことを更新
      await connection.execute(
        `UPDATE todos 
        SET title = ?, url = ?, status = ?, updated_date = ?, priority = ?, memo = ?
        WHERE id = ? AND user_id = ?`,
        [title, url, status, today, priority, memo || null, todoId, userId]
      );

      // 既存のタグ関連を削除
      await connection.execute(
        'DELETE FROM todo_tags WHERE todo_id = ?',
        [todoId]
      );

      // タグを登録または取得
      const tagIds = [];
      for (const tagName of tags) {
        const trimmedTagName = tagName.trim();
        if (!trimmedTagName) continue;

        // タグが存在するか確認
        let [existingTags] = await connection.execute(
          'SELECT id FROM tags WHERE name = ?',
          [trimmedTagName]
        );

        let tagId;
        if (existingTags.length > 0) {
          tagId = existingTags[0].id;
        } else {
          // タグが存在しない場合は新規作成
          const [tagResult] = await connection.execute(
            'INSERT INTO tags (name) VALUES (?)',
            [trimmedTagName]
          );
          tagId = tagResult.insertId;
        }

        tagIds.push(tagId);
      }

      // やりたいこととタグの関連を登録
      for (const tagId of tagIds) {
        await connection.execute(
          'INSERT INTO todo_tags (todo_id, tag_id) VALUES (?, ?)',
          [todoId, tagId]
        );
      }

      // トランザクションコミット
      await connection.commit();

      // 更新したやりたいことを取得
      const [updatedTodos] = await connection.execute(
        `SELECT 
          t.id,
          t.title,
          t.url,
          t.status,
          t.registered_date AS registeredDate,
          t.updated_date AS updatedDate,
          t.priority,
          t.memo
        FROM todos t
        WHERE t.id = ?`,
        [todoId]
      );

      const updatedTodo = updatedTodos[0];

      // タグを取得
      const [tagRows] = await connection.execute(
        `SELECT t.name
        FROM tags t
        INNER JOIN todo_tags tt ON t.id = tt.tag_id
        WHERE tt.todo_id = ?`,
        [todoId]
      );
      updatedTodo.tags = tagRows.map(tag => tag.name);

      connection.release();

      res.status(200).json({
        success: true,
        todo: updatedTodo
      });
    } catch (error) {
      // トランザクションロールバック
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Update todo error:', error);
    next(error);
  }
};

/**
 * やりたいこと削除
 * DELETE /api/todos/:id
 */
export const deleteTodo = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const todoId = parseInt(req.params.id);

    // やりたいことが存在し、ユーザーが所有しているか確認
    const [existingTodos] = await pool.execute(
      'SELECT id FROM todos WHERE id = ? AND user_id = ?',
      [todoId, userId]
    );

    if (existingTodos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'やりたいことが見つかりません'
      });
    }

    // やりたいことを削除（CASCADEでtodo_tagsも自動削除される）
    await pool.execute(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [todoId, userId]
    );

    res.status(200).json({
      success: true,
      message: '削除しました'
    });
  } catch (error) {
    console.error('Delete todo error:', error);
    next(error);
  }
};

