const Airtable = require('airtable');
require('dotenv').config();
const base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');
const inquirer = require('inquirer')

const searchQuestions = [{
  type: 'input',
  name: 'email',
  message: "Enter an email address:\n",
}, {
  type: 'input',
  name: 'name',
  message: "Enter the act name:\n"
}]

const blurbQuestions = [
  {
    type: 'input',
    name: 'blurb',
    message: 'Enter the blurb:\n'
  },
]


inquirer.prompt(searchQuestions).then(answers => {
  findActs(answers.email, answers.name)
})

function findActs (email, name) {
  base('Acts').select({
    // Selecting the first 3 records in Grid:
    view: "Grid",
    filterByFormula: `(AND({Email} = \"${email}\", {Name} = \"${name}\"))`
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    console.log(records.length)
    records.forEach(function(record) {
        // updateBlurb(record.id)
        // console.log(record)
    });
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
};

function updateBlurb(id) {
  inquirer.prompt(blurbQuestions).then(answers => {
    base('Acts').update(id, {
      Blurb: answers.blurb
    }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.get('Name'));
    });
  })
}