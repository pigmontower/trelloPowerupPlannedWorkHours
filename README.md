# Trello 予定工数表示Power-Up

Trelloのカードに予定工数を設定・表示するPower-Upです。

## 機能

- カードに予定工数を設定
- カードバッジとして予定工数を表示
- タイムラインでの工数確認

## ファイル構成

```
trello-estimated-hours-powerup/
├── manifest.json          # Power-Upの設定
├── index.html            # メインページ
├── client.js            # Power-Upのロジック
├── settings.html        # 設定ページ
├── images/
│   ├── icon.svg        # Power-Upアイコン
│   └── clock.svg       # 時計アイコン
├── package.json        # 依存関係
└── README.md          # このファイル
```

## 開発環境のセットアップ

### 1. 依存関係のインストール
```bash
# Node.jsがインストールされていることを確認
node --version

# プロジェクトディレクトリに移動
cd trello-estimated-hours-powerup
```

### 2. ローカルサーバーの起動
```bash
# Python3を使用してローカルサーバーを起動
python3 -m http.server 8080

# またはnpmスクリプトを使用
npm start
```

### 3. Trelloでのテスト
1. Trelloのボードを開く
2. 右上の「Power-Ups」をクリック
3. 「カスタムPower-Ups」を選択
4. 「開発者Power-Ups」を選択
5. ローカルサーバーのURL（`http://localhost:8080`）を入力

## 使用方法

1. **Power-Upの有効化**
   - TrelloボードでPower-Upを有効にする

2. **予定工数の設定**
   - カードを開く
   - 「予定工数設定」ボタンをクリック
   - 工数を入力して保存

3. **工数の確認**
   - カードバッジとして工数が表示される
   - タイムラインでも工数を確認可能

## 開発

### ファイルの説明

- **manifest.json**: Power-Upの基本設定
- **client.js**: カードバッジとボタンの表示ロジック
- **settings.html**: 予定工数設定画面
- **images/**: アイコンファイル

### カスタマイズ

- アイコンの変更: `images/`フォルダ内のSVGファイルを編集
- スタイルの変更: `settings.html`内のCSSを編集
- 機能の追加: `client.js`に新しい機能を追加

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。 