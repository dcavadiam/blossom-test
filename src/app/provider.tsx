'use client'

import React from "react"
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";
import { Children } from "@/types/generalTypes";

export const ApolloClientProvider = ({children}: Children) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}