const selectionSort = require('./selection')

describe("selectionSort", function () {
  it("should exist", function () {
    expect(typeof selectionSort).toBe(
      "function",
      "did you remember to define the 'selectionSort' function?"
    );
  });

  it("should sort numbers in ascending order", function () {
    expect(selectionSort([4, 20, 12, 10, 7, 9])).toEqual(
      [4, 7, 9, 10, 12, 20],
      "selectionSort([4, 20, 12, 10, 7, 9]) should equal [4, 7, 8, 10, 12, 20]"
    );
    expect(selectionSort([0, -10, 7, 4])).toEqual(
      [-10, 0, 4, 7],
      "selectionSort([0, -10, 7, 4]) should equal [-10, 0, 4, 7]"
    );
    expect(selectionSort([1, 2, 3])).toEqual(
      [1, 2, 3],
      "selectionSort([1, 2, 3]) should equal [1, 2, 3]"
    );
    expect(selectionSort([])).toEqual([], "selectionSort([]) should be []");
    var nums = [
      4,
      3,
      5,
      3,
      43,
      232,
      4,
      34,
      232,
      32,
      4,
      35,
      34,
      23,
      2,
      453,
      546,
      75,
      67,
      4342,
      32
    ];
    expect(selectionSort(nums)).toEqual(
      [
        2,
        3,
        3,
        4,
        4,
        4,
        5,
        23,
        32,
        32,
        34,
        34,
        35,
        43,
        67,
        75,
        232,
        232,
        453,
        546,
        4342
      ],
      "selectionSort([4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32]) should equal [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]"
    );
  });
});
