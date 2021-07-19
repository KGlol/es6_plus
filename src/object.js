/* 对象的一些方法 */

// 1. Object.is() 精确比较 
Object.is(NaN, NaN) // true
Object.is(+0, -0) // false
NaN === NaN // false
  + 0 === -0 // true

// 2. in 对象数组是否有某键名/对应index位置是否有值
const obj = { key1: '1', key2: '2' }
const arr = [1, 2, 3, 4]
console.log('key1' in obj); // true
console.log(7 in arr); // false
console.log(Reflect.has(obj, 'key2'));
console.log(Reflect.has(arr, 3));

// 3. 遍历对象
// forin
for (let key in obj) { console.log(key); }
// Object.getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj))
// Reflect.ownKeys
console.log(Reflect.ownKeys(obj))
/*          - forin 无法遍历key为Symbol的属性

*/

/* 
Map
*/
const boj_0 = { key: 'value' }
const boj_1 = Symbol('1')
const map = new Map()
map.set(boj_0, '111')
map.set(boj_1, Symbol('11'))
console.log(map);
console.log(map.has(boj_0));
console.log(map.get(boj_1));

const map_1 = new Map([['name', 'value'], ['age', Symbol('age')]])
console.log(map_1);

/* 
  ES8中的对象扩展
  - Object.values()
  - Object.entries()
  - Object.getOwnPropertyDescriptors(obj) 对象自身属性描述符
  - Object.getOwnPropertyDescriptor(obj, key) 获取对象指定自身属性描述
  - Reflect没有此属性
    * value 值
    * writable 是否可修改
    * enumerable 是否可for in遍历
    * configurable 是否使用delete删除
    * 如果defineProperty时没有设置上述属性，则默认未设置属性为false
  ES10的对象扩展
  - Object.fromEntries()， Object.entries的逆操作
  * 可用于将map直接转化为对象
  * 可将对象entries为数组进行处理，再Object.fromEntries()转化回对象
*/

const obj_1 = {
  name: 'name',
  age: 'age'
}

console.log(Object.getOwnPropertyDescriptors(obj_1))

const obj_2 = {}

Reflect.defineProperty(obj_2, 'name', {
  value: 'name',
  writable: false,
  configurable: false,
  enumerable: false,
})
console.log(Object.getOwnPropertyDescriptors(obj_2));
// obj_2.name = 'age' // 报错
Reflect.deleteProperty(obj_2, 'name')
console.log(obj_2);

for (const key in obj_2) {
  // const element = obj_2[key];
  console.log(key);
}

const obj_3 = {}

console.log(Reflect.defineProperty(obj_3, 'name', {}))
console.log(obj_3);

/*
  展开和剩余操作符
  - 展开操作符并非深拷贝
  - 剩余操作符也不是深拷贝
*/
const obj_10 = {
  key1: 'key1',
  obj1: { name: 'name' }
}
const obj_10_copy = { ...obj_10 }
const { ...obj_10_rest } = obj_10
obj_10.obj1.name = 'notname'
console.log(obj_10_copy);
console.log(obj_10_rest);

/*
  ES10中的对象扩展
  * Object.fromEntries() Object.entries的逆操作，也可以将map转化成对象
*/

// 逆操作
const obj_for_entries = { key: 'key', name: 'name' }
const obj_from_entries = Object.fromEntries(Object.entries(obj_for_entries))
console.log(obj_from_entries); // 还是原对象
console.log(obj_from_entries === obj_for_entries); // false
// map转化为对象
const map_0 = new Map()
map_0.set('key', 'key')
map_0.set('name', 'name')
console.log(Object.fromEntries(map_0))
// 过滤对象属性(转化成数组再转化回对象)
const obj_100 = {
  math: 100,
  english: 60,
  chinese: 80
}
// 过滤所有大于80的属性
const res = Object.entries(obj_100).filter(([key, value]) => +value > 80)
console.log(Object.fromEntries(res));
