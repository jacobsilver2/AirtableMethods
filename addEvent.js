var Airtable = require('airtable');
require('dotenv').config();
var base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');
const inquirer = require('inquirer');
const moment = require('moment');

let questions = [{
  type: 'input',
  name: 'name',
  message: "Band Name:\n",
}, {
  type: 'input',
  name: 'date',
  message: "Date:\n",
}, {
  type: 'input',
  name: 'time',
  message: 'Time:\n',
},
{
  type: 'list',
  name: 'status',
  choices: ['Confirmed', 'Held', 'Cancelled']
}]

inquirer.prompt(questions).then(answers => {
  createEvent(answers)
})

function createEvent(answers) {
  const {name, date, time, status} = answers;
  const formattedDate = moment(`${date}T${time}:00`).format();
  base('Events').create({
    "Name": `${name}`,
    // "Act (link)": [
    //   "reczhCE1FTA4DPv4v"
    // ],
    "Status": `${status}`,
    "Date": formattedDate
    // "Date": "2016-10-11T19:00:00.000Z"
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.getId());
  });

}
