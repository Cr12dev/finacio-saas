import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react'

interface StatCardProps {
  /** Title of the stat card */
  title: string
  /** Value to display */
  value: string
  /** Percentage change from previous period */
  change: string
  /** Whether the change is positive */
  isPositive: boolean
  /** Icon component to display */
  icon: React.ElementType
}

interface StatsCardsProps {
  /** Array of transactions to calculate stats from */
  transactions: any[]
}

/**
 * Individual stat card component displaying a financial metric.
 * Shows title, value, change percentage with trend indicator, and icon.
 * 
 * @param props - Component props
 * @returns JSX element containing the stat card
 */
function StatCard({ title, value, change, isPositive, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-indigo-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-3 rounded-xl">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}
        >
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  )
}

/**
 * Stats cards component displaying key financial metrics.
 * Shows total balance, monthly income, monthly expenses, and savings
 * with trend indicators for each metric.
 * 
 * @param props - Component props
 * @returns JSX element containing a grid of stat cards
 */
export default function StatsCards({ transactions }: StatsCardsProps) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  // Calculate stats from transactions
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const monthlyIncome = transactions
    .filter(t => {
      const date = new Date(t.date)
      return t.type === 'income' && date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .reduce((sum, t) => sum + t.amount, 0)

  const monthlyExpenses = transactions
    .filter(t => {
      const date = new Date(t.date)
      return t.type === 'expense' && date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses
  const savings = monthlyIncome - monthlyExpenses

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  const stats = [
    {
      title: 'Total Balance',
      value: formatCurrency(balance),
      change: '+0%',
      isPositive: balance >= 0,
      icon: Wallet,
    },
    {
      title: 'Monthly Income',
      value: formatCurrency(monthlyIncome),
      change: '+0%',
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: 'Monthly Expenses',
      value: formatCurrency(monthlyExpenses),
      change: '+0%',
      isPositive: true,
      icon: TrendingDown,
    },
    {
      title: 'Savings',
      value: formatCurrency(savings),
      change: '+0%',
      isPositive: savings >= 0,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
