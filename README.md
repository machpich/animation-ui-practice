# animation-ui-practice

Web のアニメーション表現を試すための個人リポジトリ。
ライブラリやテクニックを実際に動かしながら、ギャラリー的に並べて見られる場を目指す。

## 公開先

- **Storybook ギャラリー**: https://machpich.github.io/animation-ui-practice/
  - アニメーションサンプルを一覧で確認できます

## 技術スタック

- React 19 + TypeScript
- Storybook 8（Vite ベース、開発環境・本公開）
- アニメーション関連: hover-effect、Rive ほか（順次追加予定）

## ディレクトリ構造

```
src/components/animations/
├── css/
│   └── hover-effect/          # CSS ベースアニメーション
│       ├── HoverEffect.tsx
│       ├── HoverEffect.stories.tsx
│       ├── assets/
│       └── ...
├── rive/
│   ├── LikeAnimation/         # Rive アニメーション
│   │   ├── LikeAnimation.tsx
│   │   ├── LikeAnimation.stories.tsx
│   │   └── like.riv
│   └── rive.d.ts
└── Gallery/                   # ギャラリー表示
    ├── Gallery.tsx
    └── Gallery.stories.tsx
```

## 開発

### ローカル確認

```bash
npm install
npm run storybook
```

Storybook が起動したら http://localhost:6006 (or 6007+) を開いてください。
Storybook が唯一の開発・公開環境です。

### 新しいアニメーション追加

1. `src/components/animations/` 配下に新しいディレクトリを作成
2. コンポーネント本体（.tsx）、ストーリーファイル（.stories.tsx）、アセットを配置
3. Gallery コンポーネントに追加

## ビルド

```bash
npm run build-storybook
```

## デプロイ

main ブランチへのマージで GitHub Pages に自動デプロイされます（`.github/workflows/deploy.yml`）。

## 進行中の作業

詳細は [Issues](https://github.com/machpich/animation-ui-practice/issues) を参照。