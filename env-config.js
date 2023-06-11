const dotenv = require("dotenv");

dotenv.config({ path: `.env.dev` });

module.exports = {
  experimental: {
    outputStandalone: true,
  },
  env: {
    TEST_ENV: process.env.TEST_ENV,
  },
};
