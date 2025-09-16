// © 2025 Athena Dev.
// Protecting innovation, enabling creation. All rights reserved.
// Unauthorized access, reproduction, or distribution is strictly forbidden.
// This software is provided for private, individual use only.
// --------------------------------------------

const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  ComponentType
} = require("discord.js");

/**
 * @param {import("discord.js").ChatInputCommandInteraction | import("discord.js").Message} interaction 
 * @returns {import("discord.js").MessageReplyOptions}
 */
function help(interaction) {
  const mainEmbed = new EmbedBuilder()
    .setDescription("Hi,\n> I am **EchoQuran**, a spiritual and peaceful Discord bot designed to bring the beauty of the Holy Quran to your community 24/7.\n> With continuous Quran streaming and simple commands, I help keep your server connected to the words of Allah at all times.\n> Let your heart find peace through the Quran.\n> \n> If you need help, just join our support server for assistance. 🤍")
    .setImage("https://c.tenor.com/N3ny1hqsWrgAAAAC/tenor.gif")
    .setFooter({
      text: "EchoQur'an   -   help",
      iconURL: "https://images-ext-1.discordapp.net/external/o3bq5MVai8MFiuyhnmrshKHrIKqdjc4aOIE4e3WQi6g/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1397795551461900358/2014649e9d423b63ac1ef1c4e6d64f89.png?width=300&height=300",
    });

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Add Bot")
      .setStyle("Link")
      .setURL("https://discord.com/oauth2/authorize?client_id=1397795551461900358&permissions=8&integration_type=0&scope=bot"),

    new ButtonBuilder()
      .setLabel("Support Server")
      .setStyle("Link")
      .setURL("https://discord.gg/Q4ZzJFBDqk")
  );

  const select = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("select_help")
      .setPlaceholder("Select Help Category")
      .addOptions([
        {
          label: "Bot Commands",
          description: "View all bot commands",
          value: "commands",
          emoji: {
            id: "1398013549967708250",
            name: "bot"
          }
        }
      ])
  );

  return { embeds: [mainEmbed], components: [buttons, select] };
}

/**
 * @type {import("@utils/types/baseCommand")}
 */
module.exports = {
  name: "help",
  description: "Help commands",
  category: "UTILITY",
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],
  cooldown: 1000,
  command: {
    enabled: true,
    minArgsCount: 0,
  },
  slashCommand: {
    enabled: true,
  },

  async interactionExecute(client, interaction, lang) {
    try {
      const reply = await interaction.reply({ ...help(interaction), ephemeral: false });

      const collector = reply.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 60000
      });

      collector.on("collect", async (selectInt) => {
        if (selectInt.customId === "select_help" && selectInt.values[0] === "commands") {
          const commandsEmbed = new EmbedBuilder()
            .setDescription(
              "`/help`\n‎ ‎ ‎ ‎ <a:arrow:1398008540601520278> Show this help message.\n" +
              "`/ping`\n‎ ‎ ‎ ‎ <a:arrow:1398008540601520278> View bot latency.\n" +
              "`/setup radio`\n‎ ‎ ‎ ‎ <a:arrow:1398008540601520278> Setup Quran radio channel.\n" +
              "`/setup azkar`\n‎ ‎ ‎ ‎ <a:arrow:1398008540601520278> Setup Azkar channel.\n" +
              "`/control`\n‎ ‎ ‎ ‎ <a:arrow:1398008540601520278> Control the radio playback."
            )
            .setFooter({
              text: "EchoQur'an - Bot Commands",
              iconURL: "https://images-ext-1.discordapp.net/external/o3bq5MVai8MFiuyhnmrshKHrIKqdjc4aOIE4e3WQi6g/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1397795551461900358/2014649e9d423b63ac1ef1c4e6d64f89.png?width=300&height=300"
            });

          await selectInt.update({ embeds: [commandsEmbed], components: [] });
        }
      });

    } catch (err) {
      console.log(err);
      interaction.reply({
        content: "An error occurred while executing the command",
        ephemeral: true,
      });
    }
  },

  async msgExecute(client, message, args, lang) {
    try {
      message.reply(help(message));
    } catch (err) {
      console.log(err);
    }
  },
};
