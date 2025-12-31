# masterブランチへのマージ手順

## 前提条件

- 現在のブランチ: `sprint-1`（または作業中のブランチ）
- マージ先: `main`（または`master`）

## マージ手順

### 1. 現在の変更をコミット

```bash
# 変更を確認
git status

# すべての変更をステージング
git add .

# コミット（適切なメッセージを付ける）
git commit -m "feat: ログイン・ログアウト機能の実装完了

- バックエンドAPI実装（ログイン、ログアウト、認証状態確認）
- フロントエンド実装（ログインページ、ダッシュボード、保護されたページ、エラーページ）
- 認証機能（JWT、認証ガード、認証コンテキスト）
- Docker Compose設定
- テスト手順書の作成"
```

### 2. リモートにプッシュ

```bash
# 現在のブランチをリモートにプッシュ
git push origin sprint-1
```

### 3. mainブランチに切り替え

```bash
# mainブランチに切り替え
git checkout main

# 最新の状態を取得
git pull origin main
```

### 4. ブランチをマージ

```bash
# sprint-1ブランチをmainにマージ
git merge sprint-1

# または、マージコミットを作成する場合
git merge --no-ff sprint-1 -m "Merge branch 'sprint-1' into main"
```

### 5. リモートにプッシュ

```bash
# mainブランチをリモートにプッシュ
git push origin main
```

### 6. 作業ブランチの削除（オプション）

```bash
# ローカルのブランチを削除
git branch -d sprint-1

# リモートのブランチを削除
git push origin --delete sprint-1
```

## コンフリクトが発生した場合

```bash
# コンフリクトを解決
# 1. コンフリクトファイルを編集
# 2. ステージング
git add <解決したファイル>

# 3. マージを完了
git commit
```

## 注意事項

- マージ前に、すべての変更がコミットされていることを確認
- マージ前に、テストが通っていることを確認
- 本番環境に影響がある場合は、慎重にマージを実行

