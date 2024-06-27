import { Router } from 'express'
import { create, readAll, deleteById, update, readPostsbyCategory, searchByTitle } from '../controllers/posts_controllers.js'

const router = Router()

router.get('/', readAll)
router.get('/categories/:categoryId', readPostsbyCategory)
router.get('/:title', searchByTitle)
router.post('/', create)
router.delete('/:id', deleteById)
router.patch('/:id', update)

export default router
