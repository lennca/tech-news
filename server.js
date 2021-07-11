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
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const fetchNews = async (url) => {
  try {
    const apiKey = process.env.API_KEY

    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    })
    return response
  } catch (error) {
    console.log(error)
    return { status: 500, statusText: 'fail', data: [] }
  }
}

app.get('/', async (req, res) => {
  const main = 'top-headlines'
  const url = `https://newsapi.org/v2/${main}?category=technology&language=en&pageSize=50`
  const result = await fetchNews(url)
  const { status, statusText, data } = result
  const { articles } = data

  // Error handling (check response status-code)
  return res.render('pages/index.ejs', { articles })
})

app.get('/search', async (req, res) => {
  const query = req.query.keyword
  if (!query || query.length < 1) return res.redirect('/')

  const main = 'top-headlines'
  const url = `https://newsapi.org/v2/${main}?category=technology&language=en&pageSize=50&q=${query}`
  const result = await fetchNews(url)
  const { status, statusText, data } = result
  const { articles } = data
  // Error handling (check response status-code)
  return res.render('pages/index.ejs', { articles })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
