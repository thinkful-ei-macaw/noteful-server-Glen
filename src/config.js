const { PORT, NODE_ENV, DB_URL, TEST_DB_URL, API_TOKEN } = process.env;

module.exports = {
  PORT: PORT || 8080,
  NODE_ENV,
  API_TOKEN,
  DB_URL,
  TEST_DB_URL
};

