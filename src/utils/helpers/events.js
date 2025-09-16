// © 2025 Athena Dev.
// Protecting innovation, enabling creation. All rights reserved.
// Unauthorized access, reproduction, or distribution is strictly forbidden.
// This software is provided for private, individual use only.
// --------------------------------------------

const EVENTS = {
  channelCreate: 'channelCreate',
  channelUpdate: 'channelUpdate',
  channelDelete: 'channelDelete',
  roleCreate: 'roleCreate',
  roleDelete: 'roleDelete',
  roleUpdate: 'roleUpdate',
  guildUpdate: 'guildUpdate',
  emojiUpdate: 'emojiUpdate',
  messageDelete: 'messageDelete',
  messageDeleteBulk: 'messageDeleteBulk',
  messageUpdate: 'messageUpdate',
  guildMemberAdd: 'guildMemberAdd',
  guildMemberBoostUpdate: 'guildMemberBoostUpdate',
  guildMemberNickUpdate: 'guildMemberNickUpdate',
  guildBanAdd: 'guildBanAdd',
  guildBanRemove: 'guildBanRemove',
  guildMemberKick: 'guildMemberKick',
  guildMemberRemove: 'guildMemberRemove',
  guildMemberUpdate: 'guildMemberUpdate',
  voiceStateUpdate: 'voiceStateUpdate',
  voiceChannelSwitch: 'voiceChannelSwitch',
  voiceChannelJoin: 'voiceChannelJoin',
  voiceChannelLeave: 'voiceChannelLeave',
  array: [
    'channelCreate',
    'channelUpdate',
    'channelDelete',
    'guildBanAdd',
    'guildBanRemove',
    'roleCreate',
    'roleDelete',
    'roleUpdate',
    'guildUpdate',
    'emojiUpdate',
    'messageDelete',
    'messageDeleteBulk',
    'messageUpdate',
    'guildMemberAdd',
    'guildMemberKick',
    'guildMemberRemove',
    'guildMemberUpdate',
    'guildMemberBoostUpdate',
    'guildMemberNickUpdate',
    'voiceStateUpdate',
    'voiceChannelSwitch',
    'voiceChannelJoin',
    'voiceChannelLeave',
  ]
};

module.exports = EVENTS;