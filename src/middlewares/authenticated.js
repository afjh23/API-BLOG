import { pool } from '../config/db.js'

export const userType = async (req, res, next) => {
  try {
    /* obtener desde headers
    const userId = req.headers.userid
 */
    console.log(req.params)
    const { userId } = req.params
    const [rows] = await pool.query('SELECT role FROM users WHERE user_id=?', [userId])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const user = rows[0]

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado' })
    } else {
      console.log('Validacion de usuario correcta')
    }
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' })
  }
}
