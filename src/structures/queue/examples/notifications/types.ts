import { Queue } from '../../queue.ts';

export type ToastItem = {
  id: number;
  message: string;
};

export class ToastQueue extends Queue<ToastItem> {
  private id: number = 1
  private maxSize: number;

  constructor(maxSize: number = 3) {
    super();
    this.maxSize = maxSize;
  }

  enqueueToast(message: string): ToastItem {
    if (this.size() >= this.maxSize) {
      this.dequeue();
    }

    const item: ToastItem = {
      id: this.id,
      message,
    };

    this.id++;

    this.enqueue(item);
    return item;
  }
}
