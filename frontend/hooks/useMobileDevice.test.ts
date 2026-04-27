import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useIsMobile } from './useMobileDevice'

describe('useIsMobile', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with correct mobile state based on window width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const { result } = renderHook(() => useIsMobile(768))
    expect(result.current).toBe(true)
  })

  it('should return false for desktop width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile(768))
    expect(result.current).toBe(false)
  })

  it('should update when media query changes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const mockListener = vi.fn()
    const mockMediaQuery = {
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event, callback) => {
        if (event === 'change') mockListener.mockImplementation(callback)
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }

    window.matchMedia = vi.fn().mockReturnValue(mockMediaQuery)

    const { result } = renderHook(() => useIsMobile(768))
    expect(result.current).toBe(false)

    act(() => {
      mockMediaQuery.matches = true
      mockListener()
    })

    expect(result.current).toBe(true)
  })

  it('should use default breakpoint of 768', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('should handle custom breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const { result } = renderHook(() => useIsMobile(1024))
    expect(result.current).toBe(true)
  })
})
