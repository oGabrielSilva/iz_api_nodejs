import express from 'express'
import UserController from '../Controllers/UserController'

const router = express.Router()

router.get('/', (_, res) => res.status(200).json({ Welcome: 'to IzanamiOS' }))

router.post('/user/login/:lang?', UserController.index)
router.post('/user/create/:lang?', UserController.store)

export default router
