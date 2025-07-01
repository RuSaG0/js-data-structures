export interface Comment {
  id: number;
  text: string;
  owner: {
    first_name: string;
    avatar_url?: string;
  };
  parent: number | null;
}
