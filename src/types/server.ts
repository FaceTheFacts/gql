import type { GraphQLDatabaseLoader } from "@mando75/typeorm-graphql-loader";
import type { ApolloServer } from "apollo-server-express";
import type { Express } from "express";

export interface IContext {
  loader: GraphQLDatabaseLoader;
}

export interface IApolloServer {
  server: ApolloServer;
  app: Express;
}
