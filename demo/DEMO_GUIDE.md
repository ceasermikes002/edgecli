# Gemini Triage Agent - Demo Guide

This guide will walk you through a complete demo of the Gemini Triage Agent for HackLondon 2026.

## Prerequisites

1. **Set up your Gemini API key**:
   ```bash
   # Get your key from: https://makersuite.google.com/app/apikey
   
   # Linux/macOS
   export GEMINI_API_KEY="your-api-key-here"
   
   # Windows PowerShell
   $env:GEMINI_API_KEY="your-api-key-here"
   
   # Windows CMD
   set GEMINI_API_KEY=your-api-key-here
   ```

2. **Link the CLI tool** (if not already installed globally):
   ```bash
   cd ..
   npm link
   ```

3. **Install demo app dependencies**:
   ```bash
   cd demo
   npm install
   ```

## Demo Scenarios

### Scenario 1: Quick Start - Simulate Mode (No API Key Needed)

Perfect for initial testing without Gemini API.

```bash
# Show help
gemini-triage --help

# Run simulation
gemini-triage simulate
```

**What to highlight**:
- Easy CLI interface
- Mock error generation for testing
- Various error types (JWT, database, memory, null pointer)

---

### Scenario 2: Real-Time Log Analysis with Piping

Watch logs in real-time as they're generated.

**Terminal 1** - Run the buggy app:
```bash
cd demo
node buggy-app.js
```

**Terminal 2** - Watch with Gemini Triage:
```bash
cd demo
node buggy-app.js 2>&1 | gemini-triage watch --stdin
```

**What to highlight**:
- Real-time log processing
- AI-powered severity classification
- Confidence scoring
- Auto-escalation to deep analysis when confidence is low
- Root cause detection
- Patch suggestions in diff format

---

### Scenario 3: File Watching Mode

Save logs to a file and watch it.

**Terminal 1** - Run app and save logs:
```bash
cd demo
node buggy-app.js 2>&1 | tee app.log
```

**Terminal 2** - Watch the log file:
```bash
gemini-triage watch app.log
```

**What to highlight**:
- File watching capability
- Batching mechanism (processes every 3-5s or 100 lines)
- Deduplication of similar errors
- Sensitive data masking

---

### Scenario 4: Generate Patch Suggestions

Analyze a specific file and get fix suggestions.

```bash
# Create a buggy file
cat > auth.js << 'EOF'
function authenticateUser(token) {
  const decoded = verifyToken(token);
  return decoded.userId; // Bug: no null check
}

function verifyToken(token) {
  if (!token) return null;
  return { userId: 123 };
}
EOF

# Get patch suggestion
gemini-triage suggest --file auth.js
```

**What to highlight**:
- Code analysis capability
- Diff-format patches (safe, manual application)
- Root cause explanation
- Affected files identification

---

### Scenario 5: View Session Statistics

After running triage, check the stats.

```bash
# After running any watch command, press Ctrl+C
# Or in a new terminal:
gemini-triage stats
```

**What to highlight**:
- Transparent metrics (latency, tokens)
- Severity breakdown
- Time saved estimation (~45 min per incident)
- Deep analysis count

---

## Demo Script for Judges (5 Minutes)

### Introduction (30 seconds)
"Gemini Triage Agent is an AI-powered CLI tool that helps engineers debug production issues faster using Google's Gemini API."

### Demo Flow (4 minutes)

1. **Show the problem** (30s):
   ```bash
   cd demo
   node buggy-app.js
   ```
   "Look at all these errors flooding the console. Which one is the root cause?"

2. **Show the solution** (2 minutes):
   ```bash
   node buggy-app.js 2>&1 | gemini-triage watch --stdin
   ```
   "Gemini Triage Agent automatically:
   - Classifies severity (low/medium/high/critical)
   - Generates hypotheses with confidence scores
   - Escalates to deep analysis when needed
   - Suggests code patches in diff format"

3. **Show the metrics** (30s):
   ```bash
   # Press Ctrl+C
   gemini-triage stats
   ```
   "Transparent metrics show latency, tokens used, and estimated time saved."

4. **Show patch generation** (1 minute):
   ```bash
   gemini-triage suggest --file auth.js
   ```
   "It can analyze specific files and generate safe, reviewable patches."

### Closing (30 seconds)
"This showcases Gemini's strengths:
- Analyzing complex log data
- Generating code patches
- Providing personalized debugging advice
- All with transparent reasoning and metrics"

---

## Key Talking Points

### Why Gemini API?
- **Advanced reasoning**: Chains light triage → deep analysis
- **Code generation**: Produces actual diff patches
- **Structured outputs**: JSON responses for reliability
- **Context understanding**: Analyzes multi-file issues

### Privacy & Cost Features
- Logs summarized locally before sending to Gemini
- Sensitive data masked (emails, API keys, tokens)
- Transparent token usage for cost awareness
- Batch processing to minimize API calls

### Developer Experience
- Zero config: `npm install -g gemini-triage-agent`
- Works with any log source (files, pipes, stdin)
- Clean terminal UI with color coding
- Graceful error handling

---

## Troubleshooting

### "GEMINI_API_KEY not set"
```bash
export GEMINI_API_KEY="your-key"
# Or run: gemini-triage init
```

### "Command not found: gemini-triage"
```bash
cd ..
npm link
```

### Demo app not generating errors
```bash
cd demo
npm install
node buggy-app.js
```

### Want to test without API key?
```bash
gemini-triage simulate
```

---

## Advanced Demo Options

### Custom Error Scenarios
Edit `buggy-app.js` to add your own error patterns.

### Pipe from Real Apps
```bash
npm run dev 2>&1 | gemini-triage watch --stdin
docker logs container-name 2>&1 | gemini-triage watch --stdin
tail -f /var/log/app.log | gemini-triage watch --stdin
```

### Multiple Sessions
Run multiple watch commands in different terminals to show concurrent analysis.

---

## Questions Judges Might Ask

**Q: How does it handle sensitive data?**
A: Logs are summarized locally, and we mask emails, API keys, and tokens before sending to Gemini.

**Q: What about API costs?**
A: We batch logs and show transparent token usage. Light triage uses ~150 tokens, deep analysis ~300 tokens.

**Q: Can it auto-apply patches?**
A: No, by design. We generate diff-only outputs for safe, manual review and application.

**Q: How does the chaining work?**
A: Light prompt classifies quickly. If confidence < 65%, we automatically chain to a deep analysis prompt with more context.

**Q: What makes this better than grep/Sentry?**
A: Gemini provides intelligent analysis, not just pattern matching. It understands context, generates hypotheses, and suggests fixes.

---

## Success Metrics for Demo

- ✅ Judges can install and run in < 2 minutes
- ✅ Clear demonstration of Gemini API features
- ✅ Shows practical value (time saved)
- ✅ Transparent metrics visible
- ✅ "Wow" moment with patch generation

Good luck at HackLondon 2026! 🚀
