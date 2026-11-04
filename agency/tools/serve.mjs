// Small static server for testing docs/ locally at http://localhost:4173.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, normalize } from "node:path";
import { ROOT } from "../env.mjs";

const types = { html: "text/html", css: "text/css", svg: "image/svg+xml", xml: "application/xml", txt: "text/plain" };
createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split("?")[0]);
  const file = normalize(join(ROOT, "docs", path.endsWith("/") ? path + "index.html" : path));
  if (!file.startsWith(join(ROOT, "docs"))) { res.writeHead(403); return res.end(); }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[file.split(".").pop()] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end("not found");
  }
}).listen(4173, () => console.log("Serving docs/ at http://localhost:4173"));
