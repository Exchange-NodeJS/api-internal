import { Logger } from "@sync-markets/utilities";
import type { Knex } from "knex";
import path from "path";

const configKnex: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: "postgresql://root:root@0.0.0.0:5432/sync_markets",
    debug: true,
    asyncStackTraces: true,
    acquireConnectionTimeout: 10000,
    compileSqlOnError: false,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: "../migrations",
    },
    seeds: {
      directory: "../seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    debug: false,
    asyncStackTraces: false,
    acquireConnectionTimeout: 10000,
    compileSqlOnError: false,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations-prod",
      directory: "../migrations",
    },
    seeds: {
      directory: "../seeds",
    },
  },
};

export default configKnex;
