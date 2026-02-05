import { fetchEconomiaAPI } from "./fetch-economia-api";

export class Processor {
  async process(events) {
    const usdToBrlValue = await fetchEconomiaAPI();

    const sum =
      events.reduce((acc, e) => acc + e.value, 0) +
      Number(usdToBrlValue.USDBRL.high);

    console.log("📊 Processed batch summary:");
    console.log("   events:", events.length);
    console.log("   sum:", sum, "\n");
  }
}
