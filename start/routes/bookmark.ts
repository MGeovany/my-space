import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const BookmarksController = () => import('#controllers/bookmarks_controller')

router
  .group(() => {
    router.get('/', [BookmarksController, 'index'])
    router.get('/:id', [BookmarksController, 'show'])
  })
  .prefix('api/bookmark')

router
  .group(() => {
    router.post('/', [BookmarksController, 'store'])
    router.put('/:id', [BookmarksController, 'update'])
    router.delete('/:id', [BookmarksController, 'destroy'])
  })
  .prefix('api/bookmark')
  .use(middleware.auth())
