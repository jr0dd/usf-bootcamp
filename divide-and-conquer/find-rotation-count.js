const findRotationCount = (arr) => {
    let min = arr[0]
    let idx = 0
    for (let i = 0; i < arr.length; i++) {
      if (min > arr[i]) {
        min = arr[i]
        idx = i
      }
    }
    return idx
}

export default findRotationCount
