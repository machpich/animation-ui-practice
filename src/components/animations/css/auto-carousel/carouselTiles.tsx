import type { CSSProperties } from 'react'

/**
 * パターン間で共有するデモ用の中身。
 * カルーセルに流す絵文字タイルを配列で返す（Motion 版・CSS 版で同じ見た目を使う）。
 *
 * react-refresh の制約（1 ファイル 1 種類の export）に触れないよう、
 * ここではコンポーネントを定義せず「データ（要素の配列）」だけを export する。
 */
const EMOJIS = ['🎉', '🚀', '⭐️', '🍎', '🐳', '🌈', '🎈', '🍀', '💎', '🔥']

// 絵文字 1 つを丸みのあるタイルに載せる見た目
const tileStyle: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: 88,
  height: 88,
  borderRadius: 20,
  background: 'linear-gradient(135deg, #fef1f4 0%, #f3f0ff 100%)',
  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
  fontSize: 40,
  userSelect: 'none',
}

/** カルーセルの children にそのまま渡せる絵文字タイル一式 */
export const carouselTiles = EMOJIS.map((emoji) => (
  <div key={emoji} style={tileStyle}>
    {emoji}
  </div>
))
