const input = document.getElementById('input')
const btn = document.getElementById('btn')
const text = document.getElementById('text')
const list = document.getElementById('list')

let data = { value: '' };

data = new Proxy(data, {
  get(target, prop) {
    if (Reflect.has(target, prop)) {
      return Reflect.get(target, prop)
    }
  },
  set(target, prop, val) {
    text.innerHTML = val
    input.value !== val && (input.value = val)
    Reflect.set(target, prop, val)
    return true
  },
})
input.addEventListener('input', () => {
  const value = input.value;
  data.value = value;
  // ! 直接对对象赋值则Proxy无法拦截到
  // data = { value }
})

text.addEventListener('click', () => { data.value = 0 })

btn.addEventListener('click', () => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(`${data.value}`))
  list.appendChild(li)
})
