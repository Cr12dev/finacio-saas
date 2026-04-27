import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: React.ElementType
}

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

export default function StatsCards() {
  const stats = [
    {
      title: 'Total Balance',
      value: '$24,563.00',
      change: '+12.5%',
      isPositive: true,
      icon: Wallet,
    },
    {
      title: 'Monthly Income',
      value: '$8,450.00',
      change: '+8.2%',
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: 'Monthly Expenses',
      value: '$3,280.00',
      change: '-5.3%',
      isPositive: true,
      icon: TrendingDown,
    },
    {
      title: 'Savings',
      value: '$5,170.00',
      change: '+15.7%',
      isPositive: true,
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
