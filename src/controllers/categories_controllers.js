import { pool } from '../config/db.js'

export const create = async (req, res) => {
  try {
    console.log(req.body)
    const { name } = req.body

    const [result] = await pool.execute('INSERT INTO categories (name) VALUES (?)', [name])

    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'Hubo un error al crear la categoria' })
    } else {
      res.status(201).json({ message: 'Categoria guardada' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const readAll = async (req, res) => {
  const [result] = await pool.query('SELECT * FROM categories')
  return res.json(result)
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Falta el nombre' })
    const [result] = await pool.execute('UPDATE categories SET name=? WHERE category_id=?', [name, id])
    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'No se pudo actualizar la categoria' })
    } else {
      return res.status(201).json({ message: 'Categoria actualizada' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const deleteById = async (req, res) => {
  const { id } = req.params
  const [result] = await pool.execute('DELETE FROM categories WHERE category_id=?', [id])
  if (result.affectedRows === 1) {
    return res.json({ message: 'Categoria eliminado' })
  } else {
    return res.json({ message: 'No se puede eliminar' })
  }
}
