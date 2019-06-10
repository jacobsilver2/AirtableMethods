var Airtable = require('airtable');
require('dotenv').config();

function findAct (id) {
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: `${process.env.API_KEY}`
});
var base = Airtable.base('app4Eb0X39KtGToOS');

base('Acts').find(id, function(err, record) {
  if (err) { console.error(err); return; }
  console.log(record);
});
}

module.exports = {
  findAct
}