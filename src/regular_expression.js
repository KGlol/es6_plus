/* 
  正则
  - 正则使用双斜杠//或者创建RegExp对象，不使用new 
  - 全局查找，从剩余位置的第一个位置开始匹配，只要没有没有匹配到则下次从头开始匹配
  
  * i 忽略大小写
  * m 多行匹配
  * g 全局匹配
  * s dotAll模式，匹配任意字符
  * . 表示换行符、回车、行分隔符、段落分隔符以外的所有字符
  * y修饰符，粘连修饰符
  * u修饰符，unicode编码匹配  
  * 具名组匹配使用<?name>具名组匹配，可以在groups.name直接获取匹配结果,必须包裹在括号里
  * 先行/后行断言(一般括号包裹，以?号开头)
  *  - 先行 ?= // 先行否定 ?!
  *  - 后行 ?<= // 后行否定 ?<!
*/

// ! 正则对象是有状态的，exec方法会对多次匹配结果进行逐条遍历(按顺序每次返回一个匹配结果)

/* dotAll */
const reg1 = /./
console.log(reg1.test('\n')); // 换行符 false
console.log(reg1.test('\r')); // 回车符 false
console.log(reg1.test('\u{2028}')); // 行分隔符 false
console.log(reg1.test('\u{2029}')); // 段落分隔符 false

const reg2 = /./s // dotAll匹配任意字符
console.log(reg2.test('\n')); // 换行符 false
console.log(reg2.test('\r')); // 回车符 false
console.log(reg2.test('\u{2028}')); // 行分隔符 false
console.log(reg2.test('\u{2029}')); // 段落分隔符 false

/* matchAll 必须和g全局查询配合，和exec一样有捕获组，包含子表达式的匹配结果 */


/* 具名组匹配 */
const reg3 = /(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})/.exec('2021-09-12')
console.log(reg3.groups);
console.log(reg3.groups.year);
console.log(reg3.groups.month);
console.log(reg3.groups.date);

/*
  断言
*/
const str = 'ecmascript-ecmaxxxx-'
// 先行断言
console.log(str.match(/(?<res>ecma(?=script))/));
console.log(str.match(/ecma(?!script)/));
// 后行断言
console.log(str.match(/(?<=script-)ecma/));
console.log(str.match(/(?<!script-)ecma/));

console.log(/\d+(?!.)/.exec(3.141)) // 匹配到141
console.log(/\d+(?!\.)/.exec(3.141)) // 匹配到141
console.log(/(?<=Jack|Tom)Sprat/i.exec('jacksprat'));