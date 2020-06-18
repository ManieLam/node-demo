const express = require('express');
const Router = express.Router();
const Api = require('./api')

/* Router */
// const baseUrl = '/action'
Router.get('/list', Api.get)
Router.post('/create', (req, res, next) => {
  const { action } = req.body
  Api.checkExited({ action }).then(hasExited => {
    if (hasExited) {
      return res.send({
        code: -1,
        message: '已存在输入的内容！',
        data: null
      })
    } else {
      next()
    }
  })
}, Api.create)
Router.delete('/delete', Api.delete)
Router.put('/update/:id', Api.update)

module.exports = Router
