import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query {
    characters {
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
