const { Tree, TreeNode } = require("./tree");

let smallTree;
let largeTree;
let emptyTree;

beforeEach(function() {
  emptyTree = new Tree();

  // build small tree
  let nSmall = new TreeNode(1);
  let nSmall2 = new TreeNode(2);
  nSmall.children.push(nSmall2);
  smallTree = new Tree(nSmall);

  // build large tree
  let n = new TreeNode(1);
  let n2 = new TreeNode(2);
  let n3 = new TreeNode(3);
  let n4 = new TreeNode(4);
  let n5 = new TreeNode(5);
  let n6 = new TreeNode(6);
  let n7 = new TreeNode(7);
  let n8 = new TreeNode(8);

  n.children = [n2, n3, n4];

  n4.children.push(n5, n6);
  n6.children.push(n7);
  n7.children.push(n8);

  largeTree = new Tree(n);
});

describe("sumValues", function() {
  it("sums simple trees", function() {
    expect(smallTree.sumValues()).toEqual(3);
  });

  it("sums more complicated trees", function() {
    expect(largeTree.sumValues()).toEqual(36);
  });

  it("sums up an empty tree", function() {
    expect(emptyTree.sumValues()).toEqual(0);
  });
});

describe("countEvens", function() {
  it("counts nodes in simple trees", function() {
    expect(smallTree.countEvens()).toEqual(1);
  });

  it("counts Treenodes in more complicated trees", function() {
    expect(largeTree.countEvens()).toEqual(4);
  });

  it("counts empty", function() {
    expect(emptyTree.countEvens()).toEqual(0);
  });
});

describe("numGreater", function() {
  it("counts nodes in small trees", function() {
    expect(smallTree.numGreater(0)).toEqual(2);
    expect(smallTree.numGreater(1)).toEqual(1);
    expect(smallTree.numGreater(2)).toEqual(0);
    expect(smallTree.numGreater(3)).toEqual(0);
  });

  it("counts nodes in larger trees", function() {
    expect(largeTree.numGreater(0)).toEqual(8);
    expect(largeTree.numGreater(4)).toEqual(4);
    expect(largeTree.numGreater(8)).toEqual(0);
  });

  it("counts nodes in an empty  tree", function() {
    expect(emptyTree.numGreater(0)).toEqual(0);
  });
});
