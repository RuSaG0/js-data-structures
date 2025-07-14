import { Queue } from '@/structures/queue/queue.ts'

export type UploadItem = {
  id: string
  file: File
  status: 'pending' | 'uploading' | 'done'
  progress: number
}
type UploadCallback = (item: UploadItem, markDone: () => void) => void

export class UploadQueue extends Queue<UploadItem> {
  private isUploading = false
  private onUpload: UploadCallback

  constructor(onUpload: UploadCallback) {
    super()
    this.onUpload = onUpload
  }

  enqueueFile(file: File): UploadItem {
    const item: UploadItem = {
      id: `${Date.now()}-${Math.random()}`,
      file,
      status: 'pending',
      progress: 0,
    }
    super.enqueue(item)
    this.tryUploadNext()
    return item
  }

  getAllItems(): UploadItem[] {
    return super.getItems()
  }

  private tryUploadNext() {
    if (this.isUploading) return

    const next = this.getItems().find((item) => item.status === 'pending')
    if (!next) return

    this.isUploading = true
    next.status = 'uploading'

    this.onUpload(next, () => {
      next.status = 'done'
      this.isUploading = false
      this.tryUploadNext()
    })
  }
}
