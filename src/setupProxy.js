// eslint-disable-next-line import/no-extraneous-dependencies
const proxy = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
    '/.netlify/functions',
    proxy({
      target: 'http://localhost:9000',
      pathRewrite: {
        '^/\\.netlify/functions': '',
      },
    })
  );
};
