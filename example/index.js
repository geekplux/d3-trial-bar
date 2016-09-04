import Bar from '../index'

const gen = n => {
  const data = []

  for (let i = 0; i < n; ++i) {
    data.push({
      value: Math.max(10, Math.floor(Math.random() * 100))
    })
  }

  return data
}

const bar = new Bar({
  target: '.container'
})

bar.render(gen(20))
