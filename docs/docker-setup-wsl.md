# WSL環境でのDockerセットアップ

## 問題

WSL環境で`docker-compose`コマンドが見つからない場合の対処法です。

## 解決方法

### 方法1: `docker compose`（スペース区切り）を使用

最新のDockerでは、`docker-compose`（ハイフン区切り）ではなく、`docker compose`（スペース区切り）が推奨されています。

```bash
# 古いコマンド（動作しない場合がある）
docker-compose up -d

# 新しいコマンド（推奨）
docker compose up -d
```

### 方法2: Docker Desktop for Windowsのインストールと設定

WSL環境でDockerを使用するには、Docker Desktop for Windowsが必要です。

#### 1. Docker Desktop for Windowsのインストール

1. [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)をダウンロードしてインストール
2. インストール後、Docker Desktopを起動

#### 2. WSL2統合の有効化

1. Docker Desktopを開く
2. Settings（設定）→ Resources → WSL Integration
3. 使用するWSLディストリビューション（例: Ubuntu）のスイッチをONにする
4. Apply & Restartをクリック

#### 3. 動作確認

WSLターミナルで以下を実行：

```bash
# Dockerのバージョン確認
docker --version

# Docker Composeのバージョン確認
docker compose version

# Dockerが動作しているか確認
docker ps
```

### 方法3: Docker Composeを直接インストール（非推奨）

Docker Desktopを使用しない場合は、Docker Composeを直接インストールできますが、**Docker Desktopの使用を強く推奨します**。

```bash
# Ubuntu/Debianの場合
sudo apt update
sudo apt install docker-compose

# または、最新版をインストール
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## トラブルシューティング

### Dockerコマンドが見つからない

```bash
# Docker Desktopが起動しているか確認（Windows側）
# WSLターミナルで以下を実行
docker ps

# エラーが出る場合、Docker Desktopを起動して、WSL2統合を有効化
```

### 権限エラーが発生する場合

```bash
# ユーザーをdockerグループに追加
sudo usermod -aG docker $USER

# ログアウトして再ログイン、または以下を実行
newgrp docker
```

### 接続エラーが発生する場合

```bash
# Dockerデーモンが起動しているか確認
docker info

# エラーが出る場合、Docker Desktopを再起動
```

## 推奨される使用方法

1. **Docker Desktop for Windowsをインストール**
2. **WSL2統合を有効化**
3. **`docker compose`（スペース区切り）を使用**

これにより、WindowsとWSLの両方でDockerを使用できます。

## 参考リンク

- [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
- [Docker Compose公式ドキュメント](https://docs.docker.com/compose/)
- [WSL2統合の設定](https://docs.docker.com/desktop/wsl/)

