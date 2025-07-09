# AuthPractice Helm Chart

A Helm chart for deploying the AuthPractice Next.js application to Kubernetes.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+
- Docker image `authpractice:latest` available in your registry

## Installation

### From local chart directory:

```bash
# Install the chart
helm install authpractice ./authpractice

# Install with custom values
helm install authpractice ./authpractice --values custom-values.yaml

# Install in a specific namespace
helm install authpractice ./authpractice --namespace my-namespace --create-namespace
```

### Upgrade existing installation:

```bash
helm upgrade authpractice ./authpractice
```

## Configuration

The following table lists the configurable parameters of the authpractice chart and their default values.

| Parameter | Description | Default |
|-----------|-------------|---------|
| `replicaCount` | Number of replicas | `1` |
| `image.repository` | Container image repository | `authpractice` |
| `image.tag` | Container image tag | `latest` |
| `image.pullPolicy` | Container image pull policy | `IfNotPresent` |
| `service.type` | Kubernetes service type | `ClusterIP` |
| `service.port` | Kubernetes service port | `3000` |
| `ingress.enabled` | Enable ingress | `false` |
| `resources` | CPU/Memory resource requests/limits | `{}` |
| `autoscaling.enabled` | Enable autoscaling | `false` |

## Usage

### Basic deployment:

```bash
helm install authpractice ./authpractice
```

### With custom image:

```bash
helm install authpractice ./authpractice \
  --set image.repository=my-registry/authpractice \
  --set image.tag=v1.0.0
```

### With ingress enabled:

```bash
helm install authpractice ./authpractice \
  --set ingress.enabled=true \
  --set ingress.hosts[0].host=authpractice.example.com
```

### With autoscaling:

```bash
helm install authpractice ./authpractice \
  --set autoscaling.enabled=true \
  --set autoscaling.minReplicas=2 \
  --set autoscaling.maxReplicas=10
```

## Uninstalling the Chart

```bash
helm uninstall authpractice
```

## Building the Docker Image

Before deploying, ensure you have built the Docker image:

```bash
# Build the image
docker build -t authpractice:latest .

# Push to your registry (if needed)
docker tag authpractice:latest your-registry/authpractice:latest
docker push your-registry/authpractice:latest
```

## Health Checks

The chart includes liveness and readiness probes:
- **Liveness probe**: Checks `/` endpoint every 10 seconds after 30 seconds initial delay
- **Readiness probe**: Checks `/` endpoint every 5 seconds after 5 seconds initial delay

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Helm Documentation](https://helm.sh/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs) 