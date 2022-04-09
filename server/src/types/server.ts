import type { GraphQLDatabaseLoader } from "@mando75/typeorm-graphql-loader";
import type { ApolloServer } from "apollo-server-express";
import type { Express } from "express";
import type { Connection } from "typeorm";

export interface IContext {
  connection: Connection;
  loader: GraphQLDatabaseLoader;
}

export interface IApolloServer {
  server: ApolloServer;
  app: Express;
}
