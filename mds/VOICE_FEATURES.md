# EdgeCLI Voice Features Guide

## Overview

EdgeCLI integrates ElevenLabs AI voice technology to provide real-time audio alerts for critical incidents. This enables hands-free monitoring and faster incident response.

## Key Benefits

- **Ambient Monitoring**: Listen to alerts while working on other tasks
- **Faster Response**: Audio alerts grab attention immediately
- **Accessibility**: Screen-free monitoring for visually impaired developers
- **Multi-tasking**: Monitor logs while coding, reviewing PRs, or in meetings
- **On-call Ready**: Perfect for DevOps teams managing multiple systems

## Setup

### During Initial Configuration

```bash
edgecli init
```

The setup wizard will:
1. Configure your Gemini API key
2. Ask if you want to enable voice alerts
3. Validate your ElevenLabs API key
4. Let you choose a voice (30+ options)
5. Select a voice model (4 options)
6. Set severity threshold (info/warning/error/critical)

### Get ElevenLabs API Key

1. Visit [ElevenLabs Settings](https://elevenlabs.io/app/settings/api-keys)
2. Create a new API key
3. Copy and paste into EdgeCLI setup

## Voice Models

### Multilingual V2 ⭐ (Recommended)
- **Best for**: Content creation, emotionally rich narration
- **Languages**: 74 languages
- **Quality**: Highest emotional expressiveness
- **Use case**: Professional alerts with natural intonation

### Turbo V2.5
- **Best for**: High quality + low latency
- **Languages**: Multilingual
- **Quality**: Excellent balance
- **Use case**: Real-time monitoring with minimal delay

### Flash V2.5
- **Best for**: Fastest response (<75ms)
- **Languages**: Multilingual
- **Cost**: 0.5x cheaper
- **Use case**: High-frequency alerts, cost-sensitive deployments

### Flash V2
- **Best for**: Fast, good quality
- **Languages**: Multilingual
- **Quality**: Good
- **Use case**: Standard monitoring scenarios

## Voice Selection

### Recommended Voices

**For Alerts** (Clear, Authoritative):
- George (British, raspy) - Default
- Daniel (British, news presenter)
- Bill (American, documentary style)

**For Calm Monitoring**:
- Emily (American, calm)
- Brian (American, deep)
- Serena (American, pleasant)

**For Conversational**:
- Charlie (Australian, casual)
- Chris (American, conversational)

### All Available Voices

**Female Voices**:
- Alice - British, confident (news style)
- Charlotte - English-Swedish, seductive
- Domi - American, strong (narration)
- Dorothy - British, pleasant
- Emily - American, calm (meditation)
- Freya - American, young
- Gigi - American, childlike
- Glinda - American, witch-like
- Grace - American Southern, warm
- Matilda - American, warm narration
- Rachel - American, calm (most popular)
- Sarah - American, confident
- Serena - American, pleasant

**Male Voices**:
- Adam - American, deep narration
- Antoni - American, well-rounded
- Arnold - American, crisp
- Bill - American, strong documentary
- Brian - American, deep
- Callum - American, hoarse
- Charlie - Australian, casual
- Chris - American, conversational
- Clyde - American, veteran
- Daniel - British, news presenter
- Dave - British Essex, conversational
- Drew - American, news style
- Ethan - American, ASMR
- Fin - Irish, sailor
- George - British, raspy (default)
- Giovanni - Italian-English, audiobook
- Harry - American, young

## Severity Thresholds

Control which alerts trigger voice notifications:

### Info and Above
- Speaks all alerts
- Best for: Development environments, learning the system
- Volume: High

### Warning and Above ⭐ (Recommended)
- Speaks warnings, errors, and critical alerts
- Best for: Production monitoring, balanced approach
- Volume: Medium

### Error and Above
- Speaks only errors and critical alerts
- Best for: High-traffic systems, focused monitoring
- Volume: Low

### Critical Only
- Speaks only critical alerts
- Best for: Mission-critical systems, minimal interruption
- Volume: Very low

## Commands

### Watch with Voice

```bash
# Use configured voice settings
edgecli watch app.log

# Force enable voice (override config)
edgecli watch app.log --voice

# Force disable voice (override config)
edgecli watch app.log --no-voice

# Watch stdin with voice
npm run dev 2>&1 | edgecli watch --stdin --voice
```

### Voice Configuration

```bash
# Interactive configuration menu
edgecli voice

# Quick enable/disable
edgecli voice --enable
edgecli voice --disable

# Test voice output
edgecli voice --test
```

### Configuration Menu Options

When you run `edgecli voice`, you can:
1. Change voice (browse all 30+ voices)
2. Change model (switch between 4 models)
3. Change severity threshold (adjust filtering)
4. Update API key (change credentials)
5. Enable/disable voice alerts (toggle on/off)
6. Test voice output (hear a sample alert)

## What Gets Spoken

### Light Triage Alerts

Format: `[SEVERITY] alert. [Hypothesis]. Confidence: [X] percent.`

Example:
> "CRITICAL alert. Database connection failure detected. Confidence: 95 percent. Escalating to deep analysis."

### Deep Analysis Results

Format: `Root cause identified: [Root Cause]. Patch generated and ready for review.`

Example:
> "Root cause identified: Missing connection pool configuration. Patch generated and ready for review."

### Error Messages

Format: `Error: [Error Message]`

Example:
> "Error: API rate limit exceeded."

## Environment Variables

You can set your ElevenLabs API key via environment variable:

```bash
# Linux/macOS
export ELEVENLABS_API_KEY="your-key-here"

# Windows PowerShell
$env:ELEVENLABS_API_KEY="your-key-here"
```

This overrides the config file setting.

## Audio Playback

EdgeCLI automatically detects your platform and uses the appropriate audio player:

- **macOS**: `afplay`
- **Linux**: `aplay`
- **Windows**: PowerShell Media.SoundPlayer

No additional installation required on most systems.

## Use Cases

### On-Call Engineer
```bash
# Monitor production logs with critical-only alerts
edgecli voice --configure
# Select: Critical only threshold
edgecli watch /var/log/app.log --voice
```

### Development Team
```bash
# Monitor CI/CD pipeline with warning+ alerts
npm run test 2>&1 | edgecli watch --stdin --voice
```

### Accessibility
```bash
# Full audio monitoring for screen-free operation
edgecli voice --configure
# Select: Info and above threshold
edgecli watch app.log --voice
```

### Multi-tasking DevOps
```bash
# Monitor while working on other tasks
edgecli watch app.log --voice
# Continue coding in another window
```

## Tips

1. **Start with Warning+**: The recommended threshold balances information and noise
2. **Test First**: Use `edgecli voice --test` to hear your voice before monitoring
3. **Adjust Volume**: Use your system volume controls for comfortable levels
4. **Choose Wisely**: Pick a voice you won't find annoying after hours of monitoring
5. **Streaming Mode**: Enabled by default for lowest latency
6. **Cost Awareness**: Flash models are 50% cheaper if you have high alert volumes

## Troubleshooting

### No Audio Output
- Check system volume
- Verify audio player is installed (afplay/aplay)
- Test with `edgecli voice --test`

### API Key Invalid
- Verify key at [ElevenLabs Settings](https://elevenlabs.io/app/settings/api-keys)
- Check for typos
- Ensure key has not expired

### Voice Not Speaking
- Check if voice is enabled: `edgecli voice`
- Verify severity threshold matches alert levels
- Confirm API key is configured

### Latency Issues
- Switch to Flash V2.5 model (fastest)
- Ensure good internet connection
- Check ElevenLabs service status

## Configuration File

Voice settings are stored in your EdgeCLI config file:

```json
{
  "elevenlabs": {
    "apiKey": "your-key",
    "enabled": true,
    "model": "eleven_multilingual_v2",
    "voiceId": "JBFqnCBsd6RMkjVDRZzb",
    "severityThreshold": "warning",
    "streaming": true
  }
}
```

Location: Run `edgecli init` to see config path.

---

Built for HackLondon 2026 🎙️
