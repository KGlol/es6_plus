/*
  Symbol
  - ES10 对于Symbol的扩展Symbol.prototype.description 获取当前Symbol的描述，该属性只读，不能修改
*/

const s = Symbol('desc')
console.log(s); // Symbol(desc)
console.log(s.description); // desc

const s_0 = Symbol('')
console.log(s_0); // Symbol()
console.log(s_0.description); // ''
console.log(typeof s_0.description); // string

const s_1 = Symbol()
console.log(s_1); // Symbol()
console.log(s_1.description); // undefined
console.log(typeof s_1.description); // undefined

