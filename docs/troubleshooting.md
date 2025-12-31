# トラブルシューティングガイド

## ページが表示されない場合

### 1. コンテナのログを確認

```bash
# フロントエンドのログを確認
docker compose logs frontend

# バックエンドのログを確認
docker compose logs backend

# 全サービスのログを確認
docker compose logs
```

### 2. コンテナの状態を確認

```bash
# コンテナの状態を確認
docker compose ps

# コンテナが起動しているか確認
docker ps
```

### 3. よくある問題と解決方法

#### 問題1: フロントエンドの依存関係がインストールされていない

**症状**: ログに`Cannot find module`などのエラーが表示される

**解決方法**:
```bash
# コンテナを再ビルド
docker compose down
docker compose build --no-cache frontend
docker compose up -d
```

#### 問題2: ポートが既に使用されている

**症状**: `port is already allocated`エラー

**解決方法**:
- `docker-compose.yml`でポート番号を変更
- または、使用しているプロセスを停止

#### 問題3: フロントエンドのビルドエラー

**症状**: ログにビルドエラーが表示される

**解決方法**:
```bash
# ログを確認
docker compose logs frontend

# エラーメッセージに従って修正
# よくある原因：
# - package.jsonの依存関係の問題
# - ファイルの構文エラー
# - 環境変数の設定ミス
```

#### 問題4: ネットワークの問題

**症状**: ページは表示されるが、APIに接続できない

**解決方法**:
- `frontend/src/utils/api.js`の`VITE_API_URL`を確認
- バックエンドが正常に起動しているか確認
- CORSの設定を確認

### 4. コンテナの再起動

```bash
# 全サービスを再起動
docker compose restart

# 特定のサービスを再起動
docker compose restart frontend
docker compose restart backend
```

### 5. 完全にクリーンアップして再起動

```bash
# 全サービスを停止・削除
docker compose down

# ボリュームも含めて完全に削除（データベースのデータも削除される）
docker compose down -v

# 再ビルドして起動
docker compose build
docker compose up -d
```

### 6. フロントエンドコンテナ内で直接確認

```bash
# フロントエンドコンテナに入る
docker compose exec frontend sh

# コンテナ内で確認
ls -la
cat package.json
npm list
```

