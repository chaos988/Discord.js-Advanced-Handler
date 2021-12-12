const client = require("./Client");
const { glob } = require("glob");
const { promisify } = require("util");
const mongoose = require("mongoose");
const globPromise = promisify(glob);
const ascii = require('ascii-table');
class Utils {
  /**
   * @param {client} client
   */
  constructor(client) {
    this.client = client;
  }
  async startClient() {
    this.client.login(this.client.config.token);
    let table = new ascii("Commands")
    table.setHeading("Command", "Load Status");
    const commands = await globPromise(`${process.cwd()}/Commands/**/*.js`);
    commands.map((value) => {
      const file = require(value);
      const splitted = value.split("/");
      const directory = splitted[splitted.length - 2];

      if (file.name) {
        const properties = { directory, ...file };
        this.client.commands.set(file.name, properties);
        table.addRow(`${file.name}`, '✅ Loaded')
      } else table.addRow(`${file.name || "Missing"}`, `❌ Command name is not a string or empty ${splitted[6] + "/" + splitted[7]}`)
      if (file.aliases && Array.isArray(file.aliases)) {
        file.aliases.forEach((alias) =>
          this.client.aliases.set(alias, file.name)
        );
      }
    });

    console.log(table.toString())

    const eventFiles = await globPromise(`${process.cwd()}/Events/**/**/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
      `${process.cwd()}/SlashCommands/**/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
      const file = require(value);
      if (!file?.name) return;
      this.client.slashCommands.set(file.name, file);

      if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
      arrayOfSlashCommands.push(file);
    });
    this.client.on("ready", async () => {
      await this.client.application.commands.set(arrayOfSlashCommands);
    });
    
    // mongoose
    const { mongooseConnectionString } = require("./Data/config.json");
    if (!mongooseConnectionString) return;

    mongoose
      .connect(mongooseConnectionString)
      .then(() => console.log("Connected to mongodb"));
  }
}

module.exports = Utils;
