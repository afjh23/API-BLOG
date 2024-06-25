import { Router } from 'express'
import { create, update, readAll, deleteById } from '../controllers/categories_controllers.js'
const router = Router()

router.get('/', readAll)
router.post('/', create)
router.delete('/:id', deleteById)
router.put('/:id', update)

export default router
