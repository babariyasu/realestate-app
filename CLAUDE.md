# realestate-app

不動産物件の検索・管理を行うWebアプリケーション。

## 技術スタック

- **フロントエンド**: React (TypeScript)
- **バックエンド**: Node.js / Express（または別途指定があれば更新）
- **スタイリング**: Tailwind CSS
- **パッケージマネージャ**: npm

## ディレクトリ構成

```
realestate-app/
├── src/
│   ├── components/   # UIコンポーネント
│   ├── pages/        # ページコンポーネント
│   ├── hooks/        # カスタムフック
│   ├── utils/        # ユーティリティ関数
│   └── types/        # TypeScript型定義
├── public/
├── CLAUDE.md
└── package.json
```

## 開発コマンド

```bash
npm install        # 依存関係インストール
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run test       # テスト実行
npm run lint       # Lint実行
```

## Git 運用ルール

**コードを変更するたびに、必ずコミットしてGitHubへプッシュする。**

### 手順

1. 変更をステージング
   ```bash
   git add <変更したファイル>   # git add -A や git add . は使わない
   ```
2. コミット（意味のある単位でこまめに行う）
   ```bash
   git commit -m "変更内容の説明"
   ```
3. GitHubへプッシュ
   ```bash
   git push origin main
   ```

### コミットメッセージ規則

| プレフィックス | 用途 |
|---|---|
| `feat:` | 新機能追加 |
| `fix:` | バグ修正 |
| `refactor:` | リファクタリング |
| `style:` | スタイル・フォーマット変更 |
| `test:` | テスト追加・修正 |
| `docs:` | ドキュメント変更 |
| `chore:` | ビルド設定・依存関係など |

例: `feat: 物件一覧ページの検索フィルター追加`

### 注意事項

- `.env` ファイルや認証情報は絶対にコミットしない
- `main` ブランチへの force push は禁止
- 機能開発はフィーチャーブランチ（`feature/xxx`）で行い、PRを経由してマージする
- プッシュ前に `npm run lint` と `npm run build` が通ることを確認する

## デプロイ情報

- **本番URL**: https://realestate-app-bice.vercel.app/
- **ホスティング**: Vercel（GitHub連携による自動デプロイ）
- **Supabaseプロジェクト名**: realestate-app
- **環境変数**: Vercel ダッシュボードの Environment Variables で管理（`.env` はローカルのみ）

## コーディング規約

- TypeScript strict モードを使用する
- コメントは「なぜ」を書く（何をしているかはコードから自明であるべき）
- コンポーネントは単一責任の原則に従い、小さく保つ
- セキュリティ: XSS・SQLインジェクション等 OWASP Top 10 に注意する
