import { BinaryTree, BinaryTreeNode } from './binary-tree.js'

let smallTree;
let largeTree;
let emptyTree;

beforeEach(function() {
  emptyTree = new BinaryTree();

  // build small tree;
  let smallLeft = new BinaryTreeNode(5);
  let smallRight = new BinaryTreeNode(5);
  let smallRoot = new BinaryTreeNode(6, smallLeft, smallRight);
  smallTree = new BinaryTree(smallRoot);

  // build large tree
  let node6 = new BinaryTreeNode(1);
  let node5 = new BinaryTreeNode(1);
  let node4 = new BinaryTreeNode(2);
  let node3 = new BinaryTreeNode(3, node4, node6);
  let node2 = new BinaryTreeNode(5, node3, node5);
  let node1 = new BinaryTreeNode(5);
  let root = new BinaryTreeNode(6, node1, node2);
  largeTree = new BinaryTree(root);
});

describe("minDepth", function() {
  it("handles simple trees", function() {
    expect(smallTree.minDepth()).toBe(2);
  });

  it("handles more complex trees", function() {
    expect(largeTree.minDepth()).toBe(2);
  });

  it("handles empty trees", function() {
    expect(emptyTree.minDepth()).toBe(0);
  });
});

describe("maxDepth", function() {
  it("handles simple trees", function() {
    expect(smallTree.maxDepth()).toBe(2);
  });

  it("handles more complex trees", function() {
    expect(largeTree.maxDepth()).toBe(4);
  });

  it("handles empty trees", function() {
    expect(emptyTree.maxDepth()).toBe(0);
  });
});

describe("maxSum", function() {
  it("handles simple trees", function() {
    expect(smallTree.maxSum()).toBe(16);
  });

  it("handles empty trees", function() {
    expect(emptyTree.maxSum()).toBe(0);
  });

  it("handles more complex trees", function() {
    expect(largeTree.maxSum()).toBe(21);
  });

  it("handles negative values", function() {
    let node100 = new BinaryTreeNode(100);
    let node8 = new BinaryTreeNode(8);
    let nodeNeg4 = new BinaryTreeNode(-4);
    let node2 = new BinaryTreeNode(2, nodeNeg4);
    let nodeNeg3 = new BinaryTreeNode(-3, node8, node100);
    let root = new BinaryTreeNode(10, node2, nodeNeg3);
    let tree = new BinaryTree(root);

    expect(tree.maxSum()).toBe(109);
  });
});

describe("nextLarger", function() {
  it("handles simple trees", function() {
    expect(smallTree.nextLarger(4)).toBe(5);
    expect(smallTree.nextLarger(5)).toBe(6);
    expect(smallTree.nextLarger(6)).toBe(null);
  });

  it("handles empty trees", function() {
    expect(emptyTree.nextLarger(0)).toBe(null);
  });

  it("handles more complex trees", function() {
    expect(largeTree.nextLarger(1)).toBe(2);
    expect(largeTree.nextLarger(2)).toBe(3);
    expect(largeTree.nextLarger(3)).toBe(5);
    expect(largeTree.nextLarger(4)).toBe(5);
    expect(largeTree.nextLarger(5)).toBe(6);
    expect(largeTree.nextLarger(6)).toBe(null);
  });
});
