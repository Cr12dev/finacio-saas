import { ArrowDownRight, ArrowUpRight, Menu } from 'lucide-react'
import Slidebar from '../components/Slidebar'
import { useSidebar } from '../../hooks/useSidebar'
import { useIsTablet } from '../../hooks/useMobileDevice'

/**
 * Transactions page component.
 * Displays and manages all financial transactions.
 * Includes responsive sidebar with toggle functionality for mobile.
 * 
 * @returns JSX element containing the transactions layout
 */
export default function Transactions() {
  const { isOpen, toggle, close } = useSidebar()
  const isTablet = useIsTablet()

  const transactions = [
    {
      id: 1,
      description: 'Grocery shopping',
      amount: 100,
      type: 'expense',
      date: '2025-10-13',
    },
    {
      id: 2,
      description: 'Electricity bill',
      amount: 200,
      type: 'income',
      date: '2025-10-13',
    },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Slidebar isOpen={isOpen} onClose={close} />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isTablet && (
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
                <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                <p className="text-gray-600 mt-1">View and manage all your transactions.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="font-semibold text-gray-900">Today, 4:30 PM</p>
            </div>
          </div>

          {/* Content placeholder */}
          <div className="bg-white rounded-2xl p-12 border-2 border-indigo-100 text-left">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border-indigo-100 flex items-center">
                  <div
                    className={`p-3 rounded-xl ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-600 -scale-x-100" />
                    )}
                  </div>
                  <div className="ml-4 flex justify-between w-full">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{transaction.description}</h2>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-600">{transaction.date}</p>
                        <p className="text-gray-600">•</p>
                        <p className="text-gray-600">{transaction.type}</p>
                      </div>
                    </div>
                    <p className={`text-gray-600 mt-2 text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </p>
                  </div>
                  
                </div>
              ))
            ) : (
              <p className="text-gray-500">No transactions found</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
