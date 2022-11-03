// let result = require('./a')
// console.log(a);

// 1.核心模块、内置模块 node中自带的
/* // 2.文件模块 引用都是相对路径

（会判断路径是不是核心模块，是核心模块就不做这些事了）看下是不是第三方 如果不是再继续，文件模块的查找规范：  最新：默认查找先查找同名文件，如果没找到尝试添加查找.js 和 .json文件，如果再没有就查找同名文件夹（当成了一个包），先查找package.json 如果没有那就找 index.js 如果还没有就报错了   老版本：会先查找包（有package.json）如果没有 package.json 会查找文件（废弃了） */

// const jquery = require('./jquery')
// console.log(jquery);

// 3.第三方模块 (安装的包都得有描述信息，否则无法上传) (引用也是没有相对路径 1.全局模块 2.代码中的第三方模块 )
// 默认会沿着当前目录向上查找，查找 node_modules 下的同名文件夹，根据（package.json 中的 main）=> index.js 中查找， 如果没找到就向上查找 查找上级的 node_modules ，如果到根路径还没有找到就报错了
let r = require('co')
console.log(module.paths); // 查找路径

// 1.包的安装 1) 全局模块 => 安装到电脑中的npm下
// npm => node package manager (不要使用cnpm 安装模块，无法锁定版本，会出现很多的问题)

// 3n 模块 npm (nrm node registry manager) (nvm node version manager) nvm-win
// nrm user taobao
// nrm user npm
// nrm user cnpm

// npm默认在电脑的环境变量里 所以可以直接使用, 安装的全局模块都在npm下生成了一个快捷方式
// 只能在命令行里用

// 全局安装只能在命令行用，自己实现全局包 1.需要配置bin命令 2.添加执行方式 #! /usr/bin/env node 3.将此包放到npm下 (可以全局安装) 临时做一个npm link(为了调试方便)

// 工具类的使用全局包

// 2）本地安装，在代码中使用
// 依赖关系 (开发依赖 生产依赖 同等依赖) 打包依赖 可选依赖
// npm install 模块 --save --save-dev