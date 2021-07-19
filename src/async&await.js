/*
  async/await 第四种 异步解决方案
  - ES8
  - generator的语法糖
  - 返回Promise对象
  - 可直接顺序执行，代码可读性高
  - 更具有语义化
*/

import ajax from './ajax'

function request(url) {
  return new Promise((resolve, reject) => {
    ajax(url, null, res => {
      resolve(res)
    })
  })
}

async function getData() {
  const res1 = await request('static/a.json')
  console.log(res1);
  const res2 = await request('static/b.json')
  console.log(res2);
  const res3 = await request('static/c.json')
  console.log(res3);
}

// getData()