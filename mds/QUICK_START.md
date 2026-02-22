# Quick Start - Demo EdgeCLI

## ✅ Setup Complete!

Your CLI tool is installed and ready. Here's how to demo it:

---

## 🎯 Demo 1: Simulate Mode (No API Key Needed)

Perfect for quick testing without Gemini API.

```bash
# Show all commands
edgecli --help

# Generate mock errors with fancy UI
edgecli simulate

# Show init guide
edgecli init
```

**What this shows**: Beautiful gradient UI, mock error generation, setup instructions.

---

## 🎯 Demo 2: Analyze Buggy App Output

Test with the included buggy application.

### Option A: Direct output (see the errors)
```bash
cd demo
node buggy-app.js
```

### Option B: Pipe to EdgeCLI (requires API key)
```bash
cd demo
node buggy-app.js 2>&1 | edgecli watch --stdin
```

**What this shows**: Real-time log analysis, severity classification, confidence scoring with beautiful UI.

---

## 🎯 Demo 3: Get Patch Suggestions

Analyze a buggy file and get fix suggestions.

```bash
cd demo
edgecli suggest --file sample-auth.js
```

**What this shows**: Code analysis, root cause detection, diff-format patches with gradient styling.

---

## 🎯 Demo 4: View Statistics

After running any triage command:

```bash
edgecli stats
```

**What this shows**: Transparent metrics, time saved estimation with fancy formatting.

---

## 🔑 To Use Gemini API (Optional)

1. Get your API key: https://makersuite.google.com/app/apikey

2. Set the environment variable:
   ```bash
   # Windows PowerShell
   $env:GEMINI_API_KEY="your-api-key-here"
   
   # Linux/macOS
   export GEMINI_API_KEY="your-api-key-here"
   ```

3. Run any demo with real AI analysis!

---

## 🎬 5-Minute Judge Demo Script

### 1. Introduction (30 seconds)
```bash
edgecli --help
```
"EdgeCLI - AI-powered log triage using Google Gemini API. Let me show you how it works."

### 2. Show the Problem (30 seconds)
```bash
cd demo
node buggy-app.js
```
"Look at all these errors. Which is the root cause? Let's ask Gemini."

### 3. Show the Solution (2 minutes)
```bash
# If you have API key:
node buggy-app.js 2>&1 | edgecli watch --stdin

# Without API key (simulation):
edgecli simulate
```
"EdgeCLI classifies severity, generates hypotheses, and suggests fixes with a beautiful UI."

### 4. Show Patch Generation (1 minute)
```bash
edgecli suggest --file sample-auth.js
```
"It analyzes code and generates safe, reviewable patches."

### 5. Show Metrics (30 seconds)
```bash
edgecli stats
```
"Transparent metrics show time saved and API usage."

### 6. Closing (30 seconds)
"This showcases Gemini's strengths: analyzing complex data, generating code, and providing intelligent debugging advice - all with a polished, gradient UI."

---

## 🐛 Troubleshooting

### "Command not found: edgecli"
```bash
npm link
```

### "GEMINI_API_KEY not set"
```bash
# Use simulation mode (no API key needed):
edgecli simulate

# Or set your API key:
$env:GEMINI_API_KEY="your-key"
```

### Want to test without API?
All commands work without an API key except `watch` and `suggest`. Use `simulate` for demos!

---

## 📚 Full Documentation

- **Complete Demo Guide**: `demo/DEMO_GUIDE.md`
- **Test Summary**: `TEST_SUMMARY.md`
- **README**: `README.md`

---

## 🚀 Ready to Demo!

You're all set. Start with `edgecli simulate` to see the fancy UI in action!

For the full experience with Gemini API:
1. Get API key from Google AI Studio
2. Set `GEMINI_API_KEY` environment variable
3. Run `cd demo && node buggy-app.js 2>&1 | edgecli watch --stdin`

Good luck at HackLondon 2026! 🎉
