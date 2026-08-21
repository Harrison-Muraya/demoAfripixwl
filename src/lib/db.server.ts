import mysql, { type Pool } from "mysql2/promise";
import type { DemoRow, IndustryRow } from "@/lib/db-types";

type SqlValue = string | number | boolean | Date | Buffer | null;

let poolPromise: Promise<Pool> | undefined;

function requireIdentifier(value: string, name: string): string {
  if (!/^[A-Za-z0-9_]+$/.test(value)) {
    throw new Error(`Invalid ${name}. Use only letters, numbers, and underscores.`);
  }
  return value;
}

function mysqlConfig() {
  return {
    host: process.env["MYSQL_HOST"] || "127.0.0.1",
    port: Number(process.env["MYSQL_PORT"] || 3306),
    user: process.env["MYSQL_USER"] || "root",
    password: process.env["MYSQL_PASSWORD"] ?? "",
    database: requireIdentifier(process.env["MYSQL_DATABASE"] || "afripixel", "MYSQL_DATABASE"),
    charset: "utf8mb4",
    timezone: "Z" as const,
    namedPlaceholders: false,
    waitForConnections: true,
    connectionLimit: 10,
  };
}

const schemaSql = [
  `CREATE TABLE IF NOT EXISTS industries (
    id CHAR(36) NOT NULL PRIMARY KEY,
    slug VARCHAR(120) NOT NULL,
    name VARCHAR(120) NOT NULL,
    description VARCHAR(500) NOT NULL DEFAULT '',
    blurb VARCHAR(200) NOT NULL DEFAULT '',
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE KEY industries_slug_unique (slug)
  )`,
  `CREATE TABLE IF NOT EXISTS demos (
    id CHAR(36) NOT NULL PRIMARY KEY,
    slug VARCHAR(160) NOT NULL,
    name VARCHAR(160) NOT NULL,
    industry_slug VARCHAR(120) NOT NULL,
    description VARCHAR(500) NOT NULL DEFAULT '',
    demo_url VARCHAR(300) NOT NULL,
    featured TINYINT(1) NOT NULL DEFAULT 0,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE KEY demos_slug_unique (slug),
    KEY demos_industry_slug_idx (industry_slug),
    KEY demos_featured_idx (featured),
    CONSTRAINT fk_demos_industry_slug
      FOREIGN KEY (industry_slug) REFERENCES industries (slug)
      ON UPDATE CASCADE
      ON DELETE RESTRICT
  )`,
  `CREATE TABLE IF NOT EXISTS admin_users (
    id CHAR(36) NOT NULL PRIMARY KEY,
    email VARCHAR(200) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE KEY admin_users_email_unique (email)
  )`,
];

async function ensureDatabaseExists(config: ReturnType<typeof mysqlConfig>) {
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    charset: config.charset,
  });
  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  } finally {
    await connection.end();
  }
}

async function ensureSchema(pool: Pool) {
  for (const sql of schemaSql) {
    await pool.query(sql);
  }
}

async function createPool(): Promise<Pool> {
  const config = mysqlConfig();
  try {
    const pool = mysql.createPool(config);
    await pool.query("SELECT 1");
    await ensureSchema(pool);
    return pool;
  } catch (error) {
    const code = mysqlErrorCode(error);
    if (code === "ER_BAD_DB_ERROR") {
      await ensureDatabaseExists(config);
      const pool = mysql.createPool(config);
      await pool.query("SELECT 1");
      await ensureSchema(pool);
      return pool;
    }
    throw new Error(mysqlErrorMessage(error));
  }
}

export function getPool(): Promise<Pool> {
  if (!poolPromise) {
    poolPromise = createPool();
  }
  return poolPromise;
}

export async function query<T>(sql: string, params: SqlValue[] = []): Promise<T[]> {
  const pool = await getPool();
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
}

export async function queryOne<T>(sql: string, params: SqlValue[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function exec(sql: string, params: SqlValue[] = []): Promise<void> {
  const pool = await getPool();
  await pool.execute(sql, params);
}

function mysqlErrorCode(error: unknown): string | undefined {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code: unknown }).code;
    return typeof code === "string" ? code : undefined;
  }
  return undefined;
}

export function mysqlErrorMessage(error: unknown): string {
  const code = mysqlErrorCode(error);
  if (code === "ECONNREFUSED") {
    return "Could not connect to MySQL. Check MYSQL_HOST / MYSQL_PORT and that the server is running.";
  }
  if (code === "ER_ACCESS_DENIED_ERROR") {
    return "MySQL rejected the credentials. Check MYSQL_USER and MYSQL_PASSWORD.";
  }
  if (code === "ER_DUP_ENTRY") {
    return "That slug or email is already in use.";
  }
  if (code === "ER_NO_REFERENCED_ROW_2" || code === "ER_NO_REFERENCED_ROW") {
    return "That industry does not exist. Create it first.";
  }
  if (code === "ER_ROW_IS_REFERENCED_2" || code === "ER_ROW_IS_REFERENCED") {
    return "Cannot delete this industry while demos still reference it.";
  }
  if (error instanceof Error && error.message) return error.message;
  return "Database error.";
}

function toIso(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : String(value);
}

type IndustryRecord = Omit<IndustryRow, "created_at" | "updated_at"> & {
  created_at: Date | string;
  updated_at: Date | string;
};

type DemoRecord = Omit<DemoRow, "created_at" | "updated_at" | "featured"> & {
  featured: number | boolean;
  created_at: Date | string;
  updated_at: Date | string;
};

export function mapIndustry(row: IndustryRecord): IndustryRow {
  return {
    ...row,
    created_at: toIso(row.created_at),
    updated_at: toIso(row.updated_at),
  };
}

export function mapDemo(row: DemoRecord): DemoRow {
  return {
    ...row,
    featured: Boolean(row.featured),
    created_at: toIso(row.created_at),
    updated_at: toIso(row.updated_at),
  };
}
