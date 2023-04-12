/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  get(idx) {
    let cur = this.head
    let count = 0

    while (cur !== null && count != idx) {
      count += 1
      cur = cur.next
    }

    return cur
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const node = new Node(val)

    if (!this.head) {
      this.head = node
      this.tail = this.head
    } else {
      this.tail.next = node
      this.tail = node
    }

    this.length += 1
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const node = new Node(val)

    if (this.head === null) {
      this.head = node
    } else {
      node.next = this.head
      this.head = node
    }

    if (this.length === 0) {
      this.tail = this.head
    }

    this.length += 1
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1)
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0)
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error('Invalid index!')
    }

    return this.get(idx).val
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error('Invalid index!')
    }

    let cur = this.get(idx)
    cur.val = val
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error('Invalid index!')
    }

    if (idx === 0) return this.unshift(val)
    if (idx === this.length) return this.push(val)

    // get the one before it
    let prev = this.get(idx - 1);

    const node = new Node(val)
    node.next = prev.next
    prev.next = node

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error('Invalid index!')
    }

    if (idx === 0) {
      let val = this.head.val
      this.head = this.head.next
      this.length -= 1

      if (this.length < 2) this.tail = this.head
      return val
    }

    let prev = this.get(idx - 1)

    if (idx === this.length - 1) {
      let val = prev.next.val
      prev.next = null
      this.tail = prev
      this.length -= 1
      return val
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0

    let total = 0
    let cur = this.head

    while (cur) {
      total += cur.val
      cur = cur.next
    }

    return total / this.length
  }
}

module.exports = LinkedList
