const sortedFrequency = (arr, num) => {
  const count = arr.filter(n => n === num).length
  if (count === 0) {
    return -1
  }
  return count
}

export default sortedFrequency
