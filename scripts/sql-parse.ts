/**
 * Parse MySQL INSERT row tuples from a phpMyAdmin dump.
 * Returns array of field arrays (strings | null | numbers as strings).
 */
export const parseMysqlRows = (valuesSql: string): string[][] => {
  const rows: string[][] = []
  let i = 0
  const s = valuesSql

  const skipWs = () => {
    while (i < s.length && /\s/.test(s[i]!)) i++
  }

  while (i < s.length) {
    skipWs()
    if (s[i] === ';') break
    if (s[i] === ',') {
      i++
      continue
    }
    if (s[i] !== '(') {
      i++
      continue
    }
    i++ // (
    const fields: string[] = []
    while (i < s.length) {
      skipWs()
      if (s[i] === ')') {
        i++
        break
      }
      if (s[i] === ',') {
        i++
        continue
      }
      if (s.slice(i, i + 4).toUpperCase() === 'NULL' && (i + 4 >= s.length || /[\s,)]/.test(s[i + 4]!))) {
        fields.push('')
        i += 4
        continue
      }
      if (s[i] === "'") {
        i++
        let val = ''
        while (i < s.length) {
          if (s[i] === '\\' && i + 1 < s.length) {
            const n = s[i + 1]!
            if (n === 'n') val += '\n'
            else if (n === 'r') val += '\r'
            else if (n === 't') val += '\t'
            else if (n === '0') val += '\0'
            else val += n
            i += 2
            continue
          }
          if (s[i] === "'" && s[i + 1] === "'") {
            val += "'"
            i += 2
            continue
          }
          if (s[i] === "'") {
            i++
            break
          }
          val += s[i]
          i++
        }
        fields.push(val)
        continue
      }
      // number or bare token
      let token = ''
      while (i < s.length && !/[\s,)]/.test(s[i]!)) {
        token += s[i]
        i++
      }
      fields.push(token)
    }
    rows.push(fields)
  }
  return rows
}

export const extractInsertBlocks = (sql: string, table: string): string[] => {
  const blocks: string[] = []
  const re = new RegExp(
    `INSERT INTO \\\`${table}\\\`[^;]*VALUES\\s*`,
    'gi'
  )
  let match: RegExpExecArray | null
  while ((match = re.exec(sql)) !== null) {
    const start = match.index + match[0].length
    let i = start
    let depth = 0
    let inStr = false
    let escape = false
    for (; i < sql.length; i++) {
      const c = sql[i]!
      if (inStr) {
        if (escape) {
          escape = false
          continue
        }
        if (c === '\\') {
          escape = true
          continue
        }
        if (c === "'") {
          if (sql[i + 1] === "'") {
            i++
            continue
          }
          inStr = false
        }
        continue
      }
      if (c === "'") {
        inStr = true
        continue
      }
      if (c === '(') depth++
      if (c === ')') depth--
      if (c === ';' && depth <= 0) {
        blocks.push(sql.slice(start, i))
        break
      }
    }
  }
  return blocks
}
