# Architecture Overview

## System Architecture

AuthPractice is a modern web application built with a microservices-ready architecture, designed for scalability and maintainability.

## Components

### Frontend Application (`apps/web/`)

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Database**: PostgreSQL (direct connection for simplicity)

### Infrastructure (`infrastructure/`)

#### ArgoCD (`infrastructure/argocd/`)
- **Purpose**: GitOps continuous deployment
- **Components**:
  - Root application for managing the entire stack
  - Application sets for automated deployment
  - Infrastructure applications (Istio, cert-manager, PostgreSQL)

#### Helm Charts (`infrastructure/helm/`)
- **Purpose**: Kubernetes application packaging
- **Components**:
  - Application deployment configuration
  - Service and ingress definitions
  - Horizontal Pod Autoscaler
  - Environment-specific values

#### Kubernetes Manifests (`infrastructure/k8s/`)
- **Purpose**: Raw Kubernetes resources
- **Components**:
  - Custom resources
  - Namespace definitions
  - Service accounts

## Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

### Infrastructure
- **Kubernetes**: Container orchestration
- **ArgoCD**: GitOps continuous deployment
- **Helm**: Kubernetes package manager
- **Istio**: Service mesh for traffic management
- **cert-manager**: SSL certificate management
- **PostgreSQL**: Database

### Development Tools
- **pnpm**: Fast, disk space efficient package manager
- **Task**: Task runner for automation
- **Docker**: Containerization
- **k3d**: Local Kubernetes development

## Data Flow

```
User Request → Istio Gateway → Next.js App → PostgreSQL
                ↓
            ArgoCD (GitOps)
                ↓
            Kubernetes Cluster
```

## Security

- **HTTPS**: TLS termination at Istio gateway
- **Authentication**: JWT-based (planned)
- **Authorization**: Role-based access control (planned)
- **Database**: Connection pooling and prepared statements

## Scalability

- **Horizontal Scaling**: Kubernetes HPA for automatic scaling
- **Load Balancing**: Istio load balancer
- **Caching**: Next.js built-in caching strategies
- **Database**: Connection pooling and read replicas (planned)

## Monitoring & Observability

- **Logging**: Kubernetes-native logging
- **Metrics**: Prometheus metrics (planned)
- **Tracing**: Distributed tracing (planned)
- **Health Checks**: Kubernetes liveness and readiness probes

## Development Workflow

1. **Local Development**: `task dev` starts the development server
2. **Testing**: `task test` runs unit and integration tests
3. **Linting**: `task lint` ensures code quality
4. **Building**: `task build` creates Docker image
5. **Deployment**: GitOps automatically deploys on merge to main

## Environment Strategy

- **Development**: Local Kubernetes with k3d
- **Staging**: Separate Kubernetes namespace
- **Production**: Production Kubernetes cluster

## Future Enhancements

- [ ] Backend API service
- [ ] Authentication service
- [ ] Message queue integration
- [ ] Advanced monitoring and alerting
- [ ] Multi-region deployment
- [ ] Blue-green deployments 