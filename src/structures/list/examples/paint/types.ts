class Node<T> {
  data: T;
  next: Node<T> | null = null;
  prev: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private current: Node<T> | null = null;

  add(data: T): void {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.current = this.head;
    } else if (this.current) {
      this.current.next = newNode;
      newNode.prev = this.current;
      this.current = newNode;
    }
  }

  undo(): T | null {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.data;
    }
    return null;
  }

  redo(): T | null {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.data;
    }
    return null;
  }

  canUndo(): boolean {
    return !!this.current && !!this.current.prev;
  }

  canRedo(): boolean {
    return !!this.current && !!this.current.next;
  }

  getCurrentData(): T | null {
    return this.current ? this.current.data : null;
  }
}
