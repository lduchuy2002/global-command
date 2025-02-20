#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Usage: gen-token <token>");
  process.exit(1);
}

const token = args[0];
const envFile = path.join(process.cwd(), ".env");

// Read the .env file or create a new one
let envContent = "";
if (fs.existsSync(envFile)) {
  envContent = fs.readFileSync(envFile, "utf8");
}

const regex = /^CODE_GEN_TOKEN=.*$/m;

if (regex.test(envContent)) {
  // Replace existing token
  envContent = envContent.replace(regex, `CODE_GEN_TOKEN=${token}`);
} else {
  // Append new token
  envContent += `\nCODE_GEN_TOKEN=${token}\n`;
}

// Write updated .env file
fs.writeFileSync(envFile, envContent.trim() + "\n", "utf8");

console.log(`✅ CODE_GEN_TOKEN set to: ${token}`);
