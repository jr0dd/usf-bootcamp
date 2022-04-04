function logicalColors(x, y) {
    if (x && !y) {
        return 'Blue'
    } else if (x) {
        return 'Red'
    } else if (!y) {
        return 'Yellow'
    } else return 'Purple'

}

function max(arr) {
    for (let i=0; i<1; i++) {
        arr.sort((a, b) => a - b)
    }
    return arr[arr.length-1]
}

function removeNumbers(str) {
    return str.replace(/\d+/g, '')
}

function onlyEvens(arr) {
    const num = []
    for (const i of arr) {
        if (i % 2 === 0) {
            num.push(i)
        }
    }
    return num
}

function containsEveryVowel(str) {
    const vowels = ['a','e','i','o','u']
    for (const char of vowels) {
        if (!str.includes(char)) {
            return false
        }
    }
    return true
}

function vowelFrequency(str) {
    const vowels = ['a','e','i','o','u']
    const obj = {}
    for (const char of str) {
        if (vowels.includes(char)) { 
            if (obj[char]) {
                obj[char]++
            } else {
                obj[char] = 1
            }
        }
    }
    let objStr = ''
    for (const key in obj) {
        objStr += key + obj[key]
    }
    return objStr
}

function calculateAverage(numbers) {
    let total = 0
    if (numbers.length === 0) {
        return 0
    }
    for (let i=0; i<numbers.length; i++) {
        total += numbers[i]
    }
    return total / numbers.length
}

function vowelsOnly(str) {
    const vowels = ['a','A','e','E','i','I','o','O','u','U']
    let vowelStr = ''
    for (const char of str) {
        if (vowels.includes(char)) {
           vowelStr += char
        }
    }
    return vowelStr
}

function strExpand(str) {
    const obj = {}
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    for (const char of str) {
        if (letters.includes(char)) { 
            if (obj[char]) {
                obj[char]++
            } else {
                obj[char] = 1
            }
        }
    }
    let objStr = ''
    for (const key in obj) {
        objStr += key + obj[key]
    }
    return objStr
}

function isPangram(str) {
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    for (const char of letters) {
        if (!str.includes(char)) {
            return false
        }
    }
    return true
}
