const { merge, mergeSort } = require("./merge")

describe('merge', function () {
  it('should exist', function () {
    expect(typeof merge).toBe('function', "did you remember to define the 'merge' function?");
  });

  it('should be a pure function - in other words, it should not mutate the input arrays', function () {
    var arr1 = [1, 3, 4, 5]
    var arr2 = [2, 4, 6, 8];
    merge(arr1, arr2);
    expect(arr1).toEqual([1, 3, 4, 5], "The first input array should be unaffected by the merge")
    expect(arr2).toEqual([2, 4, 6, 8], "The second input array should be unaffected by the merge")
  });

  it('should merge sorted arrays ', function () {
    expect(merge([1, 3, 4, 5], [2, 4, 6, 8])).toEqual(
      [1, 2, 3, 4, 4, 5, 6, 8],
      "merge([1,3,4,5],[2,4,6,8]) should equal [1,2,3,4,4,5,6,8]"
    );

    expect(merge([-2, -1, 0, 4, 5, 6], [-3, -2, -1, 2, 3, 5, 7, 8])).toEqual(
      [-3, -2, -2, -1, -1, 0, 2, 3, 4, 5, 5, 6, 7, 8],
      "merge([-2,-1,0,4,5,6],[-3,-2,-1,2,3,5,7,8]) should equal [-3,-2,-2,-1,-1,0,2,3,4,5,5,6,7,8]"
    );

    expect(merge([3, 4, 5], [1, 2])).toEqual(
      [1, 2, 3, 4, 5],
      "merge([3, 4, 5], [1, 2]) should equal [1, 2, 3, 4, 5]"
    )
  });
});

describe('mergeSort', function () {
  it('should exist', function () {
    expect(typeof mergeSort).toBe('function', "did you remember to define the 'mergeSort' function?");
  });

  it('should sort numbers in ascending order', function () {
    expect(mergeSort([4, 20, 12, 10, 7, 9])).toEqual(
      [4, 7, 9, 10, 12, 20],
      "mergeSort([4, 20, 12, 10, 7, 9]) should equal [4, 7, 8, 10, 12, 20]"
    );
    expect(mergeSort([0, -10, 7, 4])).toEqual(
      [-10, 0, 4, 7],
      "mergeSort([0, -10, 7, 4]) should equal [-10, 0, 4, 7]"
    );
    expect(mergeSort([1, 2, 3])).toEqual(
      [1, 2, 3],
      "mergeSort([1, 2, 3]) should equal [1, 2, 3]"
    );
    expect(mergeSort([])).toEqual(
      [],
      "mergeSort([]) should be []"
    );
    var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
    expect(mergeSort(nums)).toEqual(
      [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342],
      "mergeSort([4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32]) should equal [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]"
    );
  });

});



