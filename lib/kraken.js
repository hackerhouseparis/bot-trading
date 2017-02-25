const KrakenClient = require('kraken-api');

const config = require('../config');

const kraken = new KrakenClient(config.apiKey, config.privateKey);

const buy = ({ volume, pair }) =>
  new Promise((resolve, reject) => {
    kraken.api('AddOrder', {
        pair,
        volume,
        "type": 'buy',
        "ordertype": 'market',
        "oflags": 'fciq'
      },
      function(error, data) {
        if(error) {
          reject(error);
        } else {
          console.log(`BOUGHT ${volume} BTC`);
          resolve(data);
        }
      });
  });

const sell = ({ price, volume, pair }) =>
  new Promise((resolve, reject) => {
    kraken.api('AddOrder', {
        pair,
        volume,
        price,
        "type": 'sell',
        "ordertype": 'limit',
        "oflags": 'fciq'
      },
      function(error, data) {
        if(error) {
          reject(error);
        } else {
          console.log(`SOLD ${volume} BTC at ${price}`);
          resolve(data);
        }
      });
  });

const ticker = ({ pair }) =>
  new Promise((resolve, reject) => {
    kraken.api('Ticker',
      { pair },
      function(error, data) {
        if(error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
  });


const balance = () =>
  new Promise((resolve, reject) => {
    kraken.api('Balance', null,
      function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
  });


module.exports = {
  buy,
  sell,
  ticker,
  balance,
};