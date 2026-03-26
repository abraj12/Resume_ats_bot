const { Telegraf, session } = require("telegraf");
const { registerHandlers } = require("../controllers/botController");
const { BOT_TOKEN } = require("../utils/env");
const { createSessionState } = require("../utils/session");
const logger = require("../utils/logger");

function createBot() {
  const bot = new Telegraf(BOT_TOKEN);

  bot.use(
    session({
      defaultSession: () => createSessionState()
    })
  );

  registerHandlers(bot);

  bot.catch(async (error, ctx) => {
    logger.error("Unhandled bot error", error);

    if (ctx?.reply) {
      await ctx.reply(
        "Something went wrong while processing your request. Please try again or send /start to begin again."
      ).catch(() => {});
    }
  });

  return bot;
}

module.exports = {
  createBot
};