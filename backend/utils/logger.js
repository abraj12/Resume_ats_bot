function info(message, meta) {
  console.log(format("INFO", message, meta));
}

function error(message, meta) {
  console.error(format("ERROR", message, meta));
}

function format(level, message, meta) {
  const time = new Date().toISOString();
  const details = meta ? `\n${meta.stack || JSON.stringify(meta, null, 2)}` : "";
  return `[${time}] ${level}: ${message}${details}`;
}

module.exports = {
  info,
  error
};