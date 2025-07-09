# Istio Service Mesh with Ambient Mode

This directory contains Istio service mesh configuration for the authpractice application using ambient mode, managed via ArgoCD GitOps.

## What is Ambient Mode?

Ambient mode is Istio's latest approach to service mesh that provides:
- **Zero-trust security** without sidecar injection
- **Traffic management** capabilities
- **Observability** features
- **Simplified deployment** and management

## GitOps Management

This Istio configuration is managed via ArgoCD GitOps:
- **ArgoCD Application**: `istio-service-mesh` in the `argocd` namespace
- **Source**: This directory in the `develop` branch
- **Target**: `istio-system` namespace
- **Sync Policy**: Automated with pruning and self-healing

## Components Installed

### Core Components
- **Istiod**: Control plane for service mesh management
- **Ztunnel**: Zero-trust tunnel for secure communication
- **Ingress Gateway**: Traffic ingress management
- **Virtual Services**: Traffic routing and load balancing
- **Destination Rules**: Traffic policies and circuit breakers
- **Gateways**: Ingress traffic management
- **Authorization Policies**: Security and access control

### Namespaces Enabled
- `default`: Development environment
- `authpractice`: Production environment
- `istio-system`: Service mesh control plane

## Configuration Files

### `istio-operator.yaml`
- Istio installation configuration
- Ingress gateway setup with NodePort services
- Resource limits and scaling configuration

### `gateway-ingress.yaml`
- HTTP and HTTPS gateway configurations
- TLS certificate management
- Hostname routing setup

### `virtualservice-gateway.yaml`
- Defines traffic routing rules through the gateway
- Configures retry policies and timeouts
- Maps hostnames to services
- CORS policy configuration

### `ambient-config.yaml`
- Simplified ambient mode configuration
- Internal service mesh routing
- Fallback configuration for direct service access

### `destinationrule.yaml`
- Configures load balancing (Round Robin)
- Sets connection pool limits
- Defines circuit breaker policies
- Configures outlier detection

### `authorizationpolicy.yaml`
- Enforces security policies
- Controls access to API endpoints
- Restricts cross-namespace communication

## Key Features

### Traffic Management
- **Load Balancing**: Round-robin distribution
- **Retry Logic**: 3 attempts with 2s timeout
- **Circuit Breaking**: Automatic failure detection
- **Connection Pooling**: Resource optimization
- **Gateway Routing**: Centralized ingress management

### Security
- **Zero-trust**: All traffic is encrypted
- **Authorization**: Namespace-based access control
- **Principal-based**: Service account authentication
- **TLS Termination**: HTTPS support at the gateway

### Observability
- **Metrics**: Automatic collection via Prometheus
- **Tracing**: Distributed tracing with Jaeger
- **Logging**: Centralized logging

## Usage

### Check Service Mesh Status
```bash
istioctl analyze
kubectl get virtualservice,destinationrule,gateway -A
```

### View Traffic Metrics
```bash
istioctl dashboard grafana
istioctl dashboard prometheus
```

### Monitor Service Communication
```bash
istioctl proxy-status
istioctl proxy-config listeners <pod-name>
```

### Access via Gateway
```bash
# Development environment
curl -H "Host: authpractice.local" http://localhost:30080

# Production environment  
curl -H "Host: authpractice-prod.local" http://localhost:30080
```

## Benefits

1. **No Sidecar Injection**: Applications run without modification
2. **Automatic Security**: All traffic is encrypted by default
3. **Traffic Management**: Advanced routing and load balancing
4. **Observability**: Built-in monitoring and tracing
5. **Simplified Operations**: Less complexity than traditional sidecar mode
6. **GitOps Management**: Declarative infrastructure management

## Next Steps

1. **Enable mTLS**: Configure mutual TLS for enhanced security
2. **Add Observability**: Deploy Prometheus, Grafana, and Jaeger
3. **Traffic Splitting**: Implement canary deployments
4. **Security Policies**: Add more granular authorization rules
5. **Monitoring**: Set up alerts and dashboards
6. **Certificate Management**: Configure proper TLS certificates 