const pinyin = require('pinyin');
const {Translate} = require('@google-cloud/translate').v2;


async function translate() {
  const translate = new Translate();

  const result = [];

  const fs = require('fs');
  fs.readFile('./data/words', async function(error, data) {
    if (error) {
      throw error;
    }
    await data.toString().split('\n').forEach(async function(line, index, arr) {
      if (index === arr.length - 1 && line === '') {
        return;
      }

      const translation_en = await translate.translate(line, 'en');
      const translation_fr = await translate.translate(line, 'fr');

      result.push({number: index, hanzi: line, pinyin: pinyin(line, {group: true}).join(' '), english: translation_en[0], french: translation_fr[0]});

      const sorted_result = result.sort(function(a, b) {
        return a.number - b.number;
      });


      fs.writeFileSync('./data/result.json', JSON.stringify(sorted_result), {encoding: 'utf8', flag: 'w'});
    });
  });
}

translate();
