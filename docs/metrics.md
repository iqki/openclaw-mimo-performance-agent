# Metrics

The harness uses a small set of metrics that map directly to the regressions you want to control.

## Core latency metrics

- `TTFT` time to first token.
- `TPOT` time per output token.
- `E2E` full user-visible response time.

## Structural metrics

- `context_tokens` current prompt size.
- `context_growth_rate` token growth per turn.
- `compaction_success_rate` share of runs that compact safely.
- `cache_hit_rate` provider-side cache reuse.

## Framework metrics

- `plugin_overhead_ms` time spent in plugin dispatch.
- `event_loop_overhead_ms` time spent in heartbeat and loop work.
- `gateway_routing_ms` time spent in routing and envelope handling.
- `reasoning_normalization_ms` time spent adapting MiMo output.

## Suggested regression thresholds

- Any sustained `E2E` increase above 15 percent should fail the benchmark gate.
- A `TTFT` increase above 10 percent should be treated as a priority regression.
- Unbounded `context_tokens` growth is a correctness bug, not just a performance issue.

## Reporting rule

Every run should answer three things:

1. What was the slowest span?
2. What changed relative to the previous baseline?
3. What is the smallest patch worth trying next?