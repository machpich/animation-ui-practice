import { Rive, Layout, Fit, Alignment } from '@rive-app/react-canvas'

function RiveAnimation1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
      <div>
        <h1>Rive Animation - Like Button</h1>
        <p>Rive を使ったインタラクティブなアニメーション</p>
      </div>
      <div style={{ width: 400, height: 400, border: '1px solid #ccc' }}>
        <Rive
          src="/animation-ui-practice/riv/like.riv"
          layout={new Layout({ fit: Fit.Contain, alignment: Alignment.Center })}
        />
      </div>
    </div>
  )
}

export default RiveAnimation1
