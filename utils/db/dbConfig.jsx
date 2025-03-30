// postgresql://GreenGenDB_owner:npg_XEAS6F0zcHeT@ep-green-union-a1u9pzha-pooler.ap-southeast-1.aws.neon.tech/GreenGenDB?sslmode=require


import {neon} from '@neondatabase/serverless'

import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from './schema'

const sql = neon(
    process.env.DATABASE_URL
);

export const db = drizzle(sql, { schema })