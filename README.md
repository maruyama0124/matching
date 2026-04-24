# 学習院大生特化マッチングアプリ

学習院大学の学生向けパロディ/ジョーク用マッチングアプリ。
性別を選ぶと、必ず制作者の Instagram DM に誘導されるネタサイト。

本家: [筑波大生特化マッチングアプリ](https://itf-matching.colk-tech.workers.dev/) (by [@Colk_](https://x.com/Colk_))

## 技術スタック

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Railway でのホスティングを想定

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く。

## ビルド / 本番起動

```bash
npm run build
npm run start
```

Railway 環境では `PORT` 環境変数を自動で受け取る。

## Instagram DM リンクの差し替え

`lib/constants.ts` の以下の定数を実値に書き換える:

```ts
export const INSTAGRAM_DM_URL = "https://www.instagram.com/direct/new/";
export const INSTAGRAM_HANDLE = "@your_handle";
```

## Railway デプロイ

1. このリポジトリを GitHub に push
2. Railway で新規プロジェクトを作成し、GitHub リポジトリを接続
3. Build: `npm run build` / Start: `npm run start` が自動検出される
4. デプロイ完了後、発行 URL で公開

## ライセンス

MIT License
