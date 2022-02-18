import GraphQLDatabaseLoader from "@mando75/typeorm-graphql-loader";
import { ApolloServer } from "apollo-server-express";
import type { Express } from "express";
import express from "express";
import { buildSchema } from "type-graphql";

import { prepareConnection } from "./db/prepareConnection";
import { PoliticianResolver } from "./resolvers/politician.resolver";

const startApolloServer = async (): Promise<{
  server: ApolloServer;
  app: Express;
}> => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PoliticianResolver],
    }),
    context: async () => {
      const connection = await prepareConnection();
      const loader = new GraphQLDatabaseLoader(connection, {
        maxQueryDepth: 2,
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
