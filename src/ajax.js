/*
  手动实现ajax
  - ajax原理
  - ie7之前需做兼容处理
*/
// var url = 'http://musicapi.xiecheng.live/personalized'

function ajax(url, method = 'GET', callback) {

  // 1. 创建XMLHttpRequest对象
  var xmlhttp
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest()
  } else {
    // 兼容低版本浏览器(ie7之前版本)
    xmlhttp = new ActiveObject('Microsoft.xmlhttp')
  }

  // 2. 发送请求
  xmlhttp.open(method, url, true)
  xmlhttp.send()

  // 3. 服务端响应
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      const res = JSON.parse(xmlhttp.responseText)
      callback && callback(res)
    }
  }
}

export default ajax




