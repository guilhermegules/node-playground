import fs from "fs";

const TOTAL_ROWS = 100_000_000;
const ONE_MILLION = 1_000_000;
const OUTPUT = "data.csv";

const urls = [
  "/blog",
  "/pricing",
  "/about",
  "/contact",
  "/docs"
];

function randomUrl() {
  return urls[Math.floor(Math.random() * urls.length)];
}

function randomTimestamp() {
  const year = 2020 + Math.floor(Math.random() * 6);
  const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
  const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");

  const hour = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const min = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const sec = String(Math.floor(Math.random() * 60)).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${min}:${sec}+00:00`;
}

const stream = fs.createWriteStream(OUTPUT);

let i = 0;

function write() {
  let ok = true;

  while (i < TOTAL_ROWS && ok) {
    const line = `${randomUrl()},${randomTimestamp()}\n`;
    ok = stream.write(line);
    i++;

    if (i % ONE_MILLION === 0) {
      console.log(`Generated ${i} rows`);
    }
  }

  if (i < TOTAL_ROWS) {
    stream.once("drain", write);
  } else {
    stream.end();
    console.log("Done! 100,000,000 rows generated");
  }
}

write();
