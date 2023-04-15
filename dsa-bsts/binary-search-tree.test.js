import BinarySearchTree from './binary-search-tree.js'

describe('insert', function () {
  it('inserts a node at the correct position', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
    expect(binarySearchTree.root.val).toEqual(15)
    expect(binarySearchTree.root.right.val).toEqual(20)
    expect(binarySearchTree.root.left.right.val).toEqual(12)
  })

  it('inserts a node at the root if there is nothing there', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree.insert(15)
    expect(binarySearchTree.root.val).toEqual(15)
    expect(binarySearchTree.root.left).toBe(null)
    expect(binarySearchTree.root.right).toBe(null)
  })
})

describe('insertRecursively', function () {
  it('inserts a node at the correct position', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insertRecursively(15)
      .insertRecursively(20)
      .insertRecursively(10)
      .insertRecursively(12)
    expect(binarySearchTree.root.val).toEqual(15)
    expect(binarySearchTree.root.right.val).toEqual(20)
    expect(binarySearchTree.root.left.right.val).toEqual(12)
  })

  it('inserts a node at the root if there is nothing there', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree.insertRecursively(15)
    expect(binarySearchTree.root.val).toEqual(15)
    expect(binarySearchTree.root.left).toBe(null)
    expect(binarySearchTree.root.right).toBe(null)
  })
})

describe('find', function () {
  it('finds a node correctly', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
    const foundNode = binarySearchTree.find(20)
    expect(foundNode.val).toBe(20)
    expect(foundNode.left).toBe(null)
    expect(foundNode.right).toBe(null)
  })

  it('returns undefined if a node is not found', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
    const foundNode = binarySearchTree.find(120)
    expect(foundNode).toBe(undefined)
  })
})

describe('findRecursively', function () {
  it('finds a node correctly', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
    const foundNode = binarySearchTree.findRecursively(20)
    expect(foundNode.val).toBe(20)
    expect(foundNode.left).toBe(null)
    expect(foundNode.right).toBe(null)
  })

  it('returns undefined if a node is not found', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
    const foundNode = binarySearchTree.findRecursively(120)
    expect(foundNode).toBe(undefined)
  })
})

describe('dfsPreOrder', function () {
  it('returns an array of values found with DFS Pre Order', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50)
    expect(binarySearchTree.dfsPreOrder()).toEqual([15, 10, 1, 5, 12, 20, 50])
  })
})

describe('dfsInOrder', function () {
  it('returns an array of values found with DFS In Order', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50)
    expect(binarySearchTree.dfsInOrder()).toEqual([1, 5, 10, 12, 15, 20, 50])
  })
})

describe('dfsPostOrder', function () {
  it('returns an array of values found with DFS Post Order', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50)
    expect(binarySearchTree.dfsPostOrder()).toEqual([5, 1, 12, 10, 50, 20, 15])
  })
})

describe('BFS', function () {
  it('should return the correct output', function () {
    const binarySearchTree = new BinarySearchTree()
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50)
    expect(binarySearchTree.bfs()).toEqual([15, 10, 20, 1, 12, 50, 5])
  })
})
