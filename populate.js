var solr = require('solr-client');

var client = solr.createClient();

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
