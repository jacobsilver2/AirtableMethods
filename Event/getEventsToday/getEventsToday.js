var Airtable = require('airtable');
require('dotenv').config();
var base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');
const moment = require('moment');
const tz = require('moment-timezone');



  base('Events').select({
    view: "Grid",
    filterByFormula: "DATETIME_DIFF({Date},Today(), 'days')=0"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    const today = moment();

    // const todaysRecords = records.filter(record => {
    //     today.startOf('day').isSame(moment(record.fields.Date).utcOffset(-240).startOf('day'))
    //     // today.isSame(moment(record.fields.Date).utcOffset(-240), 'day');
    // }) 
    // console.log(todaysRecords);
    records.forEach(function(record) {
        // console.log(moment(record.fields.Date).utcOffset(-240).format('dddd, MMMM Do YYYY - hh:mm a'))
        console.log(moment(record.fields.Date).utcOffset(-240).startOf('day'));
        console.log(today.startOf('day'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
