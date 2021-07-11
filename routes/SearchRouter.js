import express from 'express'
import Controller from '../controllers/SearchController.js'

const SearchRouter = express.Router()

const SearchController = new Controller()

SearchRouter.get('/', SearchController.index)

export default SearchRouter
