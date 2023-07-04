import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

// db.json file path

export const initConnection = () => {
  let db;
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, "db.json");
    console.log("file", file);

    const adapter = new JSONFileSync(file);
    const defaultData = { posts: [] };
    db = new LowSync(adapter, defaultData);

    db.read();
    const { posts } = db.data;
    posts.push("hello world");
    db.write();
    return db.data;
  } catch (error) {
    console.log("error :>> ", error);
  }
};
