const kraken = require('./lib/kraken');

let sell = false;
let balance = 0;
let priceSell = 0;

const tradingPair = 'XXBTZEUR';
const lowPrice = 1117;
const highPrice = 1123;
const minimumBalance = 24;

function startTrade() {
  kraken.balance()
    .then(balanceData => {
      console.log(balanceData.result.ZEUR);
      balance = balanceData.result.ZEUR;

      return kraken.ticker({ pair: tradingPair });
    })
    .then(tickerData => {
      console.log(tickerData.result.XXBTZEUR.b[0]);
      priceSell = tickerData.result.XXBTZEUR.b[0];

      if (balance > minimumBalance && !sell && priceSell < lowPrice) {
        return kraken.buy({
          pair: tradingPair,
          volume: 0.008,
        });
      } else {
        return false;
      }
    })
    .then(buyData => {
      if(!buyData) return false;

      console.log(buyData.result);
      sell = true;

      return sell({
        pair: tradingPair,
        price: highPrice,
        volume: 0.008,
      }).then(sellData => {
        console.log(sellData.result);
        sell = false;
      });
    })
    .catch(console.error);
}

setTimeout(startTrade, 4000);

startTrade();
