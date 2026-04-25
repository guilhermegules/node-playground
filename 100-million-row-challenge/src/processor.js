import fs from "fs";
import readline from "readline";

const INPUT = "data.csv";
const OUTPUT = "output.json";
const BATCH_SIZE = 100_000;

const results = new Map();

function processBatch() {
  for (const line of batch) {
    const commaIndex = line.indexOf(",");
    const url = line.slice(0, commaIndex);
    const timestamp = line.slice(commaIndex + 1, commaIndex + 11);

    const key = url + "\0" + timestamp;
    const count = results.get(key) || 0;
    results.set(key, count + 1);
  }
  batch = [];
}

let batch = [];
let processed = 0;

const input = fs.createReadStream(INPUT, {
  highWaterMark: 64 * 1024
});

const rl = readline.createInterface({
  input,
  crlfDelay: Infinity
});

rl.on("line", (line) => {
  batch.push(line);
  processed++;

  if (batch.length >= BATCH_SIZE) {
    processBatch();
  }

  if (processed % 10_000_000 === 0) {
    console.log(`Processed ${processed.toLocaleString()} rows`);
  }
});

rl.on("close", () => {
  if (batch.length > 0) {
    processBatch();
  }

  console.log(`Aggregating ${results.size.toLocaleString()} entries...`);

  const output = {};

  for (const [key, count] of results) {
    const [url, date] = key.split("\0");

    if (!output[url]) {
      output[url] = {};
    }
    output[url][date] = count;
  }

  for (const url in output) {
    const dates = Object.keys(output[url]).toSorted();
    const sorted = {};
    for (const date of dates) {
      sorted[date] = output[url][date];
    }
    const escapedUrl = url.replace(/\//g, "\\/");
    output[escapedUrl] = sorted;
    delete output[url];
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 4));
  console.log(`Done! Written to ${OUTPUT}`);
});

rl.on("error", (err) => {
  console.error("Error:", err);
  process.exit(1);
});