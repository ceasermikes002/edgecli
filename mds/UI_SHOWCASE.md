# EdgeCLI - UI Showcase

## 🎨 Brand Colors & Gradient

EdgeCLI features a beautiful circular gradient using the brand colors:
- **Primary**: `#e4b795` (Warm peach)
- **Secondary**: `#699acd` (Cool blue)
- **Accent**: `#2f679f` (Deep blue)

The gradient flows through all UI elements, creating a cohesive and modern look.

---

## ✨ UI Components

### 1. Logo & Welcome Screen

```bash
edgecli init
```

Features:
- Large ASCII art logo with gradient
- Subtitle with brand colors
- Boxed sections with gradient borders
- Clear step-by-step instructions

### 2. Mini Logo

```bash
edgecli simulate
```

Features:
- Compact boxed logo for command headers
- Consistent gradient styling
- Professional appearance

### 3. Triage Results Display

When analyzing logs, EdgeCLI shows:

```
┌─ Triage Result ────────────────────────────────
│
│ [ SEVERITY ] HIGH
│
│ Hypothesis:
│ Database connection timeout causing cascading failures
│
│ Confidence: 85.3%
│
│ ⚡ Escalating to deep analysis...
└─────────────────────────────────────────────────
```

Features:
- Gradient borders
- Color-coded severity badges
  - Low: Green
  - Medium: Yellow
  - High: Orange
  - Critical: Red (bold)
- Confidence percentage
- Clear visual hierarchy

### 4. Deep Analysis Display

```
┌─ Deep Analysis ────────────────────────────────
│
│ [ ROOT CAUSE ]
│ Missing null check in authentication flow causes
│ undefined property access when token validation fails
│
│ Affected Files:
│   • src/auth.js
│   • src/middleware/verify.js
│
│ [ SUGGESTED PATCH ]
│
│ --- a/src/auth.js
│ +++ b/src/auth.js
│ @@ -10,6 +10,9 @@
│ +  if (!decoded) return null;
│    return decoded.userId;
└─────────────────────────────────────────────────
```

Features:
- Gradient borders throughout
- Color-coded diff output
  - Additions: Green
  - Deletions: Red
  - Context: Muted gray
  - Line numbers: Blue
- Clear section badges
- File list with bullets

### 5. Metrics Display

```
📊 Metrics
  Latency: 1,234ms
  Tokens: 256
  Timestamp: 2:45:30 PM
```

Features:
- Gradient subtitle
- Key-value pairs with color contrast
- Muted labels, highlighted values

### 6. Statistics Summary

```bash
edgecli stats
```

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Session Statistics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─ Summary ──────────────────────────────────────
│
│ Duration: 45s
│ Total Triages: 12
│
│ Severity Breakdown:
│   ● Low: 3
│   ● Medium: 5
│   ● High: 3
│   ● Critical: 1
│
│ Deep Analyses: 4
│
│ ⚡ Estimated time saved: ~9 minutes
└─────────────────────────────────────────────────
```

Features:
- Gradient section headers
- Color-coded severity dots
- Clear metrics layout
- Time saved calculation

### 7. Loading Spinners

When processing:
```
⠋ Processing batch...
⠙ Running deep analysis...
✓ Analysis complete
```

Features:
- Animated dots spinner
- Gradient-colored text
- Success/failure indicators

### 8. Error Messages

```
┌─ Error ────────────────────────────────────────
│
│ GEMINI_API_KEY not set. Run "edgecli init" for setup.
│
└─────────────────────────────────────────────────
```

Features:
- Red borders for errors
- Clear error messages
- Helpful suggestions

### 9. Success Messages

```
┌─ Success ──────────────────────────────────────
│
│ Setup guide complete! Run "edgecli --help" to see all commands.
│
└─────────────────────────────────────────────────
```

Features:
- Green borders for success
- Positive messaging
- Next steps guidance

---

## 🎯 Design Principles

### 1. Consistent Gradient
- All borders use the brand gradient
- Creates visual cohesion
- Professional appearance

### 2. Color Hierarchy
- **Primary (Blue)**: Main content
- **Secondary (Peach)**: Highlights and values
- **Accent (Deep Blue)**: Code and technical details
- **Muted (Gray)**: Labels and secondary info

### 3. Severity Colors
- **Green**: Low severity, success states
- **Yellow**: Medium severity, warnings
- **Orange**: High severity
- **Red**: Critical severity, errors

### 4. Clear Structure
- Box borders for sections
- Consistent spacing
- Visual separators
- Hierarchical information

### 5. Readability
- High contrast text
- Clear typography
- Logical grouping
- Scannable layout

---

## 🚀 UI in Action

### Command Flow Example

1. **Start**: `edgecli init`
   - Shows logo with gradient
   - Displays setup instructions
   - Success message

2. **Simulate**: `edgecli simulate`
   - Mini logo header
   - Gradient-bordered log box
   - Color-coded log entries
   - Success confirmation

3. **Watch**: `edgecli watch --stdin`
   - Mini logo header
   - File/stdin indicator
   - Animated spinner during processing
   - Triage result with gradient borders
   - Metrics display
   - Optional deep analysis

4. **Stats**: `edgecli stats`
   - Section header with gradient
   - Summary box with metrics
   - Color-coded severity breakdown
   - Time saved calculation

---

## 💡 Technical Implementation

### Gradient Creation
```typescript
import gradient from 'gradient-string';

export const brandGradient = gradient(['#e4b795', '#699acd', '#2f679f']);
```

### Color Palette
```typescript
export const colors = {
  primary: chalk.hex('#699acd'),
  secondary: chalk.hex('#e4b795'),
  accent: chalk.hex('#2f679f'),
  success: chalk.hex('#4ade80'),
  warning: chalk.hex('#fbbf24'),
  error: chalk.hex('#ef4444'),
  // ... more colors
};
```

### UI Components
- Modular component system
- Reusable display functions
- Consistent styling
- Easy to extend

---

## 🎨 Comparison to Other CLIs

### EdgeCLI vs Standard CLI
- **Standard**: Plain text, no colors
- **EdgeCLI**: Gradient borders, color-coded content, visual hierarchy

### EdgeCLI vs Claude/Gemini CLIs
- **Similar**: Professional appearance, clear structure
- **Unique**: Custom brand gradient, severity color coding, boxed sections

### EdgeCLI Advantages
- Instantly recognizable brand
- Clear visual feedback
- Professional polish
- Consistent experience
- Easy to scan and understand

---

## 🏆 UI Features Summary

✅ Custom gradient with brand colors
✅ ASCII art logo
✅ Boxed sections with borders
✅ Color-coded severity levels
✅ Animated loading spinners
✅ Diff syntax highlighting
✅ Clear metrics display
✅ Success/error messaging
✅ Consistent styling throughout
✅ Professional appearance

---

## 📸 Screenshots

To see the UI in action, run:

```bash
# Beautiful setup guide
edgecli init

# Colorful mock errors
edgecli simulate

# Full help menu
edgecli --help
```

---

**EdgeCLI - Where functionality meets beautiful design** ✨
