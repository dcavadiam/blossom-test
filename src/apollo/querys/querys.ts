import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($name: String) {
    characters(filter: { name: $name }) {
      results {
        name
        id
        name
        image
        status
        species
        gender
      }
    }
  }
`;

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      name
      image
      status
      species
      gender
    }
  }
`;
