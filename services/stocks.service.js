const axios = require("axios");

const Stocks = async (CONFIG, HEADERS) => {
  const map = new Map();
  const data = await axios
    .post("https://api-seller.ozon.ru/v3/product/info/stocks", CONFIG, {
      headers: HEADERS,
    })
    .then(res => res.data.result)
    .then(res => res.items)
    .then(item =>
      item.map(product => {
        if (product.stocks[0].type === "fbs") {
          map.set(product.offer_id, [
            product.stocks[0].type,
            product.stocks[0].present,
            product.stocks[0].reserved,
          ]);
        } else {
          map.set(product.offer_id, [
            product.stocks[1].type,
            product.stocks[1].present,
            product.stocks[1].reserved,
          ]);
        }
      })
    )
    .catch(err => console.log(err));
  return map;
};

module.exports = Stocks;
