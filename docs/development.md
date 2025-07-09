# Development Guide

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v10.12.4 or higher)
- **Docker** (for containerization)
- **kubectl** (for Kubernetes interaction)
- **k3d** (for local Kubernetes development)
- **ArgoCD CLI** (for GitOps operations)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd authpractice
   ```

2. **Install dependencies**
   ```bash
   task install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

## Development Workflow

### Starting Development

```bash
# Start the development server
task dev
```

The application will be available at http://localhost:3000

### Code Quality

```bash
# Run linting
task lint

# Run tests
task test

# Type checking
cd apps/web && pnpm tsc --noEmit
```

### Database Development

The application uses PostgreSQL for data storage. For local development:

```bash
# Start local database (if using Docker)
docker run --name authpractice-db \
  -e POSTGRES_DB=authpractice \
  -e POSTGRES_USER=authpractice \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15

# Connect to database
task db-connect
```

### Local Kubernetes Development

```bash
# Create local cluster
k3d cluster create authpractice-cluster

# Deploy infrastructure
kubectl apply -f infrastructure/argocd/

# Deploy application
task k8s-deploy

# Set up port forwarding
task k8s-port-forward
```

## Project Structure

### Application Code (`apps/web/`)

```
apps/web/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   ├── lib/              # Utility functions
│   └── page.tsx          # Home page
├── components/            # UI components
│   └── ui/               # Radix UI components
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

### Infrastructure (`infrastructure/`)

```
infrastructure/
├── argocd/               # GitOps configuration
│   ├── root-app.yaml     # Root application
│   ├── applicationset.yaml # Application sets
│   └── infra/           # Infrastructure apps
├── helm/                 # Helm charts
│   ├── Chart.yaml       # Chart metadata
│   ├── templates/       # Kubernetes templates
│   └── values.yaml      # Default values
└── k8s/                 # Raw Kubernetes manifests
```

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper type annotations for function parameters and return values
- Avoid `any` type - use `unknown` when type is truly unknown

### React/Next.js

- Use functional components with hooks
- Follow the App Router patterns
- Use server components by default, client components when needed
- Implement proper error boundaries
- Use proper loading states

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CSS custom properties for theming
- Ensure accessibility compliance

### Git Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build process or auxiliary tool changes

## Testing

### Unit Tests

```bash
# Run unit tests
cd apps/web && pnpm test

# Run tests in watch mode
cd apps/web && pnpm test:watch

# Run tests with coverage
cd apps/web && pnpm test:coverage
```

### Integration Tests

```bash
# Run integration tests
cd apps/web && pnpm test:integration
```

### E2E Tests

```bash
# Run end-to-end tests
cd apps/web && pnpm test:e2e
```

## Debugging

### Frontend Debugging

- Use React Developer Tools browser extension
- Use Next.js debugging features
- Check browser console for errors
- Use `console.log` or debugger statements

### Kubernetes Debugging

```bash
# Check pod status
kubectl get pods -A

# View pod logs
kubectl logs -f deployment/authpractice

# Describe resources
kubectl describe pod <pod-name>

# Port forward for local access
kubectl port-forward svc/<service-name> <local-port>:<service-port>
```

### Database Debugging

```bash
# Connect to database
task db-connect

# View database logs
kubectl logs -f deployment/postgresql
```

## Performance

### Frontend Optimization

- Use Next.js Image component for optimized images
- Implement proper caching strategies
- Use React.memo for expensive components
- Optimize bundle size with dynamic imports

### Database Optimization

- Use connection pooling
- Implement proper indexing
- Use prepared statements
- Monitor query performance

## Security

### Frontend Security

- Validate all user inputs
- Use HTTPS in production
- Implement proper CORS policies
- Sanitize data before rendering

### Infrastructure Security

- Use RBAC for Kubernetes access
- Implement network policies
- Use secrets for sensitive data
- Regular security updates

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port
   lsof -i :3000
   # Kill process
   kill -9 <PID>
   ```

2. **Docker build fails**
   ```bash
   # Clean Docker cache
   task docker-prune
   ```

3. **Kubernetes deployment fails**
   ```bash
   # Check pod status
   kubectl get pods -A
   # View events
   kubectl get events --sort-by='.lastTimestamp'
   ```

### Getting Help

- Check the [documentation](docs/)
- Search existing [issues](../../issues)
- Create a new issue with detailed information
- Ask in the team chat or forums 