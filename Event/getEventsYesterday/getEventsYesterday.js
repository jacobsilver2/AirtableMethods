const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
var Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.API_KEY }).base(
  "app4Eb0X39KtGToOS"
);
const moment = require("moment");
const inquirer = require("inquirer");

base("Events")
  .select({
    view: "Yesterday",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      selectEventToChange(records);
    },
    function done(err) {
      if (err) {
        console.error(err);
      }
    }
  );

function selectEventToChange(records) {
  const yesterdaysEventsWithId = records.map((record) => {
    return { name: record.fields.Name, id: record.fields.id };
  });

  const yesterdaysEvents = records.map((record) => {
    return record.fields.Name;
  });
  inquirer
    .prompt([
      {
        type: "list",
        name: "eventSelect",
        message: "Choose which event you'd like to update",
        choices: yesterdaysEvents,
      },
    ])
    .then((answers) => {
      const selectedAnswer = records.filter(
        (record) => answers.eventSelect === record.fields.Name
      );
      enterDrawAndReport(selectedAnswer[0].id);
    });
}

function enterDrawAndReport(id) {
  console.log("Enter the draw and report");
  inquirer
    .prompt([
      {
        type: "input",
        name: "draw",
        message: "Draw:\n",
      },
      {
        type: "input",
        name: "report",
        message: "Report\n",
      },
    ])
    .then((answers) => updateDrawAndReport(id, answers));
}

function updateDrawAndReport(id, answers) {
  base("Events").update(
    id,
    {
      Draw: parseInt(answers.draw),
      Report: answers.report,
    },
    function (err, record) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("yep");
    }
  );
}
