var Airtable = require("airtable");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

function findAct(id) {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: `${process.env.API_KEY}`,
  });
  var base = Airtable.base("app4Eb0X39KtGToOS");

  base("Acts").find(id, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record);
  });
}

module.exports = {
  findAct,
};
