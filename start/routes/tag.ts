import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', 'TagController.index').use(middleware.guest())
    router.get('/:id', 'TagController.show').use(middleware.guest())
    router.post('/', 'TagController.store').use(middleware.auth())
    router.put('/:id', 'TagController.update').use(middleware.auth())
    router.delete('/:id', 'TagController.destroy').use(middleware.auth())
  })
  .prefix('api/tag')
