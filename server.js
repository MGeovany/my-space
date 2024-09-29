'use strict'

const { Ignitor } = require('@adonisjs/core/build/standalone')

new Ignitor(require('@adonisjs/fold')).appRoot(__dirname).fireHttpServer().catch(console.error)
