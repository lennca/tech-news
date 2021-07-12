import FetchNews from '../helpers/FetchNews.js'

/**
 * Controller class getting top 50 highlight tech-news.
 * Handles logic such as what endpoint to fetch and error handling.
 */
class SearchController {
  /**
   * Method of class that fetch data and query by input and render view with data.
   * @param {Express.Request} req Express request-object
   * @param {Express.Response} res Express response-object
   * @returns {Function} render function that renders view and send to client
   */
  async index(req, res) {
    try {
      const query = req.query.keyword
      if (!query || query.length < 1) return res.redirect('/')

      const url = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=50&q=${query}`
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
