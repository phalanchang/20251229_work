-- やりたいこと管理機能用のテストデータ（2ndスプリント）
-- 注意: user_idは実際のusersテーブルのIDに合わせて調整してください

-- タグのテストデータ
INSERT INTO tags (name) VALUES
    ('仕事'),
    ('個人'),
    ('緊急'),
    ('学習')
ON DUPLICATE KEY UPDATE name=name;

-- やりたいことのテストデータ
-- 注意: user_id=1が存在することを前提としています
-- 実際のuser_idに合わせて調整してください
INSERT INTO todos (user_id, title, url, status, registered_date, updated_date, priority, memo) VALUES
    (1, 'React公式ドキュメントを読む', 'https://react.dev/', '進行中', '2024-01-15', '2024-01-20', '高', 'Hooksの章を重点的に読む'),
    (1, 'TypeScriptの学習', 'https://www.typescriptlang.org/', '未着手', '2024-01-18', '2024-01-18', '中', NULL),
    (1, 'プロジェクト企画書作成', 'https://example.com/project', '完了', '2024-01-10', '2024-01-19', '低', '企画書は承認済み')
ON DUPLICATE KEY UPDATE title=title;

-- やりたいこととタグの関連データ
-- 注意: todo_idとtag_idは実際のIDに合わせて調整してください
-- タグID: 1=仕事, 2=個人, 3=緊急, 4=学習
INSERT INTO todo_tags (todo_id, tag_id) VALUES
    (1, 1),  -- React公式ドキュメント: 仕事
    (1, 3),  -- React公式ドキュメント: 緊急
    (2, 2),  -- TypeScriptの学習: 個人
    (2, 4),  -- TypeScriptの学習: 学習
    (3, 1)   -- プロジェクト企画書作成: 仕事
ON DUPLICATE KEY UPDATE todo_id=todo_id;

