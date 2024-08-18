/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import './routes/blog.ts'
import './routes/bookmark.ts'
import './routes/liked_images.ts'
import './routes/project_ideas.ts'
import './routes/tag.ts'

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
