// © 2025 Athena Dev.
// Protecting innovation, enabling creation. All rights reserved.
// Unauthorized access, reproduction, or distribution is strictly forbidden.
// This software is provided for private, individual use only.
// --------------------------------------------

const controlData = require("@utils/functions/ControlData");
const joinAndPlayQuran = require("@utils/functions/joinAndPlayQuran");

/**
 * @type {import("@utils/types/baseComponent")}
 */
module.exports = {
  name: "soon_btn",
  enabled: true,
  /**
   * @param {import("discord.js").ButtonInteraction} interaction 
   */
  async action(client, interaction, parts, lang) {
    try {
      interaction.reply({ content: " 🛠 | **this feature will be available soon**", ephemeral: true });
    } catch (err) {
      console.log(err)
    }
  },
};