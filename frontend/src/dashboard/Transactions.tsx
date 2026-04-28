"use client"

import { ArrowDownRight, ArrowUpRight, Menu, Plus, Trash2 } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import Slidebar from '../components/Slidebar'
import { useSidebar } from '../../hooks/useSidebar'
import { useIsTablet } from '../../hooks/useMobileDevice'
import { useState, useEffect } from 'react'
import api from '../lib/api'
import useToast from '../../hooks/useToast'

/**
 * Transactions page component.
 * Displays and manages all financial transactions.
 * Includes responsive sidebar with toggle functionality for mobile.
 * 
 * @returns JSX element containing the transactions layout
 */


async function fetchTransactions(businessId: string): Promise<Array<{ id: number; description: string; amount: number; type: 'expense' | 'income'; date: string }>> {
  const response = await api.get(`/transactions?business_id=${businessId}`)
  return response.data
}

async function deleteTransaction(id: number): Promise<void> {
  await api.delete(`/transactions/${id}`)
}

async function addTransaction(transaction: { description: string; amount: number; type: 'expense' | 'income'; date: string; business_id: string }): Promise<{ id: number; description: string; amount: number; type: 'expense' | 'income'; date: string }> {
  const response = await api.post('/transactions', transaction)
  return response.data
}


export default function Transactions() {
  const { businessId } = useParams()
  const navigate = useNavigate()
  const { isOpen, toggle, close } = useSidebar()
  const isTablet = useIsTablet()
  const toast = useToast()

  useEffect(() => {
    if (!businessId) {
      navigate('/panel')
    }
  }, [businessId, navigate])
  const [isEditing, setIsEditing] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [transactions, setTransactions] = useState<Array<{ id: number; description: string; amount: number; type: 'expense' | 'income'; date: string }>>([])
  const [error, setError] = useState<string | null>(null)

  const localdate = new Date().toISOString().split('T')[0]
  const [newTransaction, setNewTransaction] = useState<{ description: string; amount: number; type: 'expense' | 'income'; date: string }>({ description: '', amount: 0, type: 'expense', date: localdate })

  useEffect(() => {
    if (businessId) {
      fetchTransactions(businessId)
        .then(setTransactions)
        .catch((err) => setError(err.message))
    }
  }, [businessId])

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id)
      setTransactions(transactions.filter(t => t.id !== id))
      toast.success('Transaction deleted successfully')
    } catch {
      setError('Failed to delete transaction')
      toast.error('Failed to delete transaction')
    }
  }

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessId) return
    try {
      const added = await addTransaction({ ...newTransaction, business_id: businessId })
      setTransactions([...transactions, added])
      setShowAddModal(false)
      setNewTransaction({ description: '', amount: 0, type: 'expense', date: localdate })
      toast.success('Transaction added successfully')
    } catch {
      toast.error('Failed to add transaction')
    }
  }

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
              <div className='flex flex-col'>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 mt-2 ml-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      <button 
                      onClick={() => setShowAddModal(true)}
                      className="px-4 py-2 mt-2 ml-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mt-1">View and manage all your transactions.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="font-semibold text-gray-900">Today, 4:30 PM</p>
            </div>
          </div>

          {/* Add Transaction Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Transaction</h2>
                <form onSubmit={handleAddTransaction} className="space-y-4">
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      id="description"
                      type="text"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors"
                      placeholder="Enter description"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                      Amount
                    </label>
                    <input
                      id="amount"
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      id="type"
                      value={newTransaction.type}
                      onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as 'expense' | 'income' })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false)
                        setNewTransaction({ description: '', amount: 0, type: 'expense', date: localdate })
                      }}
                      className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      Add Transaction
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Content placeholder */}
          <div className="bg-white rounded-2xl p-12 border-2 border-indigo-100 text-left">
            {error ? (
              <p className="text-red-600">Error loading transactions: {error}</p>
            ) : transactions.length > 0 ? (
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
                    <div className="flex items-center gap-2">
                      <p className={`text-gray-600 mt-2 text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                      </p>
                      {isEditing && (
                        <button 
                          onClick={() => handleDelete(transaction.id)}
                          className="ml-2 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          aria-label="Delete transaction"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
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
