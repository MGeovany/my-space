import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ProjectIdeasController = () => import('#controllers/project_ideas_controller')
router
  .group(() => {
    router.get('/', [ProjectIdeasController, 'index'])
    router.get('/:id', [ProjectIdeasController, 'show'])
  })
  .prefix('api/project_ideas')

router
  .group(() => {
    router.post('/', [ProjectIdeasController, 'store'])
    router.put('/:id', [ProjectIdeasController, 'update'])
    router.delete('/:id', [ProjectIdeasController, 'destroy'])
  })
  .prefix('api/project_ideas')
  .use(middleware.auth())
