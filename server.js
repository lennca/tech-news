import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const PORT = process.env.PORT || 3000

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.set('views', join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static(join(__dirname, '/public')))

app.get('/', async (req, res) => {
  res.render('pages/index.ejs')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
