import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 3000

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.set('views', join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static(join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
