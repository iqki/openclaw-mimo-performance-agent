import assert from 'node:assert/strict';
import { buildManifest } from './report.js';
import { metricIds } from './metrics.js';
import { getScenarioManifest } from './scenarios.js';

const manifest = buildManifest();
const scenarios = getScenarioManifest();
const ids = metricIds();

assert.equal(manifest.project, 'openclaw-mimo-performance-agent');
assert.ok(Array.isArray(scenarios));
assert.ok(scenarios.length >= 4);
assert.ok(new Set(scenarios.map((scenario) => scenario.id)).size === scenarios.length);
assert.ok(ids.includes('TTFT'));
assert.ok(ids.includes('E2E'));

console.log('Validation passed.');