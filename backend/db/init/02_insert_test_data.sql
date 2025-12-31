-- テストデータ投入スクリプト
-- 開発・テスト用の初期ユーザーデータ

-- テストユーザー1（パスワード: password123）
-- bcryptハッシュ: $2b$10$rOzJqZqZqZqZqZqZqZqZqO（実際のハッシュ値は後で更新）
INSERT INTO users (email, username, password_hash) VALUES
('test@example.com', 'testuser', '$2b$10$rOzJqZqZqZqZqZqZqZqZqO'),
('admin@example.com', 'admin', '$2b$10$rOzJqZqZqZqZqZqZqZqZqO')
ON DUPLICATE KEY UPDATE email=email;

-- 注意: 実際のパスワードハッシュは、バックエンド実装時にbcryptで生成した値に置き換える必要があります

