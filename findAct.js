var Airtable = require('airtable');
require('dotenv').config();
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: `${process.env.API_KEY}`
});
var base = Airtable.base('app4Eb0X39KtGToOS');

base('Acts').find('reczhCE1FTA4DPv4v', function(err, record) {
  if (err) { console.error(err); return; }
  console.log(record);
});