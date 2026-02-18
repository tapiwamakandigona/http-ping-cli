#!/usr/bin/env node

interface PingResult {
  url: string;
  status: number;
  time: number;
  ok: boolean;
}

async function ping(url: string): Promise<PingResult> {
  const start = Date.now();
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(10000) });
    return { url, status: res.status, time: Date.now() - start, ok: res.ok };
  } catch (e: any) {
    return { url, status: 0, time: Date.now() - start, ok: false };
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: http-ping <url...>");
    console.log("  --repeat N   Repeat N times (default: 1)");
    console.log("  --interval S Seconds between pings (default: 1)");
    process.exit(0);
  }

  const repeatIdx = args.indexOf("--repeat");
  const repeat = repeatIdx >= 0 ? parseInt(args[repeatIdx + 1]) : 1;
  const intervalIdx = args.indexOf("--interval");
  const interval = intervalIdx >= 0 ? parseFloat(args[intervalIdx + 1]) : 1;
  const urls = args.filter((a, i) => !a.startsWith("--") && 
    (repeatIdx < 0 || i !== repeatIdx + 1) && 
    (intervalIdx < 0 || i !== intervalIdx + 1));

  for (let i = 0; i < repeat; i++) {
    if (i > 0) await new Promise(r => setTimeout(r, interval * 1000));
    for (const url of urls) {
      const result = await ping(url);
      const icon = result.ok ? "\u2713" : "\u2717";
      const color = result.ok ? "\x1b[32m" : "\x1b[31m";
      console.log(`${color}${icon}\x1b[0m ${result.url} - ${result.status || "TIMEOUT"} (${result.time}ms)`);
    }
  }
}

main();
