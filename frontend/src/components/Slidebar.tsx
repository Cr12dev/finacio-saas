import {
  BarChart3,
  Home,
  LogOut,
  PanelLeft,
  Settings,
  TrendingUp,
  User,
  Wallet,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useIsTablet } from '../../hooks/useMobileDevice'
import { useParams } from 'react-router-dom'

interface SlidebarProps {
  /** Whether the sidebar is currently open (for mobile and tablet) */
  isOpen?: boolean
  /** Callback function to close the sidebar */
  onClose?: () => void
}

/**
 * Sidebar navigation component for dashboard pages.
 * Displays navigation menu items, user info, and logout option.
 * Responsive design: fixed with slide animation on mobile and tablet, static on desktop.
 * 
 * @param props - Component props
 * @param props.isOpen - Whether sidebar is open (mobile and tablet)
 * @param props.onClose - Callback to close sidebar
 * @returns JSX element containing the sidebar navigation
 */
export default function Slidebar({ isOpen = true, onClose }: SlidebarProps) {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const isTablet = useIsTablet()
  const { businessId } = useParams()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      setUserName(userData.name || 'User')
      setUserEmail(userData.email || '')
    }
  }, [])

  const menuItems = [
    { label: 'Panel', href: '/panel', icon: PanelLeft },
    { icon: Home, label: 'Dashboard', href: businessId ? `/${businessId}/dashboard` : '/dashboard' },
    { icon: Wallet, label: 'Transactions', href: businessId ? `/${businessId}/transactions` : '/transactions' },
    { icon: BarChart3, label: 'Analytics', href: businessId ? `/${businessId}/analytics` : '/analytics' },
    { icon: TrendingUp, label: 'Investments', href: businessId ? `/${businessId}/investments` : '/investments' },
    { icon: Settings, label: 'Settings', href: businessId ? `/${businessId}/settings` : '/settings' },
  ]

  return (
    <>
      {/* Mobile and tablet overlay */}
      {isTablet && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <aside
        className={`fixed lg:relative z-50 lg:z-auto bg-white border-r border-indigo-100 min-h-screen flex flex-col transition-transform duration-300 ease-in-out ${
          isTablet
            ? isOpen
              ? 'translate-x-0'
              : '-translate-x-full'
            : 'translate-x-0'
        } ${isTablet ? 'w-64' : 'w-64'}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-indigo-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Finacio
            </h1>
          </div>
          {isTablet && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-indigo-50 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group"
          >
            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-indigo-100 space-y-2">
        <div className="flex items-center gap-3 px-4 py-4 rounded-xl bg-indigo-50">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-full flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-indigo-600 truncate mt-0.5">{userEmail}</p>
          </div>
        </div>
        <a
          href="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group"
        >
          <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Profile</span>
        </a>
        <a
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Logout</span>
        </a>
      </div>
      </aside>
    </>
  )
}
