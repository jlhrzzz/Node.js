// 默认执行文件 使用node来执行，他会把这个文件当成一个模块 默认把this给修改了

// console.log(this); // {}

// 在前端中访问变量就是通过window属性，但是在后端中  想访问全局需要通过global

// clearInterval clearTimeout
// queueMicrotask
// clearImmediate setImmediate 自己实现 ie下也有这两个方法

// (function () {
//   console.dir(global, { showHidden: true });
// })()

//掌握一些node新增的能通过global直接访问的属性 全局属性
// Buffer node 中的二进制对象 （最早的时候浏览器不能直接读取文件）
// __dirname __filename
/* console.log(__dirname); // 当前文件执行时的目录 是死的 (绝对路径)
console.log(__filename); // 文件自己的绝对路径 */

/* process
1.platform (win32) mac => (darwin)
2.chdir 一般不用
3.cwd current working directory 当前工作目录 可以改变的 webpack会自动查找运行 webpack的目录下查找 webpack.config.js
4.env 执行代码时传入环境
5.argv 执行时代码时传入的参数
6.nextTick */

// .env文件

/* if (process.env.NODE_ENV === 'development') {
  console.log('dev');
} else {
  console.log('prod');
}
// [执行node所在的exe文件，当前执行的文件,..其他参数]
console.log(process.argv); // 会根据用户传递的参数来解析 生成对应的功能 */

/* let argv = process.argv.slice(2).reduce((memo, current, index, arr) => {
  if (current.startsWith('--')) {
    memo[current.slice(2)] = arr[index + 1]
  }
  return memo
}, {})
console.log(argv); */

// // cli => 交互式 需要用户传入参数 commander, args
/* const { program } = require('commander');
program.option('-p,--port <n>', 'set user port')
program.option('-f,--file <n>', 'set user directory')
program.command('create').description('创建项目').action(() => {
  console.log('创建项目');
})
program.parse(process.argv); */

/* const options = program.opts();
if (options.port) {
  // 开启个本地服务
}
console.log(options); */

// 后面开发一个脚手架，运行工具都会使用

// nextTick node中自己实现的 不属于node中的 EventLoop 优先级比promise更高

/* Promise.resolve().then(() => {
  console.log('promise');
})

process.nextTick(() => { // 当前执行栈的底部
  console.log('nextTick');
})
 */
// 文件操作 readFile writeFile

// 当前默认执行主栈代码，主栈执行完毕后，要执行定时器，但是定时器可能没有到达时间

// poll阶段
// 1.检测Poll队列中是否为空，如果不为空则执行队列中的任务，直到超时或者全部执行完毕。
// 2.执行完毕后检测setImmediate队列是否为空，如果不为空执行check阶段，如果为空则等待时间到达。时间到达后回到timer阶段
// 3.等待时间到达是可能会出现新的callback，此时也在当前阶段被清空

/* const fs = require('fs')
fs.readFile('./note.md', 'utf8', () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);

  setImmediate(() => { // 异步方法
    console.log('setImmediate');
  })
}) */

// 浏览器的特点时 先执行栈中代码，清空后会执行微任务 => 取出一个宏任务来执行 不停的循环
// node先执行当前执行栈代码，执行完毕后 会进入到事件环中 拿出一个来执行，每执行完毕后会清空微任务 (nextTick promise.then) (早期有区别 11+) node中的队列是多个，其他和浏览器一样
// 因为新版要和浏览器表现形式一致

/* setTimeout(() => {
  console.log('timeout1');
}, 0);
Promise.resolve().then(() => {
  console.log('then');
}) */

// global 上有属性直接访问的 叫全局属性
// require exports module 也可以直接访问 他们不在global上
// 每个文件都是一个模块，模块化的实现借助的是 函数
// 函数中有参数 参数里面有 五个属性 __dirname __filename

// 模块化规范 ~ commonjs规范 amd cmd esm模块 umd systemJs
// 为什么要有模块化
// 为了解决命名冲突问题 ("单列模式" 不能完全解决这些问题)
// 用文件拆分的方式 配合 IIFE（立即调用函数表达式） 子执行函数来解决
// 前端里会有 请求的问题 依赖问题 (amd cmd)

// umd 兼容amd 和 cmd + commonjs 不支持es6模块

// commonjs规范 (基于文件读写的 如果依赖了某个文件我会进行文件读取) 动态的
// 一个文件就是一个模块
// 我想使用这个模块我就require
// 我想把模块给别人用module.exports导出

// esModule规范 (每次你引用一个模块，发请求) 静态的 靠 webpack编译  vite 就是靠发请求对请求进行劫持 ,进行转义实现的
// es6 => 一个文件一个模块
// 别人要用我，我就需要export
// 我要用别人我就import

// es6Module / umd模块 webpack tree-shaking