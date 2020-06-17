let http = require('http')
let fs = require('fs')
let url = require('url')
let path = require('path')

const getEXT = (extName) => {
  let data = fs.readFileSync('./08_ext.json');
  let ext = JSON.parse(data.toString())
  return ext[extName]
}

function fsReadOnerror ({res, pathName}) {
  // res.writeHead(404, {
  //   "Content-Type": '404 not found; charset=UTF-8'
  // })
  res.write('404 not found');
  res.end();
}

function fsReadOnsuccess ({ res, req, extName, data }) {
  let ext = getExt(extName);
  console.info('ext:', ext);

  res.writeHead(200, {
    "Content-Type": ext + "; charset='utf-8'"
  });
  res.write(data);
  res.end();
}

http.createServer((req, res) => {
  let pathName = url.parse(req.url).pathname;
  console.log('pathName:', pathName)
  if (pathName == '/') {
    pathName = 'index.html';
  } else if (pathName === '/favicon.ico') return
  // 获取文件的后缀名
  let extName = path.extname(pathName);
  fs.readFile('./03_webService/') + pathName, (err, data) => {
    if (err) {
      console.log('is err:', err);
      fsReadOnerror({res, pathName});
      return;
    } else {
      fsReadOnsuccess({ req, res, extName, data })
    }
  }
}).listen(3001);
