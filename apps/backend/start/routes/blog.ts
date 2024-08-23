import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const BlogController = () => import('#controllers/blog_controller')

router
  .group(() => {
    router.get('/', [BlogController, 'index'])
    router.get('/:id', [BlogController, 'show'])
  })
  .prefix('api/blog')

router
  .group(() => {
    router.post('/', [BlogController, 'store'])
    router.put('/:id', [BlogController, 'update'])
    router.delete('/:id', [BlogController, 'destroy'])
  })
  .prefix('api/blog')
  .use(middleware.auth())
