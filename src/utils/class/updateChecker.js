// © 2025 Athena Dev.
// Protecting innovation, enabling creation. All rights reserved.
// Unauthorized access, reproduction, or distribution is strictly forbidden.
// This software is provided for private, individual use only.
// --------------------------------------------

module.exports = class UpdateChecker {

  static async checkVersion() {
    fetch("https://api.github.com/repos/uke4/echoquran/tags").then((res) => {
      if (Math.floor(res.status / 100) !== 2) return console.warn("🔄  Failed to pull latest version from server".bgRed.big);
      res.json().then((json) => {
        // Assumign the format stays consistent (i.e. x.x.x)
        const latest = json[0].name.split(".").map((k) => parseInt(k));
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const current = require("../../../package.json").version.split(".")
          .map((k) => parseInt(k));
        if (
          latest[0] > current[0] ||
          (latest[0] === current[0] && latest[1] > current[1]) ||
          (latest[0] === current[0] && latest[1] === current[1] && latest[2] > current[2])
        )
          console.warn(`🔄 Quran Radio is New version available: ${json[0].name}; Current Version: ${current.join(".")}`.bgRed);
        else console.log("🔄  The Quran Radio is up to date".bgGreen);
      });
    });
  }
}