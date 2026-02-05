import { FlushReason } from "./flushReason.js";

export class MicroBatcher {
  constructor({ maxBatchSize = 10, maxWaitTimeMs = 5000, onBatch }) {
    this.maxBatchSize = maxBatchSize;
    this.maxWaitTimeMs = maxWaitTimeMs;
    this.onBatch = onBatch;

    this.buffer = [];
    this.timer = null;
  }

  add(event) {
    this.buffer.push(event);

    if (this.buffer.length === 1) {
      this.startTimer();
    }

    if (this.buffer.length >= this.maxBatchSize) {
      this.flush(FlushReason.SIZE_REACHED);
    }
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.flush(FlushReason.TIME_REACHED);
    }, this.maxWaitTimeMs);
  }

  async flush(reason) {
    if (this.buffer.length === 0) return;

    const batch = [...this.buffer];
    this.buffer = [];

    clearTimeout(this.timer);
    this.timer = null;

    console.log(`\nFlushing batch (${batch.length}) - ${reason}\n`);

    try {
      await this.onBatch(batch);
    } catch (error) {
      console.error("Batch processing failed:", error);
    }
  }
}
