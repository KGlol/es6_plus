/*
  Iterator(遍历器)
  - 一种接口机制，为各种不同的数据结构提供统一访问机制
  - 主要供for...of消费
  - 两个概念：
    * 可迭代协议：含有Symbol.iterator生成器函数
    * 迭代器函数：return { next() {return { value, done }} }
    * ! 使一个不可遍历对象可遍历的方法是使其具有可遍历协议和可迭代协议
  - 具备Iterator接口的数据结构
    * Array
    * Map
    * Set
    * String
    * TypedArray
    * 函数的arguments对象
    * NodeList对象(dom)
  - 异步迭代
    ES9中加入异步迭代for await of
    * 可迭代协议为含有Symbol.asyncIterator
    * 可遍历协议的next返回Promise的值为{value, done}
  - 总结：使不支持遍历的数据结构"可遍历"
*/

function makeIterator(arr) {
  let nextIndex = 0
  return {
    next() {
      return nextIndex < arr.length ? {
        value: arr[nextIndex++],
        done: false
      } : {
        value: undefined,
        done: true
      }
    }
  }
}

let iterator = makeIterator(['a', 'b', 'c', 'd'])
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())


// ! js中的可遍历对象，原型链上都含有Symbol(Symbol.iterator)迭代器方法
// 所以对于可遍历对象，可以直接获取其迭代器，进行迭代
const arrForIterator = [1, 2, 3, 4]
// 获取生成器函数
const iteratorOfArr = arrForIterator[Symbol.iterator]
console.log(iteratorOfArr); // 输出生成器函数ƒ values() { [native code] }
// console.log(iteratorOfArr().next()) // 变量保存生成器函数，再执行，报错
// 获取迭代器
const iteratorResOfArr = arrForIterator[Symbol.iterator]()
console.log(iteratorResOfArr.next())
console.log(iteratorResOfArr.next())
console.log(iteratorResOfArr.next())


// ! 使不可遍历对象可遍历的方法
// 使其具有可遍历协议(Symbol.iterator属性)和可迭代协议(Symbol.iterator方法含有next结构的方法)
const obj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
}
obj.__proto__[Symbol.iterator] = function () {
  const that = this
  const keys = Reflect.ownKeys(this)
  // ? 作用域问题
  let index = 0
  return {
    next() {
      return index < keys.length ? {
        value: that[keys[index++]],
        done: false
      } : {
        value: undefined,
        done: true
      }
    }
  }
}

const objIterator = obj[Symbol.iterator]()
console.log(objIterator.next());
console.log(objIterator.next());
console.log(objIterator.next());
console.log(objIterator.next());

// ! 此时obj已经可以直接使用for of遍历
for (const value of obj) {
  console.log('自定义迭代器协议的对象可遍历键值', value);
}


// 上面的方法也可以使用生成器实现，不必再手写迭代器协议
const objForGenerator = {
  generatorKey1: 'generatorKey1',
  generatorKey2: 'generatorKey2',
  generatorKey3: 'generatorKey3',
  generatorKey4: 'generatorKey4',
}
objForGenerator.__proto__[Symbol.iterator] = function* () {
  const keys = Reflect.ownKeys(this)
  for (let key of keys) {
    yield this[key]
  }
}
const generatorOfIt = objForGenerator[Symbol.iterator]()
console.log(generatorOfIt.next());
console.log(generatorOfIt.next());
console.log(generatorOfIt.next());
console.log(generatorOfIt.next());
console.log(generatorOfIt.next());

for (let value of objForGenerator) {
  console.log('使用生成器Generator实现的对象可遍历键值', value);
}

// 异步迭代
const asyncBase = time => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ value: time, done: false })
  }, time);
})
const asyncArr = [asyncBase(1000), asyncBase(2000), asyncBase(3000)]
// 添加可迭代协议
asyncArr[Symbol.asyncIterator] = function () {
  let nextIndex = 0
  return {
    next() {
      return nextIndex < asyncArr.length
        ? asyncArr[nextIndex++] : Promise.resolve({ value: undefined, done: true })
    }
  }
}
async function asyncFor() {
  for await (const item of asyncArr) {
    console.log(item);
  }
}
asyncFor()