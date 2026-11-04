// Node side of the Sheets and email bridge. Posts JSON to the Apps Script web app.
export async function post(payload) {
  const url = process.env.BRIDGE_URL;
  const secret = process.env.BRIDGE_SECRET;
  if (!url || !secret) throw new Error("BRIDGE_URL or BRIDGE_SECRET is missing from .env");
  const res = await fetch(url, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...payload, secret }),
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error(`Bridge returned non-JSON (HTTP ${res.status}): ${text.slice(0, 200)}`); }
  if (!data.ok) throw new Error(`Bridge refused: ${data.error}`);
  return data;
}
