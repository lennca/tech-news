import FetchNews from '../helpers/FetchNews.js'

/**
 * Controller class getting top 50 highlight tech-news.
 * Handles logic such as what endpoint to fetch and error handling.
 */
class IndexController {
  /**
   * Method of class that fetch data and render view with data.
   * @param {Express.Request} req Express request-object
   * @param {Express.Response} res Express response-object
   * @returns {Function} render function that renders view and send to client
   */
  async index(req, res) {
    try {
      const url = 'https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=50'
      const { status, data } = await FetchNews(url)

      if (status < 200 || status > 299) throw new Error('Fetch response status is not in valid range')

      const { articles } = data
      const header = `Viewing top ${articles.length} technology news!`
      return res.render('pages/index.ejs', { articles, header, error: null })
    } catch (error) {
      const header = 'Viewing 0 technology news due to error!'
      return res.render('pages/index.ejs', { articles: [], header, error: { title: 'An unexpected error occurred.', description: 'Please try again later!' } })
    }
  }
}

export default IndexController
