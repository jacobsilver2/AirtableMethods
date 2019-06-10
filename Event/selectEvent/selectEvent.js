var Airtable = require('airtable');
require('dotenv').config();
var base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');
const inquirer = require('inquirer')

let questions = [{
  type: 'input',
  name: 'name',
  message: "Search for a band name:\n",
}]

inquirer.prompt(questions).then(answers => {
  findEventsByName(answers.name)
})

function findEventsByName (name) {
  base('Events').select({
    // Selecting the first 3 records in Grid:
    // maxRecords: 16,
    view: "Grid",
    filterByFormula: `({Name} = \"${name}\")`
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    console.log(records.length)

    records.forEach(function(record) {
        console.log(record)
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
}