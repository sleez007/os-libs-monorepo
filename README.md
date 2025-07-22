# OS Libs Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A comprehensive monorepo containing TypeScript libraries for social media platform integrations, built with Nx workspace for optimal development experience and maintainability.

## 📦 Packages

### [@innovatespace/ig-business](./packages/instagram-business)

[![npm version](https://badge.fury.io/js/@innovatespace%2Fig-business.svg)](https://badge.fury.io/js/@innovatespace%2Fig-business)

A TypeScript library for Instagram Business API integration.

**Features:**

- 🔐 **OAuth Authentication** - Complete Instagram OAuth flow implementation
- 📸 **Content Publishing** - Publish images, videos, and carousel posts
- 👤 **Account Information** - Retrieve Instagram Business account details and metrics
- 🎯 **TypeScript Support** - Fully typed for better development experience
- 🚀 **Modern ESM** - Built with ES modules for optimal tree-shaking
- ⚡ **Zero Dependencies** - Lightweight with no external dependencies

**Installation:**

```bash
npm install @innovatespace/ig-business
```

**Quick Start:**
```typescript
import { OAuthInstagram, InstagramPublish, InstagramAccount } from '@innovatespace/ig-business';

// OAuth Authentication
const oauth = new OAuthInstagram('client-id', 'client-secret');

// Content Publishing
const publisher = new InstagramPublish('access-token', 'account-id');

// Account Information
const account = new InstagramAccount('access-token');
```

### [@innovatespace/tiktok](./packages/tiktok)

A Node.js client library that wraps the TikTok API, covering login with TikTok, Display API, and Content Publish API.

**Features:**

- 🔐 **OAuth Authentication** - TikTok login and authorization flow
- 📱 **Display API** - Retrieve user information and video data
- 📤 **Content Publishing** - Upload and publish videos to TikTok
- 🎯 **TypeScript Support** - Fully typed for better development experience
- 🌐 **SSR Compatible** - Works with Next.js, Nuxt.js, and other SSR frameworks

**Installation:**

```bash
npm install @innovatespace/tiktok
```

**Quick Start:**
```typescript
import { OAuthTicTok, TikTokContent, TikTokQuery } from '@innovatespace/tiktok';

// OAuth Authentication
const oauth = new OAuthTicTok('client-id', 'client-secret');

// Content Publishing
const content = new TikTokContent('access-token');

// Query API
const query = new TikTokQuery('access-token');
```

## 🚀 Example Applications

### [Node.js Example](./apps/node-example)
A NestJS application demonstrating how to use both Instagram Business and TikTok libraries in a Node.js environment.

### [SSR Example](./apps/ssr-example)
A server-side rendering example showcasing the libraries' compatibility with SSR frameworks.

## 🛠️ Development

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/sleez007/os-libs-monorepo.git
cd os-libs-monorepo

# Install dependencies
pnpm install
```

### Building Packages

```bash
# Build all packages
pnpm build

# Build specific package
npx nx build @innovatespace/ig-business
npx nx build @innovatespace/tiktok
```

### Running Tests

```bash
# Run all tests
pnpm test

# Test specific package
npx nx test @innovatespace/ig-business
npx nx test @innovatespace/tiktok
```

### Running Example Applications

```bash
# Start NestJS example
pnpm serve:nest

# Start SSR example
pnpm serve:ssr
```

### Development Workflow

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Check for circular dependencies
pnpm check-circular-deps
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all packages and applications |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all projects |
| `pnpm format` | Format code using Prettier |
| `pnpm serve:nest` | Start the NestJS example application |
| `pnpm serve:ssr` | Start the SSR example application |
| `pnpm release` | Release packages to npm |
| `pnpm first:release` | First release of packages |
| `pnpm generate:plan` | Generate release plan |

## 🏗️ Project Structure

```text
os-libs-monorepo/
├── packages/
│   ├── instagram-business/     # Instagram Business API library
│   └── tiktok/                 # TikTok API library
├── apps/
│   ├── node-example/           # NestJS example application
│   └── ssr-example/            # SSR example application
├── tools/                      # Build tools and scripts
└── docs/                       # Documentation
```

## 📝 Publishing

This monorepo uses Nx release for automated versioning and publishing:

```bash
# Generate a release plan
pnpm generate:plan

# Release packages
pnpm release

# First time release
pnpm first:release
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Update documentation when adding new APIs
- Use conventional commits for commit messages
- Ensure all linting and formatting checks pass

## 📚 Documentation

Each package contains detailed documentation:

- [Instagram Business API Documentation](./packages/instagram-business/README.md)
- [TikTok API Documentation](./packages/tiktok/README.md)

## 🔗 Useful Links

- [Nx Documentation](https://nx.dev)
- [Instagram Business API](https://developers.facebook.com/docs/instagram-api)
- [TikTok for Developers](https://developers.tiktok.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Kingsley Etoka** - *Initial work* - [@sleez007](https://github.com/sleez007)

## 🙏 Acknowledgments

- Built with [Nx](https://nx.dev) for optimal monorepo management
- Inspired by the need for better social media API integrations
- Thanks to the open-source community for continuous inspiration

---

**Happy coding!** 🚀

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

