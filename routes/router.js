import express from 'express'

import IndexRouter from './IndexRouter.js'
import SearchRouter from './SearchRouter.js'

const Router = express.Router()

Router.use('/', IndexRouter)
Router.use('/search', SearchRouter)

Router.use('*', (req, res) => {
  res.redirect('/') // send error
})

export default Router
