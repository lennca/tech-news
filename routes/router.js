import express from 'express'

import IndexRouter from './IndexRouter.js'
import SearchRouter from './SearchRouter.js'

const Router = express.Router()

Router.use('/', IndexRouter)
Router.use('/search', SearchRouter)

// Redirect each request to a non-existing url to home
Router.use('*', (req, res) => {
  res.redirect('/')
})

export default Router
