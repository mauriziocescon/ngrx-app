const path = require("path");
const fs = require("fs");
const express = require("express");
const jsonServer = require("json-server");
const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "./db.json"));
const db = require("./db.json");
const middlewares = jsonServer.defaults({
  static: "dist",
});

const utils = require("./utils");
const blocksValidation = require("./validations/blocks");
const dbUrl = "./mock-server/db.json";

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// Add middlewares
app.use(middlewares);

// Simulate server side delay
app.use((req, res, next) => {
  const randomOutcome = Math.random();
  if (randomOutcome < 0.01) {
    setTimeout(next, Math.floor((Math.random() * 8000) + 100));
  } else {
    next();
  }
});

// Simulate server side errors
app.use((req, res, next) => {
  const randomOutcome = Math.random();
  if (randomOutcome < 0.05 && req.path.startsWith("/api/")) {
    const choice = Math.random();

    if (choice < 0.11) {
      return res.status(400).jsonp({
        error: "Bad Request",
      });
    }
    else if (choice < 0.22) {
      return res.status(401).jsonp({
        error: "Unauthorized",
      });
    }
    else if (choice < 0.33) {
      return res.status(403).jsonp({
        error: "Forbidden",
      });
    }
    else if (choice < 0.44) {
      return res.status(404).jsonp({
        error: "Not Found",
      });
    }
    else if (choice < 0.55) {
      return res.status(410).jsonp({
        error: "Gone",
      });
    }
    else if (choice < 0.66) {
      return res.status(500).jsonp({
        error: "Internal Server Error",
      });
    }
    else if (choice < 0.77) {
      return res.status(501).jsonp({
        error: "Not Implemented",
      });
    }
    else if (choice < 0.88) {
      return res.status(503).jsonp({
        error: "Service Unavailable",
      });
    }
    else {
      return res.status(550).jsonp({
        error: "Permission denied",
      });
    }
  } else {
    // Continue to JSON Server router
    next();
  }
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
app.use(jsonServer.bodyParser);

// Add rules to static resources
app.use("/rules", express.static(path.join(__dirname, "/rules")));

// Rules config
app.get("/api/rules-config", (req, res) => {
  const rulesConfig = db.rulesConfig;
  const module = rulesConfig.find((config) => {
    return config.module === req.query.module;
  });

  if (module) {
    const index = module.steps.findIndex((config) => {
      return config.step === req.query.step;
    });
    if (index !== -1) {
      return res.status(200).jsonp(module.steps[index].rules);
    } else {
      return res.status(400).jsonp({
        error: "Bad Request",
      });
    }
  }
  return res.status(200).jsonp("");
});

// blocks
app.get("/api/instances", (req, res) => {
  const instances = db.instances;
  const lightInstances = instances.map((instance) => {
    return {
      id: instance.id,
      module: instance.module,
      instance: instance.instance,
      step: instance.step,
    };
  });
  return res.status(200).jsonp(lightInstances);
});

// blocks
app.get("/api/blocks", (req, res) => {
  const instances = db.instances;
  const instance = instances.find((i) => {
    return i.module === req.query.module &&
      i.instance === req.query.instance &&
      i.step === req.query.step;
  });
  if (instance) {
    return res.status(200).jsonp(instance.blocks);
  } else {
    return res.status(400).jsonp({
      error: "Bad Request",
    });
  }
});

app.post("/api/blocks", (req, res) => {
  const instances = db.instances;
  const instance = instances.find((i) => {
    return i.module === req.body.module &&
      i.instance === req.body.instance &&
      i.step === req.body.step;
  });
  if (instance) {
    instance.blocks = req.body.blocks.sort((b1, b2) => {
      return b1.id - b2.id;
    });

    // hard coded validation
    if (instance === 5) {
      instance.blocks = blocksValidation.validate(instance.blocks);
    }

    utils.saveDb(dbUrl, db, (err) => {
      if (err) {
        return res.status(500).jsonp({
          error: err,
        });
      }
      return res.status(200).jsonp(db.instances);
    });
  } else {
    return res.status(400).jsonp({
      error: "Bad Request",
    });
  }
});

// Mount the router based on db.json
app.use("/api", router);

// Fallback on frontend routes
app.get("*", (req, res) => {
  // load the single view file (frontend will handle the page changes on the front-end)
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Start listening
app.listen(port, () => {
  console.log(`JSON Server is running! Open the browser at http://localhost:${port}`);
});
