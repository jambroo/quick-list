quick-list
===========================
Simple proof-of-concept NodeJS app to connect and search a solr instance for items. The items have a **name**, a **from** value and an optional **to** value, which are all searchable.

Requirements
------------
This NodeJS application requires a running instance of Solr to function. The port Solr should be listening on is port 8983 and contain a disposable collection called 'collection'. Please be aware the populate.js nodejs script will remove all documents in this collection before populating it with test data.