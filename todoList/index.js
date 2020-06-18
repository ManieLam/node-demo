const express = require('express')
const App = express()
const port = 3000
const bodyParser = require('body-parser')

const actionRouter = require('./router')

App.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
App.use(bodyParser.json());
/* router */
App.use('/action', actionRouter);

App.listen(port, () => console.log(`http serve is start on port ${port}!`))

