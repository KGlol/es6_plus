/* 字符串 */

/* 普通字符串 */
// 1. 换行
const str_normal = '32131\n123123'
console.log(str_normal);
// 2. 数字运算(括号提高优先级)
const a = 20, b = 30, c = 'str'
console.log('我的年龄是：' + (a + b) + c);

/* 模板字符窜 */
// 可嵌套

// 带标签的模板字符串(函数式的高级用法)
// 第一个参数是没有变量的字符串组成的数组，其余为变量；若以变量结尾，则a中会多包含一个空字符串
const foo = (a, b, c, d) => { console.log(a); console.log(b); console.log(c); console.log(d); }
const foo_name = 'name', foo_age = 11, foo_state = '老了';
foo`这是${foo_name}，经过了${foo_age}年光景，他${foo_state}`;
foo`这是${foo_name}，经过了${foo_age}年光景，他${foo_state}很多`;

/* 新添加的方法 */
String.fromCharCode(0x20BB7) // es5由编码转换成字符串就，仅支持0000~ffff
String.fromCodePoint(0x20BB7) // 返回'𠮷'，es6新添加由编码转换成字符串就

// includes, startsWith, endsWith
// repeat(重复拼接)
console.log('12'.repeat(2)); // 1212

