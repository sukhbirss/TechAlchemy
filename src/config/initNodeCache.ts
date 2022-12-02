import NodeCache from 'node-cache'

const cache = new NodeCache({stdTTL:500, checkperiod:500})

console.log('Initilise Node Cache')
export default cache
