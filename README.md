# EdgeCLI

AI-powered CLI tool for intelligent log analysis and incident triage using Google Gemini API.

Built for HackLondon 2026 :)

**npm Package:** [@ceasermikes/edgecli](https://www.npmjs.com/package/@ceasermikes/edgecli)

## Features

- 🔍 Real-time log watching (files or stdin)
- 🤖 AI-powered triage with confidence scoring
- 🔬 Deep analysis with root cause detection
- 💊 Automated patch suggestions (diff format)
- 🎙️ Voice alerts with ElevenLabs AI (74 languages)
- 📊 Transparent metrics (latency, tokens)
- 🎭 Mock simulation mode for testing
- ✨ Beautiful gradient UI with brand colors

## Installation

### For Production (Published Package)

```bash
npm install -g @ceasermikes/edgecli
```

That's it! No cloning, no setup - just install and go.

### For Development (Local)

```bash
# Clone or navigate to the project
cd edgecli

# Install dependencies
npm install

# Build the project
npm run build

# Link globally for local development
npm link

# Now you can use edgecli command
edgecli --help
```

## Setup

1. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

2. Run the interactive setup:
```bash
edgecli init
```

This will:
- Prompt you to enter your Gemini API key (securely)
- Let you choose which Gemini model to use
- Optionally configure ElevenLabs voice alerts
- Save your configuration locally

### Voice Alerts (Optional)

EdgeCLI supports AI-powered voice alerts using ElevenLabs. During setup, you can:
- Enable voice notifications for critical incidents
- Choose from 30+ professional voices (male/female, various accents)
- Select severity threshold (info/warning/error/critical)
- Pick from multiple voice models (multilingual, turbo, flash)

Get your ElevenLabs API key from [ElevenLabs Settings](https://elevenlabs.io/app/settings/api-keys)

### Available Models

- **gemini-2.5-flash** ⭐ (Recommended) - Latest flash model, fast and efficient
- **gemini-2.5-pro** - Most capable 2.5 model for complex analysis
- **gemini-2.0-flash** - Stable 2.0 flash model
- **gemini-3-flash** - Next-gen flash model
- **gemini-3-pro** - Next-gen pro model with maximum capability

### Alternative: Environment Variable

You can also set API keys via environment variables (overrides config):
```bash
# Linux/macOS
export GEMINI_API_KEY="your-api-key-here"
export ELEVENLABS_API_KEY="your-elevenlabs-key-here"

# Windows PowerShell
$env:GEMINI_API_KEY="your-api-key-here"
$env:ELEVENLABS_API_KEY="your-elevenlabs-key-here"
```

## Usage

### Watch log file
```bash
edgecli watch app.log
```

### Watch with voice alerts
```bash
edgecli watch app.log --voice
```

### Watch live output (pipe)
```bash
npm run dev 2>&1 | edgecli watch --stdin
```

### Watch with voice disabled
```bash
edgecli watch app.log --no-voice
```

### Generate patch for a file
```bash
edgecli suggest --file src/auth.js
```

### Simulate errors (demo mode)
```bash
edgecli simulate
```

### View session stats
```bash
edgecli stats
```

### Configure voice alerts
```bash
# Interactive configuration
edgecli voice

# Enable voice alerts
edgecli voice --enable

# Disable voice alerts
edgecli voice --disable

# Test voice output
edgecli voice --test
```

## How It Works

1. **Light Triage**: Quick classification (severity, hypothesis, confidence)
2. **Auto-escalation**: If confidence < 65%, chains to deep analysis
3. **Deep Analysis**: Root cause detection + patch generation
4. **Voice Alerts**: Optional AI voice notifications for critical incidents
5. **Privacy-first**: Logs summarized locally, sensitive data masked

## Voice Features

EdgeCLI integrates ElevenLabs for professional voice alerts:

- **30+ Voices**: Choose from male/female voices with various accents (American, British, Australian, Irish, Italian-English)
- **4 Models**: Multilingual V2 (emotionally rich), Turbo V2.5 (low latency), Flash V2.5 (fastest), Flash V2
- **Smart Filtering**: Only speak alerts above your chosen severity threshold
- **Streaming**: Low-latency audio streaming for instant notifications
- **74 Languages**: Multilingual support for global teams

Perfect for:
- On-call engineers monitoring multiple terminals
- Hands-free incident response
- Accessibility and screen-free monitoring
- High-pressure situations requiring immediate attention

## Demo Scenario

```bash
# Terminal 1: Run your app
npm run dev 2>&1 | tee app.log

# Terminal 2: Watch with EdgeCLI
edgecli watch app.log

# See AI triage in real-time!
```

## Documentation

Comprehensive HTML documentation is available in the `docs/` folder. Open `docs/index.html` in your browser for:

- Complete command reference
- Voice alerts guide
- Configuration options
- Troubleshooting tips
- API reference
- Examples and use cases

Or view online at: [EdgeCLI Documentation](#) (coming soon)

## Development

### Install dependencies
```bash
npm install
```

### Build
```bash
npm run build
```

### Run tests
```bash
npm test
```

### Link for local development
```bash
npm link
```

## Requirements

- Node.js >= 18
- Google Gemini API key (get one at [Google AI Studio](https://aistudio.google.com/app/apikey))

---

Built for HackLondon 2026 :)