export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}


export class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
  current: LinkedListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  add(value: T): void {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
    }
  }

  removeCurrent(): void {
    if (!this.current) return;

    if (this.current.prev) {
      this.current.prev.next = this.current.next;
    } else {
      this.head = this.current.next;
    }

    if (this.current.next) {
      this.current.next.prev = this.current.prev;
    } else {
      this.tail = this.current.prev;
    }

    this.current = this.current.next || this.current.prev || null;
  }

  next(): void {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    } else {
      this.current = this.head;
    }
  }

  prev(): void {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    } else {
      this.current = this.tail;
    }
  }
}
