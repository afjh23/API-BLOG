import { pool } from '../config/db.js'

export const create = async (req, res) => {
  console.log(req.body)
  try {
    const { fname, lname, phone, email, password, role, createdDate } = req.body
    console.log(`INSERT INTO users (fname, lname, phone, email, password, role, created_date) VALUES (${fname}, ${lname}, ${phone}, ${email}, ${password}, ${role}, ${createdDate})`)

    const [result] = await pool.execute('INSERT INTO users (fname, lname, phone, email, password, role, created_date) VALUES (?,?,?,?,?,?,?)', [fname, lname, phone, email, password, role, createdDate])

    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'Hubo un error al crear el usuario' })
    } else {
      res.status(201).json({ message: 'Usuario guardado' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const readAll = async (req, res) => {
  const [result] = await pool.query('SELECT * FROM users')
  return res.json(result)
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { fname, lname, phone, email, password, role, createdDate } = req.body
    if (!fname || !lname || !phone || !email || !password || !role || !createdDate) return res.status(400).json({ message: 'Faltan datos en el formulario' })
    const [result] = await pool.execute('UPDATE users SET fname=?, lname=?, phone=?, email=?, password=?, role=?, created_date=? WHERE user_id=?', [fname, lname, phone, email, password, role, createdDate, id])

    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'No se pudo actualizar el usuario' })
    } else {
      res.status(201).json({ message: 'Usuario actualizado' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const deleteById = async (req, res) => {
  const { id } = req.params
  const [result] = await pool.execute('DELETE FROM users WHERE user_id=?', [id])
  if (result.affectedRows === 1) {
    return res.json({ message: 'Usuario eliminado' })
  } else {
    return res.json({ message: 'No se puede eliminar' })
  }
}
