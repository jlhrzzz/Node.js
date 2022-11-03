// new Function + with 来实现的

// const ejs = require('ejs')
const fs = require('fs')
const util = require('util')
const read = util.promisify(fs.readFile)

let ejs = {
  async renderFile (filename, options) {
    let content = await read(filename, 'utf8')
    content.replace(/<%=()%>/)
  }
};

fn()
async function fn () {
  let r = await ejs.renderFile('template.html', { name: 'lxh', age: 22 })
  console.log(r);
};
