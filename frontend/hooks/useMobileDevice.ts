import { useEffect, useState } from 'react'

/**
 * Custom hook to detect if the current viewport is mobile-sized.
 * 
 * @param MOBILE_BREAKPOINT - The maximum width in pixels to consider as mobile (default: 768)
 * @returns boolean indicating if the current viewport is mobile-sized
 * 
 * @example
 * ```tsx
 * const isMobile = useIsMobile(768)
 * if (isMobile) {
 *   // Show mobile layout
 * }
 * ```
 */
export function useIsMobile(MOBILE_BREAKPOINT = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const onChange = () => {
      setIsMobile(mql.matches)
    }

    mql.addEventListener('change', onChange)

    return () => {
      mql.removeEventListener('change', onChange)
    }
  }, [MOBILE_BREAKPOINT])

  return isMobile
}
