## EchoQuran — Quran Radio for Discord

Keep your Discord server connected to continuous Quran radio streams with rich controls, logging, and multi-language support.

[![invite me](https://img.shields.io/badge/Invite%20me-Add%20the%20bot%20to%20your%20server-brightblue?style=for-the-badge&logo=discord)](https://discord.com/oauth2/authorize?client_id=1397795551461900358&permissions=8&integration_type=0&scope=bot)


### Links
- **Repository**: https://github.com/uke4/EchoQuran
- **Support Server**: https://discord.com/invite/Q4ZzJFBDqk

### Features
- **Discord.js v14** with voice support
- **Multiple radio stations** and language packs in `lang/`
- **Configurable** via `.env` and `config.json`
- **Dockerfile** provided
- **Structured logging** to `logs/`

### Requirements
- **Node.js**: >= 20.x
- **ffmpeg**: bundled via `ffmpeg-static`

### Quick Start
```bash
# 0) Clone the repository and enter the project folder
git clone https://github.com/uke4/EchoQuran.git
cd EchoQuran

# 1) Install dependencies
npm install

# 2) Copy environment example and configure
cp exemple.env .env
# Edit .env with your Discord Bot Token and other settings

# 3) Configure app (optional)
# Edit config in config.json as needed

# 4) Run the bot
npm start
```

### Environment Variables
Duplicate `exemple.env` to `.env` and set your values. The app reads these keys:

```env
# Discord
token=YOUR_DISCORD_BOT_TOKEN

# Database (MongoDB URI)
mongodb_uri=mongodb+srv://user:pass@host/dbname

# Optional: logging webhooks
ERROR_LOGS=https://discord.com/api/webhooks/...  # errors go here
WARN_LOGS=https://discord.com/api/webhooks/...   # warnings go here
```

### Configuration
Primary configuration lives in `config.json`. Common options include station lists, default language, prefixes, and logging options. Review and adjust to your needs.

### Database Options
The bot supports two storage engines. **Recommended: MongoDB** for reliability and scale.

Supported types: `"MONGODB"`, `"Sqlite"`.

Where to change it: in `index.js` set `database_type` (around the constructor options)

```js
// index.js — set database type here
let client = new Quran({
  token: process.env.token,
  database: {
    database_type: "MONGODB", // <- change to Sqlite | JSON | MySQL
    MongoDB: { uri: process.env.mongodb_uri },
    options: {
      nested: '..',
      nestedIsEnabled: true,
      cache: { isEnabled: true, capacity: 2048 }
    }
  }
});
```

Setups by type:
- **MongoDB (recommended)**
  - Set `database_type` to `"MONGODB"`
  - Put your URI in `.env` as `mongodb_uri=`
  - Example: `mongodb_uri=mongodb+srv://user:pass@host/dbname`

- **SQLite3**
  - Set `database_type` to `"Sqlite"`
  - Ensure the app can write to a local data path (the SQLite file will be created by the DB layer)
  - No extra env vars required by default

Notes:
- If you switch DB types, restart the bot
- MongoDB requires a reachable cluster and valid credentials
- File-based engine (SQLite3) needs write permissions in the project directory

### Scripts
- `npm start`: Starts the bot using `index.js`.

### Docker
Build and run with Docker:
```bash
docker build -t echoquran .
docker run --env-file .env --name echoquran --restart unless-stopped echoquran
```

### Project Structure
- `index.js`: Application entry point
- `src/`: Core source code, handlers, events, utils
- `lang/`: Language resources
- `logs/`: Runtime logs
- `database/`: Persistent data (if used by features)

### Troubleshooting
- Ensure Node.js >= 20 is installed
- Verify your `DISCORD_TOKEN` is valid and the bot is invited with proper voice permissions
- Check the console and `logs/` for errors

### Support
Need help? Join our support Discord: https://discord.com/invite/Q4ZzJFBDqk

### Contributing
Pull requests are welcome. Please open an issue first to discuss what you would like to change.

## License
This project is licensed under the ISC License.

### Copyright
© 2023 Athena Dev. All rights reserved.


