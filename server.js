var express = require('express')
var app = express()
var lookup = require('./lookup.js')

app.set('view engine', 'jade');
app.use(express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/search', function(req, res) {
  if (!req.query.q) {
    res.render('view', {
      results: null
    });
    return;
  }

  var start = 0;
  if (req.query.start) {
    start = req.query.start;
  }

  var solrPromise = lookup.query(req.query.q, start, 100)
    .then(function(data) {
      res.render('view', {
        results: data.docs,
        numFound: data.numFound
      });
      return;
    }, function(err) {
      res.render('view', {
        results: null
      });
      return;
    });
})

var server = app.listen(3000, function() {
  var port = server.address().port

  console.log('Listening on %s.', port)
})