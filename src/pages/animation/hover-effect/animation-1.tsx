import hoverEffect from 'hover-effect'
import { useEffect, useRef } from 'react'
import image1 from './assets/from.jpg'
import image2 from './assets/to.jpg'
import displacement from './assets/displacement.png'
import styles from './animation-1.module.css'

function Animation1() {
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
      <div className={styles.description}>
        <h1>hover-effect</h1>
        <p>hoverで画面がエフェクト付きで切り替わる。エフェクトはグレースケールの画像なら何でも良さそう</p>
        <p>パズルっぽい組み方ができる</p>
      </div>
      <div ref={containerRef} className={styles.animationContainer} style={{ height: 700, width: 700 }} />
    </div>
    )
}

export default Animation1
