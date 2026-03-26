const { createBot } = require("./bot");
const { createApiServer } = require("./api/server");
const { validateEnv, PORT } = require("./utils/env");
const { ensureBaseStorage } = require("./services/storageService");
const logger = require("./utils/logger");

async function bootstrap() {
  validateEnv();
  await ensureBaseStorage();

  const api = createApiServer();
  const server = api.listen(PORT, () => {
    logger.info(`HTTP API started on port ${PORT}.`);
  });

  const bot = createBot();
  if (process.env.ENABLE_BOT === "true") {
  bot.launch();
  console.log("🤖 Bot started");
} else {
  console.log("🚫 Bot disabled");
}
  logger.info("Telegram bot started successfully.");

  const shutdown = async (signal) => {
    logger.info(`Received ${signal}. Shutting down services...`);
    server.close();
    await bot.stop(signal);
    process.exit(0);
  };

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
}

bootstrap().catch((error) => {
  logger.error("Unable to start application.", error);
  process.exit(1);
});

