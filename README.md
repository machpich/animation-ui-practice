# animation-ui-practice

Web のアニメーション表現を試すための個人リポジトリ。
ライブラリやテクニックを実際に動かしながら、ギャラリー的に並べて見られる場を目指す。

## 公開先

- **Storybook ギャラリー**: https://machpich.github.io/animation-ui-practice/
  - アニメーションサンプルを一覧で確認できます

## 技術スタック

- React 19 + TypeScript
- Vite
- Storybook 8（開発環境 / 本公開）
- アニメーション関連: hover-effect ほか（順次追加予定）

## 開発

### Storybook でローカル確認

```bash
npm install
npm run storybook
# http://localhost:6007 で起動（ポート 6006 が占有されている場合）
```

### Vite でのローカル確認（参考）

```bash
npm run dev
```

## ビルド

### Storybook ビルド

```bash
npm run build-storybook
```

### Vite ビルド（参考）

```bash
npm run build
```

## デプロイ

main ブランチへのマージで GitHub Pages に自動デプロイされる（`.github/workflows/deploy.yml`）。
公開先は Storybook ビルド結果です。

## 進行中の作業

詳細は [Issues](https://github.com/machpich/animation-ui-practice/issues) を参照。