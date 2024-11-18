import axios from 'axios'

const getFetcher = async (url: string) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (e) {
    console.error('Error', e)
    return []
  }
};


export {
  getFetcher
}