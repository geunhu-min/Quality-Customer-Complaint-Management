const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 5174);
const defectCloseRoot = path.resolve(root, "..", "dashboard_selected_months");
const defectCloseDataDir = path.join(defectCloseRoot, "data");
const defectCloseDataFile = path.join(defectCloseDataDir, "dashboard-data.json");
const defaultDefectCloseData = { years: { "2025": {}, "2026": {} } };
const claimDashboardDataDir = path.join(root, "data");
const claimDashboardStateFile = path.join(claimDashboardDataDir, "claim-dashboard-state.json");
const defaultClaimDashboardState = { version: 1, groups: [], savedAt: "" };

const liveReloadClients = new Set();
function notifyLiveReload() {
  for (const res of liveReloadClients) {
    try { res.write("data: reload\n\n"); } catch (_) {}
  }
}
let liveReloadTimer = null;
function scheduleLiveReloadNotify() {
  clearTimeout(liveReloadTimer);
  liveReloadTimer = setTimeout(notifyLiveReload, 150);
}
function handleLiveReload(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-store",
    "Connection": "keep-alive"
  });
  res.write("retry: 1000\n\n");
  liveReloadClients.add(res);
  req.on("close", () => { liveReloadClients.delete(res); });
}
["index.html", "app.js", "daily-stable-v23.js", "styles.css"].forEach((name) => {
  try {
    fs.watch(path.join(root, name), { persistent: false }, () => scheduleLiveReloadNotify());
  } catch (_) {}
});

const debugLogFile = path.join(root, "debug-image-match.log");
function handleDebugLog(req, res) {
  let body = "";
  req.on("data", (chunk) => { body += chunk; });
  req.on("end", () => {
    try { fs.appendFileSync(debugLogFile, body + "\n---\n"); } catch (_) {}
    send(res, 200, "{}", { "Content-Type": "application/json" });
  });
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { "Cache-Control": "no-store", ...headers });
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload), {
    "Content-Type": "application/json; charset=utf-8"
  });
}

function isLocalRequest(req) {
  const ip = req.socket.remoteAddress || "";
  return ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1";
}

function normalizeDefectCloseData(data) {
  const dashboard = data && data.years ? data : structuredClone(defaultDefectCloseData);
  if (!dashboard.years["2025"]) dashboard.years["2025"] = {};
  if (!dashboard.years["2026"]) dashboard.years["2026"] = {};
  return dashboard;
}

async function ensureDefectCloseDataFile() {
  await fs.promises.mkdir(defectCloseDataDir, { recursive: true });
  try {
    await fs.promises.access(defectCloseDataFile);
  } catch {
    await fs.promises.writeFile(defectCloseDataFile, JSON.stringify(defaultDefectCloseData, null, 2), "utf8");
  }
}

async function readDefectCloseData() {
  await ensureDefectCloseDataFile();
  const raw = await fs.promises.readFile(defectCloseDataFile, "utf8");
  return normalizeDefectCloseData(JSON.parse(raw || "null"));
}

async function writeDefectCloseData(data) {
  await ensureDefectCloseDataFile();
  await fs.promises.writeFile(defectCloseDataFile, JSON.stringify(normalizeDefectCloseData(data), null, 2), "utf8");
}

function normalizeClaimDashboardState(data) {
  const state = data && typeof data === "object" ? data : {};
  return {
    version: 1,
    groups: Array.isArray(state.groups) ? state.groups : [],
    savedAt: state.savedAt || new Date().toISOString()
  };
}

async function ensureClaimDashboardStateFile() {
  await fs.promises.mkdir(claimDashboardDataDir, { recursive: true });
  try {
    await fs.promises.access(claimDashboardStateFile);
  } catch {
    await fs.promises.writeFile(claimDashboardStateFile, JSON.stringify(defaultClaimDashboardState, null, 2), "utf8");
  }
}

async function readClaimDashboardState() {
  await ensureClaimDashboardStateFile();
  const raw = await fs.promises.readFile(claimDashboardStateFile, "utf8");
  return normalizeClaimDashboardState(JSON.parse(raw || "null"));
}

async function writeClaimDashboardState(data) {
  await ensureClaimDashboardStateFile();
  await fs.promises.writeFile(claimDashboardStateFile, JSON.stringify(normalizeClaimDashboardState(data), null, 2), "utf8");
}

