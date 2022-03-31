const file = require("fs");
const yenv = require("yenv");

module.exports = (envfile = "env.yaml", path = "./env.yaml") => {
  if (file.existsSync(path)) {
    const env = yenv(envfile, { env: process.env.NODE_ENV || "development" });
    console.info('env', env)
    process.env = { ...process.env, ...env };
  }
};
