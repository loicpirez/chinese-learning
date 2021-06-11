const say = require("say");
const fs = require("fs");
const path = require("path");

const destination = "data/samples";

function hanziToTTS(hanzi, id) {
  say.export(
    hanzi,
    "Ting-Ting",
    1,
    path.join(destination, `${id}.wav`),
    (err) => {
      if (err) {
        return console.error(err);
      }

      console.log(`${hanzi} #${id} TTS has been saved.`);
    }
  );
}

fs.readFile("data/result.json", function (error, data) {
  if (error) {
    throw error;
  }
  const json = JSON.parse(data);

  json.forEach((field) => {
    hanziToTTS(field.hanzi, field.number);
  });
});
