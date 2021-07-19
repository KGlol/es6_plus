/* 
  代理Proxy
  - ES5中使用Object.defineProperty进行拦截
  - 用于创建一个对象的代理，从而实现基本操作的拦截和自定义
  - 原对象的所有方法在proxy对象上依然可用
  - 主要的拦截操作有
    get,
    set(设置成功时，要返回true布尔值),
    has(外部结合in，检查是否有某个key).
    ownKeys(对循环遍历进行拦截操作),
    deleteProperty(删除属性，需要返回布尔型的值)
    apply(拦截函数的调用，以及call和apply的操作)
    construct 拦截new 实例化命令，返回一个对象
*/
// 包装数组
let arr = [1, 2, 3, 4]
arr = new Proxy(arr, {
  get(target, prop) {
    return prop in target ? target[prop] : 'error'
  },
  set(target, prop, val) {
    // 只能设置数字类型的值
    if (typeof val === 'number') {
      target[prop] = val
      return true
    }
    return false
  }
})

// arr.push('1') // 会报错
arr.push(1)
// arr[4] = 5
console.log(arr);
// 转化回数组
console.log(Array.from(arr));

// 包装对象
let obj = { name: '名字', age: 11 }
obj = new Proxy(obj, {
  get(target, prop) {
    return prop in target ? target[prop] : prop
  },
  set() {
    target[prop] = val
  }
})
console.log(obj.kkk)
console.log(obj)
// 转化回对象
console.log({ ...obj });

// has 结合 in 用于判断当前的key是否在当前对象里面，返回布尔值
// 判断数字范围
let range = { start: 1, end: 10 }
range = new Proxy(range, {
  has(target, prop) {
    return target.start <= prop && prop <= target.end
  }
})

console.log('范围拦截结果in：', 1000000 in range);
console.log('范围拦截结果Reflect.has：', Reflect.has(range, 7));

// ownKeys(对于所有类型的key值，包括Symbol进行拦截)
// 通过拦截使_开头的属性为私有属性，无法被遍历到
let userInfo = {
  name: 'name',
  age: 'age',
  from: 'from',
  _private: '_private',
}
userInfo = new Proxy(userInfo, {
  ownKeys(target) {
    // 仅非下划线开头的属性可访问
    return Object.keys(target).filter(key => !key.startsWith('_'))
  }
})
for (const key in userInfo) {
  console.log(key);
}

// apply(拦截函数调用)
let func = (...args) => args.reduce((sum, item) => sum + item)
func = new Proxy(func, {
  apply(target, context, args) {
    return target(...args) * 1
  }
})
console.log(func(1, 2, 3));
console.log(func.call(null, 1, 2, 3));
console.log(func.apply(null, [1, 2, 3]));

// practice-> 对于下划线开头的自定义私有属性，禁止获取，修改，删除，遍历等操作
let obj_for_proxy = {
  name: 'name',
  age: 'age',
  symbol: Symbol('symbol'),
  [Symbol('key')]: Symbol('symbol'),
  _private: '_private',
}
obj_for_proxy = new Proxy(obj_for_proxy, {
  // 检查键名拦截
  has(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error('无法检查私有属性')
    } else {
      return target[prop]
    }
  },
  // 拦截获取
  get(target, prop) {
    // target[prop]
    if (prop.startsWith('_')) {
      // return false
      throw new Error('无法获取私有属性')
    } else {
      return target[prop]
    }
  },
  // 拦截修改
  set(target, prop, val) {
    if (prop.startsWith('_')) {
      throw new Error('无法修改私有属性')
    } else {
      // return 
      target[prop] = val
      // set拦截需返回布尔值
      return true
    }
  },
  // 删除拦截
  deleteProperty(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error('无法删除私有属性')
    } else {
      delete target[prop]
      return true
    }
  },
  // 遍历拦截
  ownKeys(target) {
    console.log(target);
    return Object.keys(target).map(key => !key.startsWith('_'))
  }
})

try {
  console.log('_name' in obj_for_proxy)
} catch (error) {
  console.log(error.message);
}
// 获取操作
try {
  console.log(obj_for_proxy.name)
} catch (error) {
  console.log(error.message);
}
// 修改操作
try {
  console.log(obj_for_proxy._private = 'xxx')
} catch (error) {
  console.log(error.message);
}
// 删除操作
try {
  console.log(delete obj_for_proxy._private)
} catch (error) {
  console.log(error.message);
}

console.log(obj_for_proxy);
// 遍历
// for (const key in obj_for_proxy) {
//   if (Object.hasOwnProperty.call(obj_for_proxy, key)) {
//     const element = obj_for_proxy[key];
//     console.log(key);
//   }
// }