// 前端是无法直接读取文件 操作文件 (node是使用在服务端的)
// 对文件和前端传递的数据进行处理
// 进制数据 所有内容都是以二进制来存储的

// 最终数据都是以二进制来存储的 所以会出现不精确的情况

// 二进制 十进制的区别 十进制中最大的是9 二进制中最大的是1
// 我们以字节为单位来存储数据 

// 其他进制中如何转换成十进制 当前位的值 * 进制^当前所在位 ， 把每一位进行相加
let sum = 0
for (let i = 0; i < 8; i++) {
  sum += Math.pow(2, i)
}
// 每个字节最大时255，十六进制，八进制
console.log(sum);

// 将一个十进制 转换成二进制 ? 取余数倒着读 就可以获取对应的进制

console.log(parseInt('101', 2)); // 把任意进制转换成十进制
// 0b 二进制 0x 十六进制
console.log((0x64.toString(2))); // 将任何进制转换成任意进制 (字符串)

// 小数也要转换成二进制

// 十进制的 0.5 是二进制中的多少?

// 十进制的 0，5 就是 二进制的0.1   乘二取整法可以将一个小数 转换成二进制数

// 0.1 * 2 = 0.2 0
// 0.2 * 2 = 0.4 0
// 0.4 * 2 = 0.8 0
// 0.8 * 2 = 1.6 1
// 0.6 * 2 = 1.2 1

console.log(0.1 + 0.2); // 进制转化的问题 ? 0.2 + 0.2 那如果出现了精度问题你要如何解决？
// js是没有 把小数转换成二进制的方法

// 在服务端，我们需要一个东西可以来标识内存，因为字符串无法标识图片
// node中用Buffer来标识内存的数据 他把内容转换成了十六进制来显示

// buffer每个字节的取值范围就是 0 - 0xff

// node中buffer可以和字符串任意的转换 (可能会出现乱码)

// 编码规范 ASCII => GB18030/GBK => unicode => UTF8 编码的发展史

// Buffer代表的是内存，内存是一段 "固定空间"，产生的内存是国定大小，不能随意添加
// 扩容的概念，需要动态创建一个新的内容，把内容迁移过去

// npm install @types/node 可以支持node提示 (仅仅是安装了ts的提示而已，为了方便)
const buffer1 = Buffer.alloc(5)
console.log(buffer1); // 像数组 (但是和数组有区别)，数组可以扩展，buffer不能扩展，可以用索引取值

// 此方法用的非常少，我们不会直接填十六进制
const buffer2 = Buffer.from([0x25, 0x26, 0x64]) // 超过255 会取余
console.log(buffer2);

const buffer3 = Buffer.from('小林') // 6个字节
console.log(buffer3);

// 一般情况下，我们会用alloc来声明一个buffer，或者把字符串转换成buffer使用
// 后台获取的数据都是buffer，包括后面的文件操作也都是buffer形式

// buffer的使用 。 无论是二进制还是十六进制他们表现的东西都是一样的

// base64编码，在后期使用的过程中用的非常多 (base64 没有加密功能) 所有人都知道这个规范
// 加密 => 解密
// base64 可以字符串放到任何路径的链接里 (可以减少请求的发送) 文件大小会变大 (如果采用base64 他的缓存会依赖文件) ，base64转化完毕后会比之前的文件大 1/3

const r = Buffer.from('林') //可以调用toString转化成指定的编码

// base64 的来源就是将每个字节都转化成 小于64的值
console.log(0x37.toString(2));

console.log(parseInt('110111', 2));

// 0-63 取值范围是 64
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLocaleLowerCase()
str += '0123456789+/'
console.log(str[57] + str[56] + str[62] + str[32]); // 54+g 没有加密功能



// 回到buffer toString('utf8'/'base64')

// alloc from

// slice
/* const buffer4 = Buffer.from([1, 2, 3, 4, 5]) // 内部存的是引用地址
let sliceBuffer = buffer4.slice(0, 1)
sliceBuffer[0] = 100
console.log(buffer4);

---------------

let arr = [[1], 2, 3, 4]
let newArr = arr.slice(0, 1) // 二维数组的slice 相当于buffer，数组中存的是引用地址slice是浅拷贝
newArr[0][0] = 100
console.log(arr);*/

// 实现非递归版本的深拷贝

// copy 可以将buffer的数据拷贝到另一个buffer上 (一般用不到，concat是基于copy的)
/* let buf0 = Buffer.from('林')
let buf1 = Buffer.from('一')
let buf2 = Buffer.from('二')

Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
  for (let i = sourceStart; i < sourceEnd; i++) {
    targetBuffer[targetStart++] = this[i]
  }
}
let bigBuffer = Buffer.alloc(12) // === new Buffer(12)
buf0.copy(bigBuffer, 6, 0, 6)
buf1.copy(bigBuffer, 0, 0, 3)
buf2.copy(bigBuffer, 3) // 默认后两个参数不用传递
console.log(bigBuffer.toString()); */

// concat 
let buf0 = Buffer.from('林')
let buf1 = Buffer.from('一')
let buf2 = Buffer.from('二')
Buffer.concat = function (bufferList, length = bufferList.reduce((a, b) => a + b.length, 0)) {
  let bigBuffer = Buffer.alloc(length)
  let offset = 0
  bufferList.forEach(buf => {
    buf.copy(bigBuffer, offset)
    offset += buf.length
  })
  return bigBuffer
}
// http 数据是分包传递的，把每段数据进行拼接
let bigBuf = Buffer.concat([buf0, buf1, buf2], 100);

// isBuffer 
console.log(Buffer.isBuffer(bigBuf));
// buffer.length
console.log(bigBuf.byteLength, bigBuf.length, Buffer.from('a').length);