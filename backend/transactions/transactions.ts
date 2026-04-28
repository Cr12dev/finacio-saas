

import { app } from "../config";
import { supabase } from "../../lib/supabase";
import { verifyToken } from "../auth";

export default function Transactions() {
    // Registro de Transacciones
    app.post('/api/transactions', async (req, res) => {
      try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        
        if (!token) {
          return res.status(401).json({ error: 'Token no proporcionado' })
        }

        const decoded = verifyToken(token)
        if (!decoded) {
          return res.status(401).json({ error: 'Token inválido' })
        }

        const { type, amount, description, date, business_id } = req.body
        
        if (!type || !amount || !description || !business_id) {
          return res.status(400).json({ error: 'Todos los campos son requeridos' })
        }

        // Verificar que el negocio pertenece al usuario
        const { data: business } = await supabase
          .from('business')
          .select('id')
          .eq('id', business_id)
          .eq('user_id', decoded.userId)
          .single()

        if (!business) {
          return res.status(403).json({ error: 'No tienes acceso a este negocio' })
        }
        
        // Insertar transacción
        const { data: transaction, error } = await supabase
          .from('transactions')
          .insert({ type, amount, description, date, business_id })
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
        const token = req.headers.authorization?.replace('Bearer ', '')
        
        if (!token) {
          return res.status(401).json({ error: 'Token no proporcionado' })
        }

        const decoded = verifyToken(token)
        if (!decoded) {
          return res.status(401).json({ error: 'Token inválido' })
        }

        const { business_id } = req.query
        
        if (!business_id) {
          return res.status(400).json({ error: 'business_id es requerido' })
        }

        // Verificar que el negocio pertenece al usuario
        const { data: business } = await supabase
          .from('business')
          .select('id')
          .eq('id', business_id)
          .eq('user_id', decoded.userId)
          .single()

        if (!business) {
          return res.status(403).json({ error: 'No tienes acceso a este negocio' })
        }

        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('business_id', business_id)
        
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
        const token = req.headers.authorization?.replace('Bearer ', '')
        
        if (!token) {
          return res.status(401).json({ error: 'Token no proporcionado' })
        }

        const decoded = verifyToken(token)
        if (!decoded) {
          return res.status(401).json({ error: 'Token inválido' })
        }

        const { id } = req.params
        
        // Obtener la transacción para verificar el negocio
        const { data: transaction } = await supabase
          .from('transactions')
          .select('business_id')
          .eq('id', id)
          .single()

        if (!transaction) {
          return res.status(404).json({ error: 'Transacción no encontrada' })
        }

        // Verificar que el negocio pertenece al usuario
        const { data: business } = await supabase
          .from('business')
          .select('id')
          .eq('id', transaction.business_id)
          .eq('user_id', decoded.userId)
          .single()

        if (!business) {
          return res.status(403).json({ error: 'No tienes acceso a esta transacción' })
        }
        
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
