// Query Props

export interface Query {
  data: Data;
}

export interface Data {
  characters: Characters;
}

export interface Characters {
  results: Character[];
}

export interface Character {
  name: string;
  id: string;
  image: string;
  status: Status;
  species: Species;
  gender: Gender;
}

export type Species = "Alien" | "Human"

export type Status = "Alive" | "Dead" | "unknown"

export type Gender = "Female" | "Male" | "unknown"