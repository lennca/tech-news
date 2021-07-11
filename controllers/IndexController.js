import FetchNews from '../helpers/FetchNews.js'

class IndexController {
  async index(req, res) {
    const main = 'top-headlines'
    const url = `https://newsapi.org/v2/${main}?category=technology&language=en&pageSize=50`
    const result = await FetchNews(url)
    const { status, statusText, data } = result
    const { articles } = data

    // Error handling (check response status-code)
    return res.render('pages/index.ejs', { articles })
  }
}

export default IndexController