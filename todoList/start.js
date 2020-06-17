const Http = require('http')
const Assert = require('assert')
const Api = require('./api')
// const Router = require('./router')

const sethttpHeader = (res) => {
  // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 设置 header 类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // 跨域允许的请求方式
  res.setHeader('Content-Type', 'application/json');
}

Http.createServer((req, res) => {
  sethttpHeader(res)
  console.log('req:', req.url + ',' + req.method)
  // app.all('*', (req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  //   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  //   next();
  // })
  switch(req.method) {
    case 'OPTIONS':
      res.statusCode = 200;
      res.end();
      break;
    case 'GET': Api.get(req, res)
      break;
    case 'POST': Api.create(req, res)
      break;
    case 'DELETE': Api.delete(req, res)
      break;
  }

}).listen(3000)