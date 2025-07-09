# Deployment Guide

## Overview

AuthPractice uses GitOps with ArgoCD for continuous deployment. The deployment process is automated and follows infrastructure-as-code principles.

## Deployment Architecture

```
Git Repository → ArgoCD → Kubernetes Cluster
     ↓              ↓           ↓
  Code Changes → GitOps Sync → Application Deployed
```

## Environments

### Development
- **Cluster**: Local k3d cluster
- **Namespace**: `default`
- **URL**: http://localhost:3000 (local) / http://localhost:8080 (k8s)
- **Database**: Local PostgreSQL

### Staging
- **Cluster**: Shared Kubernetes cluster
- **Namespace**: `authpractice-staging`
- **URL**: https://staging.authpractice.com
- **Database**: Shared PostgreSQL instance

### Production
- **Cluster**: Production Kubernetes cluster
- **Namespace**: `authpractice-production`
- **URL**: https://authpractice.com
- **Database**: Production PostgreSQL cluster

## Prerequisites

### Local Development Setup

1. **Install required tools**
   ```bash
   # Install k3d
   brew install k3d

   # Install kubectl
   brew install kubectl

   # Install ArgoCD CLI
   brew install argocd
   ```

2. **Create local cluster**
   ```bash
   k3d cluster create authpractice-cluster
   ```

3. **Configure kubectl**
   ```bash
   kubectl config use-context k3d-authpractice-cluster
   ```

### Production Setup

1. **Kubernetes cluster** with:
   - ArgoCD installed
   - Istio service mesh
   - cert-manager for SSL certificates
   - PostgreSQL operator

2. **Container registry** (GitHub Container Registry)
3. **Domain and SSL certificates**

## Deployment Process

### 1. Build and Push Image

```bash
# Build Docker image
task build

# Push to registry (if using ghcr.io)
docker tag authpractice:latest ghcr.io/your-org/authpractice:latest
docker push ghcr.io/your-org/authpractice:latest
```

### 2. Update Helm Values

Update the appropriate values file in `infrastructure/helm/`:

```yaml
# values-development.yaml
image:
  repository: ghcr.io/your-org/authpractice
  tag: latest

# values-production.yaml
image:
  repository: ghcr.io/your-org/authpractice
  tag: v1.0.0
```

### 3. Commit and Push

```bash
git add .
git commit -m "feat: deploy version 1.0.0"
git push origin main
```

### 4. ArgoCD Sync

ArgoCD will automatically detect changes and sync the application:

```bash
# Manual sync (if needed)
task gitops-sync
```

## Infrastructure Components

### ArgoCD Applications

#### Root Application (`infrastructure/argocd/root-app.yaml`)
- Manages the entire application stack
- References other applications
- Configures sync policies

#### Application Sets (`infrastructure/argocd/applicationset.yaml`)
- Automatically creates applications for different environments
- Uses GitOps patterns for environment management

#### Infrastructure Applications (`infrastructure/argocd/infra/`)
- **Istio**: Service mesh for traffic management
- **cert-manager**: SSL certificate management
- **PostgreSQL**: Database deployment

### Helm Charts

#### Application Chart (`infrastructure/helm/`)
- **Deployment**: Application pods
- **Service**: Internal service discovery
- **Ingress**: External traffic routing
- **HPA**: Horizontal pod autoscaling
- **ServiceAccount**: RBAC configuration

#### Environment-Specific Values
- `values-development.yaml`: Development configuration
- `values-production.yaml`: Production configuration
- `values.yaml`: Default values

## Configuration Management

### Environment Variables

```yaml
# infrastructure/helm/templates/deployment.yaml
env:
  - name: DATABASE_URL
    valueFrom:
      secretKeyRef:
        name: authpractice-secrets
        key: database-url
  - name: NODE_ENV
    value: "production"
```

### Secrets Management

```bash
# Create secrets
kubectl create secret generic authpractice-secrets \
  --from-literal=database-url=postgresql://user:pass@host:5432/db \
  --from-literal=jwt-secret=your-jwt-secret

# Apply to namespace
kubectl apply -f infrastructure/k8s/secrets.yaml
```

## Monitoring and Observability

### Health Checks

```yaml
# Liveness probe
livenessProbe:
  httpGet:
    path: /api/health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

# Readiness probe
readinessProbe:
  httpGet:
    path: /api/ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Logging

```yaml
# Structured logging
env:
  - name: LOG_LEVEL
    value: "info"
  - name: LOG_FORMAT
    value: "json"
```

### Metrics

```yaml
# Prometheus metrics endpoint
annotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "3000"
  prometheus.io/path: "/api/metrics"
```

## Rollback Strategy

### Automatic Rollback

ArgoCD can automatically rollback failed deployments:

```yaml
# ArgoCD application configuration
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
```

### Manual Rollback

```bash
# Rollback to previous version
argocd app rollback authpractice-production 1

# Rollback to specific version
argocd app set authpractice-production --revision 2
```

## Security Considerations

### Network Policies

```yaml
# infrastructure/k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: authpractice-network-policy
spec:
  podSelector:
    matchLabels:
      app: authpractice
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: istio-system
    ports:
    - protocol: TCP
      port: 3000
```

### RBAC Configuration

```yaml
# infrastructure/helm/templates/serviceaccount.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: authpractice
  labels:
    app: authpractice
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: authpractice-role
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list", "watch"]
```

## Troubleshooting

### Common Deployment Issues

1. **Image pull errors**
   ```bash
   # Check image availability
   docker pull ghcr.io/your-org/authpractice:latest
   
   # Check registry credentials
   kubectl get secret regcred -o yaml
   ```

2. **Database connection issues**
   ```bash
   # Check database pod status
   kubectl get pods -n postgresql
   
   # Test database connection
   kubectl exec -it deployment/authpractice -- nc -zv postgresql 5432
   ```

3. **ArgoCD sync failures**
   ```bash
   # Check application status
   argocd app get authpractice-production
   
   # View sync logs
   argocd app logs authpractice-production
   ```

### Debugging Commands

```bash
# Check pod status
kubectl get pods -A | grep authpractice

# View application logs
task k8s-logs

# Check service endpoints
kubectl get endpoints -A | grep authpractice

# Test service connectivity
kubectl run test-pod --image=busybox --rm -it --restart=Never -- wget -O- http://authpractice-service:3000
```

## Performance Optimization

### Resource Limits

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### Horizontal Pod Autoscaling

```yaml
# infrastructure/helm/templates/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: authpractice-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: authpractice
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Backup and Recovery

### Database Backup

```bash
# Create backup
kubectl exec -it deployment/postgresql -- pg_dump -U authpractice authpractice > backup.sql

# Restore from backup
kubectl exec -i deployment/postgresql -- psql -U authpractice authpractice < backup.sql
```

### Application Backup

```bash
# Export application configuration
kubectl get deployment authpractice -o yaml > authpractice-backup.yaml

# Restore application
kubectl apply -f authpractice-backup.yaml
``` 