import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', 'BookmarkController.index').use(middleware.guest())
    router.get('/:id', 'BookmarkController.show').use(middleware.guest())
    router.post('/', 'BookmarkController.store').use(middleware.auth())
    router.put('/:id', 'BookmarkController.update').use(middleware.auth())
    router.delete('/:id', 'BookmarkController.destroy').use(middleware.auth())
  })
  .prefix('api/bookmark')
