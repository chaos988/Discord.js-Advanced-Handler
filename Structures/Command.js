const discord = require("discord.js");
const Client = require("./Client");

/**
 * @param {Client} client
 * @param {discord.Message} message
 * @param {Array<string>} args
 */
async function RunFunction(client, message, args) {}

class Command {
  /**
   * @typedef {{name: string, description: string, category: string, usage: string, aliases: Array[], userPermissions: import("discord.js").PermissionResolvable[], botPermissions: import("discord.js").PermissionResolvable[], run: RunFunction}} CommandOptions
   * @param {CommandOptions} options
   */
  constructor(options) {
    this.name = options.name;
    this.description = options.description;
    this.category = options.category;
    this.usage = options.usage;
    this.aliases = options.aliases;
    this.userPermissions = options.userPermissions;
    this.botPermissions = options.botPermissions;
    this.run = options.run;
  }
}

module.exports = Command;
