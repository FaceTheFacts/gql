export const ServerConfig = {
  STATIC_FILE_PATH: "./statics",
  api: {
    BASE_URL: "https://www.abgeordnetenwatch.de/api/v2",
    FETCH_RANGE_SIZE: 999,
  },
  gql: {
    MAX_QUERY_DEPTH: 3,
  },
};
