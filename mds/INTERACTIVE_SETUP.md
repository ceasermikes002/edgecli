# EdgeCLI - Interactive Setup Guide

## Overview

EdgeCLI now features an interactive setup wizard that makes configuration easy and user-friendly. No more manual environment variable setup!

---

## Quick Start

Simply run:
```bash
edgecli init
```

And follow the prompts!

---

## Setup Flow

### 1. Welcome Screen

The setup starts with the EdgeCLI logo and branding:

```
███████╗██████╗  ██████╗ ███████╗     ██████╗██╗     ██╗
██╔════╝██╔══██╗██╔════╝ ██╔════╝    ██╔════╝██║     ██║
█████╗  ██║  ██║██║  ███╗█████╗      ██║     ██║     ██║
██╔══╝  ██║  ██║██║   ██║██╔══╝      ██║     ██║     ██║
███████╗██████╔╝╚██████╔╝███████╗    ╚██████╗███████╗██║
╚══════╝╚═════╝  ╚═════╝ ╚══════╝     ╚═════╝╚══════╝╚═╝

  AI-Powered Log Triage & Incident Analysis
  Powered by Google Gemini API

┌─ Interactive Setup ────────────────────────────
│
│ Configure EdgeCLI with your Gemini API settings
│
└─────────────────────────────────────────────────
```

### 2. Existing Configuration Check

If you've already configured EdgeCLI, it will show your current settings:

```
ℹ  Existing configuration found
   API Key: AIzaSyBxxx...
   Model: gemini-2.0-flash-exp

? Do you want to reconfigure? (y/N)
```

- Press `N` to keep your current configuration
- Press `Y` to update your settings

### 3. API Key Input

```
┌─ Step 1: API Key ──────────────────────────────
│
│ Get your key from: https://aistudio.google.com/app/apikey
│
└─────────────────────────────────────────────────

? Enter your Gemini API key: ••••••••••••••••••••
```

Features:
- **Secure input**: Your API key is masked as you type
- **Validation**: Ensures you enter a non-empty key
- **Direct link**: Click the link to get your API key

### 4. Model Selection

```
┌─ Step 2: Model Selection ──────────────────────
│
│ Choose the Gemini model for analysis
│
└─────────────────────────────────────────────────

? Select a model: (Use arrow keys)
❯ gemini-2.0-flash-exp ⭐ (Recommended)
    Latest experimental flash model - Fast and efficient
  gemini-1.5-pro
    Most capable model - Best for complex analysis
  gemini-1.5-flash
    Fast and versatile - Good balance
  gemini-1.0-pro
    Stable production model - Reliable
```

Use arrow keys to navigate:
- **↑/↓**: Move between options
- **Enter**: Select model

### 5. Saving Configuration

```
⠋ Saving configuration...
✓ Configuration saved!
```

The configuration is saved to your local config directory.

### 6. Configuration Summary

```
┌─ Configuration Summary ────────────────────────
│
│ API Key: AIzaSyBxxx...
│ Model: gemini-2.0-flash-exp
│ Config File: ~/.config/edgecli/config.json
│
└─────────────────────────────────────────────────

┌─ Success ──────────────────────────────────────
│
│ Setup complete! Try "edgecli simulate" to test.
│
└─────────────────────────────────────────────────
```

---

## Gemini Models Explained

### gemini-2.0-flash-exp ⭐ (Recommended)

**Best for**: Most use cases, development, testing

- Latest experimental flash model
- Fast response times
- Efficient token usage
- Good balance of speed and capability
- **Recommended for EdgeCLI**

### gemini-1.5-pro

**Best for**: Complex analysis, production workloads

- Most capable Gemini model
- Best for complex multi-file issues
- Higher context window (up to 2M tokens)
- More thorough analysis
- Higher cost per request

### gemini-1.5-flash

**Best for**: High-volume processing, cost optimization

- Fast and versatile
- Good balance of speed and capability
- Lower cost than Pro
- Suitable for most triage tasks

### gemini-1.0-pro

**Best for**: Stable production environments

- Stable, well-tested model
- Reliable performance
- Good for production use
- Lower context window than 1.5 models

