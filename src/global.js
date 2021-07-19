/*
  全局变量/对象
  - node global
  - web window self
   * 浏览器创建的窗口即为window对象，即JS运行的全局对象
   * self为窗口本身，iframe中指当前iframe，parent指上层窗口
  - globalThis ES11提供了一个标准方式去获取不同环境下的全局对象
*/

// 判断当前环境，node/web，并获取全局对象
const getGlobal = () => {
  // web
  if (typeof self !== undefined) {
    return self
  }
  // web
  if (typeof window !== undefined) {
    return window
  }
  // node
  if (typeof global !== undefined) {
    return global
  }
  throw new Error('无法获取全局对象')
}

// 直接获取全局对象
console.log(globalThis);