import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
})