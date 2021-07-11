import express from 'express'
import Controller from '../controllers/IndexController.js'

const IndexRouter = express.Router()

const IndexController = new Controller()

IndexRouter.get('/', IndexController.index)

export default IndexRouter
