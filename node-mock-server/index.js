const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.listen(port, () => {
 console.log('JSON Server is running')
})

server.get('/users', (req, res) => {
  if (req.method === 'GET') {
    const users = require('./users/index')
    res.status(200).jsonp(users())
  }
 })