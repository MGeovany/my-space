import router from '@adonisjs/core/services/router'

const SessionController = () => import('#controllers/session_controller')

router
  .group(() => {
    router.post('/', [SessionController, 'login'])
    router.post('/signup', [SessionController, 'signup'])
    router.post('/:id/tokens', [SessionController, 'getToken'])
    router.post('/logout', [SessionController, 'logout'])
  })
  .prefix('api/users')
