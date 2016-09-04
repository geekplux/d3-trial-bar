import Bar from '../index'

const data = []

for (let i = 0, n = 10; i < n; ++i) {
  data.push(Math.floor(Math.random() * n))
}

const bar = new Bar({
  target: '.container',
  data: data
})
