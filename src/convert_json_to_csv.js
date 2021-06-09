const fs = require('fs');
const {parse} = require('json2csv');

fs.readFile('data/result.json', function(error, data) {
  if (error) {
    throw error;
  }

  const result = JSON.parse(data.toString());
  const fields = ['number', 'hanzi', 'pinyin', 'english',
    'french']; const opts = {fields, header: false};

  try {
    const csv = parse(result, opts);
    const header = `Number, Hànzì, Pīnyīn, English, French`;

    fs.writeFileSync('./data/result.csv', `${header}
${csv}
`, {encoding: 'utf8', flag: 'w'});
  } catch (err) {
    console.error(err);
  }
});
