# Claude Code Operating Prompt

You are working on OpenClaw performance regressions under MiMo models.

## Objective

Find the smallest safe change that improves TTFT, TPOT, or E2E without breaking OpenClaw behavior.

## Rules

- Start from the benchmark report, not from a guess.
- Keep one falsifiable hypothesis at a time.
- Before the first edit, identify the cheapest check that could disprove the hypothesis.
- After the first substantive edit, run the narrowest validation that can confirm or reject the change.
- Prefer local changes to compaction, normalization, or dispatch before touching broader architecture.
- Do not widen scope until the current hypothesis is resolved.

## Likely fix categories

- Non-cache compaction fallback.
- Heartbeat and event loop overhead reduction.
- MiMo `reasoning_content` normalization.
- Plugin schema handling and repeated serialization removal.
- Token growth controls for long multi-turn sessions.

## Output format

Return:

1. the observed bottleneck,
2. the proposed patch,
3. the validation result,
4. the residual risk.