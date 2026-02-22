# Testing Interactive Init

## What the new `edgecli init` does:

### 1. Shows Welcome Screen
```
███████╗██████╗  ██████╗ ███████╗     ██████╗██╗     ██╗
██╔════╝██╔══██╗██╔════╝ ██╔════╝    ██╔════╝██║     ██║
█████╗  ██║  ██║██║  ███╗█████╗      ██║     ██║     ██║
██╔══╝  ██║  ██║██║   ██║██╔══╝      ██║     ██║     ██║
███████╗██████╔╝╚██████╔╝███████╗    ╚██████╗███████╗██║
╚══════╝╚═════╝  ╚═════╝ ╚══════╝     ╚═════╝╚══════╝╚═╝

  AI-Powered Log Triage & Incident Analysis
  Powered by Google Gemini API
```

### 2. Interactive Setup
```
┌─ Interactive Setup ────────────────────────────
│
│ Configure EdgeCLI with your Gemini API settings
│
└─────────────────────────────────────────────────
```

### 3. Checks Existing Configuration
If you already have a config, it shows:
```
ℹ  Existing configuration found
   API Key: AIzaSyBxxx...
   Model: gemini-2.0-flash-exp

? Do you want to reconfigure? (y/N)
```

### 4. Step 1: API Key Input
```
┌─ Step 1: API Key ──────────────────────────────
│
│ Get your key from: https://aistudio.google.com/app/apikey
│
└─────────────────────────────────────────────────

? Enter your Gemini API key: ••••••••••••••••••••
```

### 5. Step 2: Model Selection
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

### 6. Saves Configuration
```
⠋ Saving configuration...
✓ Configuration saved!
```

### 7. Shows Summary
```
┌─ Configuration Summary ────────────────────────
│
│ API Key: AIzaSyBxxx...
│ Model: gemini-2.0-flash-exp
│ Config File: /Users/you/.config/edgecli/config.json
│
└─────────────────────────────────────────────────

┌─ Success ──────────────────────────────────────
│
│ Setup complete! Try "edgecli simulate" to test.
│
└─────────────────────────────────────────────────
```

## Available Gemini Models

The tool now supports these real Gemini models:

1. **gemini-2.0-flash-exp** ⭐ (Recommended)
   - Latest experimental flash model
   - Fast and efficient
   - Best for most use cases

2. **gemini-1.5-pro**
   - Most capable model
   - Best for complex analysis
   - Higher token limits

3. **gemini-1.5-flash**
   - Fast and versatile
   - Good balance of speed and capability
   - Cost-effective

4. **gemini-1.0-pro**
   - Stable production model
   - Reliable and well-tested
   - Good for production use

## Configuration Storage

The configuration is stored in:
- **Linux/macOS**: `~/.config/edgecli/config.json`
- **Windows**: `%APPDATA%\edgecli\Config\config.json`

## Priority Order

EdgeCLI checks for API key in this order:
1. Environment variable `GEMINI_API_KEY`
2. Config file (set via `edgecli init`)

This allows you to override the config with an env var if needed.

## Testing

To test the interactive init:
```bash
edgecli init
```

Follow the prompts to:
1. Enter your API key
2. Select a model
3. Confirm the configuration

Then test it works:
```bash
edgecli simulate
```
