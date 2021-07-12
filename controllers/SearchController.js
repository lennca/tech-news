import FetchNews from '../helpers/FetchNews.js'

class SearchController {
  async index(req, res) {
    try {
      const query = req.query.keyword
      if (!query || query.length < 1) return res.redirect('/')

      const main = 'top-headlines'
      const url = `https://newsapi.org/v2/${main}?category=technology&language=en&pageSize=50&q=${query}`
      const { status, data } = await FetchNews(url)

      if (status < 200 || status > 299) throw new Error('Fetch response status is not in valid range')

      const { articles } = data
      const header = `Found ${articles.length} results based on search!`
      return res.render('pages/index.ejs', { articles, header, error: null })
    } catch (error) {
      const header = 'Viewing 0 technology news due to error!'
      return res.render('pages/index.ejs', { articles: [], header, error: { title: 'An unexpected error occurred.', description: 'Please try again later!' } })
    }
  }
}

export default SearchController
