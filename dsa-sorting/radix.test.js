const { getDigit, digitCount, mostDigits, radixSort } = require("./radix")

describe("getDigit", function () {
  it("should exist", function () {
    expect(typeof getDigit).toBe(
      "function",
      "Did you remember to create a 'getDigit' function?"
    );
  });

  it("should return the correct digit for positive integers", function () {
    expect(getDigit(12345, 0)).toBe(5, "getDigit(12345, 0) should be 5.");
    expect(getDigit(12345, 1)).toBe(4, "getDigit(12345, 1) should be 4.");
    expect(getDigit(12345, 2)).toBe(3, "getDigit(12345, 2) should be 3.");
    expect(getDigit(12345, 3)).toBe(2, "getDigit(12345, 3) should be 2.");
    expect(getDigit(12345, 4)).toBe(1, "getDigit(12345, 4) should be 1.");
    expect(getDigit(12345, 5)).toBe(0, "getDigit(12345, 5) should be 0.");
    expect(getDigit(8987, 0)).toBe(7, "getDigit(8987, 0) should be 7.");
    expect(getDigit(8987, 1)).toBe(8, "getDigit(8987, 1) should be 8.");
    expect(getDigit(8987, 2)).toBe(9, "getDigit(8987, 2) should be 9.");
    expect(getDigit(8987, 3)).toBe(8, "getDigit(8987, 3) should be 8.");
    expect(getDigit(8987, 4)).toBe(0, "getDigit(8987, 4) should be 0.");
  });
});

describe("digitCount", function () {
  it("should exist", function () {
    expect(typeof digitCount).toBe(
      "function",
      "Did you remember to create a 'digitCount' function?"
    );
  });

  it("should return the correct count for positive integers", function () {
    expect(digitCount(1)).toBe(1, "digitCount(1) should be 1.");
    expect(digitCount(25)).toBe(2, "digitCount(25) should be 2.");
    expect(digitCount(314)).toBe(3, "digitCount(314) should be 3.");
    expect(digitCount(9)).toBe(1, "digitCount(9) should be 1.");
    expect(digitCount(77777)).toBe(5, "digitCount(77777) should be 5.");
    expect(digitCount(1234)).toBe(4, "digitCount(1234) should be 4.");
  });
});

describe("mostDigits", function () {
  it("should exist", function () {
    expect(typeof mostDigits).toBe(
      "function",
      "Did you remember to create a 'mostDigits' function?"
    );
  });

  it("should return the correct count for arrays of positive integers", function () {
    expect(mostDigits([1, 9, 10, 100, 99])).toBe(
      3,
      "mostDigits([1, 9, 10, 100, 99]) should be 3."
    );
    expect(mostDigits([100, 1010, 1, 500])).toBe(
      4,
      "mostDigits([100, 1010, 1, 500]) should be 4."
    );
    expect(mostDigits([0, 100000, 400, 12, 8])).toBe(
      6,
      "mostDigits(mostDigits([0, 100000, 400, 12, 8])) should be 6."
    );
  });

  it("should return the correct count for empty arrays", function () {
    expect(mostDigits([])).toBe(0, "mostDigits([]) should be 0.");
  });
});

describe("radixSort", function () {
  it("should exist", function () {
    expect(typeof radixSort).toBe(
      "function",
      "Did you remember to create a 'radixSort' function?"
    );
  });

  it("should sort arrays of numbers", function () {
    expect(radixSort([8, 6, 1, 12])).toEqual(
      [1, 6, 8, 12],
      "radixSort([8, 6, 1, 12]) should equal [1, 6, 8, 12]."
    ); //
    expect(radixSort([10, 100, 1, 1000, 10000000])).toEqual(
      [1, 10, 100, 1000, 10000000],
      "radixSort([10, 100, 1, 1000, 10000000]) should equal [1, 10, 100, 1000, 10000000]."
    ); //
    expect(
      radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593])
    ).toEqual(
      [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637],
      "radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]) should equal [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637]."
    );
    //
  });
});
