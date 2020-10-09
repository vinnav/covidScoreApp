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

async function addItem(name, quantity, price) {
  try {
    const csvLine = `\n${name},${quantity},${price}`
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
  res.send('You sent the name "' + req.body.name + '".');
  (async function () {
  //await openFile();
  await addItem(req.body.name, req.body.email, req.body.message);
    })();
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});