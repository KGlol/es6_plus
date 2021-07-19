/* 数组方法 */
// 1. copyWithin 复制数组的一段至指定index，并且不会改变数组长度，会改变原数组
const arr = [1, 2, 3, 4, 5]

arr.copyWithin(1, 2, 5) // target, start, end

console.log(arr); // [1, 3, 4, 5, 5]

arr.fill('11', 1, 3) // target, start, end不包含终止索引，改变原数组
console.log(arr); // [1,2,3,4,5]

// 2. entries
const iterator1 = [1, 2, 3].entries(); // 返回一个新的Array迭代器对象，迭代器对象有一个next方法，可用于遍历迭代器取得的原数组的键值对
// console.log(iterator1.next().value); // [0,1]
// console.log(iterator1.next().value); // [1,2]
// console.log(iterator1.next().value); // [2,3]
for (const e of iterator1) {
  console.log(e);
}
// [0,1]
// [1,2]
// [2,3]

// 3. 合并数组
Array.prototype.push.apply(arr, [123])
console.log(arr);
arr.push(...[9, 9, 9])
console.log(arr);

// 4, includes
// 第二个参数指定开始查找的位置
// 不能直接查找引用数据类型

/*
  flat 数组扁平化
  - 参数1，数字，扁平的深度，可传Infinity表示全部拍平
*/

/*
  flatMap
  - 遍历并并扁平化  
  - 可用于增减数组项
*/
const arr_for_flatMap = [5, 4, -3, 20, 17, -33, -4, 18]

// 去除负数，且一项奇数转化为偶数和1两项
const kk = arr_for_flatMap.flatMap(ele =>
  ele < 0 ? [] :
    ele % 2 === 0 ?
      ele :
      [ele - 1, 1]
) // [4, 1, 4, 20, 16, 1, 18]
console.log(kk);

/*
Set
 - 唯一值
 - key value相同
 - 方法： delete, add, clear, size, has, entries, keys, values
 - 属性：size
 - 遍历方式： forEach、for of
*/
// 使用Set去重
const arr3 = [1, 2, 3, 4, 53, 2, 12, 21, 1]
console.log([...new Set(arr3)]);
console.log([...new Set([...[12, 3, 4, 311, 1, 2, 1, 1, 1], ...arr3])]);
const set_1 = new Set().add({ key: 'value' })

console.log(JSON.stringify({ kkk: Symbol(), [Symbol('111')]: '111' }))

console.log(Array.from(new Set([1, 2, 3])));
// 求两个数组交集
const arr_1 = [1, 2, 3, 4, 4]
const arr_2 = [2, 3, 4, 5]
console.log(arr_1.filter(item => new Set(arr_2).has(item)));

// 数组去重
console.log(arr_1.filter((item, index, self) => self.indexOf(item) === index));
console.log(arr_1.reduce((res, item, index) => { if (!res.includes(item)) res.push(item); return res }, []));

/*
 WeakSet
 - 只能存储对象
 - WeakSet不能遍历
 - 方法和Set相同
*/


const arr_test = [1, 2, [3, [4, 5]]]

// const flatRes = []
// const flat = arr => {
//   arr.forEach(item => {
//     return item instanceof Array ?
//       flat(item) :
//       flatRes.push(item)
//   })
// }
// flat(arr_test)
// console.log(flatRes);

console.log(arr_test.flat(3));