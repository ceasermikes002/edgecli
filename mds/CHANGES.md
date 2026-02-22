# EdgeCLI - Recent Changes Summary

## 🎙️ NEW: ElevenLabs Voice Integration

### Voice Alerts Feature - ADDED ✓

**What's New**:
- AI-powered voice alerts for critical incidents
- 30+ professional voices (male/female, various accents)
- 4 voice models (Multilingual V2, Turbo V2.5, Flash V2.5, Flash V2)
- Smart severity filtering (info/warning/error/critical)
- Streaming audio for low-latency notifications
- 74 language support

**New Commands**:
```bash
# Interactive voice configuration
edgecli voice

# Enable/disable voice alerts
edgecli voice --enable
edgecli voice --disable

# Test voice output
edgecli voice --test

# Watch with voice
edgecli watch app.log --voice
edgecli watch app.log --no-voice
```

**Setup Integration**:
- `edgecli init` now includes optional ElevenLabs setup
- Voice configuration saved in config file
- Environment variable support: `ELEVENLABS_API_KEY`

**Technical Implementation**:
- `src/voice/constants.ts` - Voice models and IDs
- `src/voice/elevenlabs-client.ts` - API client
- `src/voice/audio-player.ts` - Cross-platform audio playback
- `src/voice/voice-manager.ts` - Voice alert orchestration
- `src/commands/voice.ts` - Voice configuration command
- Updated `src/commands/init.ts` - Voice setup wizard
- Updated `src/commands/watch.ts` - Voice alert integration
- Updated `src/config.ts` - ElevenLabs configuration

---

## ✅ What Was Fixed

### 1. Gemini Model 404 Error - FIXED ✓

**Problem**: 
```
[404 Not Found] models/gemini-1.5-pro is not found for API version v1beta
```

**Solution**: Updated to current Gemini models
- gemini-2.5-flash (recommended)
- gemini-2.5-pro
- gemini-2.0-flash
- gemini-3-flash
- gemini-3-pro

### 2. Documentation Organization - DONE ✓

All markdown files (except README.md) moved to `mds/` folder:
- DEMO_CHECKLIST.md
- INTERACTIVE_SETUP.md
- PROJECT_SUMMARY.md
- QUICK_START.md
- TEST_SUMMARY.md
- UI_SHOWCASE.md
- WHATS_NEW.md
- LATEST_UPDATES.md
- DEMO_QUICK_REFERENCE.md

### 3. Open-Source References - REMOVED ✓

Removed all references to:
- GitHub cloning
- Repository URLs
- Open-source licensing

Updated to:
- Simple installation: `npm install -g edgecli`
- Direct usage instructions
- Proprietary tool messaging

---

## 🚀 Current State

### Installation
```bash
npm install -g edgecli
```

### Setup
```bash
edgecli init
```

### Test
```bash
edgecli simulate
```

---

## 📁 Project Structure

```
edgecli/
├── README.md                    # Main documentation
├── CHANGES.md                   # This file
├── package.json
├── tsconfig.json
├── src/                         # Source code
│   ├── index.ts                 # CLI with fancy help
│   ├── config.ts                # Updated models
│   ├── gemini-client.ts
│   ├── commands/
│   └── ui/
├── dist/                        # Compiled code
├── bin/
│   └── edgecli.js
├── tests/                       # 37 passing tests
├── demo/                        # Demo materials
└── mds/                         # All documentation
    ├── DEMO_CHECKLIST.md
    ├── DEMO_QUICK_REFERENCE.md
    ├── INTERACTIVE_SETUP.md
    ├── LATEST_UPDATES.md
    ├── PROJECT_SUMMARY.md
    ├── QUICK_START.md
    ├── TEST_SUMMARY.md
    ├── UI_SHOWCASE.md
    └── WHATS_NEW.md
```

---

## 🎯 Ready for Demo

Everything is working:
- ✅ No 404 errors
- ✅ Beautiful UI
- ✅ Interactive setup
- ✅ Multiple Gemini models
- ✅ All tests passing
- ✅ Documentation organized
- ✅ Professional presentation

---

## 📚 Documentation

- **README.md** - Main readme (installation, usage, features)
- **CHANGES.md** - This file (recent changes)
- **mds/DEMO_QUICK_REFERENCE.md** - Quick demo script
- **mds/LATEST_UPDATES.md** - Detailed update info
- **mds/INTERACTIVE_SETUP.md** - Setup guide

---

## 🔧 Technical Details

### Models Updated In
- `src/config.ts` - Model definitions
- `README.md` - Documentation

### Help UI Updated In
- `src/index.ts` - Custom help formatter

### All Commands Now Use
- Config manager for API key
- Selected model from config
- Proper error messages

---

Built for HackLondon 2026 🚀
