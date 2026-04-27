import { useState, useCallback } from 'react'

/**
 * Custom hook to manage sidebar open/close state.
 * Provides state and methods to toggle, open, and close the sidebar.
 * 
 * @returns Object containing:
 * - isOpen: boolean indicating if sidebar is open
 * - toggle: function to toggle sidebar state
 * - open: function to open sidebar
 * - close: function to close sidebar
 * 
 * @example
 * ```tsx
 * const { isOpen, toggle, close } = useSidebar()
 * <Slidebar isOpen={isOpen} onClose={close} />
 * <button onClick={toggle}>Toggle Sidebar</button>
 * ```
 */
export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    toggle,
    open,
    close,
  }
}
