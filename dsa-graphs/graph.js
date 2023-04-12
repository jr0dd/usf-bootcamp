class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {}

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {}

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {}

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {}

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {}

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {}

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {}
}

module.exports = {Graph, Node}