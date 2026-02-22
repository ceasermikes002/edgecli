# 🎯 Demo Checklist - Gemini Triage Agent

## ✅ Pre-Demo Setup (5 minutes)

- [x] Project built: `npm run build` ✓
- [x] CLI linked: `npm link` ✓
- [x] Tests passing: `npm test` ✓
- [x] Demo dependencies installed: `cd demo && npm install` ✓

### Optional (for full Gemini API demo):
- [ ] Get Gemini API key: https://makersuite.google.com/app/apikey
- [ ] Set environment variable: `$env:GEMINI_API_KEY="your-key"`

---

## 🎬 Demo Options

### Option 1: Quick Demo (No API Key) - 2 Minutes

Perfect for initial testing or when API key isn't available.

```powershell
# Show commands
gemini-triage --help

# Generate mock errors
gemini-triage simulate

# Show setup guide
gemini-triage init
```

**Run automated demo:**
```powershell
cd demo
.\simple-demo.ps1
```

---

### Option 2: Full Demo (With API Key) - 5 Minutes

Shows real Gemini API analysis.

**Prerequisites:**
```powershell
$env:GEMINI_API_KEY="your-api-key-here"
```

**Demo flow:**

1. **Show the problem:**
   ```powershell
   cd demo
   node buggy-app.js
   ```
   *(Let it crash to show the errors)*

2. **Show the solution:**
   ```powershell
   node buggy-app.js 2>&1 | gemini-triage watch --stdin
   ```
   *(Watch Gemini analyze in real-time)*

3. **Get patch suggestions:**
   ```powershell
   gemini-triage suggest --file sample-auth.js
   ```

4. **View statistics:**
   ```powershell
   gemini-triage stats
   ```

---

## 📋 What to Highlight

### For Judges (Best Use of Gemini API Prize)

1. **Prompt Chaining**
   - Light triage → Quick classification
   - Auto-escalates to deep analysis when confidence < 65%
   - Shows Gemini's reasoning capabilities

2. **Code Generation**
   - Generates actual diff patches
   - Safe, reviewable format
   - Demonstrates Gemini's code understanding

3. **Structured Outputs**
   - JSON responses for reliability
   - Confidence scoring
   - Severity classification

4. **Transparent Metrics**
   - Latency tracking
   - Token usage display
   - Cost-aware debugging

### For Developers

1. **Easy Installation**
   - `npm install -g gemini-triage-agent`
   - Zero config needed

2. **Flexible Input**
   - File watching
   - Stdin piping
   - Works with any log source

3. **Privacy First**
   - Local log summarization
   - Sensitive data masking
   - No raw logs sent to API

4. **Time Savings**
   - ~45 minutes saved per incident
   - Automated root cause detection
   - Instant patch suggestions

---

## 🎤 Demo Script for Judges

### Opening (30 seconds)
"Hi! I'm demoing Gemini Triage Agent - an AI-powered CLI tool that helps engineers debug production issues faster using Google's Gemini API."

### Problem Statement (30 seconds)
```powershell
cd demo
node buggy-app.js
```
"When production breaks, engineers face noisy logs like these. Which error is the root cause? Let's ask Gemini."

### Solution Demo (2 minutes)
```powershell
node buggy-app.js 2>&1 | gemini-triage watch --stdin
```
"Gemini Triage Agent:
- Classifies severity automatically
- Generates hypotheses with confidence scores
- Escalates to deep analysis when needed
- All with transparent latency and token metrics"

### Code Analysis (1 minute)
```powershell
gemini-triage suggest --file sample-auth.js
```
"It can analyze specific files and generate safe, reviewable patches in diff format."

### Metrics (30 seconds)
```powershell
gemini-triage stats
```
"Transparent metrics show time saved and API usage - cost-aware debugging."

### Closing (30 seconds)
"This showcases Gemini's key strengths:
- Analyzing complex log data
- Generating production-ready code
- Providing intelligent, personalized debugging advice
- All through a simple CLI that developers already know how to use"

---

## 🐛 Troubleshooting During Demo

### "Command not found: gemini-triage"
```powershell
npm link
```

### "GEMINI_API_KEY not set"
**Fallback to simulation mode:**
```powershell
gemini-triage simulate
```
"For this demo, I'll show the simulation mode. With an API key, this would show real Gemini analysis."

### Buggy app crashes too fast
**That's actually good!** Say:
"Perfect - this crash is exactly what we want to analyze. Let me pipe it to Gemini Triage..."

### API rate limit hit
**Show the graceful handling:**
"Notice how it handles API errors gracefully with retry logic - production-ready error handling."

---

## 📊 Success Metrics

- [ ] Demo runs in < 5 minutes
- [ ] All commands execute successfully
- [ ] Gemini API features clearly demonstrated
- [ ] Judges understand the value proposition
- [ ] "Wow" moment with patch generation

---

## 🎁 Bonus Demo Ideas

### 1. Pipe from Real Application
```powershell
npm run dev 2>&1 | gemini-triage watch --stdin
```

### 2. Docker Logs
```powershell
docker logs container-name 2>&1 | gemini-triage watch --stdin
```

### 3. Multiple Terminals
- Terminal 1: Run buggy app
- Terminal 2: Watch with Gemini Triage
- Terminal 3: Show stats

### 4. Live Coding
Edit `buggy-app.js` to add new errors and show real-time analysis.

---

## 📝 Key Talking Points

### Why Gemini API?
- Advanced reasoning for complex log analysis
- Code generation capabilities for patches
- Structured outputs for reliability
- Context understanding across multiple files

### Competitive Advantages
- **vs grep/awk**: AI understanding, not just pattern matching
- **vs Sentry**: Real-time, local-first, cost-aware
- **vs ChatGPT**: Automated, CLI-native, batch processing

### Technical Highlights
- Prompt chaining (light → deep)
- Batch processing for efficiency
- Sensitive data masking
- Graceful error handling
- Transparent metrics

---

## ✅ Final Checklist

Before presenting:
- [ ] CLI installed and working: `gemini-triage --version`
- [ ] Demo app runs: `cd demo && node buggy-app.js`
- [ ] Simulation works: `gemini-triage simulate`
- [ ] API key set (if doing full demo): `echo $env:GEMINI_API_KEY`
- [ ] Practiced the 5-minute script
- [ ] Backup plan ready (simulation mode)

---

## 🚀 You're Ready!

Start with: `gemini-triage simulate`

Good luck at HackLondon 2026! 🎉
