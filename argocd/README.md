# ArgoCD GitOps

## Main Branch Deployment
- The main branch is deployed via the `authpractice` ArgoCD Application.

## Develop Branch Deployment
- The develop branch is deployed via the `authpractice-develop` ArgoCD Application (`argocd/apps/authpractice-develop.yaml`).
- This creates a separate namespace (`authpractice-develop`) for preview/staging.

### To apply the develop GitOps app:
```sh
kubectl apply -f argocd/apps/authpractice-develop.yaml -n argocd
```

You can then sync and manage the develop environment in the ArgoCD UI. 