# 学習院大生特化マッチングアプリ 設計書

## 1. プロジェクト概要

### 1.1 目的
学習院大学の学生向けに作られたパロディ/ジョーク用マッチングアプリ Web サイト。
実態としては性別を選択して「マッチングする」ボタンを押すと、必ず制作者（本プロジェクトのオーナー）の Instagram DM に誘導されるという、コミカルな一発ネタサイト。

### 1.2 元ネタ
- 本家: [筑波大生特化マッチングアプリ](https://itf-matching.colk-tech.workers.dev/)
- 原案作者: [@Colk_](https://x.com/Colk_) / [Colk-tech](https://github.com/Colk-tech)
- 本プロジェクトは原案のコンセプト・UIフローを踏襲した学習院大学版リメイク。

### 1.3 ターゲット
- 学習院大学の学生・関係者
- SNS などで拡散して笑いが取れる層

---

## 2. 機能要件

| # | 機能 | 説明 |
|---|---|---|
| F-01 | 性別選択 | 「男 / 女 / その他」の 3 択ボタンから 1 つ選択 |
| F-02 | マッチングボタン | 性別選択後に活性化。押下で擬似解析フローへ |
| F-03 | 擬似ローディング | 「情報を解析しています」の表示 + スピナー（2〜3 秒） |
| F-04 | マッチング結果表示 | 「マッチング成立！」 と、制作者（= オーナー本人）のアカウント情報 |
| F-05 | Instagram DM リンク | 結果画面のボタンから、オーナーの Instagram DM へ外部遷移 |
| F-06 | もう一度マッチング | ローディング + 結果画面のフローを再実行（結果は常に同じ） |
| F-07 | 最初からやり直す | 性別選択画面に戻る |
| F-08 | Disclaimer 表示 | ジョークサイトであり情報は送信されない旨を明記 |

---

## 3. 画面フロー

```
┌─────────────────────────┐
│ [トップ/性別選択画面]       │
│ - タイトル                │
│ - 説明文                 │
│ - 性別ボタン (男/女/その他) │
│ - 「マッチングする」ボタン   │
│ - Disclaimer             │
└──────────┬──────────────┘
           │ クリック
           ▼
┌─────────────────────────┐
│ [ローディング画面]          │
│ 「情報を解析しています」    │
│ スピナーアニメーション       │
│ （2〜3 秒）                │
└──────────┬──────────────┘
           │ 自動遷移
           ▼
┌─────────────────────────┐
│ [結果画面]                │
│ 「マッチングが成立しました！」│
│ 相手 = 制作者             │
│ [Instagram でDMを送る]    │
│ [もう一度マッチング]        │
│ [最初からやり直す]          │
└─────────────────────────┘
```

画面遷移はすべてクライアントサイドの state（`useState`）で管理。サーバー通信は行わない。

---

## 4. テキスト仕様（筑波大版 → 学習院大版）

本家の文言を土台に、以下のように置換する。

| 本家（筑波大版） | 本プロジェクト（学習院大版） |
|---|---|
| 筑波大生特化マッチングアプリ | **学習院大生特化マッチングアプリ** |
| University of Tsukuba | **Gakushuin University** |
| あなたの性別だけ。それ以外の情報は一切使わない、革新的で安心安全なマッチング体験。 | 同文言を踏襲（変更不要） |
| あなたの性別を教えてください | 同文言を踏襲 |
| 男 / 女 / その他 | 同じ |
| マッチングする | 同じ |
| 情報を解析しています | 同じ |
| もう一度マッチングする | 同じ |
| 最初からやり直す | 同じ |
| このサイトはジョークで、一切の情報は送信されていません。制作者の [@Colk_] としかマッチしないようになっています。 | **このサイトはジョークで、一切の情報は送信されていません。制作者（[Instagram アカウント名]）としかマッチしないようになっています。** |

> 備考: 「筑波」「Tsukuba」「ITF」等が残らないよう、コード・HTML メタ情報・`<title>` タグ・OGP 等すべて学習院表記に統一する。

---

## 5. デザイン仕様

### 5.1 カラースキーム（学習院カラー基調）

| 用途 | 色 | HEX |
|---|---|---|
| メインカラー（学習院グリーン） | 濃緑 | `#004831` |
| サブカラー | ディープグリーン | `#005A3C` |
| 背景 | オフホワイト | `#F7F7F2` |
| ベース白 | 純白 | `#FFFFFF` |
| テキスト（主） | ダークグレー | `#1A1A1A` |
| テキスト（補助） | グレー | `#6B6B6B` |
| アクセント（ホバー/強調） | 桜色 | `#F4C2C2` |

### 5.2 タイポグラフィ
- 日本語: Noto Sans JP（`400`, `700`）
- 欧文: Inter（`400`, `600`）
- 見出し: 太字・中サイズ（`text-2xl` 〜 `text-3xl` 相当）
- 本文: `text-base`、行間広め

### 5.3 レイアウト
- モバイルファースト
- 中央寄せの 1 カラムカード UI（最大幅 480px）
- 画面中央に主要 UI を縦並び配置
- カードには軽いシャドウ（`shadow-md`）+ 角丸（`rounded-2xl`）

### 5.4 アニメーション
- ローディング画面: CSS スピナー、もしくはドット 3 つのフェード
- ボタン: ホバー時に微かなスケール（`hover:scale-105`）+ 色変化

---

## 6. 技術スタック

| 分類 | 採用技術 |
|---|---|
| フレームワーク | **Next.js 14+ (App Router)** |
| 言語 | **TypeScript** |
| スタイリング | **Tailwind CSS** |
| 状態管理 | React `useState`（ライブラリ不要） |
| Node バージョン | 20.x |
| パッケージマネージャ | npm |
| ホスティング | **Railway** |
| バージョン管理 | Git / GitHub |

---

## 7. ディレクトリ構成

```
matcing/
├── specification.md           # 本設計書
├── README.md
├── package.json
├── package-lock.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── .gitignore
├── app/
│   ├── layout.tsx             # 全体レイアウト / メタタグ
│   ├── page.tsx               # メインページ（全画面フローを内包）
│   └── globals.css            # Tailwind ベース + カスタム変数
├── components/
│   ├── StartScreen.tsx        # 性別選択画面
│   ├── LoadingScreen.tsx      # 解析中画面
│   ├── ResultScreen.tsx       # 結果画面（Instagram DM リンクを含む）
│   └── Footer.tsx             # クレジット
├── lib/
│   └── constants.ts           # INSTAGRAM_DM_URL などの定数
└── public/
    └── favicon.ico
```

---

## 8. 状態管理

`app/page.tsx` で以下の `useState` を管理する。

```ts
type Screen = "start" | "loading" | "result";
type Gender = "male" | "female" | "other" | null;

const [screen, setScreen] = useState<Screen>("start");
const [gender, setGender] = useState<Gender>(null);
```

### 遷移ロジック
- `start` で性別選択 → 「マッチングする」押下で `loading` へ
- `loading` 表示後 `setTimeout`（2,500ms）で `result` へ
- `result` の「もう一度マッチング」→ `loading` へ戻る
- `result` の「最初からやり直す」→ `start` へ + `gender` を `null` に

---

## 9. Instagram DM リンク仕様

### 9.1 定数管理
`lib/constants.ts` に以下を定義:

```ts
// 本番用 Instagram DM URL（ユーザー提供後に差し替え）
export const INSTAGRAM_DM_URL = "https://www.instagram.com/direct/new/";

// 表示用のアカウント名（例: @your_handle）
export const INSTAGRAM_HANDLE = "@your_handle";
```

### 9.2 差し替え手順
ユーザーから実 Instagram DM URL が提供され次第、上記 2 定数を書き換えるのみ。
他ファイルの変更は不要。

### 9.3 使用箇所
- 結果画面の「Instagram で DM を送る」ボタンの `href`
- Disclaimer 内の制作者アカウント名表示

---

## 10. Railway デプロイ仕様

### 10.1 ビルド設定
- Build command: `npm run build`
- Start command: `npm run start`
- Install command: `npm install`

### 10.2 ポート設定
Railway が `PORT` 環境変数を注入するため、`package.json` の `start` スクリプトを以下にする。

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p ${PORT:-3000}"
  }
}
```

### 10.3 環境変数
- **なし**（Instagram URL はコード定数で管理）
- 将来的にアナリティクスなどを追加する場合はこの項目で管理する

### 10.4 デプロイ手順
1. GitHub にリポジトリ作成 → プロジェクトを push
2. Railway で新規プロジェクト作成 → GitHub リポジトリを接続
3. ビルドが自動実行され、発行された URL で公開
4. 必要であればカスタムドメインを Railway 上で割り当て

---

## 11. クレジット / ライセンス

### 11.1 フッター表記（例）
```
Inspired by 筑波大生特化マッチングアプリ (@Colk_)
Licensed under MIT
© 2025 [あなたの名前 or ハンドル]
```

### 11.2 ライセンス
- MIT License を踏襲
- `LICENSE` ファイルをルートに配置

---

## 12. 非機能要件

| 項目 | 要件 |
|---|---|
| プライバシー | 一切の個人情報を送信・保存しない（クライアント完結） |
| パフォーマンス | 初回ロード 2 秒以内（Next.js SSG / 軽量 SPA） |
| アクセシビリティ | ボタンに `aria-label` を付与、コントラスト比 AA 準拠 |
| レスポンシブ | スマートフォン〜デスクトップで崩れず閲覧可能 |
| SEO / OGP | `<title>`, `<meta description>`, OGP 画像を学習院版で設定 |
| 法的 | ジョーク/パロディである旨を明示。名誉毀損や誤解を招く記述をしない |

---

## 13. 未決事項 / TODO

| # | 項目 | 状態 |
|---|---|---|
| T-01 | Instagram DM 実 URL の確定 | **ユーザーから提供待ち** |
| T-02 | Instagram アカウント表示名（@ハンドル）の確定 | ユーザーから提供待ち |
| T-03 | OGP 画像素材の準備（学習院版タイトル画像） | 任意 |
| T-04 | カスタムドメイン使用の有無 | Railway デプロイ後に判断 |

---

## 14. マイルストーン

1. **設計書承認**（本ドキュメント） ← 現在ここ
2. Next.js プロジェクト初期化 + 基本 UI 実装
3. 各画面コンポーネント実装（Start / Loading / Result）
4. Tailwind スタイリング + 学習院カラー適用
5. ローカル動作確認
6. GitHub へ push
7. Railway デプロイ
8. Instagram DM URL 差し替え
9. 公開 / SNS 共有
