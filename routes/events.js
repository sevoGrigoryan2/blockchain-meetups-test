import express from 'express'
import * as getAll from '../controllers/events/get-all'
import * as getWithFilter from '../controllers/events/get-with-filter'

const router = express.Router()

router.get('/', getAll.handler)

router.get('/city', getWithFilter.handler)

export default router
