import HoverEffect from '../css/hover-effect/HoverEffect'
import HeartParticleBurst from '../css/heart-like/ParticleBurst/HeartParticleBurst'
import HeartBurst from '../css/heart-like/HeartBurst/HeartBurst'
import HeartCrossBeam from '../css/heart-like/CrossBeam/HeartCrossBeam'
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
        <h3>Heart Like - Particle Burst</h3>
        <HeartParticleBurst />
      </div>
      <div>
        <h3>Heart Like - Heart Burst</h3>
        <HeartBurst />
      </div>
      <div>
        <h3>Heart Like - Cross Beam</h3>
        <HeartCrossBeam />
      </div>
      <div>
        <h3>Rive</h3>
        <LikeAnimation />
      </div>
    </div>
  )
}

export default Gallery