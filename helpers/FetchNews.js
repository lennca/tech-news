import axios from 'axios'

/**
 * Helper function that makes request to API and returns data.
 * @param {string} url URL with endpoint to make API-request
 * @returns object containing {status: number, data: array}
 */
const FetchNews = async (url) => {
  try {
    const apiKey = process.env.API_KEY

    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    })
    return response
  } catch (error) {
    const { status, data } = error.response
    return { status, data }
  }
}

export default FetchNews
