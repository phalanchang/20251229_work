# データベースアクセス方法

## 方法1: Docker Compose経由でMySQLに接続

```bash
# MySQLコンテナに接続
docker compose exec db mysql -u app_user -papp_password login_app

# 接続後、SQLコマンドを実行
# 例: ユーザーテーブルの内容を確認
SELECT * FROM users;
```

## 方法2: ワンライナーでSQLを実行

```bash
# ユーザーテーブルの内容を確認
docker compose exec db mysql -u app_user -papp_password login_app -e "SELECT * FROM users;"

# テーブル一覧を確認
docker compose exec db mysql -u app_user -papp_password login_app -e "SHOW TABLES;"

# usersテーブルの構造を確認
docker compose exec db mysql -u app_user -papp_password login_app -e "DESCRIBE users;"
```

## 方法3: 外部ツールで接続

MySQLクライアント（例: MySQL Workbench、DBeaver、TablePlus等）で接続：

- **ホスト**: localhost
- **ポート**: 3307
- **ユーザー名**: app_user
- **パスワード**: app_password
- **データベース**: login_app

## よく使うSQLコマンド

```sql
-- データベースを選択
USE login_app;

-- テーブル一覧を表示
SHOW TABLES;

-- usersテーブルの構造を確認
DESCRIBE users;

-- ユーザーテーブルの内容を確認
SELECT * FROM users;

-- 特定のユーザーを確認
SELECT * FROM users WHERE email = 'test@example.com';

-- ユーザー数を確認
SELECT COUNT(*) FROM users;

-- パスワードハッシュを更新（例）
UPDATE users SET password_hash = '<新しいハッシュ値>' WHERE email = 'test@example.com';
```

