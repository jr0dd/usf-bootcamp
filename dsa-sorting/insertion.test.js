const insertionSort = require("./insertion")

describe('insertionSort', function () {
  it('should exist', function () {
    expect(typeof insertionSort).toBe('function', "did you remember to define the 'insertionSort' function?");
  });

  it('should sort numbers in ascending order', function () {
    expect(insertionSort([4, 20, 12, 10, 7, 9])).toEqual(
      [4, 7, 9, 10, 12, 20],
      "insertionSort([4, 20, 12, 10, 7, 9]) should equal [4, 7, 8, 10, 12, 20]"
    );
    expect(insertionSort([0, -10, 7, 4])).toEqual(
      [-10, 0, 4, 7],
      "insertionSort([0, -10, 7, 4]) should equal [-10, 0, 4, 7]"
    );
    expect(insertionSort([1, 2, 3])).toEqual(
      [1, 2, 3],
      "insertionSort([1, 2, 3]) should equal [1, 2, 3]"
    );
    expect(insertionSort([])).toEqual(
      [],
      "insertionSort([]) should be []"
    );
    var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
    expect(insertionSort(nums)).toEqual(
      [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342],
      "insertionSort([4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32]) should equal [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]"
    );
  });

});
