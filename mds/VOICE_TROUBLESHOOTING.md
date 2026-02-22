# Voice Alerts Troubleshooting Guide

## Issue: No Audio Heard

If you see "Voice alerts: Enabled" but don't hear any audio, follow these steps:

### Step 1: Verify ElevenLabs API Key is Configured

```bash
edgecli voice --test
```

If you see "No ElevenLabs API key configured", you need to set it up:

```bash
edgecli init
# Follow prompts and enable voice alerts
```

Or set it via environment variable:

```bash
# Windows PowerShell
$env:ELEVENLABS_API_KEY="your-elevenlabs-api-key-here"

# Then test
edgecli voice --test
```

### Step 2: Check Severity Threshold

The alert severity must meet or exceed your configured threshold:

| Your Threshold | Will Speak |
|----------------|------------|
| Info | Info, Low, Medium, Warning, High, Error, Critical |
| Warning | Medium, Warning, High, Error, Critical |
| Error | High, Error, Critical |
| Critical | Critical only |

**Example**: If your threshold is "warning" and the alert is "MEDIUM", it WILL speak.

Check your threshold:
```bash
edgecli voice
# Look for "Severity: warning"
```

Change threshold:
```bash
edgecli voice
# Select "Change severity threshold"
# Choose "Info and above" to hear all alerts
```

### Step 3: Verify System Audio

1. **Check Volume**: Ensure system volume is not muted
2. **Test Speakers**: Play any other audio to verify speakers work
3. **Check Connections**: Ensure headphones/speakers are properly connected

### Step 4: Test Voice Output

```bash
edgecli voice --test
```

You should hear:
> "Critical alert. Database connection failure detected. Confidence: 95 percent. Escalating to deep analysis."

If the test succeeds but you still don't hear audio:
- Check Windows audio mixer (ensure PowerShell isn't muted)
- Try different speakers/headphones
- Restart your terminal

### Step 5: Check Debug Output

When watching logs, look for voice debug messages:

```
[Voice] Speaking: MEDIUM alert. Database connection failure...
```

If you see:
```
[Voice] Skipping alert (severity: MEDIUM, threshold: error)
```

This means the alert severity is below your threshold. Lower your threshold:

```bash
edgecli voice
# Select "Change severity threshold"
# Choose "Warning and above" or "Info and above"
```

### Step 6: Verify API Key is Valid

```bash
edgecli voice
# Select "Update API key"
# Enter your key from https://elevenlabs.io/app/settings/api-keys
```

The system will validate the key before saving.

### Step 7: Try Different Voice Model

Some models are faster and may work better:

```bash
edgecli voice
# Select "Change model"
# Try "Flash V2.5 - Fastest (<75ms)"
```

### Step 8: Check Internet Connection

Voice generation requires internet access to ElevenLabs API:
- Verify you can access https://elevenlabs.io
- Check firewall settings
- Try disabling VPN if applicable

## Common Issues

### Issue: "Voice test successful" but no audio

**Cause**: Windows audio system issue

**Solution**:
1. Check Windows Sound settings
2. Ensure PowerShell has audio permissions
3. Try running as Administrator
4. Restart audio service: `Restart-Service -Name Audiosrv`

### Issue: "Voice playback error: Audio player exited with code 1"

**Cause**: Audio player failed to play the file

**Solution**:
1. Verify audio drivers are installed
2. Try playing an MP3 file manually in PowerShell
3. Check Windows Event Viewer for audio errors

### Issue: "ElevenLabs API error: 401"

**Cause**: Invalid or expired API key

**Solution**:
1. Get a new key from https://elevenlabs.io/app/settings/api-keys
2. Run `edgecli voice` and update API key
3. Test with `edgecli voice --test`

### Issue: "ElevenLabs API error: 429"

**Cause**: Rate limit exceeded

**Solution**:
1. Wait a few minutes
2. Consider upgrading your ElevenLabs plan
3. Increase severity threshold to reduce API calls

### Issue: Alerts are "MEDIUM" but threshold is "warning"

**Cause**: This is actually correct! MEDIUM maps to WARNING level.

**Explanation**:
- LOW/INFO → Info threshold
- MEDIUM/WARNING → Warning threshold  
- HIGH/ERROR → Error threshold
- CRITICAL → Critical threshold

MEDIUM alerts WILL be spoken with "warning" threshold.

## Platform-Specific Issues

### Windows

**PowerShell Execution Policy**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Audio Service**:
```powershell
Get-Service Audiosrv
# Should show "Running"
```

**Test Audio Manually**:
```powershell
Add-Type -AssemblyName presentationCore
$mediaPlayer = New-Object System.Windows.Media.MediaPlayer
$mediaPlayer.Open([System.Uri]::new("C:\Windows\Media\notify.wav"))
$mediaPlayer.Play()
Start-Sleep -Seconds 2
```

### macOS

**Check afplay**:
```bash
which afplay
# Should return /usr/bin/afplay
```

**Test Audio**:
```bash
afplay /System/Library/Sounds/Ping.aiff
```

### Linux

**Install ALSA** (if missing):
```bash
sudo apt-get install alsa-utils
```

**Test Audio**:
```bash
speaker-test -t sine -f 1000 -l 1
```

## Getting Help

If none of these solutions work:

1. **Check Configuration**:
   ```bash
   edgecli voice
   ```
   Verify all settings are correct

2. **Test with Minimal Setup**:
   ```bash
   $env:ELEVENLABS_API_KEY="your-key"
   edgecli voice --test
   ```

3. **Check Logs**:
   Look for error messages in the terminal output

4. **Verify ElevenLabs Service**:
   Visit https://status.elevenlabs.io

## Quick Fix Checklist

- [ ] ElevenLabs API key is configured
- [ ] API key is valid (test at elevenlabs.io)
- [ ] Voice alerts are enabled (`edgecli voice --enable`)
- [ ] Severity threshold is appropriate (try "info" for testing)
- [ ] System volume is not muted
- [ ] Speakers/headphones are connected and working
- [ ] Internet connection is active
- [ ] `edgecli voice --test` succeeds
- [ ] You see `[Voice] Speaking:` messages in output

## Still Not Working?

Try this complete reset:

```bash
# 1. Disable voice
edgecli voice --disable

# 2. Re-run init
edgecli init
# Enable voice when prompted
# Choose "Info and above" threshold

# 3. Test
edgecli voice --test

# 4. Try watching with voice
echo "ERROR: Test error" | edgecli watch --stdin --voice
```

If you hear audio during the test but not during watch, the issue is likely the severity threshold. Set it to "info" temporarily to test.

---

Built for HackLondon 2026 🎙️
