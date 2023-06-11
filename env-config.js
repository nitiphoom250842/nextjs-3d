const dotenv = require("dotenv");
const ENV_BRANCH = "";
dotenv.config({ path: `.env.${ENV_BRANCH ? ENV_BRANCH : "dev"}` });

module.exports = {
  env: {
    TEST_ENV: process.env.TEST_ENV,
  },
};
