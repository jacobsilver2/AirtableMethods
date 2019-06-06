var Airtable = require('airtable');
require('dotenv').config();
var base = new Airtable({apiKey: `${process.env.API_KEY}`}).base('app4Eb0X39KtGToOS');

base('Events').find('recOhiAJcwBoLVmfh', function(err, record) {
    if (err) { console.error(err); return; }
    getName(record);
});

function getName (record) {
  console.log(record.fields['Act Name (lookup)'][0])
}

