import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const TweetsController = () => import('#controllers/tweets_controller')
const LikesController = () => import('#controllers/likes_controller')
const FollowsController = () => import('#controllers/follows_controller')
const UsersController = () => import('#controllers/users_controller')

router.on('/auth-client').render('pages/auth-client')
router.on('/inscription-client').render('pages/inscription-client')
router.on('/profil-client').render('pages/profil-client')
router.on('/compte-client').render('pages/compte-client')
router.on('/motdepasse-client').render('pages/motdepasse-client')

router.post('/api/auth/register', [AuthController, 'register'])
router.post('/api/auth/login', [AuthController, 'login'])
router.post('/api/auth/logout', [AuthController, 'logout'])

router.get('/api/tweets', [TweetsController, 'index'])
router.post('/api/tweets', [TweetsController, 'store'])
router.post('/api/tweets/:id/retweet', [TweetsController, 'retweet'])

router.post('/api/tweets/:id/like', [LikesController, 'toggle'])

router.post('/api/users/:id/follow', [FollowsController, 'toggle'])

router.get('/api/users/:id', [UsersController, 'show'])
