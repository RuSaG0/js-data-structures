export interface IFile {
  name: string
  size: number
}

export interface IFileDirectory {
  name: string
  files: IFile[]
  folders: IFileDirectory[]
}
