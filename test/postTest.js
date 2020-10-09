express = require('express');
bodyParser = require('body-parser');
app = express();
fs = require('fs').promises;
async function openFile() {
  try {
    const csvHeaders = 'name,quantity,price'
    await fs.writeFile('groceries.csv', csvHeaders);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

async function addItem(nhsData, nameData, surnameData, dobData, ageData, respData,
  spo2Data, strokeData, obesityData, scoreData) {
  try {
    const csvLine = `\n${nhsData},${nameData},${surnameData},${dobData},${ageData},${respData},${spo2Data},${strokeData},${obesityData},${scoreData}`
    await fs.writeFile('data.csv', csvLine, { flag: 'a' });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
  res.send('You sent "' + req.body.nameData + ' ' + req.body.surnameData + '" data.');
  (async function () {
  //await openFile();
  await addItem(req.body.nhsData, req.body.nameData, req.body.surnameData,
    req.body.dobData, req.body.ageData, req.body.respData, req.body.spo2Data,
    req.body.strokeData, req.body.obesityData, req.body.scoreData);
    })();
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});