# http-ping-cli

Simple HTTP endpoint health checker and response time monitor from the command line.

[![CI](https://github.com/tapiwamakandigona/http-ping-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/tapiwamakandigona/http-ping-cli/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Features

- Ping one or more HTTP/HTTPS endpoints and display status codes and response times
- Repeat pings at configurable intervals for ongoing monitoring
- Color-coded output: ✓ green for success (2xx), ✗ red for failure
- Configurable timeout (10 s per request)
- Zero runtime dependencies — uses Node.js built-in `fetch`

## Installation

### From source

```bash
git clone https://github.com/tapiwamakandigona/http-ping-cli.git
cd http-ping-cli
npm install
npm run build
node dist/index.js <url>
```

### Link globally (development)

```bash
npm install
npm run build
npm link
http-ping <url>
```

### Pre-built binaries

Download a binary for your platform from the [Releases](https://github.com/tapiwamakandigona/http-ping-cli/releases) page.

## Usage

```bash
http-ping <url...> [options]
```

### Options

| Option         | Description                          | Default |
| -------------- | ------------------------------------ | ------- |
| `--repeat N`   | Number of ping rounds                | `1`     |
| `--interval S` | Seconds to wait between rounds       | `1`     |
| `--help`       | Show usage information               | —       |

### Examples

```bash
# Ping a single endpoint
http-ping https://example.com

# Ping multiple endpoints
http-ping https://example.com https://api.example.com/health

# Repeat 5 times with a 2-second interval
http-ping https://example.com --repeat 5 --interval 2
```

### Output

```
✓ https://example.com - 200 (120ms)
✗ https://down.example.com - TIMEOUT (10003ms)
```

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js ≥ 18 (uses built-in `fetch`)
- **Build:** `tsc` (TypeScript compiler)
- **Packaging:** [@yao-pkg/pkg](https://github.com/nicolo-ribaudo/pkg) for standalone binaries

## Project Structure

```
http-ping-cli/
├── src/
│   └── index.ts        # CLI entry point and ping logic
├── dist/               # Compiled JavaScript (generated)
├── .github/
│   ├── workflows/
│   │   ├── ci.yml      # Build & test on push/PR
│   │   └── release.yml # Build binaries on version tags
│   └── dependabot.yml  # Automated dependency updates
├── tsconfig.json
├── package.json
├── LICENSE
└── CHANGELOG.md
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Type-check without emitting
npx tsc --noEmit

# Run locally
node dist/index.js https://example.com
```

## License

[MIT](./LICENSE)
