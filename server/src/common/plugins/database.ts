import { FastifyPluginCallback } from "fastify";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

export const databasePlugin: FastifyPluginCallback = (app, _, done) => {
  const dbPool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "postgres",
  });

  const database = drizzle(dbPool);
  app.addHook("onReady", async () => {
    await dbPool.connect();
    await migrate(database, { migrationsFolder: "./src/common/db/migrations" });

    app.log.info("Connected to the database");
  });

  app.addHook("onClose", async () => {
    await dbPool.end();
    app.log.info("Closed database connection");
  });

  if (!app.db) {
    app.decorate("db", database);
  }

  done();
};
