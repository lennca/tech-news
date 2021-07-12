import FetchNews from '../helpers/FetchNews.js'

class IndexController {
  async index(req, res) {
    try {
      const main = 'top-headlines'
      const url = `https://newsapi.org/v2/${main}?category=technology&language=en&pageSize=50`
      const { status, data } = await FetchNews(url)

      if (status < 200 || status > 299) throw new Error('Fetch response status is not in valid range')

      const { articles } = data
      const header = `Viewing top ${articles.length} technology news!`
      return res.render('pages/index.ejs', { articles, header })
    } catch (error) {
      return res.render('pages/index.ejs', { articles: [], header: 'An unexpected error occurred. Please try again later!' })
    }
  }
}

export default IndexController
