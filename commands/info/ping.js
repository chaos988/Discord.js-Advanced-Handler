const Command = require("../../Structures/Command");

module.exports = new Command({
  name: "ping",
  description: "Bot ping",
  category: "info",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  run: async (client, message, args, Discord) => {
    const Pinging = new Discord.MessageEmbed()
      .setTitle("PINGING...")
      .addField("Websocket Ping", "> Pinging. . .", true)
      .addField("API Ping", "> Pinging. . .", true)
      .addField("Message Edit Ping", "> Pinging. . .", true)
      .setColor(client.colors.invis);
    const embed = await message.channel.send({ embeds: [Pinging] });

    const websocket = (message.createdTimestamp - Date.now()).toLocaleString();
    const api = client.ws.ping.toLocaleString();
    const msgedit = Math.floor(
      embed.createdAt - message.createdAt
    ).toLocaleString();

    let circles = {
      green: "🟩",
      yellow: "🟨",
      red: "🟥",
    };

    const websocketPing =
      websocket <= 200
        ? circles.green
        : websocket <= 400
        ? circles.yellow
        : circles.red;
    const apiPing =
      api <= 200
        ? circles.green
        : apiLatency <= 400
        ? circles.yellow
        : circles.red;
    const edit =
      msgedit <= 200
        ? circles.green
        : msgedit <= 400
        ? circles.yellow
        : circles.red;

    const Pong = new Discord.MessageEmbed()
      .setTitle("Pong 🏓")
      .addField("Websocket Ping", `> ${websocketPing}${websocket}`, true)
      .addField("API Ping", `> ${apiPing}${api}`, true)
      .addField("Message Edit Ping", `> ${edit}${msgedit}`, true)
      .setColor(client.colors.invis);
    embed.edit({ embeds: [Pong] });
    embed.delete();
  },
});
