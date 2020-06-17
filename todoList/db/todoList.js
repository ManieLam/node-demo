const Http = require('http')
const Mongoose = require('mongoose')

const Connection = require('./connect')

var todoListSchema = new Mongoose.Schema({
  action: {
    type: String,
    // required: [true, '请输入即将做的事情']
  },
  createTime: Number,
  updateTime: Number
})
var todoListModel = Connection.model('todoList', todoListSchema)

// todoListSchema.methods.getList = function(cb) {
//   return this.model('todoList').find({}, cb);
// }

// todoListSchema.methods.addList = function (req) {
//   const todoDoc = new todoListModel(req)
//   return todoDoc.save()
// }

module.exports = todoListModel