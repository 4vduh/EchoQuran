// © 2025 Athena Dev.
// Protecting innovation, enabling creation. All rights reserved.
// Unauthorized access, reproduction, or distribution is strictly forbidden.
// This software is provided for private, individual use only.
// --------------------------------------------

const { baseClient } = require("@root/src/base")

class Athena extends baseClient {
  /**
   *
   * @constructor
   * @param {AthenaConfiguration} options
   */
  constructor(options) {
    super(options.CustomClientOptions, options.database)
    this.datainput = options
    this.loadEvents("src/events")
    this.loadComponents("src/ComponentsAction")
    this.loadCommands("src/Commands")
    this.Checker()

  };

  /**
   * @param {string} [token] token disord bot 
   */
  botlogin(token = this.datainput.token) {
    this.login(process.env.token || token).catch((err) => {
      console.log(err)
      this.logger.debug(err.message)
    })

  };
};

module.exports = Athena;


/**
 * @typedef {"MONGODB"|"Sqlite"|"JSON"|"MySQL"} DataBaseType
 */

/**
 * @typedef {object} DataBase Default DataBase configuration.
 * @property {DataBaseType} database_type
 * @property {import("good.db/dist/Types").goodDBOptions} [options]
 * @property {import("good.db/dist/Types").MongoDBDriverOptions} [MongoDB]
 * @property {import("mysql2").PoolOptions} [MySQL]
 * 
 */

/**
 * @typedef {object} AthenaConfiguration Default Athena configuration.
 *
 * @property {string} token 
 * 
 * @property {DataBase} database
 * 
 * @property {import("discord.js").ClientOptions} [CustomClientOptions={}]
 * 
 */