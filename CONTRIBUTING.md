# Contributing to AuthPractice

## Development Workflow

This project follows **Trunk-Based Development** methodology. Here's how to contribute:

### Branch Strategy

- **Main Branch**: `main` - Always deployable, contains production-ready code
- **Feature Branches**: Short-lived branches for features, bug fixes, and improvements
- **No Long-Running Branches**: We avoid long-running feature branches

### Getting Started

1. **Fork the repository**
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   # or
   git checkout -b docs/your-documentation-update
   ```

3. **Make your changes** following these guidelines:
   - Write clear, descriptive commit messages using conventional commits
   - Keep commits small and focused
   - Test your changes thoroughly
   - Use pnpm for package management

4. **Push your branch** and create a Pull Request:
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format

Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Pull Request Process

1. **Create PR** from your feature branch to `main`
2. **Fill out the PR template** completely
3. **Ensure CI passes** (tests, linting, security audit)
4. **Request review** from maintainers
5. **Address feedback** and make necessary changes
6. **Merge to main** once approved

### Code Quality Standards

- **Linting**: All code must pass ESLint
- **Testing**: Add tests for new features
- **Security**: Pass security audit
- **Documentation**: Update docs for new features
- **Docker**: Ensure Docker build succeeds

### Release Process

- **Automated**: Semantic-release handles versioning
- **Continuous**: Every merge to main triggers a release
- **Deployment**: Automatic deployment to staging and production

### Getting Help

- Open an issue for bugs or feature requests
- Join discussions in PRs
- Follow the project's coding standards

Thank you for contributing! 🚀 