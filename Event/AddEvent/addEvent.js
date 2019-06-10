var Airtable = require('airtable');
require('dotenv').config();
var base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');
const inquirer = require('inquirer');
const moment = require('moment');
const questions = require('./addEventQuestions');

inquirer.prompt(questions.addEventQuestions).then(answers => {
  createEvent(answers)
});



function createEvent(answers) {
  const {name, date, time, status} = answers;
  const formattedDate = moment(`${date}, ${time}`, 'MMMD,YYYY, h:ma').format()
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
    console.log(`A new event has been created with the id ${record.getId()}.\nDo you want to add an act?`);
    inquirer.prompt(questions.addActPromptQuestion).then(answers => {
      if (answers.response === 'yes') {
        inquirer.prompt(questions.addActQuestions).then(moreAnswers => {
          checkIfActExistsAndAddToEvents(moreAnswers.email, record.get('Name'), record.getId());
        })
      }
      return;
    })
  });
}



function createActandAddToEvent(eventId, name, email) {
    base('Acts').create({
      "Name": name,
      "Email": email,
      "Events": [
        eventId
      ]
    }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Succesfully created a new act, added it to the database, and linked to to the event.  Now fuck off');
    });
}

function addExistingActToEvent(eventId, actId) {
  base('Events').update(eventId, {
    "Act (link)": [
      actId
    ]
  }, function(err, record) {
    if (err) {
      console.log(err)
      return;
    }
    console.log(`Succesfully added act to event. Now fuck off.`)
  })
}

function checkIfActExistsAndAddToEvents (email, name, eventId) {
  base('Acts').select({
    view: "Grid",
    filterByFormula: `(AND({Email} = \"${email}\", {Name} = \"${name}\"))`
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    if (records.length === 0 ) {
      console.log('No act with that name and email was found in the database. Creating a new record\n');
      createActandAddToEvent(eventId, name, email);
      return;
    }

    records.forEach(function(record) {
      addExistingActToEvent(eventId, record.id)
    })
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
}, function done(err) {
    if (err) { console.error(err); return; }
});
}


