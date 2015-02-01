var express = require('express')
var app = express()
var lookup = require('./lookup.js')

app.set('view engine', 'jade');
app.use(express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.render('index');
})

var server = app.listen(3000, function() {
  var port = server.address().port

  console.log('Listening on %s.', port)
})
