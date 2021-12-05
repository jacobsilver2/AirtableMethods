var Airtable = require("airtable");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
var base = new Airtable({ apiKey: `${process.env.API_KEY}` }).base(
  "app4Eb0X39KtGToOS"
);
const inquirer = require("inquirer");
const async = require("async");

getEventsYesterday();

function getEventsYesterday() {
  base("Events")
    .select({
      // Selecting the first 3 records in Grid:
      view: "Yesterday",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        async.forEach(records, async function (record) {
          const response = await askForReportAndDraw(
            record.id,
            record.fields.Name
          );
          return response;
        });
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
}

function updateEventBlurbAndDraw(id, Report, Draw) {
  base("Events").update(
    id,
    {
      Report,
      Draw,
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
}

async function askForReportAndDraw(id, name) {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "report",
        message: `Enter the report for ${name}`,
      },
      {
        type: "input",
        name: "draw",
        message: `Enter the draw for ${name}`,
      },
    ])
    .then((answers) => {
      updateEventBlurbAndDraw(id, answers.report, parseInt(answers.draw));
    });
}
