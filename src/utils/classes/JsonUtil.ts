import fs from "fs";

export class JsonUtil {
  public static readJsonSync<T>(path: string): T {
    const rawData = fs.readFileSync(path);
    const data = <T>JSON.parse(rawData.toString());
    return data;
  }

  public static writeJsonSync<T>(path: string, data: T): void {
    try {
      fs.writeFileSync(path, JSON.stringify(data));
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
