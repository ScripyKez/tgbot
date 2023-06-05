require("dotenv").config();

module.exports.HEADERS = {
  "Client-Id": process.env.CLIENT_ID,
  "Api-Key": process.env.API_KEY,
  "Content-Type": "application/json",
};

module.exports.CONFIG_ORDERS = {
  dir: "ASC",
  filter: {
    cutoff_from: "2023-05-24T14:15:22Z",
    cutoff_to: "2023-12-31T14:15:22Z",
    delivery_method_id: [],
    provider_id: [],
    status: "awaiting_packaging",
    warehouse_id: [],
  },
  limit: 100,
  offset: 0,
  with: {
    analytics_data: true,
    barcodes: true,
    financial_data: true,
    translit: true,
  },
};

module.exports.CONFIG_STOCKS = {
  filter: {
    offer_id: [
      "shtori001",
      "shtori002",
      "shtori004",
      "shtori006",
      "shtori007",
      "shtoriRogozhka1",
      "shtoriRogozhka2",
      "shtoriRogozhka3",
      "shtoriRogozhka4",
      "shtoriRogozhka5",
      "shtoriRogozhka6",
      "blekaut1",
      "blekaut11",
      "blekaut2",
      "blekaut12",
      "blekaut3",
      "blekaut13",
      "blekaut4",
      "blekaut14",
      "blekaut5",
      "blekaut15",
      "blekaut6",
      "blekaut16",
    ],
    visibility: "ALL",
  },
  last_id: "",
  limit: 100,
};

module.exports.CONFIG_DELIVERED = {
  dir: "ASC",
  filter: {
    since: "2023-05-29T00:00:00.000Z",
    status: "delivered",
    to: "2023-06-16T23:59:59.000Z",
  },
  limit: 1000,
  offset: 0,
  translit: true,
  with: {
    analytics_data: true,
    financial_data: true,
  },
};
