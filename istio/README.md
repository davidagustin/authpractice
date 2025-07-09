# Istio Service Mesh with Ambient Mode

This directory contains Istio service mesh configuration for the authpractice application using ambient mode.

## What is Ambient Mode?

Ambient mode is Istio's latest approach to service mesh that provides:
- **Zero-trust security** without sidecar injection
- **Traffic management** capabilities
- **Observability** features
- **Simplified deployment** and management

## Components Installed

### Core Components
- **Istiod**: Control plane for service mesh management
- **Ztunnel**: Zero-trust tunnel for secure communication
- **Virtual Services**: Traffic routing and load balancing
- **Destination Rules**: Traffic policies and circuit breakers
- **Gateways**: Ingress traffic management
- **Authorization Policies**: Security and access control

### Namespaces Enabled
- `default`: Development environment
- `authpractice`: Production environment

## Configuration Files

### `virtualservice.yaml`
- Defines traffic routing rules
- Configures retry policies and timeouts
- Maps hostnames to services

### `gateway.yaml`
- Configures ingress gateways
- Defines hostname mappings
- Sets up HTTP routing

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

### Security
- **Zero-trust**: All traffic is encrypted
- **Authorization**: Namespace-based access control
- **Principal-based**: Service account authentication

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

## Benefits

1. **No Sidecar Injection**: Applications run without modification
2. **Automatic Security**: All traffic is encrypted by default
3. **Traffic Management**: Advanced routing and load balancing
4. **Observability**: Built-in monitoring and tracing
5. **Simplified Operations**: Less complexity than traditional sidecar mode

## Next Steps

1. **Enable mTLS**: Configure mutual TLS for enhanced security
2. **Add Observability**: Deploy Prometheus, Grafana, and Jaeger
3. **Traffic Splitting**: Implement canary deployments
4. **Security Policies**: Add more granular authorization rules
5. **Monitoring**: Set up alerts and dashboards 