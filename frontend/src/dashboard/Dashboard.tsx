import { Menu } from 'lucide-react'
import Slidebar from '../components/Slidebar'
import BudgetProgress from './components/BudgetProgress'
import RecentTransactions from './components/RecentTransactions'
import SpendingChart from './components/SpendingChart'
import StatsCards from './components/StatsCards'
import { useSidebar } from '../../hooks/useSidebar'
import { useIsMobile } from '../../hooks/useMobileDevice'

export default function Dashboard() {
  const { isOpen, toggle, close } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Slidebar isOpen={isOpen} onClose={close} />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  type="button"
                  onClick={toggle}
                  className="p-2 rounded-lg hover:bg-indigo-100 transition-colors"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's your financial overview.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="font-semibold text-gray-900">Today, 4:30 PM</p>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Charts and Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingChart />
            <BudgetProgress />
          </div>

          {/* Recent Transactions */}
          <RecentTransactions />
        </div>
      </main>
    </div>
  )
}
