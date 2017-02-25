var KrakenClient = require('kraken-api');
var config = require('./config');

var kraken = new KrakenClient(config.apiKey, config.privateKey);

let sell = false;
let balance = 0;

function startTrade() {
  kraken.api('Balance', null, function(error, data) {
    if(error) {
        console.log(error);
    }
    else {
      console.log(data.result.ZEUR);
      balance = data.result.ZEUR;
      kraken.api('Ticker', {"pair": 'XXBTZEUR'}, function(error, data) {
        if(error) {
          console.log(error);
        } else {
          console.log(data.result.XXBTZEUR.b[0]);
          priceSell = data.result.XXBTZEUR.b[0];

          if (balance > 24 && !sell && priceSell < 1117) {
            kraken.api('AddOrder', {"pair": 'XXBTZEUR', "type": 'buy', "ordertype": 'market', "volume": 0.008, "oflags": 'fciq'}, function(error, data) {
              if(error) {
                console.log(error);
              }
              else {
                console.log(data.result);
                sell = true;
                console.log('BUY 0.008BTC');
                kraken.api('AddOrder', {"pair": 'XXBTZEUR', "type": 'sell', "ordertype": 'limit', "price": 1123, "volume": 0.008, "oflags": 'fciq'}, function(error, data) {
                  if(error) {
                    console.log(error);
                  }
                  else {
                    console.log(data.result);
                    sell = false;
                    console.log('SELL 0.008BTC');
                  }
                });
              }
            });
          }
        }
      });
    }
  });

  setTimeout(startTrade, 4000);
}

startTrade();
