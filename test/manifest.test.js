import assert from 'node:assert/strict';
import test from 'node:test';
import { buildManifest } from '../src/report.js';
import { metricCatalog } from '../src/metrics.js';
import { scenarioCatalog } from '../src/scenarios.js';

test('buildManifest exposes the scenario catalog', () => {
  const manifest = buildManifest();

  assert.equal(manifest.project, 'openclaw-mimo-performance-agent');
  assert.equal(manifest.scenarios.length, scenarioCatalog.length);
  assert.equal(manifest.metrics.length, metricCatalog.length);
});

test('scenario ids stay unique', () => {
  const ids = scenarioCatalog.map((scenario) => scenario.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('metric catalog includes the main latency signals', () => {
  const ids = metricCatalog.map((metric) => metric.id);
  assert.ok(ids.includes('TTFT'));
  assert.ok(ids.includes('TPOT'));
  assert.ok(ids.includes('E2E'));
});