const axios = require("axios");

const Delivered = async (CONFIG, HEADERS) => {
  const map = new Map();
  await axios
    .post("https://api-seller.ozon.ru/v3/posting/fbs/list", CONFIG, {
      headers: HEADERS,
    })
    .then(res => res.data.result.postings)
    .then(res => console.log(res));
  return map;
};

module.exports = Delivered;
