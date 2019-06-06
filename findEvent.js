var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyY11TcpoTR646Fh'}).base('app4Eb0X39KtGToOS');

base('Events').find('recOhiAJcwBoLVmfh', function(err, record) {
    if (err) { console.error(err); return; }
    getName(record);
});

function getName (record) {
  console.log(record.fields['Act Name (lookup)'][0])
}

