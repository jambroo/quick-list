// NodeJS script to pre-populate 'collection' collection on the solr search pattern.
const SAMPLE_DATA_LIMIT = 500000;
const START_END_DIFFERENCE = 5;

var solr = require('solr-client');

var client = solr.createClient('localhost', 8983, 'collection');
client.autoCommit = true;

// Remove all documents
client.deleteByQuery("id:*", function(error, object) {
  console.log("Remove all document:");
  console.log("Error: ", error);
  console.log("Object: ", object);
});

// Add entries
var entries = [];
for (var i = 0; i <= SAMPLE_DATA_LIMIT; i++) {
  var entry = {
    id: i,
    name: "Entry " + i,
    start: i
  }

  // 10% chance there is an end value set
  if (Math.random() <= 0.1) {
    entry.end = (i + Math.floor(Math.random() * (START_END_DIFFERENCE - 1) + 1));
  }

  entries.push(entry);
}

client.add(entries, function(error, object) {
  console.log("Add documents:");
  console.log("Error: ", error);
  console.log("Object: ", object);
});
