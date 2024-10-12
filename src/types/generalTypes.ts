// Children Props
export type Children = React.ReactNode;

// Search Context Props
export interface SearchContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

// Comments 
export interface CommentType {
    id: string;
    comment: string;
}