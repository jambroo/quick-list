// NodeJS script to pre-populate 'collection' collection on the solr search pattern.
const SAMPLE_DATA_LIMIT = 500000;
const START_END_DIFFERENCE = 5;

var solr = require('solr-client');
var prompt = require('prompt');
var config = require('./config.json');

var client = solr.createClient(config.host, config.port, config.collection);
client.autoCommit = true;

prompt.start();

// Add entries function to all entries to a collection.
var addEntries = function(prompt) {
  console.log("Add test entries to collection "+config.collection+"? [y/n]");
  prompt.get([{
      name: 'confirmAdd'
    }], function (err, result) {
    if (result.confirmAdd == "y") {
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
        if (error) {
          console.log("Error: ", error);
        } else {
          console.log("Object: ", object);
        }
      });
    } else if (result.confirmAdd == "n") {
      process.exit(0);
    } else {
      console.log("Error. Answer must be 'y' or 'n'.");
      process.exit(0);
    }
  });
}

console.log("Remove all from collection "+config.collection+"? [y/n]");
prompt.get([{
    name: 'confirmRemove'
  }], function (err, result) {
  if (result.confirmRemove == "y") {
    // Remove all documents
    client.deleteByQuery("id:*", function(error, object) {
      console.log("Remove all documents:");
      if (error) {
        console.log("Error: ", error);
        process.exit(0);
      } else {
        console.log("Object: ", object);
        addEntries(prompt);
      }
    });
  } else if (result.confirmRemove == "n") {
    console.log("Skipping removal of documents.");
    addEntries(prompt);
  } else {
    console.log("Error. Answer must be 'y' or 'n'.");
    process.exit(0);
  }  
});