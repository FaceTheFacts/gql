import { Connection, createConnection, getConnection } from "typeorm";

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = (): Promise<Connection> => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (_) {}

      const connection = await createConnection();

      return connection;
    })();
  }

  return connectionReadyPromise;
};
