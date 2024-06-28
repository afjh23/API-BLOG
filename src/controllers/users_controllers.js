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
  try {
    /*  const { id } = req.params
    const [user] = await pool.query('SELECT role  FROM users WHERE user_id=?', [id])

    if (user[0].role !== 'admin') { return res.status(403).json({ message: 'Acceso denegado' }) } */

    const [result] = await pool.query('SELECT * FROM users')
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}

/*  METODO PUT
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
} */

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { fname, lname, phone, email, password, role, createdDate } = req.body
    let query = 'UPDATE users SET '
    const params = []

    if (fname) {
      query += 'fname=?,'
      params.push(fname)
    }
    if (lname) {
      query += 'lname=?,'
      params.push(lname)
    }
    if (phone) {
      query += 'phone=?,'
      params.push(phone)
    }
    if (email) {
      query += 'email=?,'
      params.push(email)
    }
    if (password) {
      query += 'password=?,'
      params.push(password)
    }
    if (role) {
      query += 'role=?,'
      params.push(role)
    }
    if (createdDate) {
      query += 'created_date=?,'
      params.push(createdDate)
    }
    query = query.slice(0, -1)
    query += ' WHERE user_id=?'
    params.push(id)
    const [resultado] = await pool.execute(query, params)
    if (resultado.affectedRows !== 1) {
      return res.status(500).json({ message: 'No se pudo actualizar el usuario' })
    } else {
      return res.status(200).json({ message: 'Usuario actualizado' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno', details: error.message })
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
