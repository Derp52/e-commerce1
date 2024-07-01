import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://smart-manatee-83.hasura.app/v1/graphql",
        headers: { "x-hasura-admin-secret": "neHCcZj9xsoyH4NzB62CVVgZhQdKqonpK3hK75NaC363K3IOutV0mIMC66zFtjv7",
        },
    }),
    cache: new InMemoryCache(),
});

export default client;