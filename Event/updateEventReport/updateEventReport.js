const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
let Airtable = require("airtable");
const inquirer = require("inquirer");
let base = new Airtable({ apiKey: `${process.env.API_KEY}` }).base(
  "app4Eb0X39KtGToOS"
);

let questions = [
  {
    type: "input",
    name: "report",
    message: "Please enter the report:\n",
  },
  {
    type: "input",
    name: "draw",
    message: "Please enter the draw:\n",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(answers);
  updateReportAndDraw(answers.report, parseInt(answers.draw));
});

function updateReportAndDraw(report, draw) {
  base("Events").update(
    "recOhiAJcwBoLVmfh",
    {
      Report: report,
      Draw: draw,
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.get("DatePrimary"));
    }
  );
}

// getReportandDraw();
// updateReportAndDraw();
