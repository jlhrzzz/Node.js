const EventEmitter = require('./events')
const util = require('util')

function Girl () {

}

util.inherits(Girl, EventEmitter) // 原型继承 需要通过实例来调用继承的方法

let girl = new Girl()

const cry = (a, b) => { // {'女生失恋',[fn1,fn2]}
  console.log('哭');
}

girl.on('女生失恋', cry)
girl.on('女生失恋', (a, b) => {
  console.log('吃');
})
const fn = () => {
  console.log('逛街');
}
girl.once('女生失恋', fn)

setTimeout(() => {
  girl.off('女生失恋', fn)
  girl.emit('女生失恋', 'a', 'b')
  girl.off('女生失恋', cry)
  girl.emit('女生失恋', 'a', 'b')
}, 1000);

// Girl.prototype.__proto = EventEmitter.prototype; //操作原型链
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype) //es6写法

// function create (proto) {
//   function Fn () { }
//   Fn.prototype = proto
//   return new Fn() // 它上面有所有EventEmitter.prototype方法
// }

// Girl.prototype = create(EventEmitter.prototype)

// Girl.prototype = Object.create(EventEmitter.prototype)
// extends es6
// 继承实例属性 继承原型属性


// 发布订阅模式 redux vue express koa webpack
// 订阅一次
// 订阅方法
// 发布方法
// 取消订阅