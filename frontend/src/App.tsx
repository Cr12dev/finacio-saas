'use client'

import axios from 'axios'
import { ArrowRight, BarChart3, Check, MessageSquare, Star, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { Button } from './components/ui/button'
import Login from './login/Login'
import Register from './register/Register'
import './App.css'
import { useIsMobile } from '../hooks/useMobileDevice'
import Dashboard from './dashboard/Dashboard'
import Panel from './dashboard/Panel'
import Transactions from './dashboard/Transactions'

function Hero() {
  return (
    <section className="flex items-center justify-center min-h-screen max-w-6xl mx-auto px-4">
      <div className="w-full max-w-4xl text-center space-y-8">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-8 duration-1000">
          A financial web application that will help you grow your business
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Manage your finances with ease and confidence. Track expenses, analyze trends, and make
          smarter decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          <Button size="lg" className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-lg">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-lg"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const isMobile = useIsMobile()
  const [percentage, setPercentage] = useState(-12)
  const [barWidth, setBarWidth] = useState(75)

  useEffect(() => {
    const values = [
      { percent: -12, width: 75 },
      { percent: -8, width: 60 },
      { percent: 16, width: 85 },
      { percent: 12, width: 80 },
    ]
    let index = 0

    const interval = setInterval(() => {
      index = (index + 1) % values.length
      setPercentage(values[index].percent)
      setBarWidth(values[index].width)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="features" className="min-h-screen max-w-6xl mx-auto px-4 py-20">
      <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to manage your business finances
        </p>
      </div>

      <div
        className={
          isMobile
            ? 'flex flex-col gap-6'
            : 'grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]'
        }
      >
        {/* Large card - Expense Monitoring */}
        <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-8 text-white flex flex-col justify-between hover:shadow-2xl transition-shadow animate-in fade-in zoom-in-95 duration-700 delay-100">
          <div>
            <TrendingUp className="w-12 h-12 mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-2">Monitor Your Business Expenses</h3>
            <p className="text-indigo-100 text-lg">
              Track all your expenses in real-time with detailed categorization and analytics
            </p>
          </div>
          <div className="mt-8">
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Monthly Spending</span>
                <span className="text-sm font-bold transition-all duration-500">{percentage}%</span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Medium card - Dashboard */}
        <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow animate-in fade-in zoom-in-95 duration-700 delay-200">
          <div>
            <BarChart3 className="w-10 h-10 text-indigo-700 mb-4" />
            <h3 className="text-2xl font-bold text-indigo-900 mb-2">Dashboard</h3>
            <p className="text-indigo-700">Visual overview of your financial health</p>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="w-8 h-8 bg-indigo-300 rounded-lg"></div>
            <div className="w-8 h-8 bg-indigo-400 rounded-lg"></div>
            <div className="w-8 h-8 bg-indigo-500 rounded-lg"></div>
          </div>
        </div>

        {/* Medium card - Employee Chat */}
        <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-3xl p-6 text-white flex flex-col justify-between hover:shadow-lg transition-shadow animate-in fade-in zoom-in-95 duration-700 delay-300">
          <div>
            <MessageSquare className="w-10 h-10 mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Team Chat</h3>
            <p className="text-indigo-100">Communicate and collaborate with your team</p>
          </div>
          <div className="mt-4 space-y-3">
            <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-white/40 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-2 bg-white/40 rounded-full w-3/4 mb-1"></div>
                  <div className="h-2 bg-white/30 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer transition-transform duration-200 hover:translate-x-1">
              <div className="w-6 h-6 bg-white/30 rounded-full"></div>
              <div className="flex-1 h-2 bg-white/30 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer transition-transform duration-200 hover:translate-x-1">
              <div className="w-6 h-6 bg-white/30 rounded-full"></div>
              <div className="flex-1 h-2 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const isMobile = useIsMobile()

  return (
    <section id="pricing" className="min-h-screen max-w-6xl mx-auto px-4 py-20">
      <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Simple Pricing
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the plan that works best for your business
        </p>
      </div>

      <div
        className={
          isMobile
            ? 'flex flex-col gap-8 max-w-4xl mx-auto'
            : 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'
        }
      >
        {/* Free Plan */}
        <div className="bg-white rounded-3xl p-8 border-2 border-indigo-100 hover:border-indigo-300 transition-colors animate-in fade-in zoom-in-95 duration-700 delay-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
          <p className="text-gray-600 mb-6">Perfect for getting started</p>
          <div className="mb-6">
            <span className="text-5xl font-extrabold text-gray-900">€0</span>
            <span className="text-gray-600">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span className="text-gray-700">Basic expense tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span className="text-gray-700">Simple dashboard</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span className="text-gray-700">Up to 50 transactions/month</span>
            </li>
          </ul>
          <Button
            variant="outline"
            className="w-full h-12 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          >
            Get Started
          </Button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-8 text-white hover:shadow-2xl transition-shadow animate-in fade-in zoom-in-95 duration-700 delay-200 relative">
          <div className="absolute -top-4 right-8">
            <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Star className="w-4 h-4" />
              Popular
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <p className="text-indigo-100 mb-6">For growing businesses</p>
          <div className="mb-6">
            <span className="text-5xl font-extrabold">€16.99</span>
            <span className="text-indigo-100">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="text-indigo-100">Unlimited transactions</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="text-indigo-100">Advanced analytics</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="text-indigo-100">Team chat included</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="text-indigo-100">Priority support</span>
            </li>
          </ul>
          <Button className="w-full h-12 bg-white text-indigo-600 hover:bg-indigo-50">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 md:p-16 text-center text-white animate-in fade-in zoom-in-95 duration-1000">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
          Join thousands of businesses already using Finacio to manage their finances smarter.
        </p>
        <Button
          size="lg"
          className="h-14 px-8 bg-white text-indigo-600 hover:bg-indigo-50 text-lg font-semibold"
        >
          Get Started Free
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  )
}

const pruebaConsola = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/home')
    console.log('Response from API:', response.data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

function App() {
  useEffect(() => {
    pruebaConsola()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Features />
              <Pricing />
              <CTA />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
