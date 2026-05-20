/*

|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------

|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/auth-client').render('pages/auth-client').as('auth-client')
router.on('/inscription-client').render('pages/inscription-client').as('inscription-client')
router.on('/profil-client').render('pages/profil-client').as('profil-client')
router.on('/compte-client').render('pages/compte-client').as('compte-client')
router.on('/motdepasse-client').render('pages/motdepasse-client').as('motdepasse-client')
