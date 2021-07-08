/* JSON对象的方法 */
// stringfy 第二个参数用于处理键值对，返回undefined，则不会忽略该键值对，可为函数/数组；
// 第三个参数指定缩进空格数
const obj = { name: 'name', age: '11', count: 222 }
const replaceFunc = (key, value) => {
  if (key === 'name') { return undefined }
  if (typeof value === 'number') { return 0 }
  return value
}

const remainkeys = ['name', 'age'];
console.log(JSON.stringify(obj, replaceFunc)); // {"age":"11","count":0}
console.log(JSON.stringify(obj, remainkeys)); // {"name":"name","age":"11"}

// ! 问题：
  // 1. undefined，Object，Symbol的值都会丢失，可以使用replacer处理函数处理
  // 2. 使用Symbol为键名的属性会被完全忽略，无法处理 
  // 4. NaN，Infinity的属性值会被处理成null
  // 3. 循环应引用的对象会报错