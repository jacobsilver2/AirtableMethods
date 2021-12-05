const Airtable = require("airtable");
require("dotenv").config();
require("dotenv").config({ path: require("find-config")(".env") });
const inquirer = require("inquirer");
const questions = require("./updateActBlurbAndUrlQuestions");

inquirer.prompt(questions.searchQuestions).then((answers) => {
  findActs(answers.email, answers.name);
});

function findActs(email, name) {
  base("Acts")
    .select({
      view: "Grid",
      filterByFormula: `(AND({Email} = \"${email}\", {Name} = \"${name}\"))`,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        console.log(records.length);
        records.forEach(function (record) {
          updateBlurb(record.id);
        });
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
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

function updateBlurb(id) {
  inquirer.prompt(questions.blurbQuestions).then((answers) => {
    base("Acts").update(
      id,
      {
        Blurb: answers.blurb,
        Website: answers.website,
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record.get("Name"));
      }
    );
  });
}
