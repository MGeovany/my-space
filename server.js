import { Ignitor } from '@adonisjs/core/build/standalone'

console.log('Starting AdonisJS server...')
new Ignitor(__dirname)
  .httpServer()
  .start()
  .catch((error) => {
    console.error('Error starting server:', error)
    process.exit(1)
  })
