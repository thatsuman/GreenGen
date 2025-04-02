export default {
  dialect: "postgresql",
  schema: "./src/utils/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://GreenGenDB_owner:npg_XEAS6F0zcHeT@ep-green-union-a1u9pzha-pooler.ap-southeast-1.aws.neon.tech/GreenGenDB?sslmode=require",
    connectionString:
      "postgresql://GreenGenDB_owner:npg_XEAS6F0zcHeT@ep-green-union-a1u9pzha-pooler.ap-southeast-1.aws.neon.tech/GreenGenDB?sslmode=require",
  },
};
