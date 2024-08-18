import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', 'LikedImageController.index').use(middleware.guest())
    router.get('/:id', 'LikedImageController.show').use(middleware.guest())
    router.post('/', 'LikedImageController.store').use(middleware.auth())
    router.put('/:id', 'LikedImageController.update').use(middleware.auth())
    router.delete('/:id', 'LikedImageController.destroy').use(middleware.auth())
  })
  .prefix('api/liked_images')
