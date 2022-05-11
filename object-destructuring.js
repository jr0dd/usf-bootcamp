// console.log(numPlanets); // 8
// console.log(yearNeptuneDiscovered); // 1846

// console.log(discoveryYears); // { yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659 }

// console.log(getUserData({firstName: "Alejandro", favoriteColor: "purple"})) // Your name is Alejandro and you like purple
// console.log(getUserData({firstName: "Melissa"})) // Your name is Melissa and you like green
// console.log(getUserData({})) // Your name is undefined and you like green

// console.log(first); // Maya
// console.log(second); // Marissa
// console.log(third); // Chi

// console.log(raindrops); // Raindrops on roses
// console.log(whiskers); // whiskers on kittens
// console.log(aFewOfMyFavoriteThings); // ['Bright copper kettles', 'warm woolen mittens', 'Brown paper packages tied up with strings']

// console.log(numbers) // [10, 30, 20]

const obj = {
  numbers: {
    a: 1,
    b: 2
  }
}
const { a, b } = obj.numbers

const arr = [1, 2]
[arr[0], arr[1]] = [arr[1], arr[0]]

const raceResults = ([first, second, third, ...rest]) => ({ first, second, third, rest })
