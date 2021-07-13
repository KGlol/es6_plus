/*
  promise
  - 重点是对异步操作的状态管理(fulfilled、rejected、pending)
  - reject时可以使用then的第二个参数传回调，也可以直接catch获取传回调
  - 一旦确定最终状态，便会凝固，不能在改变
  - 静态方法
    *resolve(返回Promise)
    *reject(返回Promise)
    *all(只要有一个失败，则直接走失败，其他成功也不行，一个实践->多图片上传)
    *race(实践：上传图片并设置一个超时Promise，只要超时则失败)

    问题：Promise的reject和catch有什么区别？
    * 概念上：reject是Promise的静态方法，then和catch是Promise的实例方法
    * catch是then的语法糖，实际上还是通过then实现的
    - Promise.prototype.catch = function(fn){
        return this.then(null,fn);
      }
    * 错误的捕获是就近的，then的第二个回调存在则由这个回调处理，catch捕获不到；
    作为Promise参数的reject函数与catch的区别？
    * catch是实例方法
    * catch可以在链式调用的最后获取所有异常
    * 断网情况会走catch

*/

const p_resolve = new Promise((resolve, reject) => {
  setTimeout(() => resolve('resolve'), 1000)
})

const p_reject = new Promise((resolve, reject) => {
  // setTimeout(() => throw new Error('error'), 1000)
  throw new Error('error').message
})

const p_static = new Promise((resolve, reject) => {
  setTimeout(() => resolve('resolve'), 1000)
  setTimeout(() => reject('reject'), 1000)
})

p_resolve.then(res => console.log(res))
p_reject.then(null, res => console.log(res))
// 或
p_reject.catch(err => console.log(err))

p_static.then(res => console.log(res), err => console.log(err)) // 仅输出resolves

