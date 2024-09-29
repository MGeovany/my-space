import { Ignitor } from '@adonisjs/ignitor'

const app = new Ignitor(require('path').join(__dirname, '../'))

app
  .httpServer()
  .then((server) => {
    server.listen(process.env.PORT || 3333, () => {
      console.log(`Server running on port ${process.env.PORT || 3333}`)
    })
  })
  .catch((error) => {
    console.error('Error starting server:', error)
    process.exit(1)
  })
