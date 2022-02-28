import _ from "lodash";
import { Connection } from "typeorm";

import { Topic } from "../../entities/Topic";
import { toCamelCase } from "../../lib/toCamelCase";
import { DataSourceUtil } from "../classes/DataSourceUtil";

export const populateTopics = async (connection: Connection): Promise<void> => {
  const topics = await DataSourceUtil.loadEntities("topics");
  const formattedTopics = topics.map((topic) => {
    if (topic.parent) {
      return {
        ...topic,
        parent: topic.parent[0].id,
      };
    }

    return topic;
  });

  await connection
    .createQueryBuilder()
    .insert()
    .into(Topic)
    .values(toCamelCase(formattedTopics))
    .execute();
};
