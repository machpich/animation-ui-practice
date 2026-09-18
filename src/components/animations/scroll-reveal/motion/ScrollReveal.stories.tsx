import type { Meta, StoryObj } from '@storybook/react'
import ScrollReveal from './ScrollReveal'
import tsx from './ScrollReveal.tsx?raw'

/** Show code にコンポーネント本体（.tsx）を出す（この例は CSS module を持たない） */
const SOURCE = [
  '// 使い方：出したい要素を包むだけ',
  '<ScrollReveal>{card}</ScrollReveal>',
  '<ScrollReveal settle="smooth">{card}</ScrollReveal>       // 行き過ぎず吸い付いて止まる',
  '<ScrollReveal distance={100} duration={1}>{card}</ScrollReveal> // 大きく・ゆっくり',
  '<ScrollReveal once={false}>{card}</ScrollReveal>          // 入るたび毎回出し直す',
  '',
  '// たくさんのセクションを並べれば、スクロールに合わせて一つずつ上がってくる',
  'sections.map((s) => <ScrollReveal key={s.id}>{s.body}</ScrollReveal>)',
  '',
  '// ── ScrollReveal.tsx ──',
  tsx,
].join('\n')

const TIMELINE = [
  '### 時系列（要素がビューポートに入った瞬間 = 0 秒）',
  '',
  'まだ入っていない要素は initial の「下・透明」で待機。amount（既定 0.3）だけ',
  '見えた瞬間に発火する。「ふわっ」の正体は blur ではなく **距離 × 時間 × 着地イージング**。',
  'settle="snap"（既定）は定位置を少し通り越して戻る＝「カチッとハマる」感を作る。',
  '',
  '- **box: 現れる要素**（下から distance px・opacity 0 → 定位置・opacity 1）',
  '- easing: snap = `cubic-bezier(.175,.885,.32,1.275)`（overshoot あり） / smooth = `cubic-bezier(.16,1,.3,1)`',
  '- reduced-motion 時は縦移動を切り、opacity フェードのみ',
  '',
  '| 時刻 | box: y | box: opacity |',
  '|---|---|---|',
  '| 入る前 | +distance（既定 64px 下） | 0 |',
  '| 0.00s | +distance から動き出す | 0 |',
  '| ~0.6s | わずかに 0 を通り越す（snap の overshoot） | ~1 |',
  '| ~0.8s（duration） | 0 に戻ってカチッと着地 | 1 |',
].join('\n')

const Card = ({ label = 'ふわっと現れる', tone = 0 }: { label?: string; tone?: number }) => {
  const gradients = [
    'linear-gradient(135deg, #fe587a, #ff9a6b)',
    'linear-gradient(135deg, #6b8bff, #7ee8fa)',
    'linear-gradient(135deg, #8e6bff, #ff6bd6)',
    'linear-gradient(135deg, #3ecf8e, #7ee8a0)',
  ]
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        maxWidth: 320,
        height: 140,
        borderRadius: 16,
        background: gradients[tone % gradients.length],
        color: '#fff',
        fontWeight: 600,
        fontSize: 18,
        boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
      }}
    >
      {label}
    </div>
  )
}

const meta = {
  title: 'Animations/Scroll Reveal/Motion',
  component: ScrollReveal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'スクロールして要素がビューポートに入ると、下からふわっと（下方向へ沈んだ透明状態から' +
          '定位置＋不透明へ）現れる。距離・速度・遅延を props で渡せ、once で「1 回だけ」か' +
          '「入るたび毎回」かを、settle で着地の質感（カチッと通り越す snap / 吸い付く smooth）を' +
          '切り替えられる。**複数セクションを並べると、スクロールに合わせて一つずつ上がってくる**' +
          '（AOS のようなページ演出）。\n\n' +
          TIMELINE,
      },
    },
  },
  args: { children: <Card /> },
} satisfies Meta<typeof ScrollReveal>

export default meta
type Story = StoryObj<typeof meta>

const SECTIONS = [
  { id: 1, title: 'Section 1', desc: '下へスクロールすると、次のセクションが順に現れます。' },
  { id: 2, title: 'Section 2', desc: '各セクションは「自分が画面に入った瞬間」に上がってきます。' },
  { id: 3, title: 'Section 3', desc: 'まとめて出すのではなく、スクロール量に応じて一つずつ。' },
  { id: 4, title: 'Section 4', desc: 'settle="snap" なので、定位置を少し通り越してカチッと収まります。' },
  { id: 5, title: 'Section 5', desc: '同じ部品を並べているだけで、順に上がるページになります。' },
]

// セクションごとの背景色（境目の可視化用）
const SECTION_BG = ['#eef2ff', '#fef2f5', '#effaf3', '#fff7ed', '#f5f3ff']

/**
 * 複数セクションが、スクロールに合わせて一つずつ上がってくる主役デモ。
 * Controls で distance / duration / settle / once / amount を変えると全セクションに反映される。
 */
export const Sections: Story = {
  args: { once: false },
  // args を各 ScrollReveal に渡す。children は JSX の子（後勝ち）で上書きされる
  render: (args) => (
    <div style={{ height: 560, overflowY: 'auto', border: '1px dashed #cbd5e1', borderRadius: 12 }}>
      <div style={{ padding: '1.5rem', color: '#94a3b8', textAlign: 'center' }}>
        ↓ この枠を下へスクロールしてください（背景色でセクションの境目が分かります） ↓
      </div>
      {SECTIONS.map((s, i) => (
        <section
          key={s.id}
          style={{
            display: 'grid',
            placeItems: 'center',
            minHeight: 360,
            padding: '2rem 1.5rem',
            background: SECTION_BG[i % SECTION_BG.length],
          }}
        >
          <ScrollReveal {...args}>
            <div style={{ maxWidth: 360, textAlign: 'center' }}>
              <Card label={s.title} tone={i} />
              <p style={{ margin: '1rem 0 0', color: '#475569' }}>{s.desc}</p>
            </div>
          </ScrollReveal>
        </section>
      ))}
    </div>
  ),
  parameters: {
    docs: { source: { code: SOURCE } },
  },
}

