/*
  Reflect
  - ES5中使用Object.defineProperty进行拦截，现转移至Reflect.defineProperty
  - ES5设计时，将很多方法直接放在Object对象下面，后面会逐渐转移至Reflect下面，使语法更加规范
  - 不是函数对象，不可构造
  - Math和Reflect所有属性和方法都是静态的
  - Reflect的一些方法
    * apply() （同函数的apply）
    * construct() 同new操作符
    * defineProperty() 有返回值，表示当前属性是否可更改
    * deleteProperty() 同delete关键字
    * setPrototypeOf 设置对象原型
    * get 获取属性
    * has 相当于in运算符
    * set 设置属性，成功则返回true
    * ownsKeys 返回所有自身属性，包括Symbol(不包括继承属性)
  - 使用Reflect的目的：
    * 1.转移部分原先挂在Object下的方法
    * 2.修改Object的某些返回值，使其更合理
    * 3.让Object操作变成一些函数行为
    * 4.Reflect对象的操作方法与Proxy对象的方法一一对应，参数形式完全一致
*/

// reason 2 的解释
// !例子：Object.defineProperty 与 Reflect.defineProperty
// 前者返回当前对象，只能try catch，Reflect.defineProperty有返回值，可以直接返回当前属性能否改变

// reason 3 的解释，将Object的命令式操作改为Reflect的函数式操作，更加规范
// !例子：
// 对象的命令式操作
'assign' in Object // true
// Reflect的函数式操作
Reflect.has('assign') // true

// reason 4 d的解释：
let userInfo = {
  name: 'name',
  age: '11',
  _password: '***'
}

userInfo = new Proxy({
  get(target, prop) {
    // return target[prop]
    // 可替换为Reflect.get()
    return Reflect.get(target, prop)
    // set：Reflect.set(target, prop, val)
    // deleteProperty：Reflect.deleteProperty(target, prop)
    // has：Reflect.has(target, prop)
    // ! ownKeys：Reflect.ownKeys(target).filter(key => !key.startsWith('_'))
    // ! apply：Reflect.apply(target,target, args)
    // construct：Reflect.construct(target, prop)
  }
})