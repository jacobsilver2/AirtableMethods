var Airtable = require('airtable');
require('dotenv').config();
var base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');
const moment = require('moment');



  base('Events').select({
    // Selecting the first 3 records in Grid:
    view: "Grid",
    filterByFormula: "IS_SAME({Date},Today(), 'day')"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        // const time = moment(record.fields.Date).format('h:mma')
        // console.log(`${time} - ${record.fields.Name}`);
        console.log(record)
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
