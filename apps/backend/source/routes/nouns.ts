import express from 'express'

import v1DaoController from '../controllers/v1/dao'
import v1ImageController from '../controllers/v1/image'

import daoController from '../controllers/dao'

const router = express.Router()

router.get('/dao/:chain/:address', daoController.getData)

router.get('/dao/:slug', v1DaoController.getData)
router.get('/image/:address/:id', v1ImageController.getData)

export = router
