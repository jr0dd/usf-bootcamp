import _ from 'lodash'

const choice = (arr) => {
  return _.sample(arr)
}

const remove = (arr, item) => {
  if (arr.indexOf(item) === -1) {
    return undefined
  } else {
    return _.remove(arr, (i) => i !== item)
  }
}

export { choice, remove }
