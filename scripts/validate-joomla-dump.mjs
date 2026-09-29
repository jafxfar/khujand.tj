#!/usr/bin/env node
/**
 * Validates that a SQL file looks like a Joomla application dump
 * (not MySQL information_schema).
 */
import fs from 'node:fs'
import path from 'node:path'

const file = process.argv[2]
if (!file) {
  console.error('Usage: node scripts/validate-joomla-dump.mjs <path-to.sql>')
  process.exit(1)
}

const abs = path.resolve(file)
if (!fs.existsSync(abs)) {
  console.error(`File not found: ${abs}`)
  process.exit(1)
}

const sql = fs.readFileSync(abs, 'utf8')
const lower = sql.toLowerCase()

if (lower.includes('база данных: `information_schema`') || lower.includes('database: `information_schema`')) {
  console.error('FAIL: This is information_schema (MySQL system catalog), not the site database.')
  process.exit(1)
}

const tableRe = /create\s+table\s+(?:if\s+not\s+exists\s+)?`?([a-z0-9_]+)`?/gi
const tables = new Set()
let m
while ((m = tableRe.exec(sql))) {
  tables.add(m[1].toLowerCase())
}

const prefixes = ['jos_', 'j25_', 'j16_', 'bak_jos_']
const joomlaTables = [...tables].filter((t) => prefixes.some((p) => t.startsWith(p)) || t.includes('content') && t.startsWith('jos'))

const hasContent = [...tables].some((t) => /^(jos_|j\d+_)?content$/.test(t) || t.endsWith('_content'))
const hasUsers = [...tables].some((t) => t.endsWith('_users') || t === 'jos_users')
const hasInserts = /insert\s+into/i.test(sql)

console.log(`File: ${abs}`)
console.log(`Tables found: ${tables.size}`)
console.log(`Joomla-like tables: ${joomlaTables.length}`)
if (joomlaTables.length) {
  console.log(joomlaTables.sort().slice(0, 40).join(', ') + (joomlaTables.length > 40 ? '...' : ''))
}
console.log(`Has INSERT data: ${hasInserts}`)
console.log(`Has content table: ${hasContent}`)
console.log(`Has users table: ${hasUsers}`)

if (joomlaTables.length < 3 || !hasContent) {
  console.error('FAIL: Dump does not look like a Joomla site database. Export the DB from configuration.php $db.')
  process.exit(1)
}

console.log('OK: Dump looks like a Joomla application database.')
process.exit(0)
