
import { app } from "../config";
import { supabase } from "../../lib/supabase";
import { verifyToken } from "../auth";

export default function Business() {
    // Registro de negocios
    app.post('/api/business', async (req, res) => {
        try {
            const { name } = req.body
            const token = req.headers.authorization?.replace('Bearer ', '')
            
            if (!name) {
                return res.status(400).json({ error: 'El nombre es requerido' })
            }

            if (!token) {
                return res.status(401).json({ error: 'Token no proporcionado' })
            }

            const decoded = verifyToken(token)
            if (!decoded) {
                return res.status(401).json({ error: 'Token inválido' })
            }

            const { data: business, error } = await supabase
              .from('business')
              .insert({ name, user_id: decoded.userId })
              .select()
              .single()
            
            if (error) {
              console.error('Error al crear negocio:', error)
              return res.status(500).json({ error: 'Error al crear negocio' })
            }
            
            res.status(201).json(business)
        } catch (error) {
            console.error('Error en registro de negocio:', error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }
    })


    // Obtener negocios del usuario autenticado
    app.get('/api/business', async (req, res) => {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '')
            
            if (!token) {
                return res.status(401).json({ error: 'Token no proporcionado' })
            }

            const decoded = verifyToken(token)
            if (!decoded) {
                return res.status(401).json({ error: 'Token inválido' })
            }

            const { data: business, error } = await supabase
              .from('business')
              .select('*')
              .eq('user_id', decoded.userId)
            
            if (error) {
              console.error('Error al obtener negocios:', error)
              return res.status(500).json({ error: 'Error al obtener negocios' })
            }
            
            res.status(200).json(business)
        } catch (error) {
            console.error('Error en obtención de negocios:', error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }
    })

}
