import { Character } from "./queryTypes";

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

// Characters with Fav
export type CharacterWithFav = Character & { isFav: boolean };

// Favorites
export interface FavoriteType {
  id: string;
  favorite: boolean;
}