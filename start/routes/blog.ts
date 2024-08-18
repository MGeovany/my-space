import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const BlogController = () => import('#controllers/blog_controller')

router
  .group(() => {
    router.get('/', [BlogController, 'index']).use(middleware.guest())
    router.get('/:id', [BlogController, 'show']).use(middleware.guest())
    router.post('/', [BlogController, 'store']).use(middleware.guest())
    router.put('/:id', [BlogController, 'update']).use(middleware.auth())
    router.delete('/:id', [BlogController, 'destroy']).use(middleware.auth())
  })
  .prefix('api/blog')
