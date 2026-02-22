# Publish EdgeCLI to npm RIGHT NOW! 🚀

## Quick Start (5 Minutes)

### Step 1: Create npm Account (if you don't have one)

1. Go to https://www.npmjs.com/signup
2. Create account
3. Verify email

### Step 2: Login to npm

```bash
npm login
# Enter username, password, email
```

### Step 3: Check if Name is Available

```bash
npm view edgecli
```

**If you see 404:** Great! The name is available, proceed to Step 4.

**If you see a package:** The name is taken. You have two options:

**Option A:** Use a scoped package (recommended)
```bash
# Update package.json name to:
"name": "@yourusername/edgecli"

# Then publish with:
npm publish --access public
```

**Option B:** Choose a different name
```bash
# Update package.json name to something like:
"name": "edgecli-ai"
"name": "edge-cli-triage"
"name": "ai-edgecli"
```

### Step 4: Update Repository URLs

Edit `package.json` and replace `yourusername` with your GitHub username:

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

Or if you don't have a GitHub repo yet, remove these fields temporarily.

### Step 5: Build

```bash
npm run build
```

### Step 6: Test What Will Be Published

```bash
npm pack --dry-run
```

This shows you what files will be included. Should see:
- ✅ dist/
- ✅ bin/
- ✅ README.md
- ✅ LICENSE
- ❌ src/ (excluded)
- ❌ tests/ (excluded)

### Step 7: PUBLISH! 🎉

```bash
# If name is available:
npm publish

# If using scoped package:
npm publish --access public
```

### Step 8: Test Installation

```bash
# In a different directory or terminal
npm install -g edgecli

# Test it
edgecli --help
edgecli init

# Success! 🎉
```

## That's It!

Your package is now live at:
- https://www.npmjs.com/package/edgecli
- Anyone can install with: `npm install -g edgecli`

## What Happens Next?

### Users Can Now:

```bash
# Install
npm install -g edgecli

# Setup
edgecli init

# Use
edgecli watch app.log --voice
```

### You Can Update:

```bash
# Make changes
# Update version
npm version patch  # 1.0.0 -> 1.0.1

# Build and publish
npm run build
npm publish
```

## Common Issues

### "You do not have permission"
```bash
npm logout
npm login
```

### "Package name already exists"
Use scoped package: `@yourusername/edgecli`

### "prepublishOnly failed"
```bash
npm run build
# Fix any TypeScript errors
```

## Pro Tips

1. **First publish?** Start with version 1.0.0 (already set)
2. **Want to test first?** Use `npm pack` to create a tarball
3. **Made a mistake?** You can unpublish within 72 hours
4. **Want analytics?** Check https://www.npmjs.com/package/edgecli/stats

## Ready? Let's Go! 🚀

```bash
npm login
npm run build
npm publish
```

Three commands. That's it. Your CLI tool is now available to the world! 🌍

---

Built for HackLondon 2026 🎉
