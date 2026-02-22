# EdgeCLI - Local Development Guide

## Understanding npm link vs npm install

### npm link (Local Development)
- Creates a **symlink** from global node_modules to your local project
- Changes are reflected immediately after rebuilding
- Perfect for development and testing
- **This is what you should use now**

### npm install -g (Production)
- Installs from npm registry
- Requires package to be published
- Used by end users
- **Not available yet** (EdgeCLI not published)

## Setup for Local Development

### Initial Setup

```bash
# 1. Navigate to project
cd C:\Users\Admin\Documents\edgecli

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Link globally
npm link

# 5. Verify it works
edgecli --help
```

### After Making Changes

```bash
# 1. Rebuild
npm run build

# 2. Test immediately (no need to relink)
edgecli <command>
```

## Uninstalling During Development

```bash
# Option 1: Use the built-in command (recommended)
edgecli uninstall

# Option 2: Manual unlink
npm unlink -g edgecli

# Option 3: Remove symlink directly
# Windows: del %APPDATA%\npm\edgecli
# macOS/Linux: rm /usr/local/bin/edgecli
```

## Reinstalling After Uninstall

```bash
# Navigate to project
cd C:\Users\Admin\Documents\edgecli

# Ensure dependencies are installed
npm install

# Build
npm run build

# Link again
npm link

# Setup
edgecli init
```

## Common Issues

### Issue: "edgecli: command not found"

**Cause:** Package not linked

**Solution:**
```bash
cd C:\Users\Admin\Documents\edgecli
npm link
```

### Issue: "npm install -g edgecli" fails with 404

**Cause:** Package not published to npm yet

**Solution:** Use `npm link` instead (see above)

### Issue: Changes not reflected

**Cause:** Forgot to rebuild

**Solution:**
```bash
npm run build
```

### Issue: Multiple versions installed

**Cause:** Both linked and installed versions exist

**Solution:**
```bash
# Unlink local version
npm unlink -g edgecli

# Remove any installed version
npm uninstall -g edgecli

# Link again
npm link
```

## Development Workflow

### 1. Make Code Changes
Edit files in `src/`

### 2. Build
```bash
npm run build
```

### 3. Test
```bash
edgecli <command>
```

### 4. Repeat
No need to relink, just rebuild and test!

## Publishing to npm (Future)

When ready to publish:

```bash
# 1. Update version in package.json
npm version patch  # or minor, or major

# 2. Build
npm run build

# 3. Publish
npm publish

# 4. Users can now install
npm install -g edgecli
```

## File Structure

```
edgecli/
├── src/              # Source TypeScript files
├── dist/             # Compiled JavaScript (generated)
├── bin/              # CLI entry point
├── node_modules/     # Dependencies
├── package.json      # Package configuration
└── tsconfig.json     # TypeScript configuration
```

## npm link Explained

When you run `npm link`:

1. Creates symlink in global node_modules:
   ```
   C:\Users\Admin\AppData\Roaming\npm\node_modules\edgecli
   → C:\Users\Admin\Documents\edgecli
   ```

2. Creates executable in global bin:
   ```
   C:\Users\Admin\AppData\Roaming\npm\edgecli
   → C:\Users\Admin\Documents\edgecli\bin\edgecli.js
   ```

3. Now `edgecli` command runs your local code!

## Benefits of npm link

✅ **Instant Testing:** Test changes immediately after rebuild
✅ **No Publishing:** Don't need to publish to npm
✅ **Easy Debugging:** Can add console.logs and see them
✅ **Fast Iteration:** Build → Test → Repeat
✅ **Safe:** Doesn't affect npm registry

## When to Use What

| Scenario | Command |
|----------|---------|
| Local development | `npm link` |
| Testing changes | `npm run build` then test |
| Sharing with team | Commit to git, they run `npm link` |
| Production deployment | `npm publish` then `npm install -g` |
| End users | `npm install -g edgecli` (after publishing) |

## Quick Reference

```bash
# Setup
npm install && npm run build && npm link

# After changes
npm run build

# Uninstall
edgecli uninstall
# or
npm unlink -g edgecli

# Reinstall
npm link

# Check if linked
npm ls -g edgecli
```

---

Built for HackLondon 2026 🚀
