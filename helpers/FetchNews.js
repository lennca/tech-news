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
    console.log(error)
    return { status: 500, statusText: 'fail', data: [] }
  }
}

export default FetchNews
