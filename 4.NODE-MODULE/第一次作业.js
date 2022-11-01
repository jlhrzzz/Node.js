// 1  同一个promise只能改变一次状态
let p = new Promise(function (resole, reject) {
  reject()
  resole()
})
p.then(function () {
  console.log('成功');
}, function () {
  console.log('失败');
})

// 2 
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve() // resolve 和 reject 没有终止代码执行的功能
  console.log(2);
})
promise.then(() => {
  console.log(3);
})

// 3
Promise.resolve(1) // new Promise(resolve,reject)=>resolve(1)
  .then(res => 2)
  .catch(err => 3) // .then(null,err=>3)
  .then(res => console.log(res))

// 4
Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => { throw new Error('My Error') })
  .catch(() => { throw 'xxx' }) // catch中返回普通值 会作为下一次的成功
  .then((x) => x + 1)
  .then((x) => console.log(x))
  .catch(console.error)

// 5
async function async1 () {
  console.log('async1 start'); //2
  await async2() // async2().then(()=>{})
  console.log('async-next'); //6
}
async function async2 () {
  console.log('async2'); //3
}
console.log('script start'); //1
setTimeout(function () {
  console.log('setTimeout'); //8
}, 0);
async1()
new Promise(function (resolve) {
  console.log('promise1'); //4
  resolve()
}).then(function () {
  console.log('promise2'); //7
})
console.log('script end'); //5

// async 返回的是一个 promise ， await 相当于 yield + co => 调用then方法，做了一次延迟

// 6
Promise.resolve().then(() => { // then1
  console.log('then1'); //1
  Promise.resolve().then(() => {
    console.log('then1-1'); //2
    return Promise.resolve() // 如果then中的方法返回了一个promise 会发生什么？
  }).then(() => {
    console.log('then1-2'); //6
  })
})
  .then(() => {
    console.log('then2'); //3
  })
  .then(() => {
    console.log('then3'); //4
  })
  .then(() => {
    console.log('then4'); //5
  })
  .then(() => {
    console.log('then5'); //7
  })

// 微任务队列 [x.then,then3,then1-2,then4]
// then1 then1-1 then2 then3 then1-2 then4 then5