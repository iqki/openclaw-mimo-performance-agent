#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { buildManifest, renderReport } from './report.js';
import { getScenarioManifest } from './scenarios.js';

function printHelp() {
  console.log(`OpenClaw MiMo Performance Agent

Usage:
  openclaw-mimo-agent manifest
  openclaw-mimo-agent scenarios
  openclaw-mimo-agent report [--out <path>]

Commands:
  manifest   Print the benchmark manifest as JSON.
  scenarios  Print the scenario list as JSON.
  report     Print the markdown report and optionally write it to a file.
`);
}

function writeOutput(targetPath, content) {
  const absolutePath = resolve(process.cwd(), targetPath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, content, 'utf8');
}

function parseOutPath(args) {
  const outIndex = args.indexOf('--out');
  if (outIndex === -1) {
    return null;
  }

  return args[outIndex + 1] ?? null;
}

const args = process.argv.slice(2);
const command = args[0] ?? 'help';
const outPath = parseOutPath(args);

if (command === 'manifest') {
  console.log(JSON.stringify(buildManifest(), null, 2));
} else if (command === 'scenarios') {
  console.log(JSON.stringify(getScenarioManifest(), null, 2));
} else if (command === 'report') {
  const report = renderReport();
  console.log(report);

  if (outPath) {
    writeOutput(outPath, report);
  }
} else {
  printHelp();
}