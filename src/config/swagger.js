import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'API-Blog',
    description: 'Esta es una Api para manejar un blog'
  },
  host: 'localhost:3000'
}

const outputFile = './swagger-output.json'
const routes = ['./src/index.js']

swaggerAutogen()(outputFile, routes, doc)
