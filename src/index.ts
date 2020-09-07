import * as dotenv from "dotenv";
import express from "express";
import Telegraf from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import axios from "axios";
import unirest from "unirest";

dotenv.config();
const app = express();
const botToken = process.env.BOT_TOKEN;
const currentHost = process.env.CURRENT_HOST;
const port = 3000;
const key = process.env.RAPID_API_KEY;
const bot = new Telegraf(botToken, {
  telegram: {
    webhookReply: true,
  },
});

app.use(bot.webhookCallback("/new-message"));

const baseUrl = process.env.BASE_URL;
const country = "BR";
const currency = "USD";
const locale = "en-US";
const origin = "THE";
const destination = "VCP";
const date = "2020-09-01";
const mode = "browseroutes";
const returndate = "";

app.get("/setup", async (_req, res) => {
  const url = `${currentHost}/new-message`;
  await bot.telegram.setWebhook(url);
  return res.send(`listening on ${currentHost}`);
});

bot.on("text", async (ctx: TelegrafContext) => {
  if (ctx.message.text === "Start") {
    ctx.reply("vamos comecar");

    await axios({
      method: "GET",
      url:
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2020-11-01",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "da8fd9334dmsha44282894f5b169p1a1f1cjsn296b31d1df1a",
        useQueryString: true,
      },
      params: {
        inboundpartialdate: "2020-11-01",
      },
    })
      .then((response) => {
        console.log("response");
      })
      .catch((error) => {
        console.log("erro");
      });
  } else {
    ctx.reply(`viado diz: ${ctx.message.text}`);
  }
});
bot.on("audio", (ctx: TelegrafContext) => {
  ctx.reply("robo não escuta desgraca");
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Telegram app listening on port ${port}`));
