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

// padStart(填充后的字符串长度，要填充的字符), padEnd() 填充
// * 若指定长度小于或等于原字符长度，则返回原字符串
// 应用：日期填充0
const now = new Date(),
  year = now.getFullYear(),
  month = (now.getMonth() + 1).toString().padStart(2, 0),
  day = (now.getDate()).toString().padStart(2, 0),
  str = `${year}-${month}-${day}`

console.log(str);

// 应用：手机号/银行卡星号
const tel = '17717421070'
const formattedTel = tel.slice(-4).padStart(tel.length, '*')
console.log(formattedTel);

// trimStart()、 trimEnd()、trimRight()、trimLeft()
const str_for_trim = ' kkk '
console.log(str_for_trim.trimStart());
console.log(str_for_trim.trimLeft());


// ES11 引入的matchAll


