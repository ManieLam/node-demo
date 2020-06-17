const express = require('express')
const App = express()
const port = 3000
const bodyParser = require('body-parser')

const Api = require('./api')
// const Router = express.Router()

App.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
App.use(bodyParser.json())

App.get('/', Api.get)
App.post('/create', Api.create)
App.delete('/delete', Api.delete)
App.put('/update/:id', Api.update)

App.listen(port, () => console.log(`http serve is start on port ${port}!`))

