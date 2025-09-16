// © 2025 Athena Dev.
// Protecting innovation, enabling creation. All rights reserved.
// Unauthorized access, reproduction, or distribution is strictly forbidden.
// This software is provided for private, individual use only.
// --------------------------------------------

const { EmbedBuilder } = require("discord.js");

/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  name: "ping",
  description: "Test the bot's response time",
  category: "UTILITY",
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],
  cooldown: 1000,
  command: {
    enabled: true,
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
  },

  async msgExecute(client, message, args, lang) {
    try {
      const sent = await message.reply({ content: "🏓 Pinging..." });

      const latency = sent.createdTimestamp - message.createdTimestamp;
      const pingEmbed = new EmbedBuilder()
        .addFields(
          { name: "📡 WebSocket Ping", value: `${client.ws.ping}ms`, inline: true },
          { name: "📥 Message Latency", value: `${latency}ms`, inline: true },
          { name: "⏱️ Uptime", value: `<t:${Math.floor(client.readyTimestamp / 1000)}:R>`, inline: true }
        )
        .setColor("Random")
        .setTimestamp();

      sent.edit({ content: null, embeds: [pingEmbed] });
    } catch (err) {
      console.error("Ping command (msgExecute) error:", err);
    }
  },

  async interactionExecute(client, interaction, lang) {
    try {
      const sent = await interaction.reply({
        content: "🏓 Pinging...",
        fetchReply: true,
        ephemeral: true,
      });

      const latency = sent.createdTimestamp - interaction.createdTimestamp;
      const pingEmbed = new EmbedBuilder()
        .addFields(
          { name: "📡 WebSocket Ping", value: `${client.ws.ping}ms`, inline: true },
          { name: "📥 Interaction Latency", value: `${latency}ms`, inline: true },
          { name: "⏱️ Uptime", value: `<t:${Math.floor(client.readyTimestamp / 1000)}:R>`, inline: true }
        )
        .setColor("Random")
        .setTimestamp();

      await interaction.editReply({ content: null, embeds: [pingEmbed] });
    } catch (err) {
      console.error("Ping command (interactionExecute) error:", err);
      if (!interaction.replied) {
        interaction.reply({
          content: "An error occurred while executing the command.",
          ephemeral: true,
        });
      }
    }
  },
};
