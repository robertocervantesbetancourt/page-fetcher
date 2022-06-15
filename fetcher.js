const request = require('request');
const fs = require('fs');

const args = process.argv;

const URL = args[2];
const filePath = args[3];

let indexFile = fs.readFileSync(filePath)
console.log('File size: ', indexFile.length);


const fileFetcher = function (cb) {
  request(URL, (error, response, body) => {
    console.log('error: ', error);
    console.log('statusCode: ', response && response.statusCode);
    fs.writeFile(filePath, body, err => {
      if (!err) {
        cb(body);
      };
    });
  });
}

fileFetcher((body => {console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`)}));