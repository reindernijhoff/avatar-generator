# Bun Examples

These are **Bun server-side** examples using TypeScript. For Node.js examples, see `/examples/node` directory.

**Important**: Build the package first before running these examples:

```bash
cd ../..  # Go to root
npm run build
cd examples/bun
```

## Setup

```bash
bun install
```

## Bun Examples

### Server-side Avatar API

Bun server that generates avatars via HTTP endpoints:

```bash
bun run server
# or directly:
bun run bun-server.ts
```

Visit:

- http://localhost:3000/avatar/user@example.com
- http://localhost:3000/avatar/alice?size=128
- http://localhost:3000/avatar/bob?size=256&gridSize=12

### Batch Generation

Generate multiple avatars to files:

```bash
bun run batch
# or directly:
bun run batch-generate.ts
```

Avatars are saved to `examples/bun/output/`.

## Dependencies

Bun requires the `@napi-rs/canvas` package for canvas support (different from Node.js which uses `canvas`).
This is already included in the package.json, just run `bun install`.

See [@napi-rs/canvas documentation](https://github.com/Brooooooklyn/canvas) for more details.

