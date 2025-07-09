# AuthPractice

A modern Next.js 15 application with React 19, TypeScript, and Docker support, deployed to Kubernetes using Helm.

## 🚀 Features

- **Next.js 15** with React 19
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Docker** containerization
- **Kubernetes** deployment with Helm
- **Conventional Commits** for versioning

## 🏗️ Project Structure

```
authpractice/
├── frontend/           # Next.js 15 + React 19 application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   ├── package.json   # Dependencies and scripts
│   └── Dockerfile     # Docker configuration
├── helm/              # Helm chart for Kubernetes deployment
│   ├── templates/     # Kubernetes manifests
│   ├── values.yaml    # Chart configuration
│   └── Chart.yaml     # Chart metadata
└── README.md          # This file
```

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/davidagustin/authpractice.git
cd authpractice/frontend

# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start
```

### Docker Development

```bash
# Build Docker image (from frontend directory)
cd frontend
docker build -t authpractice .

# Run container
docker run -p 3000:3000 authpractice
```

### Kubernetes Deployment

```bash
# Build and import image to k3d (if using k3d)
docker build -t authpractice:latest frontend/
k3d image import authpractice:latest

# Deploy using Helm
helm install authpractice helm/

# Port forward to access the application
kubectl port-forward svc/authpractice 8080:3000
```

## 📋 Prerequisites

- Node.js 18.x or 20.x
- pnpm (recommended) or npm
- Docker (for containerization)
- Kubernetes cluster (k3d, minikube, or cloud provider)
- Helm 3.0+

## 🛠️ Available Scripts

From the `frontend/` directory:

- `pnpm run dev` - Start development server with Turbopack
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run release` - Run semantic-release
- `pnpm run docker:build` - Build Docker image
- `pnpm run docker:run` - Run Docker container

## 🤝 Contributing

This project follows conventional commit standards for versioning and releases.

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat: add user authentication`
- `fix: resolve login button styling`
- `docs: update deployment instructions`
- `chore: bump version to 0.1.1`

## 📦 Release Process

- **Automated**: Semantic-release handles versioning based on conventional commits
- **Continuous**: Every merge to main triggers a release
- **Deployment**: Manual deployment to Kubernetes using Helm

## 🔧 Deployment

### Local Kubernetes (k3d)

```bash
# Start k3d cluster
k3d cluster create authpractice

# Build and import image
docker build -t authpractice:latest frontend/
k3d image import authpractice:latest

# Deploy with Helm
helm install authpractice helm/

# Access the application
kubectl port-forward svc/authpractice 8080:3000
```

### Production Deployment

1. Build and push Docker image to your registry
2. Update `helm/values.yaml` with your image repository
3. Deploy using Helm to your Kubernetes cluster

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Create an issue for bugs or feature requests
- Check the [Helm README](helm/README.md) for deployment details
