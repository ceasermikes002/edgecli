# Publishing EdgeCLI to npm

## Pre-Publishing Checklist

### 1. Ensure You Have an npm Account

```bash
# Check if logged in
npm whoami

# If not logged in, create account at https://www.npmjs.com/signup
# Then login
npm login
```

### 2. Check Package Name Availability

```bash
# Check if 'edgecli' is available
npm view edgecli

# If it returns 404, the name is available!
# If it shows a package, you'll need to choose a different name
```

### 3. Update package.json

If the name is taken, update `package.json`:

```json
{
  "name": "@yourusername/edgecli",  // Scoped package
  // or
  "name": "edgecli-ai",  // Different name
}
```

Also update the repository URLs in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOURUSERNAME/edgecli.git"
  },
  "bugs": {
    "url": "https://github.com/YOURUSERNAME/edgecli/issues"
  },
  "homepage": "https://github.com/YOURUSERNAME/edgecli#readme"
}
```

### 4. Create LICENSE File

```bash
# Create MIT license file
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2026 HackLondon 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
```

### 5. Build and Test

```bash
# Clean build
rm -rf dist
npm run build

# Test locally
npm link
edgecli --help
edgecli init

# Run tests
npm test

# Unlink after testing
npm unlink -g edgecli
```

### 6. Check What Will Be Published

```bash
# Dry run to see what files will be included
npm pack --dry-run

# This shows:
# - Package size
# - Files that will be included
# - Files that will be excluded
```

## Publishing Steps

### Option 1: First Time Publishing

```bash
# 1. Ensure you're logged in
npm whoami

# 2. Build the project
npm run build

# 3. Publish (this will run prepublishOnly script automatically)
npm publish

# For scoped packages (if name was taken)
npm publish --access public
```

### Option 2: Publishing Updates

```bash
# 1. Update version
npm version patch  # 1.0.0 -> 1.0.1
# or
npm version minor  # 1.0.0 -> 1.1.0
# or
npm version major  # 1.0.0 -> 2.0.0

# 2. Build
npm run build

# 3. Publish
npm publish
```

## After Publishing

### 1. Test Installation

```bash
# In a different directory
npm install -g edgecli

# Test it works
edgecli --help
edgecli init

# Uninstall
npm uninstall -g edgecli
```

### 2. Update Documentation

Update README.md and docs to remove "local development" warnings:

```markdown
## Installation

```bash
npm install -g edgecli
```

That's it! No cloning, no setup - just install and go.
```

### 3. Create GitHub Release

```bash
# Tag the release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Create release on GitHub with changelog
```

### 4. Share on npm

Your package will be available at:
- https://www.npmjs.com/package/edgecli
- https://www.npmjs.com/package/@yourusername/edgecli (if scoped)

## Troubleshooting

### Issue: "You do not have permission to publish"

**Solution:** 
```bash
# Login again
npm logout
npm login
```

### Issue: "Package name already exists"

**Solution:** Choose a different name or use scoped package:
```json
{
  "name": "@yourusername/edgecli"
}
```

### Issue: "prepublishOnly script failed"

**Solution:** Fix TypeScript errors:
```bash
npm run build
# Fix any errors
npm publish
```

### Issue: "Package size too large"

**Solution:** Check .npmignore is working:
```bash
npm pack --dry-run
# Ensure src/, tests/, etc. are excluded
```

## Version Management

### Semantic Versioning

- **Patch (1.0.x):** Bug fixes, minor changes
- **Minor (1.x.0):** New features, backward compatible
- **Major (x.0.0):** Breaking changes

```bash
# Bug fix
npm version patch

# New feature
npm version minor

# Breaking change
npm version major
```

## Unpublishing (Emergency Only)

```bash
# Unpublish specific version (within 72 hours)
npm unpublish edgecli@1.0.0

# Unpublish entire package (within 72 hours, use with caution!)
npm unpublish edgecli --force
```

**Note:** Unpublishing is discouraged. Use `npm deprecate` instead:

```bash
npm deprecate edgecli@1.0.0 "This version has a critical bug. Please upgrade to 1.0.1"
```

## Quick Publish Checklist

- [ ] npm account created and logged in
- [ ] Package name available (or scoped)
- [ ] LICENSE file created
- [ ] package.json updated (repository URLs)
- [ ] Code built successfully (`npm run build`)
- [ ] Tests passing (`npm test`)
- [ ] Dry run checked (`npm pack --dry-run`)
- [ ] Ready to publish (`npm publish`)

## Post-Publish

- [ ] Test installation (`npm install -g edgecli`)
- [ ] Update documentation
- [ ] Create GitHub release
- [ ] Share on social media
- [ ] Update HackLondon project

---

Built for HackLondon 2026 🚀
