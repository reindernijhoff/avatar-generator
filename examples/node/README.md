# Examples

These are **Node.js server-side** examples. For a browser example, see `/example` directory in the root.

**Important**: Build the package first before running these examples:
```bash
npm run build
```

## Node.js Examples

### Server-side Avatar API

Express server that generates avatars via HTTP endpoints:

```bash
npm install express canvas
npm run build  # Build package first
node examples/node-server.js
```

Visit:
- http://localhost:3000/avatar/user@example.com
- http://localhost:3000/avatar/alice?size=128
- http://localhost:3000/avatar/bob?size=256&gridSize=12

### Batch Generation

Generate multiple avatars to files:

```bash
npm install canvas
npm run build  # Build package first
node examples/batch-generate.js
```

Avatars are saved to `examples/output/`.

## React Example (Future)

A separate React wrapper package is planned:

```tsx
import { AvatarGenerator } from '@avatar-generator/react';

function UserProfile({ email }) {
  return <AvatarGenerator theme="digidoodle" id={email} size={128} />;
}
```
