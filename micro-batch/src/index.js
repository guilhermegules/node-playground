import { MicroBatcher } from "./microBatch.js";
import { Processor } from "./processor.js";

const processor = new Processor();

const batcher = new MicroBatcher({
  onBatch: processor.process,
});

function startProducer() {
  setInterval(() => {
    const event = {
      id: Date.now(),
      value: Math.floor(Math.random() * 1000),
    };

    console.log("Received event:", event.value);

    batcher.add(event);
  }, 500);
}

startProducer();
