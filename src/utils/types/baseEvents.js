// © 2025 Athena Dev.
// Protecting innovation, enabling creation. All rights reserved.
// Unauthorized access, reproduction, or distribution is strictly forbidden.
// This software is provided for private, individual use only.
// --------------------------------------------

const baseClient = require('@root/src/base/baseClient')

/**
 * @template {keyof import('discord.js').ClientEvents} K
 * @typedef {Object} BaseEvent
 * @property {K} name - Event name
 * @property {boolean} once - Whether the listener should be called only once
 * @property {(client: baseClient,...args: import('discord.js').ClientEvents[K]) => import('discord.js').Awaitable<void>} execute - listener Function
 */

/** @type {BaseEvent} */
module.exports = {
  name: "",
  once: false,
} 
