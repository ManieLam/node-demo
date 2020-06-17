// 观察者模式 - 1.关键在于“不知道被统治者的存在”，2.“没有人监听还能继续下去”
const EventEmitter = require('events')

class Geektime extends EventEmitter {
  constructor () {
    super();
    setInterval(() => {
      this.emit('newLesson', {price: Math.random() * 100})
    }, 3000);
  }
}
const geekTime = new Geektime

geekTime.addListener('newLesson', (res) => {
  const {price} = res
  if (price > 50 && price < 80) {
    console.info('新课程！！', res)
  }
})


