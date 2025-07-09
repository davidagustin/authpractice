# Creating GitHub Token for GHCR (Repository-Scoped)

## Steps to Create Repository-Scoped Token

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token (classic)"

2. **Configure Token**
   - **Note**: `authpractice-ghcr-token`
   - **Expiration**: Choose appropriate expiration (recommend 90 days)
   - **Scopes**: Select only these scopes:
     - `write:packages` - Push packages to GitHub Package Registry
     - `read:packages` - Download packages from GitHub Package Registry
     - `repo` - Full control of private repositories (for this repo only)

3. **Repository Access**
   - Select "Only select repositories"
   - Choose: `davidagustin/authpractice`

4. **Generate Token**
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately (you won't see it again)

5. **Add to .envrc**
   ```bash
   # Edit .envrc and add your token
   export GITHUB_TOKEN="ghp_your_token_here"
   export GHCR_TOKEN="ghp_your_token_here"
   ```

6. **Reload Environment**
   ```bash
   direnv reload
   ```

## Security Notes

- ✅ Token is scoped to this repository only
- ✅ Token has minimal required permissions
- ✅ Token is stored in .envrc (ignored by git)
- ✅ Token will expire automatically
- ✅ Token is read-only for packages (can't delete)

## Usage

After setting up the token, you can push images:

```bash
# Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u davidagustin --password-stdin

# Push image
docker push ghcr.io/davidagustin/authpractice:latest
``` 