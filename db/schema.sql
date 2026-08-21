-- Afripixel Demo Centre — MySQL schema
-- Creates the database (if needed) and the industries, demos, and admin_users tables.

CREATE DATABASE IF NOT EXISTS afripixel
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE afripixel;

CREATE TABLE IF NOT EXISTS industries (
  id CHAR(36) NOT NULL PRIMARY KEY,
  slug VARCHAR(120) NOT NULL,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(500) NOT NULL DEFAULT '',
  blurb VARCHAR(200) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  UNIQUE KEY industries_slug_unique (slug)
);

CREATE TABLE IF NOT EXISTS demos (
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
);

CREATE TABLE IF NOT EXISTS admin_users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  email VARCHAR(200) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE KEY admin_users_email_unique (email)
);
