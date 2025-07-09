#!/bin/bash

# Version management script for AuthPractice
# Usage: ./scripts/version.sh [patch|minor|major]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    print_error "This script must be run from the project root directory"
    exit 1
fi

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./frontend/package.json').version")
print_status "Current version: $CURRENT_VERSION"

# Parse version components
IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

# Determine new version based on argument
if [ "$1" = "major" ]; then
    NEW_MAJOR=$((MAJOR + 1))
    NEW_MINOR=0
    NEW_PATCH=0
    NEW_VERSION="$NEW_MAJOR.$NEW_MINOR.$NEW_PATCH"
elif [ "$1" = "minor" ]; then
    NEW_MAJOR=$MAJOR
    NEW_MINOR=$((MINOR + 1))
    NEW_PATCH=0
    NEW_VERSION="$NEW_MAJOR.$NEW_MINOR.$NEW_PATCH"
elif [ "$1" = "patch" ]; then
    NEW_MAJOR=$MAJOR
    NEW_MINOR=$MINOR
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION="$NEW_MAJOR.$NEW_MINOR.$NEW_PATCH"
else
    print_error "Usage: $0 [patch|minor|major]"
    print_status "Examples:"
    print_status "  $0 patch  # 0.1.1 -> 0.1.2"
    print_status "  $0 minor  # 0.1.1 -> 0.2.0"
    print_status "  $0 major  # 0.1.1 -> 1.0.0"
    exit 1
fi

print_header "Bumping version from $CURRENT_VERSION to $NEW_VERSION"

# Update package.json
print_status "Updating frontend/package.json..."
node -e "
const pkg = require('./frontend/package.json');
pkg.version = '$NEW_VERSION';
require('fs').writeFileSync('./frontend/package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Update Helm Chart.yaml
print_status "Updating helm/Chart.yaml..."
sed -i.bak "s/^version: .*/version: $NEW_VERSION/" helm/Chart.yaml
sed -i.bak "s/^appVersion: .*/appVersion: \"$NEW_VERSION\"/" helm/Chart.yaml
rm helm/Chart.yaml.bak

# Update Helm values.yaml
print_status "Updating helm/values.yaml..."
sed -i.bak "s/^  tag: .*/  tag: \"$NEW_VERSION\"/" helm/values.yaml
rm helm/values.yaml.bak

# Update ArgoCD application
print_status "Updating argocd/apps/authpractice.yaml..."
sed -i.bak "s/^          tag: .*/          tag: \"$NEW_VERSION\"/" argocd/apps/authpractice.yaml
rm argocd/apps/authpractice.yaml.bak

# Create git tag
print_status "Creating git tag v$NEW_VERSION..."
git add .
git commit -m "chore: bump version to $NEW_VERSION

- Updated frontend/package.json
- Updated helm/Chart.yaml
- Updated helm/values.yaml  
- Updated argocd/apps/authpractice.yaml"

git tag -a "v$NEW_VERSION" -m "Release version $NEW_VERSION"

print_header "Version bump complete!"
print_status "New version: $NEW_VERSION"
print_status "Tag created: v$NEW_VERSION"
print_status ""
print_status "Next steps:"
print_status "1. Push the branch: git push origin feature/add-version-tagging"
print_status "2. Push the tag: git push origin v$NEW_VERSION"
print_status "3. Create a pull request to merge into main"
print_status "4. After merge, the new version will be deployed via ArgoCD" 