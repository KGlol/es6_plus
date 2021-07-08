/* 数值 */
// 十进制 -> 二级制
// es5
const num = 5
console.log(num.toString(2));

// 二进制 -> 十进制
// es5 parseInt第二个参数便是制定按照什么进制转化数字
const num_binary = 101
console.log(parseInt(num_binary, 2));

// es6 中 0B开头表示二进制，0O开头表示八进制
const num_binary_1 = 0B101
const num_octal = 0O777
console.log(num_binary_1, num_octal);

// Number的新增方法
console.log(Number.isFinite(5 / 0)) // false
console.log(Number.isNaN(NaN)) // true
console.log(Number.isInteger(12)) // true

// ! 精度丢失的问题
// js中使用IEEE754双精度标准去存储数字，特点是存储数字的二进制数位数比较多，目的是为了使数字更精确，但存储空间是有限的，超出存储范围会被舍掉
// js中最大的整数是Math.pow(2, 53)，即2的53次方，最小值一样，比最大安全数(Number.MAX_SAFE_INTEGER)大1，
// Number.isSafeInteger用于判断是否是安全数字
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true


/* Math的新方法 */
// Math.trunc方法会先转化成数字
console.log(Math.trunc(5.5)); // 5
console.log(Math.trunc(true)); // 1
console.log(Math.trunc(false)); // 0
console.log(Math.trunc()); // NaN
console.log(Math.trunc(undefined)); // NaN
// Math.sign 判断当前数字正负或为0
