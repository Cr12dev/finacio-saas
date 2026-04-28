

import { app } from "../config";
import { supabase } from "../../lib/supabase";

export default function Transactions() {
    // Registro de Transacciones
    app.post('/api/transactions', async (req, res) => {
      try {
        const { type, amount, description, date } = req.body
        
        if (!type || !amount || !description) {
          return res.status(400).json({ error: 'Todos los campos son requeridos' })
        }
        
        // Insertar transacción
        const { data: transaction, error } = await supabase
          .from('transactions')
          .insert({ type, amount, description, date })
          .select()
          .single()
        
        if (error) {
          console.error('Error al crear transacción:', error)
          return res.status(500).json({ error: 'Error al crear transacción' })
        }
        
        res.status(201).json(transaction)
      } catch (error) {
        console.error('Error en registro de transacción:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
      }
    })
    
    // Obtener transacciones
    app.get('/api/transactions', async (req, res) => {
      try {
        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('*')
        
        if (error) {
          console.error('Error al obtener transacciones:', error)
          return res.status(500).json({ error: 'Error al obtener transacciones' })
        }
        
        res.status(200).json(transactions)
      } catch (error) {
        console.error('Error en obtención de transacciones:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
      }
    })

    // Eliminar transacción
    app.delete('/api/transactions/:id', async (req, res) => {
      try {
        const { id } = req.params
        
        const { error } = await supabase
          .from('transactions')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('Error al eliminar transacción:', error)
          return res.status(500).json({ error: 'Error al eliminar transacción' })
        }
        
        res.status(200).json({ message: 'Transacción eliminada correctamente' })
      } catch (error) {
        console.error('Error en eliminación de transacción:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
      }
    })
}
