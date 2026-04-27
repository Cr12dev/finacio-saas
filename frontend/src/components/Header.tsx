import { TrendingUp } from 'lucide-react'
// CUSTOM HOOKS
import { useIsMobile } from '../../hooks/useMobileDevice'
import { Button } from './ui/button'

/**
 * Header component for the landing page.
 * Displays the logo, navigation links, and a call-to-action button.
 * Responsive design shows/hides the brand name based on viewport size.
 * 
 * @returns JSX element containing the header navigation
 */
function Header() {
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-indigo-100">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          {!isMobile && (
            <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Finacio
            </span>
          )}
        </div>

        <div className={`flex items-center ${isMobile ? 'gap-4' : 'gap-8'}`}>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
            Home
          </a>
          <a
            href="#features"
            className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            Pricing
          </a>
          <Button className="bg-indigo-600 hover:bg-indigo-700 font-medium">
            <a href="/login">Start</a>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Header
