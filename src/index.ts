import GraphQLDatabaseLoader from "@mando75/typeorm-graphql-loader";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import path from "path";
import { buildSchema } from "type-graphql";
import { createConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { ServerConfig } from "./config/ServerConfig";
import { PartyResolver } from "./resolvers/party.resolvers";
import { PoliticianResolver } from "./resolvers/politician.resolvers";
import { VoteResolver } from "./resolvers/vote.resolvers";
import type { IApolloServer, IContext } from "./types/server";

const startApolloServer = async (): Promise<IApolloServer> => {
  const connectionOptions = await getConnectionOptions();
  Object.assign(connectionOptions, {
    namingStrategy: new SnakeNamingStrategy(),
  });

  const connection = await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PartyResolver, PoliticianResolver, VoteResolver],
      emitSchemaFile: path.resolve(
        __dirname,
        "__generated__/schema/schema.gql",
      ),
    }),
    context: async (): Promise<IContext> => {
      const loader = new GraphQLDatabaseLoader(connection, {
        maxQueryDepth: ServerConfig.gql.MAX_QUERY_DEPTH,
      });

      return { connection, loader };
    },
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise((resolve: any) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
};

startApolloServer();
