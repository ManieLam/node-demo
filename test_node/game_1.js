/* console.info(Date)
console.info(Math)
console.info(setImmediate)

// 特殊命名方式
console.log(__filename);
console.log(__dirname);

// 当前环境进程信息
console.log(process); */
/** 实现石头剪刀布游戏 */
// console.log(process.argv);
var player = process.argv[process.argv.length - 1];
console.log(player);

var random = Math.random() * 3
// console.log('random:', random);

if (random < 1) {
  var computer = 'rock'
} else if (random > 2) {
  var computer = 'scissor'
} else {
  var computer = 'boo'
}

if (computer === player) {
  console.log('平局');
} else if (
  (computer === 'rock' && player === 'scissor') ||
  (computer === 'scissor' && player === 'boo') ||
  (computer === 'boo' && player === 'rock')
) {
  console.warn('你输了');
} else {
  console.log('你赢了');
}