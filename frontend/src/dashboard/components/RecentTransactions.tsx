import { ArrowDownRight, ArrowUpRight, MoreVertical } from 'lucide-react'

interface Transaction {
  /** Unique transaction identifier */
  id: string
  /** Transaction name/description */
  name: string
  /** Transaction category */
  category: string
  /** Transaction amount */
  amount: number
  /** Transaction date (relative time) */
  date: string
  /** Transaction type */
  type: 'income' | 'expense'
}

/**
 * Recent transactions component displaying a list of financial transactions.
 * Shows transaction details with icons indicating income/expense,
 * amounts, and action buttons for each transaction.
 * 
 * @returns JSX element containing the recent transactions list
 */
export default function RecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: '1',
      name: 'Salary Deposit',
      category: 'Income',
      amount: 5400,
      date: 'Today',
      type: 'income',
    },
    {
      id: '2',
      name: 'Netflix Subscription',
      category: 'Entertainment',
      amount: 15.99,
      date: 'Today',
      type: 'expense',
    },
    {
      id: '3',
      name: 'Grocery Store',
      category: 'Food',
      amount: 156.5,
      date: 'Yesterday',
      type: 'expense',
    },
    {
      id: '4',
      name: 'Freelance Payment',
      category: 'Income',
      amount: 1200,
      date: 'Yesterday',
      type: 'income',
    },
    {
      id: '5',
      name: 'Electric Bill',
      category: 'Utilities',
      amount: 89.0,
      date: '2 days ago',
      type: 'expense',
    },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-indigo-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
        <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-indigo-50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{transaction.name}</h3>
                <p className="text-sm text-gray-500">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
