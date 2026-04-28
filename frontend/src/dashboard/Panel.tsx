import { Menu, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import Slidebar from '../components/Slidebar'
import { useSidebar } from '../../hooks/useSidebar'
import { useIsTablet } from '../../hooks/useMobileDevice'
import api from '../lib/api'
import useToast from '../../hooks/useToast'

/**
 * Panel page component.
 * Business management page displaying a list of businesses.
 * Includes responsive sidebar with toggle functionality for mobile
 * and an add button for creating new businesses.
 * 
 * @returns JSX element containing the panel layout
 */


export default function Panel() {
  const { isOpen, toggle, close } = useSidebar()
  const isTablet = useIsTablet()
  const toast = useToast()
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [newBusinessName, setNewBusinessName] = useState('')

  //ModalHandleDelete
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null)
  const [selectedBusinessName, setSelectedBusinessName] = useState<string>('')
  const [deleteConfirmation, setDeleteConfirmation] = useState<string>('')



  useEffect(() => {
    fetchBusinesses()
  }, [])

  const fetchBusinesses = async () => {
    try {
      const response = await api.get('/business')
      setBusinesses(response.data)
    } catch (error) {
      console.error('Error fetching businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBusiness = async () => {
    if (!newBusinessName.trim()) return

    try {
      await api.post('/business', { name: newBusinessName })
      setNewBusinessName('')
      setShowModal(false)
      fetchBusinesses()
      toast.success('Business created successfully')
    } catch (error) {
      console.error('Error creating business:', error)
      toast.error('Failed to create business')
    }
  }

  const handleDeleteBusiness = async (id: string) => {
    try {
      await api.delete(`/business/${id}`)
      setShowDeleteModal(false)
      setDeleteConfirmation('')
      setSelectedBusinessId(null)
      setSelectedBusinessName('')
      fetchBusinesses()
      toast.success('Business deleted successfully')
    } catch (error) {
      console.error('Error deleting business:', error)
      toast.error('Failed to delete business')
    }
  }
  return (
    <div>
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
                  <h1 className="text-3xl font-bold text-gray-900">Panel</h1>
                  <p className="text-gray-600 mt-1">Start managing your finances now!</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Business
                </button>
                <div className="text-right border-l border-indigo-200 pl-4">
                  <p className="text-sm text-gray-500">Last updated</p>
                  <p className="font-semibold text-gray-900">Today, 4:30 PM</p>
                </div>
              </div>
            </div>

            {/* Content placeholder */}
            <div className="space-y-4">
              {loading ? (
                <div className="bg-white rounded-2xl p-12 border-2 border-indigo-100 text-center">
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : businesses.length > 0 ? (
                businesses.map((business) => (
                  <div key={business.id} className="bg-white rounded-2xl p-6 border-2 border-indigo-100 flex items-center justify-between">
                    <div>
                      <a href={`/${business.id}/dashboard`} className="text-xl font-bold text-gray-900">{business.name}</a>
                      <p className="text-gray-600 mt-2">Created: {new Date(business.created_at).toLocaleDateString()}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBusinessId(business.id)
                        setSelectedBusinessName(business.name)
                        setDeleteConfirmation('')
                        setShowDeleteModal(true)
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors mt-4"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 border-2 border-indigo-100 text-center">
                  <p className="text-gray-500">No businesses found</p>
                </div>
              )}
            </div>

            {/* Modal for creating business */}
            {showModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Business</h2>
                  <input
                    type="text"
                    value={newBusinessName}
                    onChange={(e) => setNewBusinessName(e.target.value)}
                    placeholder="Business name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors mb-4"
                  />
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-2.5 rounded-xl font-medium transition-colors border-2 border-indigo-200 text-gray-700 hover:bg-indigo-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleCreateBusiness}
                      className="flex-1 px-6 py-2.5 rounded-xl font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal for deleting business */}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Business</h2>
                  <p className="text-gray-600 mb-2">This action cannot be undone.</p>
                  <p className="text-gray-700 mb-4">Type <span className="font-bold text-red-600">{selectedBusinessName}</span> to confirm:</p>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="Business name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors mb-4"
                  />
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteModal(false)
                        setDeleteConfirmation('')
                        setSelectedBusinessId(null)
                        setSelectedBusinessName('')
                      }}
                      className="flex-1 px-6 py-2.5 rounded-xl font-medium transition-colors border-2 border-indigo-200 text-gray-700 hover:bg-indigo-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (deleteConfirmation !== selectedBusinessName || !selectedBusinessId) {
                          return
                        }
                        handleDeleteBusiness(selectedBusinessId)
                      }}
                      disabled={deleteConfirmation !== selectedBusinessName}
                      className={`flex-1 px-6 py-2.5 rounded-xl font-medium transition-colors ${
                        deleteConfirmation === selectedBusinessName
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
