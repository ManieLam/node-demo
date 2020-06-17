const mongoose = require('mongoose')
// const MongoURL = 'mongodb://localhost:27017/'
const conn = mongoose.createConnection(
  'mongodb://localhost:27017/demo_todoList',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
conn.on('open', () => {
  console.log('MongoDB 链接已开启');
})
conn.on('err', () => {
  console.log('MongoDB 异常：', err);
})
conn.on('disconnected', () => {
  console.log('MongoDB 失去链接');
})

module.exports = conn;