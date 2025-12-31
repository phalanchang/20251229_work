# クイックスタートガイド

## アクセスURL

### 1. フロントエンド（メイン）
**http://localhost:3003**

ブラウザでこのURLにアクセスすると、ログインページが表示されます。

### 2. バックエンドAPI（ヘルスチェック）
**http://localhost:3004/health**

APIが正常に動作しているか確認できます。以下のようなJSONが返ってくれば正常です：
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3. データベース（直接接続する場合）
**localhost:3307**

MySQLクライアントで接続する場合：
- ホスト: localhost
- ポート: 3307
- ユーザー: app_user
- パスワード: app_password
- データベース: login_app

## 初回起動後の手順

### 1. テストデータの準備

テストユーザーでログインするには、パスワードハッシュを生成してデータベースに投入する必要があります。

```bash
# プロジェクトルートディレクトリで実行
# バックエンドコンテナ内でパスワードハッシュを生成（パスワード: password123）
docker compose exec backend node scripts/generate-password-hash.js password123

# 生成されたハッシュ値をコピー
# データベースを更新（生成されたハッシュ値に置き換える）
docker compose exec db mysql -u app_user -papp_password login_app -e "UPDATE users SET password_hash = '<生成されたハッシュ値>' WHERE email = 'test@example.com';"
docker compose exec db mysql -u app_user -papp_password login_app -e "UPDATE users SET password_hash = '<生成されたハッシュ値>' WHERE email = 'admin@example.com';"
```

### 2. ログイン

1. ブラウザで http://localhost:3003 にアクセス
2. メールアドレス: `test@example.com`
3. パスワード: `password123`（ハッシュを更新した後）
4. 「ログイン」ボタンをクリック

## ログの確認

```bash
# 全サービスのログを確認
docker compose logs -f

# 特定のサービスのログを確認
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

## サービスの停止

```bash
# サービスを停止
docker compose down

# ボリュームも含めて完全に削除（データベースのデータも削除される）
docker compose down -v
```

