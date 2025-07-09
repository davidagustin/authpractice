# AuthPractice Frontend

Next.js 15 application with React 19, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- pnpm (recommended) or npm

### Development

```bash
# Install dependencies
pnpm install

# Start development server with Turbopack
pnpm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
pnpm run build

# Start production server
pnpm run start
```

## 🐳 Docker

### Build Image

```bash
# Build Docker image
docker build -t authpractice .

# Run container
docker run -p 3000:3000 authpractice
```

### Using npm scripts

```bash
# Build using npm script
pnpm run docker:build

# Run using npm script
pnpm run docker:run
```

## 🛠️ Available Scripts

- `pnpm run dev` - Start development server with Turbopack
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run release` - Run semantic-release
- `pnpm run docker:build` - Build Docker image
- `pnpm run docker:run` - Run Docker container

## 📁 Project Structure

```
frontend/
├── src/               # Source code
│   ├── app/          # Next.js 15 app directory
│   └── components/   # React components
├── public/           # Static assets
├── package.json      # Dependencies and scripts
├── Dockerfile        # Docker configuration
├── .dockerignore     # Docker ignore patterns
├── tsconfig.json     # TypeScript configuration
├── next.config.ts    # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── postcss.config.mjs # PostCSS configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### TypeScript

The project uses TypeScript with strict mode enabled. Configuration is in `tsconfig.json`.

### Tailwind CSS

Tailwind CSS v4 is configured with PostCSS. Configuration is in `tailwind.config.ts`.

## 🚀 Deployment

### Docker

```bash
# Build image
docker build -t authpractice .

# For k3d local development
k3d image import authpractice:latest

# For production registry
docker tag authpractice:latest your-registry/authpractice:latest
docker push your-registry/authpractice:latest
```

### Kubernetes

Use the Helm chart in the `../helm/` directory:

```bash
# Deploy to Kubernetes
helm install authpractice ../helm/

# Port forward to access
kubectl port-forward svc/authpractice 8080:3000
```

## 📦 Dependencies

### Production Dependencies

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety

### Development Dependencies

- **Tailwind CSS v4** - Utility-first CSS framework
- **ESLint** - Code linting
- **Semantic Release** - Automated versioning

## 🤝 Contributing

Follow conventional commit standards:

```
type(scope): description

Examples:
- feat: add user authentication
- fix: resolve login button styling
- docs: update deployment instructions
- chore: bump version to 0.1.1
```

## 📄 License

This project is licensed under the MIT License. 