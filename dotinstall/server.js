const http = require('http'),
  fs = require('fs'),
  ejs = require('ejs')
const server = http.createServer()

const settings = require('./settings.js')
console.log(settings)

const template =
  fs.readFileSync(`${__dirname}/public/hello.ejs`, 'utf-8')

let n = 0

server.on('request', (req, res) => {
  n++
  const data = ejs.render(template, {
    title: 'hello',
    content: 'world',
    n: n,
  })
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(data)
  res.end()
})
server.listen(settings.port, settings.host)
console.log("server listening...")
