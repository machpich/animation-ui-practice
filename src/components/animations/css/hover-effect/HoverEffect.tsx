import hoverEffect from 'hover-effect'
import { useEffect, useRef } from 'react'
import image1 from './assets/from.jpg'
import image2 from './assets/to.jpg'
import displacement from './assets/displacement.png'
import styles from './HoverEffect.module.css'

function HoverEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      new hoverEffect({
        parent: containerRef.current,
        intensity: 1,
        image1: image1,
        image2: image2,
        displacementImage: displacement,
      })
    }
  }, [])

  return (
    <div className={styles.mainContainer}>
      <div ref={containerRef} className={styles.animationContainer} style={{ height: 300, width: 300 }} />
    </div>
    )
}

export default HoverEffect
