var Airtable = require('airtable');
require('dotenv').config();
var base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');
const moment = require('moment');

  base('Events').select({
    // Selecting the first 3 records in Grid:
    view: "Yesterday",
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        console.log(record)
    });
}, function done(err) {
    if (err) { console.error(err); return; }
});
