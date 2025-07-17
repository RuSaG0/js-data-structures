export interface Comment {
  id: number
  text: string
  owner: {
    first_name: string
    avatar_url?: string
  }
  parentId: number | null
  children?: Comment[]
}

export interface Post {
  text: string
}
