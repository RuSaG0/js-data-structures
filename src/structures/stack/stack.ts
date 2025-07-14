export interface Modal {
  id: number
  title: string
  content: string
  buttonText: string
}

export class Stack<T> {
  private items: T[] = []

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  getItems(): T[] {
    return [...this.items]
  }

  size(): number {
    return this.items.length
  }

  get(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items[index]
    }
    return undefined
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }
}
