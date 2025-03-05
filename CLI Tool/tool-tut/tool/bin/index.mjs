#!/usr/bin/env node
import arg from "arg";
import chalk from "chalk";
import { start } from "../src/commands/start.js";
import { getConfig } from "../src/config/config-mgr.js";

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
    "--help": Boolean,
  });

  // If no commands were provided
  if (Object.keys(args).filter((k) => k.startsWith("--")).length === 0) {
    usage();
    process.exit(1);
  }

  if (args["--help"]) {
    usage();
    process.exit(0);
  }

  if (args["--start"]) {
    const config = getConfig();
    start(config);
  }

  if (args["--build"]) {
    console.log(chalk.bgGreenBright("Building the app"));
  }
} catch (e) {
  console.log(chalk.yellow(e.message));
  console.log();
  usage();
  process.exit(1);
}

function usage() {
  console.log(`${chalk.whiteBright("Usage: tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--build")}\tBuilds the app
  ${chalk.greenBright("--help")}\tShows this help message`);
}
