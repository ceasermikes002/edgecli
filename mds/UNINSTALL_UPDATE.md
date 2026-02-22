# Uninstall Command Update - Complete Package Removal

## Changes Made

### 1. Updated Uninstall Command ✅

**What Changed:**
- `edgecli uninstall` now **completely removes EdgeCLI** from your system
- No need to run `npm uninstall -g edgecli` separately anymore
- One command does everything

**Before:**
```bash
edgecli uninstall  # Only removed config
npm uninstall -g edgecli  # Had to run this separately
```

**After:**
```bash
edgecli uninstall  # Does EVERYTHING
# ✓ Removes configuration
# ✓ Deletes session data
# ✓ Uninstalls npm package
```

### 2. Why This Change?

**Your Question:** "What is stopping the user from running the npm command directly? And why do I need to run the npm command again after running edgecli uninstall and confirming all questions?"

**Answer:** You're absolutely right! There was no reason to make users run two commands. Now:

1. **One Command:** `edgecli uninstall` does everything
2. **Complete Removal:** Package + config + data all gone
3. **No Extra Steps:** User confirms once, everything happens
4. **Better UX:** Simpler, cleaner, more intuitive

### 3. Updated Documentation ✅

#### Added Pipe Command Explanation

In the docs, we now explain `npm run dev 2>&1 | edgecli watch --stdin`:

```
Understanding the Pipe Command

Let's break down: npm run dev 2>&1 | edgecli watch --stdin

• npm run dev - Runs your development server

• 2>&1 - Redirects stderr (error messages) to stdout
  - 2 = stderr (file descriptor 2)
  - &1 = stdout (file descriptor 1)
  - This ensures both normal output AND errors are captured

• | (pipe) - Takes output from left command and feeds it to right command

• edgecli watch --stdin - Receives the piped output and analyzes it

Result: Your app runs normally, but EdgeCLI monitors all output 
(including errors) and provides AI-powered triage automatically!
```

#### Updated Uninstall Section

- Explains it's a **complete removal**
- Lists everything that gets removed (including npm package)
- Explains why one command is better
- Shows reinstall process

### 4. New Behavior

#### What Happens Now:

```bash
$ edgecli uninstall

╔═══════════════════════════════════════╗
║  ⚡ EDGE CLI - AI-Powered Triage ⚡  ║
╚═══════════════════════════════════════╝

┌─ Uninstall EdgeCLI ────────────────────────────
│
│ This will completely remove EdgeCLI
│
└─────────────────────────────────────────────────

The following will be removed:

  • Configuration file: C:\Users\...\config.json
  • Configuration directory: C:\Users\...\Config
  • Session statistics: C:\Users\...\session-stats.json
  • EdgeCLI npm package (globally installed)

┌─ Current Configuration ────────────────────────
│
│ Gemini API Key: Configured ✓
│ Gemini Model: gemini-2.5-flash
│ ElevenLabs API Key: Configured ✓
│ Voice Alerts: Enabled
│
└─────────────────────────────────────────────────

? Are you sure you want to completely remove EdgeCLI? (y/N)
? This will uninstall the package and delete all data. Continue? (y/N)

✔ Removed 2 configuration item(s)
- Uninstalling EdgeCLI package...
✔ EdgeCLI package uninstalled

┌─ Uninstall Complete ───────────────────────────
│
│ ✓ Configuration removed
│ ✓ Session data cleared
│ ✓ Package uninstalled
│
└─────────────────────────────────────────────────

EdgeCLI has been completely removed from your system.

To reinstall EdgeCLI in the future:
  npm install -g edgecli
  edgecli init

Thank you for using EdgeCLI! 👋
```

### 5. Technical Implementation

**Added to `src/commands/uninstall.ts`:**

```typescript
// After removing config files...

// Uninstall npm package
const uninstallSpinner = UIComponents.createSpinner('Uninstalling EdgeCLI package...');
uninstallSpinner.start();

await new Promise<void>((resolve, reject) => {
  const npm = spawn('npm', ['uninstall', '-g', 'edgecli'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  npm.on('close', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`npm uninstall failed`));
    }
  });
});

uninstallSpinner.succeed('EdgeCLI package uninstalled');
```

### 6. Error Handling

If the npm uninstall fails:
- Shows clear error message
- Provides manual uninstall command
- Doesn't leave system in broken state
- User can still manually complete uninstall

### 7. Benefits

✅ **Simpler UX:** One command instead of two
✅ **Complete Removal:** Nothing left behind
✅ **Clear Communication:** Shows exactly what happens
✅ **Safety:** Double confirmation prevents accidents
✅ **Transparency:** Lists everything before removing
✅ **Graceful Errors:** Handles failures elegantly

## Summary

### Before:
```bash
edgecli uninstall           # Remove config
npm uninstall -g edgecli    # Remove package (separate step)
```

### After:
```bash
edgecli uninstall           # Does EVERYTHING
```

### Documentation:
- ✅ Pipe command explained (`2>&1 |`)
- ✅ Uninstall section updated
- ✅ Complete removal documented
- ✅ Reinstall process shown

---

Built for HackLondon 2026 🚀
