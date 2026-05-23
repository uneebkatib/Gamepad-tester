// Gamepad hook for detecting and monitoring gamepads
import { useState, useEffect, useCallback } from 'react'

export interface GamepadStatus {
  id: string
  name: string
  index: number
  connected: boolean
  buttons: number[]
  axes: number[]
  vibrationActuators: any[]
  timestamp: number
}

export const useGamepad = () => {
  const [gamepads, setGamepads] = useState<GamepadStatus[]>([])
  const [isSupported, setIsSupported] = useState(true)

  const pollGamepads = useCallback(() => {
    const navigatorGamepads = navigator.getGamepads?.() || []
    const activeGamepads: GamepadStatus[] = []

    for (let i = 0; i < navigatorGamepads.length; i++) {
      const gp = navigatorGamepads[i]
      if (gp) {
        activeGamepads.push({
          id: gp.id,
          name: gp.id,
          index: i,
          connected: gp.connected,
          buttons: gp.buttons.map((b) => (typeof b === 'number' ? b : b.value)),
          axes: Array.from(gp.axes),
          vibrationActuators: (gp as any).vibrationActuator ? [(gp as any).vibrationActuator] : [],
          timestamp: Date.now(),
        })
      }
    }

    setGamepads(activeGamepads)
  }, [])

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.getGamepads) {
      setIsSupported(false)
      return
    }

    const interval = setInterval(pollGamepads, 16) // ~60fps

    return () => clearInterval(interval)
  }, [pollGamepads])

  return { gamepads, isSupported }
}
