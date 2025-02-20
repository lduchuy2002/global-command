#!/usr/bin/env node


const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Usage: switch-env <env>");
  process.exit(1);
}

const envName = args[0];
const sourceFile = path.join(process.cwd(), `.env.${envName}`);
const targetFile = path.join(process.cwd(), ".env");

if (!fs.existsSync(sourceFile)) {
  console.error(`Error: ${sourceFile} does not exist.`);
  process.exit(1);
}

try {
  fs.copyFileSync(sourceFile, targetFile);
  console.log(`✅ Successfully switched to '${envName}' environment.`);
} catch (error) {
  console.error(`❌ Error copying file: ${error.message}`);
  process.exit(1);
}
