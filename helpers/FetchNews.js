import axios from 'axios'

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
