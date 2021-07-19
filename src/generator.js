/*
  迭代器(Generator)
  - 由生成器执行获得迭代器
  - 异步编程的解决方案之一
  - 生成器特点function和函数名之间有'*'
  - 需要手动执行next()，返回对象{value: 返回值, done: 后面是否还有yield语句}，不会自动执行
  - yield语句只能在generator内直接使用，在外部或者generator内部的其它函数之内都不能使用
  - next()可传递参数，此参数指定上一条yield执行的返回值
  - 与普通函数的区别：
  * 由于直接执行返回的生成器对象，不能做为构造函数使用
  * generator需要next()执行，可以暂停
  - 方法
  * Generator.prototype.next() 返回一个由 yield表达式生成的值。
  * Generator.prototype.return(x) 返回给定的值并结束生成器 {value: x, done: true}。
  * Generator.prototype.throw() 向生成器抛出一个错误。
*/

function* foo() {
  for (let i = 0; i < 2; i++) {
    // 可以执行
    console.log(i);
    // yield只能在generator内使用
    yield i
  }
}

// 初始化（执行生成器函数生成器的迭代器）
const f = foo()
// 执行
console.log(f.next()); // {value: 0, done: false}
console.log(f.next()); // {value: 1, done: false} 
console.log(f.next()); // {value: undefined, done: true}
console.log(f.next()); // {value: undefined, done: true} 


// next的参数和yield的返回值
function* gen(x) {
  let y = 2 * (yield x + 1)
  let z = yield y / 3
  return x + y + z
}

const g = gen(5)
// 执行x+1，由于next()未传参数，此时yield(x + 1)的返回值是undefined
console.log(g.next());// {value: 6, done: false}
// 上一次yield执行返回undefined，则y = 2 * undefined，执行undefined/3，返回NaN， 同理yield(y / 3)的返回值是undefined
console.log(g.next());// {value: NaN, done: false}
console.log(g.next());// {value: NaN, done: true} // 

// console.log(g.next());
// console.log(g.next(3)); // y = 2 * 3 yield执行结果{ value: 2, done: false }
// console.log(g.next(10)); // z = 10，yield执行结果{ value: 5+6+10, done: true }


// 实践：每次获取7的倍数
function* getFold(target) {
  for (let i = 1; i < Infinity; i++) {
    !(i % target) && (yield i)
  }
}

const getSevenFold = getFold(7)
console.log(getSevenFold.next().value);
console.log(getSevenFold.next().value);
console.log(getSevenFold.next().value);
console.log(getSevenFold.next().value);

// 实践：使用generator实现异步请求
function request() {
  return null
  ajax(url, res => {
    // 请求操作...
    // 执行迭代，传入返回值
    getData.next(res)
  })
}
// 定义生成器
function* genForRequest() {
  const res1 = yield request()
  console.log(res1);
  const res2 = yield request()
  console.log(res2);
  const res3 = yield request()
  console.log(res3);
}
// 获得迭代器
const getData = genForRequest()
getData.next()


function* gen2() {
  while (true) {
    var value = yield null;
    console.log(value);
  }
}

var g2 = gen2();
console.log(g2.next(1))
// "{ value: null, done: false }"
console.log(g2.next(2))
// 2
// "{ value: null, done: false }"


function* fibonacci() {
  var a = yield 1;
  console.log(a);
  yield a * 2;
  yield a * 3;
}

var it = fibonacci();
console.log(it);          // "Generator {  }"
console.log(it.next());   //  {value: 1, done: false}
console.log(it.next(10));   //  {value: 20, done: false}
console.log(it.return(10)); // {value: 10, done: true}
console.log(it.next(10)); // {value: undefined, done: true}
console.log(it.next()); // {value: undefined, done: true}