const { Telegraf } = require("telegraf");

const Orders = require("./services/orders.service");
const Stocks = require("./services/stocks.service");
require("dotenv").config();

const HEADERS = {
  "Client-Id": process.env.CLIENT_ID,
  "Api-Key": process.env.API_KEY,
  "Content-Type": "application/json",
};

const CONFIG_ORDERS = {
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

const CONFIG_STOCKS = {
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

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply("Welcome"));

bot.command("stocks", async ctx => {
  try {
    const res = await Stocks(CONFIG_STOCKS, HEADERS);
    const entries = [...res.entries()].sort();
    console.log(entries.sort());
    if ([...res.keys()].length === 0) {
      await ctx.replyWithHTML("Нет отправлений");
    } else {
      let count = entries.reduce(
        (acc, item) =>
          // console.log("ss", item[0].slice(0, 7), acc, item[1][2]);
          item[0].slice(0, 7) == "shtori0" ? acc + item[1][2] : acc + 0,
        0
      );
      await ctx.replyWithHTML(
        `Остатков на складе ${count * 400}Р (${count})\n\n${entries //400 - Цена 1 продукта, считает только артикул шторы0...
          .map(item =>
            item[1][1] - item[1][2] <= 10 || item[1][2] > 0
              ? `${item[0]} => ${item[1][1] - item[1][2]} (${item[1][0]}) - ${
                  item[1][2]
                }\n`
              : ""
          )
          .join("")}`
      );
    }
  } catch (e) {
    console.log(e);
  }
});

bot.command("get", async ctx => {
  try {
    const res = await Orders(CONFIG_ORDERS, HEADERS);
    const date = [...res.keys()];
    if (date.length < 1) {
      await ctx.replyWithHTML("Нет отправлений");
    } else {
      const today = [...res.get(date[0]).entries()];
      const reduce = today.reduce((acc, item) => acc + item[1], 0);
      await ctx.replyWithHTML(
        `На [${date[0].slice(0, 10)}] заказано [${reduce}] шт.\n\n${today
          .map(item => item[0] + " - " + item[1])
          .join("\n")}`
      );
    }
  } catch (e) {
    console.log(e);
  }
});

bot.command("get1", async ctx => {
  try {
    const res = await Orders(CONFIG_ORDERS, HEADERS);
    const date = [...res.keys()];
    if (date.length < 2) {
      await ctx.replyWithHTML("Нет отправлений");
    } else {
      const today = [...res.get(date[1]).entries()];
      const reduce = today.reduce((acc, item) => acc + item[1], 0);
      await ctx.replyWithHTML(
        `На [${date[1].slice(0, 10)}] заказано [${reduce}] шт.\n\n${today
          .map(item => item[0] + " - " + item[1] + "\n")
          .join("")}`
      );
    }
  } catch (e) {
    console.log(e);
  }
});

bot.command("get2", async ctx => {
  try {
    const res = await Orders(CONFIG_ORDERS, HEADERS);
    const date = [...res.keys()];
    if (date.length < 3) {
      await ctx.replyWithHTML("Нет отправлений");
    } else {
      const today = [...res.get(date[2]).entries()];
      const reduce = today.reduce((acc, item) => acc + item[1], 0);
      await ctx.replyWithHTML(
        `На [${date[2].slice(0, 10)}] заказано [${reduce}] шт.\n\n${today
          .map(item => item[0] + " - " + item[1] + "\n")
          .join("")}`
      );
    }
  } catch (e) {
    console.log(e);
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
