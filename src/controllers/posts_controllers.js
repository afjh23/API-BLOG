import { pool } from '../config/db.js'

export const create = async (req, res) => {
  console.log(req.body)
  try {
    const { title, content, image, userId, categories } = req.body
    if (!title || !content || !image || !userId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }
    const [result] = await pool.execute('INSERT INTO posts (title, content, image, created_date, user_id) VALUES (?,?,?,CURDATE(),?)', [title, content, image, userId])

    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'Hubo un error al crear la categoria' })
    } else {
      const postId = result.insertId
      const postCategories = categories.map((categoryId) => `(${postId}, ${categoryId})`).join(',')
      await pool.query(`INSERT INTO posts_categories (post_id, category_id) VALUES ${postCategories}`)
      res.status(201).json({ message: 'Categoria guardada' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const readAll = async (req, res) => {
  const [result] = await pool.query('SELECT * FROM posts')
  return res.json(result)
}

export const readPostsbyCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    const [result] = await pool.query('SELECT c.name ,p.title, p.content, p.image, p.created_date FROM categories c LEFT JOIN posts_categories pc ON c.category_id=pc.category_id INNER JOIN posts p ON pc.post_id=p.post_id WHERE c.category_id=?', [categoryId])
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const searchByTitle = async (req, res) => {
  const { title } = req.params
  console.log(`SELECT * FROM posts WHERE title LIKE '%${title}%'`)
  const [result] = await pool.query('SELECT * FROM posts WHERE title LIKE ?', [`%${title}%`])
  return res.json(result)
}

export const update = async (req, res) => {
  // cambiar por patch, ya que los datos no van a estar completos, para un mejor uso
  try {
    /* const { id } = req.params
    const { title, content, image, createdDate, userId } = req.body
    if (!title || !content || !image || !createdDate || !userId) return res.status(400).json({ message: 'Falta ingresar datos' })
    const [result] = await pool.execute('UPDATE posts SET name=? WHERE category_id=?', [title, content, image, createdDate, userId, id])
    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'No se pudo actualizar la categoria' })
    } else {
      return res.status(201).json({ message: 'Categoria actualizada' })
    } */
    const { id } = req.params
    const { title, content, image, createdDate, userId, categories } = req.body
    let query = 'UPDATE posts SET '
    const params = []
    if (title) {
      query += 'title=?,'
      params.push(title)
    }
    if (content) {
      query += 'content=?,'
      params.push(content)
    }
    if (image) {
      query += 'image=?,'
      params.push(image)
    }
    if (createdDate) {
      query += 'created_date=?,'
      params.push(createdDate)
    }
    if (userId) {
      query += 'user_id=?,'
      params.push(userId)
    }
    query = query.slice(0, -1)
    query += ' WHERE post_id=?'
    params.push(id)
    const [resultado] = await pool.execute(query, params)
    if (resultado.affectedRows !== 1) {
      return res.status(500).json({ message: 'No se pudo actualizar el usario' })
    } else {
      if (categories !== undefined) {
        await updatePostCategories(id, categories)
      }
      return res.status(200).json({ message: 'User actualizado' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const deleteById = async (req, res) => {
  const { id } = req.params
  const [result] = await pool.execute('DELETE FROM posts WHERE post_id=?', [id])
  if (result.affectedRows === 1) {
    return res.json({ message: 'Categoría eliminado' })
  } else {
    return res.json({ message: 'No se puede eliminar' })
  }
}

export const updatePostCategories = async (postId, categories) => {
  try {
    await pool.execute('DELETE FROM posts_categories WHERE post_id =?', [postId])

    const categoryValues = categories.map((categoryId) => `(${postId}, ${categoryId})`).join(',')
    await pool.execute(`INSERT INTO posts_categories (post_id, category_id) VALUES ${categoryValues}`)
  } catch (error) {
    console.error(error)
  }
}
