const express = require('express');
const app = express();

// CORS
// app.use(cors())

const path = require('node:path');
const history = require('connect-history-api-fallback');

//require('dotenv').config();

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));
app.use(staticFileMiddleware);
app.use(history());
//app.use(staticFileMiddleware);

app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use(express.static(__dirname + '/dist'));

app.listen(8090, function () {
  console.log('ticketera-website is running in develop-mode on port 8090');
});