async function readRequestJson(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 100 * 1024 * 1024) throw new Error("Request body too large");
  }
  return JSON.parse(body || "{}");
}

function googleWorkbookUrl(sheetUrl) {
  const raw = String(sheetUrl || "").trim();
  const match = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) throw new Error("올바른 구글 스프레드시트 주소가 아닙니다.");
  return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=xlsx`;
}

function parseContentDispositionFilename(value) {
  const text = String(value || "");
  const encoded = text.match(/filename\*=UTF-8''([^;]+)/i);
  if (encoded) return decodeURIComponent(encoded[1]).replace(/\.(xlsx|xls)$/i, "");
  const plain = text.match(/filename="?([^";]+)"?/i);
  return plain ? plain[1].replace(/\.(xlsx|xls)$/i, "") : "";
}

async function handleGoogleWorkbook(req, res) {
  const parsed = new URL(req.url, `http://${req.headers.host}`);
  const sheetUrl = parsed.searchParams.get("url") || "";
  try {
    const response = await fetch(googleWorkbookUrl(sheetUrl), {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    if (!response.ok) throw new Error(`Google 응답 오류 ${response.status}`);
    const data = Buffer.from(await response.arrayBuffer());
    const title = parseContentDispositionFilename(response.headers.get("content-disposition"));
    send(res, 200, data, {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "X-Sheet-Title": encodeURIComponent(title),
      "Cache-Control": "no-store"
    });
  } catch (err) {
    send(res, 500, JSON.stringify({ error: err.message }), {
      "Content-Type": "application/json; charset=utf-8"
    });
  }
}

function googleDriveFolderId(folderUrl) {
  const raw = String(folderUrl || "").trim();
  let match = raw.match(/\/folders\/([a-zA-Z0-9-_]+)/);
  if (match) return match[1];
  match = raw.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (match) return match[1];
  throw new Error("올바른 구글 드라이브 폴더 주소가 아닙니다.");
}

function decodeHtmlEntities(text) {
  return String(text || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function parseDriveFolderEntries(html) {
  const entries = [];
  const seen = new Set();
  const parts = String(html || "").split('id="entry-').slice(1);
  parts.forEach((part) => {
    const idMatch = part.match(/^([a-zA-Z0-9_-]+)"/);
    if (!idMatch) return;
    const id = idMatch[1];
    if (seen.has(id)) return;
    seen.add(id);
    const titleMatch = part.match(/class="flip-entry-title"[^>]*>([^<]*)</);
    const name = (titleMatch ? decodeHtmlEntities(titleMatch[1]).trim() : "") || `이미지_${entries.length + 1}`;
    entries.push({ id, name });
  });
  return entries;
}

function parseDriveSubfolderIds(html, excludeId) {
  const ids = new Set();
  const re = /drive\/folders\/([a-zA-Z0-9_-]{10,})/g;
  let match;
  while ((match = re.exec(html))) {
    if (match[1] !== excludeId) ids.add(match[1]);
  }
  return Array.from(ids);
}

async function fetchDriveFolderHtml(folderId) {
  const response = await fetch(`https://drive.google.com/embeddedfolderview?id=${folderId}#list`, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });
  if (!response.ok) throw new Error(`Google Drive 응답 오류 ${response.status}`);
  return response.text();
}

async function collectDriveFolderEntries(folderId, depth, seenFolders) {
  if (depth > 4 || seenFolders.has(folderId)) return [];
  seenFolders.add(folderId);
  const html = await fetchDriveFolderHtml(folderId);
  const entries = parseDriveFolderEntries(html);
  const subfolderIds = parseDriveSubfolderIds(html, folderId);
  const subfolderIdSet = new Set(subfolderIds);
  let files = entries.filter((entry) => !subfolderIdSet.has(entry.id));
  for (const subId of subfolderIds) {
    try {
      const subFiles = await collectDriveFolderEntries(subId, depth + 1, seenFolders);
      files = files.concat(subFiles);
    } catch (_) {}
  }
  return files;
}

async function handleGoogleDriveFolder(req, res) {
  const parsed = new URL(req.url, `http://${req.headers.host}`);
  const folderUrl = parsed.searchParams.get("url") || "";
  try {
    const folderId = googleDriveFolderId(folderUrl);
    const entries = await collectDriveFolderEntries(folderId, 0, new Set());
    if (!entries.length) throw new Error("폴더에서 파일을 찾지 못했습니다. 폴더(와 하위 폴더)가 '링크가 있는 모든 사용자'로 공유되어 있는지 확인해 주세요.");
    const imageEntries = entries.filter((entry) => /\.(jpe?g|png|gif|webp|heic|bmp)$/i.test(entry.name) || !/\./.test(entry.name));
    const picked = imageEntries.length ? imageEntries : entries;
    const files = picked.map((entry) => ({
      id: entry.id,
      name: entry.name,
      url: `https://lh3.googleusercontent.com/d/${entry.id}=s160`,
      viewUrl: `https://drive.google.com/file/d/${entry.id}/view`
    }));
    sendJson(res, 200, { files });
  } catch (err) {
    sendJson(res, 500, { error: err.message });
  }
}

async function handleDefectCloseApi(req, res) {
  const parsed = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (parsed.pathname === "/api/claim-dashboard-state") {
      if (req.method === "GET") {
        sendJson(res, 200, await readClaimDashboardState());
        return true;
      }
      if (req.method === "POST") {
        if (!isLocalRequest(req)) {
          sendJson(res, 403, { error: "Local only" });
          return true;
        }
        await writeClaimDashboardState(await readRequestJson(req));
        sendJson(res, 200, { ok: true });
        return true;
      }
      if (req.method === "DELETE") {
        if (!isLocalRequest(req)) {
          sendJson(res, 403, { error: "Local only" });
          return true;
        }
        await writeClaimDashboardState(defaultClaimDashboardState);
        sendJson(res, 200, { ok: true });
        return true;
      }
    }

    if (req.method === "GET" && parsed.pathname === "/api/data") {
      sendJson(res, 200, await readDefectCloseData());
      return true;
    }

    if (req.method === "GET" && parsed.pathname === "/api/config") {
      sendJson(res, 200, { canEdit: isLocalRequest(req) });
      return true;
    }

    if (req.method === "POST" && parsed.pathname === "/api/save") {
      if (!isLocalRequest(req)) {
        sendJson(res, 403, { error: "View only" });
        return true;
      }
      await writeDefectCloseData(await readRequestJson(req));
      sendJson(res, 200, { ok: true });
      return true;
    }
  } catch (err) {
    sendJson(res, 500, { error: err.message });
    return true;
  }
  return false;
}

function handleDefectCloseStatic(req, res) {
  const parsed = new URL(req.url, `http://${req.headers.host}`);
  if (!parsed.pathname.startsWith("/defect-close-dashboard")) return false;

  const relPath = parsed.pathname
    .replace(/^\/defect-close-dashboard\/?/, "/")
    .replace(/^\/$/, "/dashboard_selected_months.html");
  const filePath = path.resolve(defectCloseRoot, `.${decodeURIComponent(relPath)}`);

  if (!filePath.startsWith(defectCloseRoot)) {
    send(res, 403, "Forbidden");
    return true;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, "Not found");
      return;
    }
    send(res, 200, data, { "Content-Type": contentType(filePath) });
  });
  return true;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".csv": "text/csv; charset=utf-8"
  }[ext] || "application/octet-stream";
}

function handleStatic(req, res) {
  const parsed = new URL(req.url, `http://${req.headers.host}`);
  const safePath = decodeURIComponent(parsed.pathname === "/" ? "/index.html" : parsed.pathname);
  const filePath = path.resolve(root, `.${safePath}`);
  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, "Not found");
      return;
    }
    send(res, 200, data, { "Content-Type": contentType(filePath) });
  });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/live-reload")) {
    handleLiveReload(req, res);
    return;
  }
  if (req.url.startsWith("/api/google-workbook")) {
    handleGoogleWorkbook(req, res);
    return;
  }
  if (req.url.startsWith("/api/google-drive-folder")) {
    handleGoogleDriveFolder(req, res);
    return;
  }
  if (req.url.startsWith("/api/debug-log")) {
    handleDebugLog(req, res);
    return;
  }
  handleDefectCloseApi(req, res).then((handled) => {
    if (handled) return;
    if (handleDefectCloseStatic(req, res)) return;
    handleStatic(req, res);
  });
});

server.on("error", (err) => {
  console.error(err.message);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Quality claim dashboard: http://localhost:${port}`);
});
