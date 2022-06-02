function countDown(num) {
  const counter = setInterval(() => {
    if (num <= 0) {
      console.log('DONE')
      clearInterval(counter)
    } else {
      console.log(num--)
    }
  }, 1000)
}

function randomGame() {
  let num = 0
  let count = 0
  const counter = setInterval(() => {
    num = Math.random()
    count++
    console.log(num)
    if (num > 0.75) {
      console.log(`It took ${count} tries`)
      clearInterval(counter)
    }
  }, 1000)
}
