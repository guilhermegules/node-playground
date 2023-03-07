import http from "node:http";

const API = "https://economia.awesomeapi.com.br/json/list";

http
  .createServer((request, response) => {
    if (request.url === "/exchange-rate") {
      fetch(`${API}/USD-BRL/2`)
        .then((response) => response.json())
        .then((result) => {
          response.end(JSON.stringify(formatExchange(result)));
        });
    } else {
      response.end(`${request.url} not found`);
    }
  })
  .listen(8080);

const formatExchange = (exchange) => {
  const [today, yesterday] = exchange;

  const todayAverage = averageCalculation(today.high, today.low);
  const yesterdayAverage = averageCalculation(yesterday.high, yesterday.low);
  const averageLastTwoDays = averageCalculation(todayAverage, yesterdayAverage);

  return {
    name: `${today.code}-${today.codein}`,
    highValue: currencyFormat(Number(today.high)),
    lowValue: currencyFormat(Number(today.low)),
    bid: currencyFormat(Number(today.bid)),
    averageCurrentDay: currencyFormat(todayAverage),
    averageLastTwoDays: currencyFormat(averageLastTwoDays),
  };
};

const averageCalculation = (highValue, lowerValue) =>
  (Number(highValue) + Number(lowerValue)) / 2;

const currencyFormat = (value) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(value);
};
