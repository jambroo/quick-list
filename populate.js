// NodeJS script to pre-populate 'collection' collection on the solr search pattern.
var solr = require('solr-client');

var client = solr.createClient('localhost', 8983, 'collection');
client.autoCommit = true;

var entries = [];
for(var i = 0; i <= 10 ; i++){
 var entry = {
   id: i,
   name: "Entry "+ i,
   start: i
 }
 entries.push(entry);
}

client.add(entries, function(error, object){
 console.log("Error: ", error);
 console.log("Object: ", object);
});