import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas'
import React, { useEffect } from 'react'
import likeRiv from './like.riv'

interface RiveLikeAnimationProps {
  width?: number
  height?: number
  autoplay?: boolean
  isActive?: boolean
  onClick?: () => void
  debug?: boolean
}

const LikeAnimation: React.FC<RiveLikeAnimationProps> = ({
  width = 100,
  height = 100,
  autoplay = true,
  isActive = false,
  onClick,
  debug = false,
}) => {
  const { RiveComponent, rive } = useRive({
    src: likeRiv,
    stateMachines: 'state_machine',
    autoplay,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    onLoad: () => {
      if (debug) {
        console.log('Rive animation loaded successfully')
      }
    },
    onLoadError: (error) => {
      console.error('Failed to load Rive animation:', error)
    },
  })

  useEffect(() => {
    if (rive) {
      const stateMachineInputs = rive.stateMachineInputs('state_machine')
      const activeInput = stateMachineInputs?.find((input) => input.name === 'active')

      if (activeInput && activeInput.value !== isActive) {
        activeInput.value = isActive
        if (debug) {
          console.log('🎯 Rive active state updated to:', isActive)
        }
      }
    }
  }, [rive, isActive, debug])

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      style={{
        display: 'inline-block',
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={handleClick}
    >
      <RiveComponent style={{ width: `${width}px`, height: `${height}px`, margin: 'auto' }} />

      {debug && (
        <div style={{ marginTop: '8px' }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              const stateMachineInputs = rive?.stateMachineInputs('state_machine')
              const activeInput = stateMachineInputs?.find((input) => input.name === 'active')
              if (activeInput) {
                activeInput.value = !activeInput.value
                console.log('🎯 Debug toggle to:', activeInput.value)
              }
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Debug Toggle
          </button>
        </div>
      )}
    </div>
  )
}

export default LikeAnimation
