var Airtable = require("airtable");
require("dotenv").config({ path: require("find-config")(".env") });
const fetch = require("isomorphic-fetch");
const eventbrite = "http://www.eventbrite.com/venue/api/feeds/venue/424.json";
const myReg = /([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])\s*([AaPp][Mm])/;

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

async function main() {
  const eventBriteData = await getData(eventbrite);

  base("Acts")
    .select({
      // Selecting the first 3 records in Grid:
      view: "Grid",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          eventBriteData.forEach(function (ebRecord) {
            if (ebRecord.title) {
              if (
                ebRecord.title.replace(myReg, "").slice(1) ===
                record.get("Name")
              ) {
                console.log(`Match Found: ${record.get("Name")}`);
                console.log(record.id);
                base("Acts").update(
                  record.id,
                  {
                    Image: [
                      {
                        url: ebRecord.poster,
                      },
                    ],
                  },
                  function (err, record) {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    console.log(record.get("Name"));
                  }
                );
              }
            }
          });
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

main();
