/* eslint-disable no-console */
const express = require("express");
const httpErrors = require("http-errors");
const path = require("path");
const pino = require("pino");
const pinoHttp = require("pino-http");
const bodyParser = require("body-parser");
const connectToDatabase = require("./database/dbConnection");
const router = require("./controllers/index");

module.exports = function main(options, cb) {
  // Set default options
  const ready = cb || function() {};
  const opts = {
    // Default options

    ...options,
  };

  const logger = pino();

  // Server state
  let server;
  let serverStarted = false;
  let serverClosing = false;

  // Setup error handling
  function unhandledError(err) {
    // Log the errors
    logger.error(err);

    // Only clean up once
    if (serverClosing) {
      return;
    }
    serverClosing = true;

    // If server has started, close it down
    if (serverStarted) {
      server.close(function() {
        process.exit(1);
      });
    }
  }
  process.on("uncaughtException", unhandledError);
  process.on("unhandledRejection", unhandledError);

  // Create the express app
  const app = express();

  // Common middleware
  // app.use(/* ... */)
  app.use(pinoHttp({ logger }));
  app.use(bodyParser.json());
  // Register routes
  // @NOTE: require here because this ensures that even syntax errors
  // or other startup related errors are caught logged and debuggable.
  // Alternativly, you could setup external log handling for startup
  // errors and handle them outside the node process.  I find this is
  // better because it works out of the box even in local development.

  if (process.env.NODE_ENV === "production") {
    // serve client/build folder as static files
    app.use(express.static(path.join(__dirname, "..", "client", "build")));
  }

  // use API router
  app.use("/api", router);

  if (process.env.NODE_ENV === "production") {
    // redirect unknown requests back to React
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    });
  }

  // Common error handlers
  app.use(function fourOhFourHandler(req, res, next) {
    next(httpErrors(404, `Route not found: ${req.url}`));
  });
  app.use(function fiveHundredHandler(err, req, res, next) {
    if (err.status >= 500) {
      logger.error(err);
    }
    res.status(err.status || 500).send(err);
  });

  // Start database
  connectToDatabase()
    .then(() => console.log("DB Connection initialised"))
    .catch(e => console.error(e));

  // Start server
  server = app.listen(opts.port, function(err) {
    if (err) {
      return ready(err, app, server);
    }

    // If some other error means we should close
    if (serverClosing) {
      return ready(new Error("Server was closed before it could start"));
    }

    serverStarted = true;
    const addr = server.address();
    logger.info(`Listening on port ${addr.port}`);
    ready(err, app, server);
  });
};
