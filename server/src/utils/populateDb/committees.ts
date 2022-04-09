import _ from "lodash";
import { Connection } from "typeorm";

import { Committee } from "../../entities/Committee";
import { Topic } from "../../entities/Topic";
import { toCamelCase } from "../../lib/toCamelCase";
import { DataSourceUtil } from "../classes/DataSourceUtil";

export const populateCommittees = async (
  connection: Connection,
): Promise<void> => {
  const committees = await DataSourceUtil.loadEntities("committees");

  const formattedCommittees = committees.map((committee) => ({
    ...committee,
    field_legislature: committee.field_legislature.id,
  }));

  await connection
    .createQueryBuilder()
    .insert()
    .into(Committee)
    .values(toCamelCase(formattedCommittees))
    .execute();

  const [insertedCommittees, topics] = await Promise.all([
    connection.getRepository(Committee).find(),
    connection.getRepository(Topic).find(),
  ]);

  const topicsMap: Record<string, Topic> = {};
  topics.forEach((topic) => {
    topicsMap[topic.id] = topic;
  });

  const committeeFieldTopicsMap: Record<string, Topic[]> = {};
  committees.forEach((committee) => {
    if (committee.field_topics) {
      committeeFieldTopicsMap[committee.id] = committee.field_topics.map(
        (topic) => topicsMap[topic.id],
      );
    }
  });

  for (const inserted of insertedCommittees) {
    if (inserted.id.toString() in committeeFieldTopicsMap) {
      inserted.fieldTopics = committeeFieldTopicsMap[inserted.id.toString()];
    }
  }

  await connection.getRepository(Committee).save(insertedCommittees);
};
