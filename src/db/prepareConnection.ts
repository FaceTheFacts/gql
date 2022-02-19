import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions,
} from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = (): Promise<Connection> => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (_) {}

      const connectionOptions = await getConnectionOptions();

      Object.assign(connectionOptions, {
        namingStrategy: new SnakeNamingStrategy(),
      });

      const connection = await createConnection();

      return connection;
    })();
  }

  return connectionReadyPromise;
};
