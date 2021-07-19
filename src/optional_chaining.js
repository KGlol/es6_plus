/*
  optional_chaining 可选链，ES11
*/

const obj = {
  sub: {
    key: 'key',
    func() {
      return 'func'
    }
  }
}

console.log(obj?.sub?.key);
console.log(obj?.sub?.func?.()); // 可选链执行函数


/*
  空值合并运算符
  - ?? 只在null和undefined认为是false
*/

const b = 0
k = ''
a = b || 5
c = b ?? 5
d = k ?? 5
console.log(a); // 5
console.log(c); // 0
console.log(d); // ''