import axios from 'axios'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//HOOKS
import { useIsMobile } from '../../hooks/useMobileDevice'
import { Button } from '../components/ui/button'
import useToast from '../../hooks/useToast'

/**
 * Login page component.
 * Provides user authentication with email and password.
 * Responsive design with different layouts for mobile and desktop.
 * Stores authentication token and user data in localStorage on success.
 * 
 * @returns JSX element containing the login form
 */
export default function Login() {
  const isMobile = useIsMobile()
  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      })

      console.log('Login successful:', response.data)

      // Guardar token en localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      toast.success('Login successful!')

      // Redirigir al panel
      navigate('/panel')
    } catch (error) {
      console.error('Login error:', error)
      const errorMessage = (error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Error al iniciar sesión'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${isMobile ? 'bg-white' : 'px-4 bg-gradient-to-br from-indigo-50 to-purple-50'} `}
    >
      {isMobile ? (
        <div className="w-full">
          <div className="bg-white  p-8 md:p-12 animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-full my-4">
                <TrendingUp className="w-6 h-6 m-2 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg font-semibold"
              >
                {loading ? 'Signing In...' : 'Sign In'}
                {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg font-semibold"
              >
                {loading ? 'Signing In...' : 'Sign In'}
                {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
