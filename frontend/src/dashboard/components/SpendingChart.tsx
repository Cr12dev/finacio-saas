import { BarChart3 } from 'lucide-react'

export default function SpendingChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const spending = [2800, 3200, 2900, 3500, 3100, 3280]
  const maxSpending = Math.max(...spending)

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-indigo-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Spending Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Last 6 months</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-3 rounded-xl">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
        </div>
      </div>

      <div className="flex items-end justify-between h-48 gap-4">
        {months.map((month, index) => {
          const height = (spending[index] / maxSpending) * 100
          return (
            <div key={month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-indigo-50 rounded-t-lg relative overflow-hidden"
                style={{ height: '100%' }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg transition-all duration-500 hover:from-indigo-700 hover:to-purple-700"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">{month}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-indigo-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Spending</p>
            <p className="text-2xl font-bold text-gray-900">$18,780.00</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Average</p>
            <p className="text-2xl font-bold text-indigo-600">$3,130.00</p>
          </div>
        </div>
      </div>
    </div>
  )
}
