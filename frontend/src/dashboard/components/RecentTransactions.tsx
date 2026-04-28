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

interface RecentTransactionsProps {
  /** Array of transactions to display */
  transactions: any[]
}

/**
 * Recent transactions component displaying a list of financial transactions.
 * Shows transaction details with icons indicating income/expense,
 * amounts, and action buttons for each transaction.
 * 
 * @param props - Component props
 * @returns JSX element containing the recent transactions list
 */
export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const formattedTransactions = transactions.slice(0, 5).map((t) => ({
    id: t.id,
    name: t.description,
    category: t.type === 'income' ? 'Income' : 'Expense',
    amount: t.amount,
    date: formatRelativeDate(t.date),
    type: t.type,
  }))

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-indigo-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
        <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {formattedTransactions.length > 0 ? (
          formattedTransactions.map((transaction) => (
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
        ))
        ) : (
          <p className="text-gray-500 text-center py-8">No transactions yet</p>
        )}
      </div>
    </div>
  )
}
