# Rive アニメーション対応計画書

## ゴール
- `@rive-app/react-canvas` を導入
- `.riv` ファイルの配置場所を決定
- Rive サンプルを 1 つ作成・Story に追加

## 背景
- hover-effect は CSS ベースのアニメーション
- Rive は別の選択肢として、リッチなアニメーション制作ができる
- 環境を整えれば、以降のサンプル追加が容易になる

## コミット単位

### コミット1: @rive-app/react-canvas をインストール
- `package.json` に依存を追加
- インストール確認

### コミット2: Rive サンプルファイルの配置と Story 作成
- `public/riv/` ディレクトリに `.riv` ファイルを配置（Rive Community から取得予定）
- `src/pages/animation/rive/rive-animation-1.tsx` で Rive コンポーネント実装
- `src/stories/RiveAnimation1.stories.tsx` で Story 作成
- Gallery に Rive サンプルを追加

## 留意点
- Rive Community から無料サンプル素材を利用予定
- `.riv` ファイルは public ディレクトリに配置（静的アセット）
- アニメーション再生に必要な Rive Runtime を確認

## ローカル環境確認
```bash
npm run storybook
# http://localhost:6007 で Rive サンプルが表示・再生される
```

## GitHub Pages 確認
- main へのマージ後、GitHub Pages で確認
- Rive アニメーションが Gallery に並んで表示されている

## 関連 Issue
- #2 Storybookの導入（完了）
- #4 ギャラリー化（完了）
- #6 アニメーションに関するコンテンツの作成（親issue）