const { Client } = require('pg');

const c = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Postgres@15',
  database: 'postgres'
});

async function run() {
  try {
    await c.connect();
    console.log("Connected to database...");

    // 1. Enable UUID extension
    await c.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    // 2. Create the users table
    await c.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      );
    `);

    // 3. Update Todo table if needed
    await c.query('ALTER TABLE IF EXISTS "Todo" ADD COLUMN IF NOT EXISTS "description" text;');
    await c.query('ALTER TABLE IF EXISTS "Todo" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP NOT NULL DEFAULT now();');

    console.log("Success! Users table created and Todo table updated.");
  } catch (err) {
    console.error("Error running migration:", err.message);
  } finally {
    await c.end();
  }
}

run();