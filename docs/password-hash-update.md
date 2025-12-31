# パスワードハッシュの更新手順

## なぜ更新が必要か

初期データ投入時（`backend/db/init/02_insert_test_data.sql`）には、プレースホルダーのハッシュ値が入っています。実際にログインするには、正しいパスワードのハッシュ値に更新する必要があります。

## 更新手順

### 1. パスワードハッシュを生成（Dockerコンテナ内で実行）

ローカルのNode.js環境に依存関係がインストールされていない場合、Dockerコンテナ内で実行するのが簡単です。

```bash
# プロジェクトルートディレクトリで実行
# バックエンドコンテナ内でパスワードハッシュを生成
docker compose exec backend node scripts/generate-password-hash.js password123
```

**出力例**:
```
パスワード: password123
ハッシュ: $2b$10$rOzJqZqZqZqZqZqZqZqZqO...

SQL文:
UPDATE users SET password_hash = '$2b$10$rOzJqZqZqZqZqZqZqZqZqO...' WHERE email = 'test@example.com';
```

### 2. 生成されたハッシュ値をコピー

上記の出力から、ハッシュ値（`$2b$10$...`で始まる文字列）をコピーします。

### 3. データベースを更新

#### 方法A: ワンライナーで更新

```bash
# 生成されたハッシュ値に置き換えて実行
docker compose exec db mysql -u app_user -papp_password login_app -e "UPDATE users SET password_hash = '<生成されたハッシュ値>' WHERE email = 'test@example.com';"

# adminユーザーも更新する場合（同じハッシュ値を使用）
docker compose exec db mysql -u app_user -papp_password login_app -e "UPDATE users SET password_hash = '<生成されたハッシュ値>' WHERE email = 'admin@example.com';"
```

#### 方法B: インタラクティブに更新

```bash
# MySQLコンテナに接続
docker compose exec db mysql -u app_user -papp_password login_app

# MySQL内で実行（生成されたハッシュ値に置き換える）
UPDATE users SET password_hash = '<生成されたハッシュ値>' WHERE email = 'test@example.com';
UPDATE users SET password_hash = '<生成されたハッシュ値>' WHERE email = 'admin@example.com';

# 確認
SELECT id, email, username, password_hash FROM users;

# 終了
exit;
```

### 4. 確認

```bash
# ユーザーテーブルの内容を確認
docker compose exec db mysql -u app_user -papp_password login_app -e "SELECT id, email, username FROM users;"
```

## テストログイン

更新後、以下の情報でログインできます：

- **メールアドレス**: `test@example.com`
- **パスワード**: `password123`（ハッシュ生成時に使用したパスワード）

## 注意事項

- ハッシュ値は、パスワードから一方向に生成されるため、元のパスワードに戻すことはできません
- 同じパスワードでも、生成するたびに異なるハッシュ値が生成されます（これは正常です）
- セキュリティのため、本番環境では強力なパスワードを使用してください

## トラブルシューティング

### ローカルで実行する場合

ローカルのNode.js環境で実行したい場合は、依存関係をインストールする必要があります：

```bash
cd backend
npm install
node scripts/generate-password-hash.js password123
```

ただし、**Dockerコンテナ内で実行する方が推奨**されます。
