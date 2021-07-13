/*
  手动实现ajax
  - ajax原理
  - ie7之前需做兼容处理
*/
var url = 'http://musicapi.xiecheng.live/personalized'

function ajax(url, method = 'GET', callback) {

  // 1. 创建XMLHttpRequest对象
  var XMLHttp
  if (window.XMLHttpRequest) {
    XMLHttp = new XMLHttpRequest()
  } else {
    // 兼容低版本浏览器(ie7之前版本)
    XMLHttp = new ActiveObject('Microsoft.XMLHTTP')
  }

  // 2. 发送请求
  XMLHttp.open(method, url, true)
  XMLHttp.send()

  // 3. 服务端响应
  XMLHttp.onreadystatechange = function () {
    if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
      var res = JSON.parse(XMLHttp.responseText)
      callback()
    }
  }
}

ajax(url, null, res => console.log(res))




