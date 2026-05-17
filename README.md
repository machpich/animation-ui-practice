# animation-ui-practice

Web のアニメーション表現を試すための個人リポジトリ。
ライブラリやテクニックを実際に動かしながら、ギャラリー的に並べて見られる場を目指す。

## 公開先

- **Storybook ギャラリー**: https://machpich.github.io/animation-ui-practice/
  - アニメーションサンプルを一覧で確認できます

## 技術スタック

- React 19 + TypeScript
- Storybook 8（Vite ベース、開発環境 / 本公開）
- アニメーション関連: hover-effect、Rive ほか（順次追加予定）

## 開発

### ローカル確認

```bash
npm install
npm run storybook
# http://localhost:6007 で起動（ポート 6006 が占有されている場合）
```

Storybook が唯一の開発・公開環境です。

## ビルド

```bash
npm run build-storybook
```

## デプロイ

main ブランチへのマージで GitHub Pages に自動デプロイされる（`.github/workflows/deploy.yml`）。

## 進行中の作業

詳細は [Issues](https://github.com/machpich/animation-ui-practice/issues) を参照。