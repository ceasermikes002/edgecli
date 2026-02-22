# Voice Features - Quick Reference

## Setup

```bash
edgecli init
# Follow prompts to configure ElevenLabs voice alerts
```

## Commands

| Command | Description |
|---------|-------------|
| `edgecli voice` | Interactive voice configuration menu |
| `edgecli voice --enable` | Enable voice alerts |
| `edgecli voice --disable` | Disable voice alerts |
| `edgecli voice --test` | Test voice output with sample alert |
| `edgecli watch app.log --voice` | Watch logs with voice enabled |
| `edgecli watch app.log --no-voice` | Watch logs with voice disabled |

## Voice Models

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| Multilingual V2 ⭐ | Medium | Highest | 1x | Professional alerts |
| Turbo V2.5 | Fast | High | 1x | Real-time monitoring |
| Flash V2.5 | Fastest | Good | 0.5x | High-frequency alerts |
| Flash V2 | Fast | Good | 1x | Standard monitoring |

## Severity Thresholds

| Threshold | Speaks | Best For |
|-----------|--------|----------|
| Info | All alerts | Development, learning |
| Warning ⭐ | Warning+ | Production monitoring |
| Error | Error+ | High-traffic systems |
| Critical | Critical only | Mission-critical systems |

## Recommended Voices

| Use Case | Voice | Description |
|----------|-------|-------------|
| Alerts | George ⭐ | British, raspy, clear |
| Alerts | Daniel | British, news presenter |
| Calm | Emily | American, soothing |
| Professional | Brian | American, deep |
| Conversational | Charlie | Australian, casual |

## What Gets Spoken

### Triage Alert
```
CRITICAL alert. Database connection failure. Confidence: 95 percent.
```

### Deep Analysis
```
Root cause identified: Missing connection pool. Patch generated.
```

### Error
```
Error: API rate limit exceeded.
```

## Environment Variables

```bash
# Linux/macOS
export ELEVENLABS_API_KEY="your-key"

# Windows PowerShell
$env:ELEVENLABS_API_KEY="your-key"
```

## Configuration Location

Run `edgecli init` to see config file path.

## Get API Key

[ElevenLabs Settings](https://elevenlabs.io/app/settings/api-keys)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No audio | Check system volume, run `edgecli voice --test` |
| Invalid key | Verify at ElevenLabs dashboard |
| Not speaking | Check enabled status and severity threshold |
| High latency | Switch to Flash V2.5 model |

## Quick Start

```bash
# 1. Setup
edgecli init

# 2. Enable voice
edgecli voice --enable

# 3. Test
edgecli voice --test

# 4. Monitor with voice
edgecli watch app.log --voice
```

---

Built for HackLondon 2026 🎙️
