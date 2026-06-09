---
name: css-animation-story
description: >-
  CSS アニメーションのサンプルを Storybook に追加・編集するときの docs と stories の書き方を統一する。
  新しい CSS アニメ（css/ 配下）の Story / module.css / About(MDX) を作る・直すときに必ず使う。
---

# CSS Animation Story の書き方

`src/components/animations/css/` 配下に CSS アニメーションを追加・編集するときの規約。
「動くサンプル」かつ「作り方が学べる教材」にするため、docs・stories の形を統一する。

参考実装は `css/heart-like/`（このパターンの確立元）。

## ディレクトリ構成

```
css/<feature>/
├── <Pattern>/                 # パターンごとにサブディレクトリ（1 パターンなら直下でも可）
│   ├── <Pattern>.tsx
│   ├── <Pattern>.module.css
│   └── <Pattern>.stories.tsx
├── <feature>.ts               # パターン間で共有する定数（SVG パス等）。必要時のみ
└── <Feature>.mdx              # テーマ全体の解説（About）
```

## 1. コンポーネント（.tsx）

- 状態（押下トグル等）が要るなら React state を使い、CSS アニメを再発火させたい場合は
  `key` を更新してエフェクト要素を再マウントする。
- 色・寸法など外から変えたいものは props にする（例: `colors?: string[]` で 1 色＝単色 /
  2 色以上＝グラデーション）。
- 画像は、色やグラデーションをコードで制御したいならインライン SVG にし、パスデータは
  共有モジュール（`<feature>.ts`）に置く。

## 2. ストーリー（.stories.tsx）

各 Story で次の 2 つを必ず行う。

### (a) docs.description.component = 「1 行概略 + 時系列テーブル」

- 先頭は **1 行の概略**（例: 「Twitter/X の『いいね』に最も近い王道。」程度）。
- その下に **「時刻 × レイヤー」の時系列テーブル**を置く。
  - 列でレイヤーごとの動き、行で全体の流れが追えるようにする。
  - 各レイヤーの delay / 継続時間 / 役割を表の前に箇条書きで添える。
  - delay・継続・keyframe の % は **実際の CSS の値**に合わせる（憶測で書かない）。

### (b) Show code に .tsx と .module.css の全文を出す

`?raw` import で実ファイルを読み、`parameters.docs.source.code` に埋め込む。
呼び出しだけでは中身が分からないため、本体まで読めるようにする。

### テンプレート

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import Xxx from './Xxx'
import tsx from './Xxx.tsx?raw'
import css from './Xxx.module.css?raw'

/** Show code にコンポーネント本体（.tsx）と実 CSS の両方を出す */
const SOURCE = [
  '// 使い方',
  '<Xxx />',
  '',
  '// ── Xxx.tsx ──',
  tsx,
  '',
  '/* ── Xxx.module.css ── */',
  css,
].join('\n')

const TIMELINE = [
  '### 時系列（クリック = 0 秒）',
  '',
  '列でレイヤーごとの動き、行で全体の流れが追える。',
  '',
  '- **A: 〇〇**（delay 0s / 継続 1.0s）',
  '- **B: 〇〇**（delay 0.15s / 継続 0.7s・主役）',
  '',
  '| 時刻 | A: 〇〇 | B: 〇〇 |',
  '|---|---|---|',
  '| 0.00s | 開始 | — |',
  '| 0.15s | 継続 | 開始（主役） |',
  '| ~0.85s | 終了 | 着地 |',
].join('\n')

const meta = {
  title: 'Animations/<Feature>/<Pattern>',
  component: Xxx,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '〇〇な表現。1 行の概略。\n\n' + TIMELINE,
      },
    },
  },
} satisfies Meta<typeof Xxx>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}
```

### 注意

- `?raw` の型は `vite/client`（tsconfig の `types`）で解決される。追加の型定義は不要。
- 同じ機能の派生 Story（色違い等）は、別コンポーネントにせず props 違いの Story として並べる。
- pure HTML+CSS 版を作る場合は、`<style>` 同梱の HTML 文字列を 1 ファイルに持ち、
  Show code にはその HTML をそのまま出す（そのままブラウザで開ける状態にする）。
  クラス名は名前空間化して衝突を防ぐ。

## 3. About（MDX）

テーマ全体の設計思想は `<Feature>.mdx` に集約する。

- `import { Meta, Unstyled } from '@storybook/addon-docs/blocks'`
- `<Meta title="Animations/<Feature>/About" />`
- `<Unstyled><div className="prose">…</div></Unstyled>` で囲む
  （`prose` スタイルは `.storybook/prose.css` で当たる）。
- 共通の土台・設計判断・パターン間の違い・React 化のポイントなどを書く。
- 個々のパターンの細かい時系列は各 Story 側に置き、About では全体像にとどめる。

> MDX を認識させるため、`.storybook/main.ts` の stories glob に `*.mdx` が含まれていること。

## 4. Gallery への追加

新しいパターンは `Gallery/Gallery.tsx` にも並べる。

## 5. 仕上げの確認

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build-storybook   # MDX・?raw の解決もここで検証できる
```

Storybook を開き、Docs タブ（概略＋時系列）と Canvas の Show code（tsx+css）を目視確認する。
