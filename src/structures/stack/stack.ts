export interface Modal {
  id: number;
  title: string;
  content: string;
}

export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  getItems(): T[] {
    return [...this.items];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
