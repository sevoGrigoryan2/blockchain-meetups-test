import express from 'express'
import * as getAll from '../controllers/events/get-all'
import * as getWithFilter from '../controllers/events/get-with-filter'
import * as getItem from '../controllers/events/get-item'

const router = express.Router()

router.get('/', getAll.handler)

router.get('/city', getWithFilter.handler)

router.get('/event', getItem.handler)

export default router
