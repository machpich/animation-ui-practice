# Vite アプリ部分を削除する計画書

## ゴール
- Vite アプリ関連ファイルを削除
- Storybook が本公開となったため不要になった部分をクリーンアップ
- Storybook ビルド・動作に影響が出ないことを確認

## 背景
- Vite アプリは Animation1 を表示するための器でしかない
- GitHub Pages の公開先が Storybook に切り替わった
- Storybook が安定稼働しているため、Vite アプリは削除可能

## 削除対象

### ファイル・ディレクトリ
- `src/App.tsx`
- `src/App.css`
- `src/main.tsx`
- `src/pages/` 全体（ただし `src/pages/animation/` は残す）
- `src/components/Layout.tsx`
- `src/components/Layout.module.css`
- `src/index.css`
- `src/assets/` 全体
- `index.html`

### 依存パッケージ
- `react-router-dom` をアンインストール

### package.json スクリプト
- `dev` は削除（Vite 開発サーバーは不要）
- `build` は削除（Storybook ビルドのみ）
- `preview` は削除

## 残す部分

### 必須
- `src/pages/animation/` - アニメーション実装
- `src/stories/` - Story ファイル
- `.storybook/` - Storybook 設定
- `public/` - 静的アセット（.riv ファイルなど）

### 検討対象
- `vite.config.ts` - Storybook が Vite を使用するため残す可能性あり

## コミット単位

### コミット1: Vite アプリ関連ファイルを削除
- ファイル削除：App.tsx, main.tsx, pages/Home.tsx など
- index.html 削除

### コミット2: 依存パッケージのクリーンアップ
- `react-router-dom` をアンインストール
- package.json スクリプト整理（dev/build/preview 削除）

## ローカル環境確認
```bash
npm run storybook
# Storybook が正常に起動すること
# Gallery / Animations が表示されること
```

## GitHub Pages 確認
- main へのマージ後、GitHub Pages で確認
- Storybook が正常に公開されていること

## 関連 Issue
- #7 StorybookをGitHub Pagesにデプロイする（完了）
- #6 アニメーションに関するコンテンツの作成（親issue）

## 注意
- このステップで Vite アプリは完全に削除される
- ロールバック可能な状態を保つため、コミット単位で分割
