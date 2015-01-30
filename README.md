quick-list
===========================
Simple proof-of-concept NodeJS app to connect and search a solr instance for items. The items have a **name**, a **from** value and an optional **to** value, which are all searchable.

Requirements
------------
This NodeJS application requires a running instance of Solr to function. Settings associated with Solr can be found in config.json. Please run the populate.js script to populate Solr with test data.