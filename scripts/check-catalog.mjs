// Catalog integrity: unique ids, relations point at real perfumes, images exist on disk.
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { fallbackPerfumes, fallbackDupeRelations } from '../client/src/data/fallbackPerfumes.js'

const ids = new Set(fallbackPerfumes.map((p) => p._id))
assert.equal(ids.size, fallbackPerfumes.length, 'duplicate perfume _id')
for (const r of fallbackDupeRelations) {
  assert.ok(ids.has(r.originalId) && ids.has(r.dupeId), `broken relation ${r._id}`)
}
for (const p of fallbackPerfumes.filter((p) => p.imageUrl)) {
  assert.ok(existsSync(new URL(`../client/public${p.imageUrl}`, import.meta.url)), `missing image ${p.imageUrl}`)
}
console.log(`ok: ${fallbackPerfumes.length} perfumes, ${fallbackDupeRelations.length} relations, ${fallbackPerfumes.filter((p) => p.trending).length} trending`)
