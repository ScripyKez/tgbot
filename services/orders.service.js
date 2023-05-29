const axios = require("axios");

const Orders = async (CONFIG, HEADERS) => {
  const map = new Map();
  const data = await axios
    .post(
      "https://api-seller.ozon.ru/v3/posting/fbs/unfulfilled/list",
      CONFIG,
      {
        headers: HEADERS,
      }
    )
    .then(res => res.data.result)
    .then(res => res.postings)
    .then(items => {
      items.map(item => {
        if (item.products.length <= 1) {
          if (!map.has(item.shipment_date)) {
            map.set(item.shipment_date, new Map());
            map
              .get(item.shipment_date)
              .set(item.products[0].offer_id, item.products[0].quantity);
          } else if (
            map.get(item.shipment_date).has(item.products[0].offer_id)
          ) {
            map
              .get(item.shipment_date)
              .set(
                item.products[0].offer_id,
                map.get(item.shipment_date).get(item.products[0].offer_id) +
                  item.products[0].quantity
              );
          } else {
            map
              .get(item.shipment_date)
              .set(item.products[0].offer_id, item.products[0].quantity);
          }
        } else {
          item.products.map(product => {
            if (!map.has(item.shipment_date)) {
              map.set(item.shipment_date, new Map());
              map
                .get(item.shipment_date)
                .set(product.offer_id, product.quantity);
            } else if (map.get(item.shipment_date).has(product.offer_id)) {
              map
                .get(item.shipment_date)
                .set(
                  product.offer_id,
                  map.get(item.shipment_date).get(product.offer_id) +
                    product.quantity
                );
            } else {
              map
                .get(item.shipment_date)
                .set(product.offer_id, product.quantity);
            }
          });
        }
      });
    })
    .catch(err => console.log(err));
  return map;
};

module.exports = Orders;
