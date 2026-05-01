export const scenarioCatalog = [
  {
    id: 'long-context-compaction',
    name: 'Long context compaction regression',
    provider: 'mimo-token-plan',
    focus: 'compaction',
    objective: 'Reproduce context growth when the provider does not expose cache-friendly compaction behavior.',
    stressors: [
      'multi-turn history expansion',
      'token-plan provider without cache support',
      'repeat compaction checkpoints'
    ],
    measurements: ['context_tokens', 'cache_hit_rate', 'compaction_success_rate', 'TTFT', 'E2E'],
    successCriteria: [
      'context size stays bounded across turns',
      'compaction does not regress TTFT',
      'cache fallback behavior is explicit'
    ]
  },
  {
    id: 'tool-heavy-event-loop',
    name: 'Tool-heavy event loop regression',
    provider: 'mimo-v2.5-pro',
    focus: 'plugin-runtime',
    objective: 'Measure overhead from heartbeat injection, tool schema handling, and repeated event loop work.',
    stressors: [
      'heartbeat pulses',
      'tool schema normalization',
      'rapid tool calls'
    ],
    measurements: ['plugin_overhead_ms', 'event_loop_overhead_ms', 'E2E', 'TPOT'],
    successCriteria: [
      'plugin dispatch stays below the configured budget',
      'heartbeat work is amortized',
      'schema handling avoids repeated serialization'
    ]
  },
  {
    id: 'reasoning-content-adapter',
    name: 'MiMo reasoning_content compatibility regression',
    provider: 'mimo-v2.5-omni',
    focus: 'output-normalization',
    objective: 'Check whether reasoning_content adaptation adds avoidable latency or extra copying.',
    stressors: [
      'reasoning_content field mapping',
      'response shape normalization',
      'streaming reply assembly'
    ],
    measurements: ['reasoning_normalization_ms', 'TTFT', 'TPOT'],
    successCriteria: [
      'the adapter stays close to zero-cost on the hot path',
      'normalization does not duplicate large payloads',
      'streaming output remains stable'
    ]
  },
  {
    id: 'multi-turn-e2e-slowdown',
    name: 'Multi-turn planning E2E regression',
    provider: 'mimo-v2.5-pro',
    focus: 'end-to-end',
    objective: 'Track TTFT and TPOT drift across a long planning conversation with tools enabled.',
    stressors: [
      'multi-turn planning',
      'tool usage over several rounds',
      'growing context window'
    ],
    measurements: ['TTFT', 'TPOT', 'E2E', 'context_growth_rate'],
    successCriteria: [
      'response latency does not degrade with turn count',
      'context growth is controlled',
      'tool calls do not dominate the total response time'
    ]
  }
];

export function getScenarioManifest() {
  return scenarioCatalog.map(({ id, name, provider, focus, objective, measurements }) => ({
    id,
    name,
    provider,
    focus,
    objective,
    measurements
  }));
}

export function getScenarioById(id) {
  return scenarioCatalog.find((scenario) => scenario.id === id) ?? null;
}