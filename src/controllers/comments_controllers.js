import { pool } from '../config/db.js'

export const create = async (req, res) => {
  console.log(req.body)
  try {
    const { content, createdDate, userId, postId } = req.body
    const [result] = await pool.execute('INSERT INTO comments ( content, created_date, user_id, post_id) VALUES (?,?,?,?)', [content, createdDate, userId, postId])

    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'Hubo un error al crear el comentario' })
    } else {
      res.status(201).json({ message: 'Comentario guardado' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const readAll = async (req, res) => {
  const [result] = await pool.query('SELECT * FROM comments')
  return res.json(result)
}

export const update = async (req, res) => {
  // cambiar por patch, ya que los datos no van a estar completos, para un mejor uso
  try {
    const { id } = req.params
    const { title, content, image, createdDate, userId } = req.body
    if (!title || !content || !image || !createdDate || !userId) return res.status(400).json({ message: 'Falta ingresar datos' })
    const [result] = await pool.execute('UPDATE posts SET name=? WHERE category_id=?', [title, content, image, createdDate, userId, id])
    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'No se pudo actualizar la comentario' })
    } else {
      return res.status(201).json({ message: 'Comentario actualizado' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const deleteById = async (req, res) => {
  const { id } = req.params
  const [result] = await pool.execute('DELETE FROM comments WHERE comment_id=?', [id])
  if (result.affectedRows === 1) {
    return res.json({ message: 'Comentario eliminado' })
  } else {
    return res.json({ message: 'No se puede eliminar' })
  }
}
