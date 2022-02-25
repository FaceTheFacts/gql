import fs from "fs";

import { ServerConfig } from "../config/ServerConfig";
import { request } from "../lib/request";
import type { ApiResponse } from "../types/api";
import type { ApiEntities } from "../types/helpers";
import { JsonUtil } from "../utils/classes/JsonUtil";

const hasValidFile = (path: string): boolean => {
  if (!fs.existsSync(path)) {
    return false;
  }

  try {
    const fileInfo = fs.statSync(path);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (fileInfo.mtime && fileInfo.mtime > yesterday) {
      return true;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }

  return false;
};

export const requestEntities = async <K extends keyof ApiEntities>(
  entitiesName: K,
  parameter?: string,
): Promise<ApiEntities[K][]> => {
  console.log(`Fetching ${entitiesName}...`);
  const response = await request<ApiResponse<ApiEntities[K][]>>(
    `${ServerConfig.api.BASE_URL}/${entitiesName}${
      parameter ? "?" + parameter + "&" : "?"
    }range_end=0`,
  );

  const { total } = response.meta.result;
  const pageCount = Math.ceil(total / ServerConfig.api.FETCH_RANGE_SIZE);
  const pageNrs: number[] = Array(pageCount)
    .fill(null)
    .map((_, idx) => idx);

  const entities: ApiEntities[K][] = new Array(total);

  await Promise.all(
    Array(5)
      .fill(null)
      .map(async () => {
        let pageNr: number | undefined;
        while ((pageNr = pageNrs.pop()) !== undefined) {
          const res = await request<ApiResponse<ApiEntities[K][]>>(
            `https://www.abgeordnetenwatch.de/api/v2/${entitiesName}${
              parameter ? "?" + parameter + "&" : "?"
            }range_start=${
              ServerConfig.api.FETCH_RANGE_SIZE * pageNr
            }&range_end=${ServerConfig.api.FETCH_RANGE_SIZE}`,
          );
          res.data.forEach(
            (val, idx) =>
              (entities[idx + pageNr! * ServerConfig.api.FETCH_RANGE_SIZE] =
                val),
          );
        }
      }),
  );

  return entities;
};

export async function loadEntities<K extends keyof ApiEntities>(
  entitiesName: K,
  parameter?: string,
): Promise<ApiEntities[K][]> {
  const path = `./src/api/${entitiesName}.json`;

  if (!hasValidFile(path)) {
    const data = await requestEntities(entitiesName, parameter);
    JsonUtil.writeJsonSync(path, data);
    return data;
  }

  const data = JsonUtil.readJsonSync<ApiEntities[K][]>(path);
  return data;
}
