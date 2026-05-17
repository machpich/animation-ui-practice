import HoverEffect from '../css/hover-effect/HoverEffect'
import LikeAnimation from '../rive/LikeAnimation/LikeAnimation'

export const Gallery = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      <div>
        <h3>hover-effect</h3>
        <HoverEffect />
      </div>
      <div>
        <h3>Rive</h3>
        <LikeAnimation />
      </div>
    </div>
  )
}

export default Gallery
