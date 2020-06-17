/** 异步
 * 1.异步机制：
 *    非阻塞I/O - 对于点餐人员，餐厅点餐吃饭  - 服务生可以同时服务多个客人，同时给多个客人多个上菜
 *             - 在网页上提问,然后等答案的过程可以继续刷网页，继续做家务
 *             - 确定一个进行Input/output的系统，思考在I/O系统中，能不能进行其他的I/O
 *    阻塞I/O - 对于点餐人员，饭堂排队吃饭 - 只能一份一份点
 * */

// const glob = require('glob')
 /* 
  glob.sync()
  glob.async()
 */

//  阻塞
// var result = null;
// console.time('glob');
// result = glob.sync(__dirname, '**/*');
// console.timeEnd('glob')
// console.info('get result')

// 非阻塞
// var result = null;
// console.time('glob');
// glob(__dirname, '**/*', function (err, res) {
//   result = res;
//   console.info('get result')
// })
// console.timeEnd('glob');
// console.info(1+1)

// node中的回调函数 先err后res  详细看"事件循环和调用栈"

/* function interview (callback) {
  setTimeout(() => {
    if (Math.random() > 0.8) {
      callback('success')
    } else {
      callback(new Error('fail'))
    }
  }, 500);
}
interview((res) => {
  if (res instanceof Error) {
    return console.log('cry');
  } else {
    console.log('smile');
  }
}) */

// 2nd Round: 异步流程控制,异步并发，- npm: async.js

// 3rd : Promise
function interview (company) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        console.log(company, 'is success');
        resolve('success')
      } else {
        let errorObj = new Error()
        errorObj.name = company
        reject(errorObj)
      }
    }, 500);
  })
}
(function () {
  const interView = Promise.all([
    interview('Tencent'),
    interview('AliBABA')
  ]).then(res => {
    console.log('smile');
  }).catch(e => {
    console.info('cry for', e.name)
  })
})()