import { Router } from 'express'
import { create, update, readAll, deleteById } from '../controllers/categories_controllers.js'
import { userType } from '../middlewares/authenticated.js'

const router = Router()

router.get('/:userId/', userType, readAll)

router.post('/:userId/', userType, create)

router.delete('/:userId/:id', userType, deleteById)

router.put('/:userId/:id', userType, update)

export default router
