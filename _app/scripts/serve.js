const static = require('node-static')

const fileServer = new static.Server('./dist')

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response, function (err, res) {
      if (err && (err.status === 404)) { // If the file wasn't found
        fileServer.serveFile('/index.html', 200, {}, request, response)
      }
    });
  }).resume()
}).listen(8080)

console.log('started server at https://localhost:8080')
