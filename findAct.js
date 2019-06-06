var Airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyY11TcpoTR646Fh'
});
var base = Airtable.base('app4Eb0X39KtGToOS');

base('Acts').find('reczhCE1FTA4DPv4v', function(err, record) {
  if (err) { console.error(err); return; }
  console.log(record);
});