# EdgeCLI - Demo Quick Reference

## 🎯 5-Minute Demo Script

### 1. Introduction (30 seconds)
```bash
edgecli --help
```
**Say**: "EdgeCLI is an AI-powered log triage tool using Google Gemini API. Notice the beautiful gradient UI."

---

### 2. Interactive Setup (1 minute)
```bash
edgecli init
```

**What happens**:
- Shows welcome screen with logo
- Prompts for API key (secure input)
- Shows model selection:
  - gemini-2.5-flash ⭐ (Recommended)
  - gemini-2.5-pro
  - gemini-2.0-flash
  - gemini-3-flash
  - gemini-3-pro
- Saves configuration
- Shows summary

**Say**: "Setup is interactive and beautiful. We support multiple Gemini models, showing deep ecosystem knowledge."

---

### 3. Simulation Demo (1 minute)
```bash
edgecli simulate
```

**Say**: "Let me show you mock errors. Notice the gradient borders and color-coded output."

---

### 4. Real Analysis (2 minutes)

#### Option A: With Buggy App
```bash
cd demo
node buggy-app.js 2>&1 | edgecli watch --stdin
```

**Say**: "Now let's analyze real errors. EdgeCLI uses prompt chaining - light triage first, then deep analysis if needed."

#### Option B: File Analysis
```bash
edgecli suggest --file demo/sample-auth.js
```

**Say**: "It can analyze specific files and generate code patches in diff format."

---

### 5. Statistics (30 seconds)
```bash
edgecli stats
```

**Say**: "Transparent metrics show time saved and API usage. Cost-aware debugging."

---

### 6. Closing (30 seconds)

**Key Points**:
- ✅ Multiple Gemini models (2.5-flash, 2.5-pro, 3-flash, 3-pro)
- ✅ Prompt chaining (light → deep)
- ✅ Code generation (patches)
- ✅ Beautiful UI with gradient colors
- ✅ Interactive setup
- ✅ Privacy-first (local summarization)

**Say**: "EdgeCLI showcases Gemini's strengths: analyzing complex logs, generating code, and providing intelligent debugging advice - all with a polished, professional UI."

---

## 🎨 UI Highlights to Point Out

### Help Command
```
╔═══════════════════════════════════════╗
║  ⚡ EDGE CLI - AI-Powered Triage ⚡  ║
╚═══════════════════════════════════════╝
```
- Gradient borders
- Organized sections
- Practical examples

### Interactive Init
- Step-by-step wizard
- Secure password input
- Model selection with descriptions
- Configuration summary

### Analysis Output
- Color-coded severity (green → yellow → orange → red)
- Gradient borders
- Diff syntax highlighting
- Loading spinners

---

## 🔑 Key Talking Points

### 1. Gemini API Integration
- "We support 5 different Gemini models"
- "Users can choose based on their needs"
- "Shows deep understanding of Gemini ecosystem"

### 2. Prompt Chaining
- "Light triage for quick classification"
- "Auto-escalates to deep analysis when confidence is low"
- "Demonstrates advanced Gemini usage"

### 3. Code Generation
- "Generates actual code patches"
- "Diff format for safe, manual application"
- "Shows Gemini's code understanding"

### 4. User Experience
- "Interactive setup - no manual env vars"
- "Beautiful gradient UI throughout"
- "Professional appearance"

### 5. Privacy & Cost
- "Logs summarized locally"
- "Sensitive data masked"
- "Transparent token usage"

---

## 🐛 Troubleshooting During Demo

### If API Key Not Set
```bash
edgecli init
```
Then continue with demo.

### If Model Error
The models are now correct (gemini-2.5-flash, etc.), so no 404 errors!

### If No Logs Available
```bash
edgecli simulate
```
Always works, no API key needed.

---

## 📋 Pre-Demo Checklist

- [ ] `edgecli --version` works
- [ ] `edgecli --help` shows beautiful UI
- [ ] `edgecli simulate` runs without errors
- [ ] Have Gemini API key ready (optional)
- [ ] `demo/buggy-app.js` exists
- [ ] Know which model to select (gemini-2.5-flash)

---

## 🎯 Backup Plan (No API Key)

If you don't have an API key or it's not working:

```bash
# 1. Show help
edgecli --help

# 2. Show init wizard (can cancel)
edgecli init
# Press Ctrl+C to cancel

# 3. Run simulation
edgecli simulate

# 4. Explain features
```

**Say**: "Without an API key, I can show you the UI and simulation. The real power comes when connected to Gemini API for actual log analysis."

---

## 💡 Questions & Answers

**Q: Which Gemini model do you recommend?**
A: "gemini-2.5-flash for most use cases - fast and efficient. gemini-2.5-pro for complex analysis."

**Q: How does prompt chaining work?**
A: "Light prompt classifies quickly. If confidence is low, we automatically chain to a deep analysis prompt with more context."

**Q: Why the gradient UI?**
A: "Professional appearance matching tools like Claude CLI. Makes the tool feel polished and production-ready."

**Q: How do you handle sensitive data?**
A: "Logs are summarized locally before sending to Gemini. We mask emails, API keys, and tokens automatically."

**Q: Can it auto-apply patches?**
A: "No, by design. We generate diff-only outputs for safe, manual review and application."

---

## 🏆 Winning Points

### Best Use of Gemini API
- ✅ Multiple model support
- ✅ Prompt chaining
- ✅ Code generation
- ✅ Structured outputs
- ✅ Transparent metrics

### Overall Polish
- ✅ Beautiful UI
- ✅ Interactive setup
- ✅ Comprehensive features
- ✅ Professional appearance
- ✅ Complete documentation

---

## ⚡ Quick Commands Reference

```bash
edgecli --help              # Show help
edgecli --version           # Show version
edgecli init                # Interactive setup
edgecli simulate            # Mock errors
edgecli watch app.log       # Watch file
edgecli watch --stdin       # Watch stdin
edgecli suggest --file X    # Analyze file
edgecli stats               # Show statistics
```

---

**Good luck at HackLondon 2026!** 🚀
