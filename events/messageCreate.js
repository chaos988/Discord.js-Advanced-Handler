const client = require("../index");
const Discord = require("discord.js");

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.get(client.aliases.get(cmd.toLowerCase()));

  if (!command) return;

  if (!message.member.permissions.has(command.userPermissions)) {
    const userPermission = new Discord.MessageEmbed()
      .setTitle("MISSING PERMISSIONS")
      .setDescription(`You are missing \`${command.userPermissions.join(", ").replace(/\_/g, " ")}\``)
      .setColor(client.colors.silver)
      .setTimestamp()
    message.channel.send({ embeds: [userPermission] })
  }

  if (!message.guild.me.permissions.has(command.botPermissions)) {
    const userPermission = new Discord.MessageEmbed()
      .setTitle("MISSING PERMISSIONS")
      .setDescription(`I am missing \`${command.botPermissions.join(", ").replace(/\_/g, " ")}\``)
      .setColor(client.colors.silver)
      .setTimestamp()
    message.channel.send({ embeds: [userPermission] })
  }

  command.run(client, message, args, Discord);
});
