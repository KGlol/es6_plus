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