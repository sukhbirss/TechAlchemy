//@ts-ignore
import NewsAPI from 'newsapi'
const newsapi = new NewsAPI(process.env.NEWS_API_KEY)

console.log('Initilise NewsApi')
export default newsapi.v2
