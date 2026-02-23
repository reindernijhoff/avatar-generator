# Node.js Examples

Server-side avatar generation using Node.js with the `canvas` package.

## Setup

Build the package first, then install dependencies:

```bash
cd ../..
npm run build
cd examples/node
npm install
```

## Server

Express server that generates avatars via HTTP:

```bash
npm run server
```

- http://localhost:3000/avatar/user@example.com
- http://localhost:3000/avatar/alice?size=128
- http://localhost:3000/avatar/bob?size=256&gridSize=12

## Batch Generation

Generate multiple avatars to PNG files:

```bash
npm run batch
```

Avatars are saved to `output/`.
