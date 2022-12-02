import initNewsAPi from "../config/initNewsAPi"
import cache from "../config/initNodeCache"
const newsCacheExpireTime = 500
export const fetchNewsHeadlines = async () => {
    const cacheHeadlines = cache.get('TOP_HEADLINES')
    if(cacheHeadlines) return cacheHeadlines
    //if cache not found then fetching data from the api
    const data = await initNewsAPi.topHeadlines({
        language: 'en',
        country: 'us'
      })
    //set cache here
    cache.set('TOP_HEADLINES', data, newsCacheExpireTime)
    return data
}