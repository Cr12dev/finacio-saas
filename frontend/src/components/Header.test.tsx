import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useIsMobile } from '../../hooks/useMobileDevice'
import Header from './Header'

// Mock the useIsMobile hook
vi.mock('../../hooks/useMobileDevice', () => ({
  useIsMobile: vi.fn(),
}))

describe('Header', () => {
  it('should render header', () => {
    vi.mocked(useIsMobile).mockReturnValue(false)

    render(<Header />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should show brand name on desktop', () => {
    vi.mocked(useIsMobile).mockReturnValue(false)

    render(<Header />)

    expect(screen.getByText('Finacio')).toBeInTheDocument()
  })

  it('should hide brand name on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)

    render(<Header />)

    expect(screen.queryByText('Finacio')).not.toBeInTheDocument()
  })

  it('should render navigation links', () => {
    vi.mocked(useIsMobile).mockReturnValue(false)

    render(<Header />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
  })

  it('should render start button', () => {
    vi.mocked(useIsMobile).mockReturnValue(false)

    render(<Header />)

    const startButton = screen.getByRole('link', { name: /start/i })
    expect(startButton).toBeInTheDocument()
    expect(startButton).toHaveAttribute('href', '/login')
  })
})
