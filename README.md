# OpenClaw MiMo Performance Agent

This repository is a companion harness for OpenClaw performance work on MiMo models.
It is designed to help you reproduce latency regressions, isolate bottlenecks, generate a focused patch plan, and hand the result to Claude Code for implementation.

The goal is not to reimplement OpenClaw. The goal is to make the optimization loop measurable and repeatable.

## What this repo covers

- Long-context compaction regressions on non-cache providers.
- Tool-heavy and event-loop-heavy agent runs.
- MiMo output normalization, especially `reasoning_content` handling.
- End-to-end response time tracking across multi-turn tasks.
- Patch planning and regression reporting for Claude Code follow-up.

## Repo layout

- `src/` core manifest, scenario catalog, and markdown report generation.
- `test/` smoke tests for the benchmark manifest.
- `docs/` architecture and metric definitions.
- `prompts/` Claude Code operating prompt for the optimization loop.
- `.github/workflows/ci.yml` lightweight validation workflow.

## How the loop is intended to work

1. Point the harness at a local OpenClaw checkout.
2. Run the scenario catalog against MiMo providers.
3. Capture TTFT, TPOT, E2E, cache, compaction, plugin, and gateway timings.
4. Convert the trace into a bottleneck report.
5. Ask Claude Code to produce a minimal patch.
6. Re-run the same scenarios to confirm the delta.

## Required inputs from your OpenClaw checkout

This repo assumes you have the OpenClaw source code available separately.
You can wire it in through your own runner, for example by pointing the harness at a local clone and passing the path through configuration.

Suggested environment variables:

- `OPENCLAW_SOURCE_DIR` local OpenClaw checkout path.
- `OPENCLAW_GITHUB_REPO` target GitHub repository name.
- `MIMO_MODEL` target model identifier.
- `BENCHMARK_OUTPUT_DIR` directory for traces and reports.

## Commands

The repo ships with a small Node-based manifest and reporting layer.

```bash
npm run manifest
npm run scenarios
npm run report
npm test
```

The `report` command prints a markdown summary that you can redirect into an artifact or PR comment.

## Why this shape

The bottlenecks you described are not all in the same layer, so the repo keeps the scenario catalog, metric catalog, report generator, and Claude Code prompt separate.
That makes it easier to change one side of the loop without rewriting the others.