const EventEmitter = require('events')
const fs = require('fs')
class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    // 放在实例上
    this.path = path
    this.flags = options.flags || 'r'
    this.encoding = options.encoding || null
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end
    this.highWaterMark = options.highWaterMark || 64 * 1024

    this.open() // 文件打开操作 注意这个方法是异步的

    // 主要用户监听了data事件 才需要读取
    this.on('newListener', function (type) {
      if (type === 'data') {
        this.read()
      }
    })
  }
  read () {
    // 希望在open之后才能拿到 fd
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read())
    }
    console.log(this.fd, 'xxx');
  }
  destroy (err) {
    if (err) {
      this.emit('error', err)
    }
  }
  open () {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.destroy(err)
      }
      this.fd = fd
      this.emit('open', fd)
    })
  }


}
module.exports = ReadStream