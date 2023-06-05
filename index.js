const { Telegraf } = require("telegraf");

const {
  HEADERS,
  CONFIG_ORDERS,
  CONFIG_STOCKS,
  CONFIG_DELIVERED,
} = require("./api/CONFIGS.js");

const Orders = require("./services/orders.service");
const Stocks = require("./services/stocks.service");
const Delivered = require("./services/delivered.service");

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => ctx.reply("ss"));

bot.command("test", async ctx => {
  try {
    const res = await Delivered(CONFIG_DELIVERED, HEADERS);
   // console.log(res);
  } catch (err) {
    console.log(err);
  }
});

bot.command("stocks", async ctx => {
  try {
    const res = await Stocks(CONFIG_STOCKS, HEADERS);
    const entries = [...res.entries()].sort();
    if ([...res.keys()].length === 0) {
      await ctx.replyWithHTML("Нет отправлений");
    } else {
      let count = entries.reduce(
        (acc, item) =>
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
