import * as dotenv from "dotenv";
import express from "express";
import Telegraf from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";

dotenv.config();
const app = express();
const botToken = process.env.BOT_TOKEN;
const currentHost = process.env.CURRENT_HOST;
const port = 3000;
const bot = new Telegraf(botToken, {
  telegram: {
    webhookReply: true,
  },
});

app.use(bot.webhookCallback("/new-message"));

app.get("/setup", async (_req, res) => {
  const url = `${currentHost}/new-message`;
  await bot.telegram.setWebhook(url);
  return res.send(`listening on ${currentHost}`);
});

bot.on("text", (ctx: TelegrafContext) => {
  if (ctx.message.text === "Start") {
    ctx.reply("vamos comecar");
  } else {
    ctx.reply(`viado disse: ${ctx.message.text}`);
  }
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Telegram app listening on port ${port}`));
