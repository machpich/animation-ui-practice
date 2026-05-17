# Storybook アドオン探索 / ギャラリー化計画書

## ゴール
- アニメーションをギャラリー的に並べて見られる形を実現
- Controls パネルをいじるより、一覧で見るユースケースを優先
- 選択したアドオンをインストール・設定

## 背景
- 現在は Storybook のデフォルト UI（Sidebar + Controls）だけ
- アニメーション複数個を並べて「見比べる」ユースケースに最適化したい
- Storybook には多くのアドオンがあるが、アニメーション確認に適したものを探索が必要

## 検討対象アドオン
1. **@storybook/addon-docs**（MDX）
   - Docs ページで複数ストーリーをタイル状に表示可能
   - カスタム CSS で見た目を調整できる

2. **@storybook/addon-designs**
   - Figma 連携（今は不要かもしれないが、将来的に参考）

3. **ギャラリーレイアウト**
   - CSS Grid / Flex を使って複数アニメーションを並べる
   - Storybook の Canvas ページをカスタマイズするか、Docs ページで実装

## 調査結果

### 選定アドオン
- **@storybook/addon-docs**: 既にインストール済み
- **追加インストール**: 不要

### 実装方針
- Docs ページ（.mdx）でギャラリーを実装
- CSS Grid で複数アニメーションを並べる
- 各ストーリーを Canvas で埋め込み

## コミット単位

### コミット1: アドオン調査・選定 ✅
- @storybook/addon-docs が最適と判定
- Docs ページ（.mdx）でギャラリー実装を決定
- 追加インストール不要

### コミット2: ギャラリー MDX ページを作成
- `src/stories/Gallery.stories.mdx` を作成
- CSS Grid でアニメーション複数を並べる
- Animation1 を埋め込み

## 留意点
- Controls をいじるユースケースより「見る」ことを優先
- 複数アニメーションを同時に見られることが重要
- シンプルな見た目を保つ（過度なカスタマイズは避ける）

## ローカル環境確認
```bash
npm run storybook
# ブラウザで http://localhost:6006 を開く
# ギャラリー形式でアニメーション複数が並んで見える
```

## GitHub Pages 確認
- main へのマージ後、GitHub Pages で確認
- ギャラリー形式が公開されている

## 関連 Issue
- #2 Storybookの導入（完了）
- #7 GitHub Pages デプロイ（完了）
- #6 アニメーションに関するコンテンツの作成（親issue）
