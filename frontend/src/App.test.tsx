import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: {} }),
  },
}))

// Mock components
vi.mock('./components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}))

vi.mock('./components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}))

vi.mock('./dashboard/Dashboard', () => ({
  default: () => <div data-testid="dashboard">Dashboard</div>,
}))

vi.mock('./dashboard/Transactions', () => ({
  default: () => <div data-testid="transactions">Transactions</div>,
}))

vi.mock('./dashboard/Panel', () => ({
  default: () => <div data-testid="panel">Panel</div>,
}))

vi.mock('./login/Login', () => ({
  default: () => <div data-testid="login">Login</div>,
}))

vi.mock('./register/Register', () => ({
  default: () => <div data-testid="register">Register</div>,
}))

vi.mock('./components/ui/button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
}))

describe('App', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })
})
