const fs = require('fs');

module.exports = function ({ utils: { build } }) {
  build({
    env: {
      ...process.env,
      VERCEL_GIT_COMMIT_TIME: Date.now(),
    },
  });
};