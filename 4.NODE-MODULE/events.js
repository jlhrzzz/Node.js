function EventEmitter () {
  this._events = {}
}
EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {
    this._events = {}
  }
  if (this._events[eventName]) { //[女生失恋:[fn1.fn2]]
    this._events[eventName].push(callback)
  } else { // [女生失恋:[fn1]]
    this._events[eventName] = [callback]
  }
}
EventEmitter.prototype.emit = function (eventName, ...args) {
  this._events[eventName].forEach(fn => {
    fn(...args)
  })
}
EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events && this._events[eventName]) {
    // 如果存储的方法 和 传入的不一样就留下，一样的就不要了
    this._events[eventName] = this._events[eventName].filter(fn => fn !== callback && fn.l !== callback)
  }
}
EventEmitter.prototype.once = function (eventName, callback) {
  const one = () => { // 绑定执行完毕后移除
    callback() // 切片编程 就是增加逻辑
    this.off(eventName, one)
  }
  one.l = callback // 自定义属性
  this.on(eventName, one)
}
module.exports = EventEmitter