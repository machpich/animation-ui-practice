# animation-ui-practice

Web のアニメーション表現を試すための個人リポジトリ。
ライブラリやテクニックを実際に動かしながら、ギャラリー的に並べて見られる場を目指す。

公開先: https://machpich.github.io/animation-ui-practice/

## 技術スタック
- React 19 + TypeScript
- Vite
- アニメーション関連: hover-effect ほか（順次追加予定）

※ Storybook の導入、GitHub Pages 公開先の Storybook 切り替えなどを進行中。
進行中の作業は [Issues](https://github.com/machpich/animation-ui-practice/issues) を参照。

## セットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## デプロイ
main ブランチへのマージで GitHub Pages に自動デプロイされる（`.github/workflows/deploy.yml`）。