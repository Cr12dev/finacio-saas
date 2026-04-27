import Slidebar from '../components/Slidebar'

export default function Panel() {
  const bussinesList = [
    {
      name: 'Business 1',
      description: 'Description 1',
    },
    {
      name: 'Business 2',
      description: 'Description 2',
    },
  ]
  return (
    <div>
      <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <Slidebar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Panel</h1>
                <p className="text-gray-600 mt-1">Start managing your finances now!</p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                >
                  +
                </button>
                <div className="text-right border-l border-indigo-200 pl-4">
                  <p className="text-sm text-gray-500">Last updated</p>
                  <p className="font-semibold text-gray-900">Today, 4:30 PM</p>
                </div>
              </div>
            </div>

            {/* Content placeholder */}
            <div className="space-y-4">
              {bussinesList.length > 0 ? (
                bussinesList.map((business, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 border-2 border-indigo-100">
                    <h2 className="text-xl font-bold text-gray-900">{business.name}</h2>
                    <p className="text-gray-600 mt-2">{business.description}</p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 border-2 border-indigo-100 text-center">
                  <p className="text-gray-500">No businesses found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
