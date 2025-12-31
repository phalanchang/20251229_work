# ログイン・ログアウト機能 実装プロジェクト

## 概要

React + Node.js + MySQL + Docker Compose を使用したログイン・ログアウト機能の実装プロジェクトです。

## 技術スタック

- **フロントエンド**: React (Vite)
- **バックエンド**: Node.js (Express)
- **データベース**: MySQL 8.0
- **インフラ**: Docker Compose

## プロジェクト構造

```
.
├── backend/          # バックエンド（Node.js/Express）
├── frontend/         # フロントエンド（React）
├── docs/            # 設計ドキュメント
├── docker-compose.yml
└── README.md
```

## セットアップ

### 前提条件

- Docker Desktop がインストールされていること
- Node.js 18以上がインストールされていること（ローカル開発用）

### 起動方法

```bash
# すべてのサービスを起動
docker compose up -d

# ログを確認
docker compose logs -f

# サービスを停止
docker compose down
```

**注意**: 最新のDockerでは`docker compose`（スペース区切り）が推奨されています。  
WSL環境でDockerを使用する場合は、Docker Desktop for WindowsのインストールとWSL2統合の有効化が必要です。  
詳細は `docs/docker-setup-wsl.md` を参照してください。

### アクセス

- フロントエンド: http://localhost:3003
- バックエンドAPI: http://localhost:3004
- MySQL: localhost:3307

## 開発フロー

詳細は `docs/implementation-plan.md` を参照してください。

## ライセンス

MIT