---

## Configuration Storage

### Location

Your configuration is stored in:

**Linux/macOS**:
```
~/.config/edgecli/config.json
```

**Windows**:
```
%APPDATA%\edgecli\Config\config.json
```

### Format

```json
{
  "apiKey": "AIzaSyB...",
  "model": "gemini-2.0-flash-exp"
}
```

### Security

- API key is stored in plain text locally
- File permissions are set to user-only access
- Never commit this file to version control
- Use environment variables for CI/CD

---

## Priority Order

EdgeCLI checks for configuration in this order:

1. **Environment Variable**: `GEMINI_API_KEY`
2. **Config File**: Set via `edgecli init`

This allows you to:
- Use `edgecli init` for local development
- Override with env vars in CI/CD or production
- Keep different configs per project

---

## Advanced Usage

### View Current Configuration

```bash
# The config file location is shown during init
# On Linux/macOS:
cat ~/.config/edgecli/config.json

# On Windows PowerShell:
Get-Content $env:APPDATA\edgecli\Config\config.json
```

### Change Model Only

Just run `edgecli init` again and select a different model. Your API key will be preserved.

### Reset Configuration

Delete the config file:

```bash
# Linux/macOS
rm ~/.config/edgecli/config.json

# Windows PowerShell
Remove-Item $env:APPDATA\edgecli\Config\config.json
```

Then run `edgecli init` to start fresh.

### Use Different Models for Different Commands

Set the model in config for default behavior, then override with environment variable when needed:

```bash
# Use default model from config
edgecli watch app.log

# Override for this session
GEMINI_MODEL=gemini-1.5-pro edgecli watch app.log
```

---

## Troubleshooting

### "API key not configured"

Run `edgecli init` to set up your API key.

### "Invalid API key"

1. Check your API key at https://aistudio.google.com/app/apikey
2. Run `edgecli init` to update it
3. Ensure no extra spaces or quotes

### "Model not found"

The model name might be outdated. Run `edgecli init` to see the latest available models.

### Config file not found

This is normal on first run. Just run `edgecli init` to create it.

### Permission denied

Ensure you have write access to the config directory:

```bash
# Linux/macOS
chmod 700 ~/.config/edgecli
chmod 600 ~/.config/edgecli/config.json
```

---

## Comparison: Old vs New Setup

### Old Way (Environment Variables)

```bash
# Step 1: Get API key from website
# Step 2: Copy API key
# Step 3: Set environment variable
export GEMINI_API_KEY="AIzaSyB..."
# Step 4: Add to .bashrc/.zshrc to persist
echo 'export GEMINI_API_KEY="AIzaSyB..."' >> ~/.bashrc
# Step 5: Reload shell or source file
source ~/.bashrc
```

**Problems**:
- Manual process
- Easy to make mistakes
- Not persistent across sessions
- No model selection
- Exposed in shell history

### New Way (Interactive Setup)

```bash
edgecli init
# Follow prompts
# Done!
```

**Benefits**:
- ✅ Interactive and guided
- ✅ Secure password input
- ✅ Model selection built-in
- ✅ Persistent configuration
- ✅ Easy to update
- ✅ Beautiful UI

---

## Next Steps

After setup, try:

```bash
# Test with simulation
edgecli simulate

# Watch logs
edgecli watch app.log

# Analyze a file
edgecli suggest --file src/auth.js

# View help
edgecli --help
```

---

## FAQ

**Q: Can I use different API keys for different projects?**

A: Yes! The config is global, but you can override with `GEMINI_API_KEY` environment variable per project.

**Q: Is my API key secure?**

A: The key is stored locally with user-only permissions. Never commit the config file to git.

**Q: Can I change models without re-entering my API key?**

A: Yes! Run `edgecli init` again. If a key exists, you can choose to keep it and just change the model.

**Q: What if I want to use the latest model?**

A: Run `edgecli init` periodically to see if new models are available in the selection menu.

**Q: Can I automate the setup?**

A: For automation, use environment variables instead:
```bash
export GEMINI_API_KEY="your-key"
edgecli watch --stdin
```

---

**EdgeCLI - Setup made simple** ✨
