var Airtable = require("airtable");
require("dotenv").config({ path: require("find-config")(".env") });
const base = new Airtable({ apiKey: `${process.env.API_KEY}` }).base(
  "app4Eb0X39KtGToOS"
);
const inquirer = require("inquirer");
const { exec } = require("child_process");

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
  const yesterdaysEvents = records.map((record) => {
    return record.fields.Name;
  });
  inquirer
    .prompt([
      {
        type: "list",
        name: "eventSelect",
        message: "Choose which act you'd like to email",
        choices: yesterdaysEvents,
      },
    ])
    .then((answers) => {
      const selectedAnswer = records.filter(
        (record) => answers.eventSelect === record.fields.Name
      );
      const email = selectedAnswer[0].fields["Act Email"][0];
      exec(
        `echo "Hey!\n\nThanks for playing last night. We'd love to have you back in the next few months. Interested?\n\nThanks!\nJake" | /usr/local/bin/emate mailto --to "${email}" -f "jake@petescandystore.com" --subject "Thanks for playing last night!" --header "#markup: markdown"`
      );
    });
}
