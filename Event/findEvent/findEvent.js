var Airtable = require('airtable');
require('dotenv').config();
var base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');

function findEvent (id) {
  base('Events').find(id, function(err, record) {
    if (err) { console.error(err); return; }
    getName(record);
});
}

function getName (record) {
  console.log(record.fields['Act Name (lookup)'][0])
}

module.exports = {
  findEvent
}

