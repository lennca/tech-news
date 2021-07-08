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

const fetchNews = async () => {
  try {
    const main = 'top-headlines'
    const category = 'technology'
    const language = 'en'
    const apiKey = process.env.API_KEY
    const url = `https://newsapi.org/v2/${main}?category=${category}&language=${language}`
    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    })
    return response
  } catch (error) {
    return { status: 500, statusText: 'fail', data: [] }
  }
}

app.get('/', async (req, res) => {
  const result = await fetchNews()
  const { status, statusText, data } = result
  const articles = data.articles.slice(0, 10)
  // Error handling (check response status-code)
  res.render('pages/index.ejs', {
    articles,
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
