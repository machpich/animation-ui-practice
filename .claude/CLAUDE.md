# CLAUDE.md

このリポジトリで作業する際の方針をまとめる。

## このリポジトリは何か

Web のアニメーション表現を試す個人リポジトリ。ライブラリやテクニックを実際に動かし、
Storybook 上でギャラリー的に並べて見られる場を目指している。

- **唯一の開発・公開環境は Storybook**。`npm run storybook` で起動し、main へのマージで
  GitHub Pages に自動デプロイされる。
- React 19 + TypeScript + Storybook 8（Vite ベース）。
- アニメーションは「動くサンプル」であると同時に「作り方が学べる教材」であることを重視する。

## ディレクトリ規約

```
src/components/animations/
├── css/                    # CSS ベースのアニメーション
│   └── <feature-name>/     # 1 テーマ = 1 ディレクトリ
│       ├── <Pattern>/      # パターンが複数あるときはパターンごとにサブディレクトリ
│       │   ├── Xxx.tsx
│       │   ├── Xxx.module.css
│       │   └── Xxx.stories.tsx
│       ├── <feature>.ts    # パターン間で共有する定数（SVG パス等）
│       └── <Feature>.mdx   # テーマ全体の解説ドキュメント（About）
├── rive/                   # Rive アニメーション
└── Gallery/                # 一覧表示
```

- コンポーネント本体（`.tsx`）・スタイル（`.module.css`）・ストーリー（`.stories.tsx`）の
  3 点セットが基本。
- パターンが 1 つなら `css/<feature>/` 直下、複数ならパターンごとにサブディレクトリを切る。
- 画像アセットは、色やグラデーションをコードから制御したい場合はインライン SVG にし、
  パスデータを共有モジュール（例: `heart.ts`）に集約する。

## CSS アニメーションを追加するときの書き方

CSS アニメーションのサンプルを追加・編集するときは、**docs と stories の書き方を必ず
`.claude/skills/css-animation-story/SKILL.md` に従って統一する**。

要点（詳細は skill 参照）:

- 各 Story の `docs.description.component` 先頭に **1 行の概略**、その下に
  **「時刻 × レイヤー」の時系列テーブル**を出す。
- **Show code に `.tsx` と `.module.css` の全文**を出す（`?raw` import で実ファイルと同期）。
- テーマ全体の設計思想は **About（MDX）** に集約する。

## 開発フロー

PR・計画書の運用は [`.claude/PULL_REQUEST_GUIDE.md`](./PULL_REQUEST_GUIDE.md) に従う。
特に **PR description はコードを読めば分かることを書かず、Why / 設計の意図に絞る**。

## 確認コマンド

```bash
npx tsc -p tsconfig.app.json --noEmit   # 型チェック
npm run lint                            # eslint（storybook-static の既存エラーは対象外）
npm run build-storybook                 # ビルド確認（MDX / ?raw の解決もここで検証できる）
npm run storybook                       # ローカル確認（クリック挙動・Docs・Show code）
```
