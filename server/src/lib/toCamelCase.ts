import _ from "lodash";

type TObject = Record<string, any>;

export const toCamelCase = (obj: TObject): TObject =>
  _.transform(obj, (acc: TObject, value, key: string, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);
    acc[camelKey] = _.isObject(value) ? toCamelCase(value) : value;
  });
