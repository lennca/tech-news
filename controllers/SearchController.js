import FetchNews from '../helpers/FetchNews.js'

class SearchController {
  async index(req, res) {
    const query = req.query.keyword
    if (!query || query.length < 1) return res.redirect('/')

    const main = 'top-headlines'
    const url = `https://newsapi.org/v2/${main}?category=technology&language=en&pageSize=50&q=${query}`
    const result = await FetchNews(url)
    const { status, statusText, data } = result
    const { articles } = data
    // Error handling (check response status-code)
    return res.render('pages/index.ejs', { articles })
  }
}

export default SearchController
