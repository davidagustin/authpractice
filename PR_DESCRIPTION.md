# ✨ Add Version Tagging Feature

## Description
This PR adds a comprehensive version management system to the AuthPractice project, including:

- **Version Management Script**: A new `scripts/version.sh` script that automates version bumping across all project files
- **Automatic Version Updates**: Updates version in package.json, Helm chart, and ArgoCD configuration
- **Git Tagging**: Automatically creates and pushes git tags for releases
- **Version Bump**: Bumps version from 0.1.1 to 0.1.2

## Type of Change
- [x] ✨ New feature (non-breaking change which adds functionality)
- [x] 🔧 Configuration change

## Changes Made

### New Files
- `scripts/version.sh` - Version management script with colored output and error handling

### Updated Files
- `frontend/package.json` - Version bumped to 0.1.2
- `helm/Chart.yaml` - Chart version and appVersion updated to 0.1.2
- `helm/values.yaml` - Image tag updated to 0.1.2
- `argocd/apps/authpractice.yaml` - ArgoCD image tag updated to 0.1.2

## Usage

The version script supports semantic versioning:

```bash
# Bump patch version (0.1.1 -> 0.1.2)
./scripts/version.sh patch

# Bump minor version (0.1.1 -> 0.2.0)
./scripts/version.sh minor

# Bump major version (0.1.1 -> 1.0.0)
./scripts/version.sh major
```

## Testing
- [x] Local development testing
- [x] Version script testing
- [x] Git tagging verification

## Checklist
- [x] My code follows the project's style guidelines
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] I have made corresponding changes to the documentation
- [x] My changes generate no new warnings
- [x] New and existing unit tests pass locally with my changes

## Next Steps After Merge
1. Build new Docker image with version 0.1.2
2. Import image to k3d cluster
3. ArgoCD will automatically sync the new version
4. Verify deployment in Kubernetes

## Screenshots
N/A - Backend feature

## Additional Notes
This feature improves the development workflow by automating version management across all project components, ensuring consistency between frontend, Helm charts, and ArgoCD configurations. 