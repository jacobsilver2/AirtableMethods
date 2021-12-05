var Airtable = require("airtable");
require("dotenv").config({ path: require("find-config")(".env") });
var base = new Airtable({ apiKey: `${process.env.API_KEY}` }).base(
  "app4Eb0X39KtGToOS"
);
const inquirer = require("inquirer");
const moment = require("moment");
const tynt = require("tynt");
const questions = require("./changeDateAndTimeOfEventQuestions");

inquirer.prompt(questions.findByName).then((answers) => {
  findEventsByName(answers.name);
});

function findEventsByName(name) {
  base("Events")
    .select({
      view: "Grid",
      filterByFormula: `({Name} = \"${name}\")`,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        console.log(tynt.Red(`Found ${records.length} records.`));
        selectEventToChange(records);
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
}

function selectEventToChange(records) {
  const dateList = records.map((record) =>
    moment(record.fields.Date).format("dddd, MMMM Do YYYY - hh:mm a")
  );
  inquirer
    .prompt([
      {
        type: "list",
        name: "eventSelect",
        message: "Choose which date you'd like to change",
        choices: dateList,
      },
    ])
    .then((answers) => {
      const answerAsUtc = moment(
        answers.eventSelect,
        "dddd, MMMM Do YYYY - hh:mm a"
      )
        .utc()
        .format();
      const selectedRecord = records.filter((record) =>
        moment(record.fields.Date).isSame(answerAsUtc)
      );
      selectDateAndTime(selectedRecord[0].id, answers.eventSelect);
    });
}

function selectDateAndTime(id) {
  console.log(tynt.Green("Select a new date and time"));
  inquirer.prompt(questions.newDateAndTime).then((answers) => {
    const answerAsDate = moment(
      `${answers.date}, ${answers.time}`,
      "MMMD,YYYY, h:ma"
    ).format();
    updateDateAndTime(id, answerAsDate);
  });
}

function updateDateAndTime(id, newDate) {
  base("Events").update(
    id,
    {
      Date: newDate,
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Updated!  Eat shit.");
    }
  );
}
