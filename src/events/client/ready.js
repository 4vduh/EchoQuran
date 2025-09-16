// © 2025 Athena Dev.
// Protecting innovation, enabling creation. All rights reserved.
// Unauthorized access, reproduction, or distribution is strictly forbidden.
// This software is provided for private, individual use only.
// --------------------------------------------

const sendAzkar = require('@root/src/utils/functions/sendAzkar');
const ControlData = require('@utils/functions/ControlData');
const joinAndPlayQuran = require('@utils/functions/joinAndPlayQuran');
const chalk = require('chalk');
const { ActivityType, Guild } = require('discord.js');

const gr = chalk.hex('#00D100');
const un = chalk.underline;

module.exports = {
  name: 'ready',
  /**
   * @param {import("@base/baseClient")} client 
   */
  async execute(client) {

    await client.DBConnect();
    await client.registerInteractions();
    const db = await client.db.table("channels");

    const commands = client.slashCommands.map(({ execute, ...data }) => data);

    // Logging info after short delay
    setTimeout(() => {
      console.log(gr(`Logged In As ` + un(`${client.user.username}`)));
      console.log(
        chalk.cyan(`Servers:` + un(`${client.guilds.cache.size}`)),
        chalk.red(`Users:` + un(`${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}`)),
        chalk.blue(`Commands:` + un(` ${client.commands.size}` + ` TOTAL Commands ${client.commands.size + commands.length}`))
      );
    }, 3000);

    // Set initial custom "Loading" status
    client.user.setStatus("idle");
    client.user.setPresence({
      activities: [
        {
          name: "⏳ Loading...",
          type: ActivityType.Custom
        }
      ],
      status: "idle"
    });

    // Change status to online after 40 seconds
    setTimeout(() => {
      client.user.setStatus("online");
    }, 40000);

    // Update custom status every minute with active radio channel count
    setInterval(() => {
      let ServersStatus = client.Radio.size;
      client.user.setPresence({
        activities: [
          {
            name: `In ${ServersStatus}/${client.channels.cache.size} Channels 💙.`,
            type: ActivityType.Custom
          }
        ],
        status: "online"
      });
    }, 60 * 1000);

    // Load radio channels from DB
    let RadioChannels = await db.values() || [];
    if (RadioChannels.length === 0) return;

    setTimeout(async () => {
      const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      for (let data of RadioChannels) {
        let guild = await client.guilds.fetch(data.guildId).catch(() => null);
        if (!guild?.id) continue;

        if (data.enabled) {
          if (data.msgTimeSend) {
            await sendAzkar(client, guild, data);
          } else {
            await sleep(500);
            /** @type {Guild} */
            let conn = await joinAndPlayQuran(client, data.channelId, guild, data.url);
            if (conn === null) {
              console.log("no channel in server  " + guild.name + " " + guild.id);
              continue;
            }
            if (conn === "cantConnect") continue;

            client.Radio.set(data.guildId, conn);

            let data1 = await db.get(`${data.guildId}_radioChannel`);
            let msg = await guild.channels.cache.get(data1.ch)?.messages.fetch(data1.msgId).catch(() => null);

            if (!msg?.id) {
              console.log("cant find msg in server  " + guild.name.yellow + " " + guild.id.red);
            }

            if (msg?.id) {
              msg.edit(ControlData(client, data1)).catch(err => console.log(err));
            }
          }
        }
      }
    }, 1000);
  },
};
