// Children Props

export interface Children {
    children: React.ReactNode;
}

// Search Context Props
export interface SearchContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}