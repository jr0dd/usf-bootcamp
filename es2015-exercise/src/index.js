import { fruits } from './fruits.js'
import { choice, remove } from './helpers.js'
const randomFruit = choice(fruits)
const fruitsLeft = remove(fruits, randomFruit)

console.log(`I'd like one ${randomFruit}, please`)
console.log(`Here you go: ${randomFruit}`)
console.log(`Delicious! May I have another?`)
console.log(`I'm sorry, we're all out. We have ${fruitsLeft.length} left.`)