const http = require('http'),
  fs = require('fs'),
  ejs = require('ejs'),
  qs = require('querystring')

const server = http.createServer()

const settings = require('./settings.js')
console.log(settings)

const template =
  fs.readFileSync(`${__dirname}/public/bbs.ejs`, 'utf-8')

let posts = []

function renderForm(posts, res) {
  const data = ejs.render(template, {posts})
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(data)
  res.end()
}

server.on('request', (req, res) => {
  if (req.method === 'POST') {
    req.data = "";
    req.on("readable", () => {
      req.data += req.read()
    })
    req.on("end", () => {
      const query = qs.parse(req.data)
      console.log(req.data)
      posts.push(query.name)
      console.log(query)
      renderForm(posts, res)
    })
  }
  else {
    renderForm(posts, res)
  }
})
server.listen(settings.port, settings.host)
console.log("server listening...")
