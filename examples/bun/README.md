# Bun Examples

Server-side avatar generation using Bun with `@napi-rs/canvas`.

## Setup

Build the package first, then install dependencies:

```bash
cd ../..
npm run build
cd examples/bun
bun install
```

## Server

Bun server that generates avatars via HTTP:

```bash
bun run server
```

- http://localhost:3000/avatar/user@example.com
- http://localhost:3000/avatar/alice?size=128
- http://localhost:3000/avatar/bob?size=256&gridSize=12

## Batch Generation

Generate multiple avatars to PNG files:

```bash
bun run batch
```

Avatars are saved to `output/`.
