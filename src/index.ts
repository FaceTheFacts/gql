import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, gql } from "apollo-server-core";
import express from "express";
import http from "http";
import { DocumentNode } from "graphql";
import { createConnection } from "typeorm";

async function startApolloServer(typeDefs: DocumentNode, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await createConnection();
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields

const resolvers = { Query: { hello: () => "Hello world!" } };

startApolloServer(typeDefs, resolvers);
