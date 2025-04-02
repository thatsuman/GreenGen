import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://GreenGenDB_owner:npg_XEAS6F0zcHeT@ep-green-union-a1u9pzha-pooler.ap-southeast-1.aws.neon.tech/GreenGenDB?sslmode=require"
);
export const db = drizzle(sql, { schema });
