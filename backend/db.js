import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

// db.json file path

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");
console.log("file", file);

const adapter = new JSONFileSync(file);
const defaultData = { records: [] };
const db = new LowSync(adapter, defaultData);

export default db;
