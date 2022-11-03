// var a = 100
// console.log('a ok');
// console.log(this === module.exports);
// module.exports = a


// 内部会将module.exports 直接导出


/* console.log(module.exports === exports, this === exports); // this指代的是当前模块的导出对象
module.exports = 'hello' // 更改 module.exports 优先级最高的，因为最终会将 module.exports 直接导出
exports.a = 'hello'
this.b = 'world' */

/**
 * function(){
 * let exports = module.exports = {}
 * exports.a = "hello"
 * exports.b = "world"
 * return module.exports
 * }
 */

// exports 就是module.exports 一个别名起到了简化的作用
// 如果有多个方法 需要一个个导出可以采用exports
exports.a = 1
module.exports.b = 2
global.a = 100 // 这种方式不建议使用，非常重要的东西，你还懒的导入 可以使用在global上赋值

/* exports.fn1 = function () {

}
exports.fn2 = function () {

}
module.exports = {
  fn1 () { },
  fn2 () { }
} */