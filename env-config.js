const dotenv = require("dotenv");

dotenv.config({ path: `.env.dev` });

module.exports = {
  env: {
    TEST_ENV: process.env.TEST_ENV,
  },
};
