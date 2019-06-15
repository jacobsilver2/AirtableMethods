var Airtable = require('airtable');
require('dotenv').config();
var base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');
const moment = require('moment');

  base('Events').select({
    view: "2 Weeks",
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function(record) {
        console.log(record)
    });

}, function done(err) {
    if (err) { console.error(err); return; }
});
