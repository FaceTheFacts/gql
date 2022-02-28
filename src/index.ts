import GraphQLDatabaseLoader from "@mando75/typeorm-graphql-loader";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import path from "path";
import { buildSchema } from "type-graphql";

import { ServerConfig } from "./config/ServerConfig";
import { prepareConnection } from "./lib/prepareConnection";
import { PoliticiansResolvers } from "./resolvers/politicians.resolvers";
import type { IApolloServer, IContext } from "./types/server";

const startApolloServer = async (): Promise<IApolloServer> => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PoliticiansResolvers],
      emitSchemaFile: path.resolve(
        __dirname,
        "__generated__/schema/schema.gql",
      ),
    }),
    context: async (): Promise<IContext> => {
      const connection = await prepareConnection();
      const loader = new GraphQLDatabaseLoader(connection, {
        maxQueryDepth: ServerConfig.gql.MAX_QUERY_DEPTH,
      });

      return { loader };
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
