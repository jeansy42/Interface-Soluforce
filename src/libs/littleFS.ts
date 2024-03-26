export async function formatLittleFS() {
  const res = await fetch("/formatLittleFS", { method: "DELETE" });
  const data = await res.text();
  return data;
}
