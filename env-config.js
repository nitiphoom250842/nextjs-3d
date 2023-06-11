const dotenv = require("dotenv");

dotenv.config({ path: `.env.${ENV_NAME ? ENV_NAME : "dev"}` });

module.exports = {
  env: {
    TEST_ENV: process.env.TEST_ENV,
  },
};
