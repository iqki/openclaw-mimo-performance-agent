export const metricCatalog = [
  {
    id: 'TTFT',
    name: 'Time to first token',
    scope: 'user-visible latency',
    note: 'Primary signal for perceived responsiveness.'
  },
  {
    id: 'TPOT',
    name: 'Time per output token',
    scope: 'streaming throughput',
    note: 'Useful for separating model speed from orchestration overhead.'
  },
  {
    id: 'E2E',
    name: 'End-to-end response time',
    scope: 'full turn latency',
    note: 'Measures the total cost of a request from enqueue to final reply.'
  },
  {
    id: 'context_tokens',
    name: 'Context size',
    scope: 'prompt growth',
    note: 'Tracks whether compaction and pruning actually keep history bounded.'
  },
  {
    id: 'plugin_overhead_ms',
    name: 'Plugin dispatch overhead',
    scope: 'framework overhead',
    note: 'Captures tool schema handling and plugin fan-out cost.'
  },
  {
    id: 'reasoning_normalization_ms',
    name: 'Reasoning output normalization cost',
    scope: 'compatibility layer',
    note: 'Measures the overhead of mapping MiMo reasoning fields into OpenClaw shapes.'
  }
];

export function metricIds() {
  return metricCatalog.map((metric) => metric.id);
}

export function summarizeMetrics() {
  return metricCatalog.map((metric) => `${metric.id}: ${metric.name}`).join('\n');
}