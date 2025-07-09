# AuthPractice

A modern Next.js 15 application with React 19, TypeScript, and Docker support, following trunk-based development methodology.

## 🚀 Features

- **Next.js 15** with React 19
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Docker** containerization
- **Semantic Release** for automated versioning
- **Trunk-Based Development** workflow
- **CI/CD** with GitHub Actions

## 🏗️ Development Workflow

This project follows **Trunk-Based Development**:

- **Main Branch**: Always deployable, production-ready code
- **Short-lived Feature Branches**: For features, bug fixes, and improvements
- **Continuous Integration**: Automated testing and deployment
- **Semantic Versioning**: Automated releases based on conventional commits

### Quick Start

```bash
# Clone the repository
git clone https://github.com/davidagustin/authpractice.git
cd authpractice

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Docker

```bash
# Build Docker image
docker build -t authpractice .

# Run container
docker run -p 3000:3000 authpractice
```

## 📋 Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Docker (optional)

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run release` - Run semantic-release

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our trunk-based development workflow and how to contribute.

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

## 📦 Release Process

- **Automated**: Semantic-release handles versioning
- **Continuous**: Every merge to main triggers a release
- **Deployment**: Automatic deployment to staging and production

## 🔧 CI/CD Pipeline

- **CI**: Runs on every PR and push to main
  - Linting and type checking
  - Unit and integration tests
  - Security audit
  - Docker build verification

- **CD**: Deploys on merge to main
  - Staging deployment
  - Production deployment (after staging approval)

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Create an issue for bugs or feature requests
- Check the [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
