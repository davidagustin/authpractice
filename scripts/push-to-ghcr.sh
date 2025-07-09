#!/bin/bash

# Push Docker image to GitHub Container Registry
# This script uses environment variables from .envrc

set -e

echo "🚀 Pushing Docker image to GitHub Container Registry..."

# Check if required environment variables are set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN is not set"
    echo "Please create a GitHub token and add it to .envrc"
    echo "See scripts/create-ghcr-token.md for instructions"
    exit 1
fi

if [ -z "$DOCKER_REGISTRY" ] || [ -z "$DOCKER_NAMESPACE" ] || [ -z "$DOCKER_IMAGE" ]; then
    echo "❌ Error: Docker registry variables are not set"
    echo "Please check your .envrc file"
    exit 1
fi

# Build the full image name
FULL_IMAGE_NAME="${DOCKER_REGISTRY}/${DOCKER_NAMESPACE}/${DOCKER_IMAGE}:latest"

echo "📦 Image: $FULL_IMAGE_NAME"

# Tag the image if not already tagged
if ! docker images | grep -q "$FULL_IMAGE_NAME"; then
    echo "🏷️  Tagging image..."
    docker tag authpractice:latest "$FULL_IMAGE_NAME"
fi

# Login to GHCR
echo "🔐 Logging in to GitHub Container Registry..."
echo "$GITHUB_TOKEN" | docker login ghcr.io -u davidagustin --password-stdin

# Push the image
echo "⬆️  Pushing image to registry..."
docker push "$FULL_IMAGE_NAME"

echo "✅ Successfully pushed image to GHCR!"
echo "🌐 View at: https://github.com/davidagustin/authpractice/packages" 