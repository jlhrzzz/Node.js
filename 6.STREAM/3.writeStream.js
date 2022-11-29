



const fs = require('fs')
const path = require('path')

// fs.open fs.write fs.close
// let ws = fs.createWriteStream(path.resolve(__dirname, './b.txt'), {
//   flags: 'w',
//   encoding: 'utf8',
//   autoClose: true,
//   start: 0,
//   highWaterMark: 3, // 可写流的highWaterMark 和 可读流的不一样，我期望用多少内存来写
// })

// 再写入的时候 会累计写入的字节数，如果超过预期或者等于预期则返回 false，虽然超过了预期但不会影响写入
// ws.on('open', function (fd) {
//   console.log('open', fd);
// })
// ws.on('close', function () {
//   console.log('close');
// })

// let flag = ws.write('1') // string or buffer
// console.log(flag);
// flag = ws.write('1')
// console.log(flag);
// flag = ws.write('12')
// console.log(flag);
// flag = ws.write('1')
// console.log(flag);
// flag = ws.write('12')
// console.log(flag);
// flag = ws.write('1')
// console.log(flag);
// flag = ws.write('1')

// ws.end() // write + close

// 我们并发异步操作，串行异步
// 由于write方法是异步的，所以如果多个write方法同事操作一个文件，就会有出错的情况，除了第一次的write，我就将其他的排队，第一个完成后，清空缓存区，如果缓存区过大会导致浪费内存，所以我们会设置一个预期的值，来进行控制，达到预期后就不再调用write方法了

const rs = fs.createReadStream(path.resolve(__dirname, './a.txt'), {
  highWaterMark: 3 // 读取默认64K
})
const ws = fs.createWriteStream(path.resolve(__dirname, './b.txt'), {
  highWaterMark: 2 // 写入默认内存是16K，预期这么大，超过也行，只是浪费而已
})
// readFile writeFile
rs.on('data', function (data) {
  let flag = ws.write(data)
  if (!flag) {
    console.log('吃不下去了');
    rs.pause()
  }
})

ws.on('drain', function () { // 目前所以写入的数据都完毕了
  console.log('吃完了，再喂我吧'); // 接着在真实的往文件里写
  rs.resume()
})