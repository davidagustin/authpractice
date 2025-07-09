# ArgoCD App of Apps Pattern

This directory contains the ArgoCD App of Apps manifests for managing the deployment of the AuthPractice application and related resources in a GitOps workflow.

## Structure

```
argocd/
├── README.md                # This file
├── apps/
│   └── authpractice.yaml    # ArgoCD Application manifest for the app Helm chart
└── root-app.yaml            # The root ArgoCD Application (App of Apps)
```

## Usage

1. **Bootstrap ArgoCD** in your cluster (see [ArgoCD docs](https://argo-cd.readthedocs.io/en/stable/getting_started/)).
2. **Apply the root app**:
   ```bash
   kubectl apply -f argocd/root-app.yaml
   ```
3. ArgoCD will recursively create and manage all child applications defined in `apps/`.

## Adding More Apps
- Add new application manifests to the `apps/` directory.
- Reference them in the `root-app.yaml` as additional children.

## Example
- The provided `authpractice.yaml` deploys the Helm chart in the `helm/` directory. 