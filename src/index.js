import express from 'express'
import { PORT } from './config/config.js'
import morgan from 'morgan'
import userRoutes from './routes/users_routes.js'
import categoryRoutes from './routes/categories_routes.js'
import postRoutes from './routes/posts_routes.js'
import commentRoutes from './routes/comments_routes.js'
import swaggerUi from 'swagger-ui-express'
import jsonDocs from './config/swagger-output.json' assert {type: 'json'}


const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(jsonDocs))

app.listen(PORT, () => console.log(`Server running on http://localhost: ${PORT}`))
