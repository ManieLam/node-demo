const todoModel = require('./db/todoList')

const handleSuccess = (data) => {
  return {
    code: 0,
    message: 'success',
    data: data
  }
}
const handleError = (err) => {
  return {
    code: -1,
    message: err,
    data: null
  }
}

const getDocs = (query) => todoModel.find(query)
const checkExited = (query) => getDocs(query).then((rowRes) => rowRes.length > 0)
const createDOC = (query) => todoModel.create(query)

// 每个接口对应的数据操作逻辑
module.exports = {
  get: (req, res) => {
    const { sortBy } = req.query
    getDocs()
      .sort(sortBy ? JSON.parse(sortBy) : { updateTime: -1 })
      .then(dbData => {
        res.send(handleSuccess(dbData));
        res.end();
      })
  },
  create: (req, res) => {
    const {action} = req.body
    const curTime = new Date().getTime()
    checkExited({ action })
      .then(hasExited => {
        if (hasExited) return res.send(handleError('已存在输入的内容！'))
        createDOC({
          action: action,
          updateTime: curTime,
          createTime: curTime
        }).then(rowRes => {
          res.send(handleSuccess(rowRes))
        })
      })
  },
  update: (req, res) => {
    const {params, body} = req
    const {action} = body
    const updateParam = { action: action, updateTime: new Date().getTime() }
    const options = {
      rawResult: true,
      new: true,
      useFindAndModify: false
    }
    checkExited({ action })
      .then(hasExited => {
        if (hasExited) return res.send(handleError('已存在输入的内容！'))
        todoModel.findByIdAndUpdate(
          params.id,
          updateParam,
          options,
          (err, rowRes) => {
            // console.log('update-', err, rowRes);
            if (!err) {
              res.send(handleSuccess(rowRes))
            } else {
              res.send(handleError('编辑失败'))
            }
          })
      })
  },
  delete: (req, res) => {
    const body = req.body
    // 删除一条记录
    todoModel.deleteOne({ _id: body.id }).then((rowRes) => {
      // console.log('rowRes:', rowRes)
      if (rowRes.deletedCount > 0) {
        res.send(handleSuccess(rowRes))
      } else {
        res.send(handleError('删除失败'))
      }
    })
    // 删除一批记录
    // todoModel.deleteMany({}).then()
  }
}