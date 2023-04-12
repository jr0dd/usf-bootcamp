const {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
} = require("./recursion");

describe("product", function() {
  it("returns the product of all numbers in an array", function() {
    expect(product([2, 3, 4])).toBe(24);
    expect(product([1, -1, 1, -1, 1, -1])).toBe(-1);
    expect(product([10])).toBe(10);
  });
});

describe("longest", function() {
  it("returns the length of the longest word in an array of words", function() {
    expect(longest(["hello", "hi", "hola"])).toBe(5);
    expect(longest(["abcdefg", "hijklmnop", "qrs", "tuv", "wx", "y", "z"])).toBe(9);
    expect(longest(["a", "b", "c", "d", "e"])).toBe(1);
    expect(longest(["abcde"])).toBe(5);
  });
});

describe("everyOther", function() {
  it("returns a string with every other character in the input", function() {
    expect(everyOther("hello")).toBe("hlo");
    expect(everyOther("banana stand")).toBe("bnn tn");
    expect(everyOther("ddoouubbllee")).toBe("double");
    expect(everyOther("hi")).toBe("h");
    expect(everyOther("z")).toBe("z");
  });
});

describe("isPalindrome", function() {
  it("returns true if the string is a palindrome", function() {
    expect(isPalindrome("tacocat")).toBe(true);
    expect(isPalindrome("racecar")).toBe(true);
    expect(isPalindrome("a")).toBe(true);
    expect(isPalindrome("helloolleh")).toBe(true);
  });

  it("returns false if the string is not a palindrome", function() {
    expect(isPalindrome("tacodog")).toBe(false);
    expect(isPalindrome("az")).toBe(false);
    expect(isPalindrome("goodbye")).toBe(false);
  });
});

describe("findIndex", function() {
  let animals = ["duck", "cat", "pony", "cat"];

  it("returns the first index of the value in the array if the value exists", function() {
    expect(findIndex(animals, "duck")).toBe(0);
    expect(findIndex(animals, "cat")).toBe(1);
    expect(findIndex(animals, "pony")).toBe(2);
  });

  it("returns -1 if the value does not exist", function() {
    expect(findIndex(animals, "porcupine")).toBe(-1);
    expect(findIndex(animals, "turtle")).toBe(-1);
  });
});

describe("revString", function() {
  it("returns a reversed copy of the string", function() {
    expect(revString("porcupine")).toBe("enipucrop");
    expect(revString("duck")).toBe("kcud");
    expect(revString("cat")).toBe("tac");
    expect(revString("pony")).toBe("ynop");
  });
});

describe("gatherStrings", function() {
  it("gathers all object string values into an array", function() {
    let whiskey = {
      name: "Whiskey",
      age: 5,
      favFood: "popcorn",
      color: "black",
      barks: false
    };
    expect(gatherStrings(whiskey).sort()).toEqual(["Whiskey", "popcorn", "black"].sort());
  });

  it("handles nested objects", function() {
    let nestedObj = {
      firstName: "Lester",
      favoriteNumber: 22,
      moreData: {
        lastName: "Testowitz"
      },
      funFacts: {
        moreStuff: {
          anotherNumber: 100,
          deeplyNestedString: {
            almostThere: {
              success: "you made it!"
            }
          }
        },
        favoriteString: "nice!"
      }
    };
    expect(gatherStrings(nestedObj).sort()).toEqual(["Lester", "Testowitz", "you made it!", "nice!"].sort());
  });
});

describe("binarySearch", function () {
  it("should find the index of a value in a sorted array", function() {
    expect(binarySearch([1, 2, 3, 4], 4)).toEqual(3);
    expect(binarySearch([1, 2], 1)).toEqual(0);
    expect(binarySearch([1, 2, 3, 4, 5, 6, 7], 6)).toEqual(5);
  });

  it("should return -1 if the value is not found", function() {
    expect(binarySearch([1, 2, 3, 4], 0)).toEqual(-1);
    expect(binarySearch([1, 2], 11)).toEqual(-1);
  });
});