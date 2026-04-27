import { TrendingUp } from 'lucide-react'

/**
 * Footer component for the landing page.
 * Displays the logo, navigation links, and copyright information.
 * Responsive layout with two columns on desktop.
 * 
 * @returns JSX element containing the footer section
 */
function Footer() {
  return (
    <footer className="bg-white border-t border-indigo-100 rounded-t-3xl">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Logo */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Finacio
              </span>
            </div>
            <p className="text-gray-600 text-sm">Manage your finances with ease and confidence.</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-indigo-600 transition-colors text-sm"
                >
                  Start
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-100 pt-8 text-center">
          <p className="text-gray-600 text-sm">© 2024 Finacio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
