// © 2025 Athena Dev.
// Protecting innovation, enabling creation. All rights reserved.
// Unauthorized access, reproduction, or distribution is strictly forbidden.
// This software is provided for private, individual use only.
// --------------------------------------------

require("dotenv").config();
require("module-alias/register");
require("colors");
const { registerFont } = require('canvas');
const fontFile = './src/utils/fonts/Amiri-Regular.ttf';

registerFont(fontFile, { family: 'Amiri' });

require("events").EventEmitter.setMaxListeners(999999999)

const { GatewayIntentBits, Partials } = require("discord.js");
const Quran = require("./src/athenadev");

let client = new Quran({
  token: process.env.token,
  database: {
    database_type: "MONGODB",
    MongoDB: {
      uri: process.env.mongodb_uri
    },
    options: {
      nested: '..',
      nestedIsEnabled: true,
      cache: {
        isEnabled: true,
        capacity: 2048
      }
    }
  }
});

setTimeout(function () {
  client.botlogin(process.env.token);
}, 2000);

module.exports = client;

//nodejs-events
process.on("unhandledRejection", e => {
  if (!e) retrun;
  console.log(e)
});

process.on("uncaughtException", e => {
  if (!e) return;
  console.log(e)
});

process.on("uncaughtExceptionMonitor", e => {
  if (!e) return
  console.log(e)
});
