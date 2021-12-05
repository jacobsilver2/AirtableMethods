const Airtable = require("airtable");
require("dotenv").config({ path: require("find-config")(".env") });
const inquirer = require("inquirer");
const questions = require("./selectActQuestions");
const dateFunctions = require("../../utllity/formatCalendarDate");

inquirer.prompt(questions.nameOrEmail).then((answers) => {
  inquirer.prompt(questions.searchQuestions).then((resp) => {
    findActs(answers.searchBy, resp.search);
  });
});

function findActs(searchBy, search) {
  base("Acts")
    .select({
      view: "Grid",
      filterByFormula: `({${searchBy}} = \"${search}\")`,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        console.log(
          `${records.length} ${records.length > 1 ? "records" : "record"} found`
        );
        records.forEach(function (record) {
          console.log(`Act Name - ${record.fields.Name}`);
          record.fields.Events.forEach((event) => {
            findEvent(event);
          });
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
}

function findEvent(id) {
  base("Events").find(id, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(dateFunctions.formatCalendarDate(record.fields.Date));
    console.log(dateFunctions.formatCalendarTime(record.fields.Date));
    if (record.fields.Report) {
      console.log(record.fields.Report);
    }
    if (record.fields.Draw) {
      console.log(record.fields.Draw);
    }
  });
}
