var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyY11TcpoTR646Fh'}).base('app4Eb0X39KtGToOS');
const inquirer = require('inquirer')



  base('Events').select({
    // Selecting the first 3 records in Grid:
    maxRecords: 3,
    view: "Grid",
    filterByFormula: "DATETIME_DIFF({Date},Today(), 'days')=0"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log(record);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
