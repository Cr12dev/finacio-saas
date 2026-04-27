import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env') })

import { app, port } from './config'
import { supabase } from '../lib/supabase'
import { hashPassword, comparePassword, generateToken } from './auth'

// Registro de usuario
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' })
    }

    // Verificar si el usuario ya existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' })
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password)

    // Insertar usuario
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({ name, email, password: hashedPassword })
      .select()
      .single()

    if (error) {
      console.error('Error al crear usuario:', error)
      return res.status(500).json({ error: 'Error al crear usuario' })
    }

    // Generar token
    const token = generateToken(newUser.id, newUser.email)

    res.status(201).json({ 
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token 
    })
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// Login de usuario
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' })
    }

    // Buscar usuario
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // Verificar contraseña
    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // Generar token
    const token = generateToken(user.id, user.email)

    res.json({ 
      user: { id: user.id, name: user.name, email: user.email },
      token 
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
