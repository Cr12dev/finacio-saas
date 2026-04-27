import { AlertCircle, CheckCircle, Target } from 'lucide-react'

interface Budget {
  category: string
  spent: number
  total: number
  color: string
}

export default function BudgetProgress() {
  const budgets: Budget[] = [
    { category: 'Food & Dining', spent: 450, total: 600, color: 'from-orange-500 to-orange-600' },
    { category: 'Transportation', spent: 280, total: 400, color: 'from-blue-500 to-blue-600' },
    { category: 'Entertainment', spent: 180, total: 300, color: 'from-purple-500 to-purple-600' },
    { category: 'Shopping', spent: 520, total: 500, color: 'from-red-500 to-red-600' },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-indigo-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Budget Progress</h2>
          <p className="text-sm text-gray-500 mt-1">Monthly budget tracking</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-3 rounded-xl">
          <Target className="w-6 h-6 text-indigo-600" />
        </div>
      </div>

      <div className="space-y-5">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.total) * 100
          const isOverBudget = budget.spent > budget.total

          return (
            <div key={budget.category}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{budget.category}</span>
                  {isOverBudget && <AlertCircle className="w-4 h-4 text-red-500" />}
                  {!isOverBudget && percentage >= 90 && (
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}
                >
                  ${budget.spent} / ${budget.total}
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${budget.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <p
                className={`text-xs mt-1 ${isOverBudget ? 'text-red-600' : percentage >= 90 ? 'text-yellow-600' : 'text-gray-500'}`}
              >
                {isOverBudget
                  ? `Over budget by $${(budget.spent - budget.total).toFixed(0)}`
                  : `${percentage.toFixed(0)}% used`}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-indigo-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Budget</p>
            <p className="text-2xl font-bold text-gray-900">$1,800.00</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-2xl font-bold text-indigo-600">$370.00</p>
          </div>
        </div>
      </div>
    </div>
  )
}
