import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const updateTransaction = async (id: string, data: { description: string; amount: number; date: string; category?: string; type: 'income' | 'expense' }) => {
  const response = await api.put(`/transactions/${id}`, data)
  return response.data
}

export default api
