import express from 'express'

import v1DaoController from '../controllers/v1/dao'
import v1ImageController from '../controllers/v1/image'

import daoController from '../controllers/dao'
import imageController from '../controllers/image'

const router = express.Router()

router.get('/dao/:chain/:address', daoController.getData)
router.get('/image/from-url', imageController.getData)

router.get('/dao/:slug', v1DaoController.getData)
router.get('/image/:address/:id', v1ImageController.getData)

export = router
