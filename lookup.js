// NodeJS script to look up a particular entry
exports.query = function(r, start, rows) {
  var solr = require('solr-client');
  var Q = require('q');
  var config = require('./config.json');

  // Connect to Solr
  var client = solr.createClient(config.host, config.port, config.collection);

  // Get a Q deferred okect to resolve results to
  var deferred = Q.defer();

  // Logic here is if query is a number search the start attribute, otherwise
  // if query is a string search within name attribute
  var queryStr = "start:" + r;
  if (isNaN(r)) {
    queryStr = "name:*" + r + "*";
  }
  var query = client.createQuery().q(queryStr).start(start).rows(rows);
  var request = client.search(query, function(err, obj) {
    if (!err) {
      // Resolve with response from Solr
      if (obj.response.numFound > 0) {
        deferred.resolve(obj.response);
      } else {
        deferred.resolve(null);
      }
    } else {
      // Reject as error has occurred
      deferred.reject(err);
    }
  });

  // Return promise
  return deferred.promise;
}