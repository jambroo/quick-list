// NodeJS script to look up a particular entry
var solr = require('solr-client');

var client = solr.createClient('localhost', 8983, 'collection');

if (process.argv.length != 3) {
    console.log("Must provide a name, start or end search value as an argument.")
    process.exit();
}

var queryValue = process.argv[2];
var query = client.createQuery()
				   .q({name : '%'+queryValue+'%'})
				   .start(0)
				   .rows(10);
client.search(query,function(error, object){
    console.log("Search for "+queryValue+":");
    console.log("Error: ", error);
    console.log("Object: ", object);
    if (object && object.response && object.response.docs) {
        console.log("Matching entries: ", object.response.docs);
    }
});