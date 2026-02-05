export function fetchEconomiaAPI() {
  return fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL").then(
    (res) => res.json(),
  );
}
