#!/bin/bash

# Quick demo script for Gemini Triage Agent
# Run this to see a complete demo flow

echo "🚀 Gemini Triage Agent - Quick Demo"
echo "===================================="
echo ""

# Check if API key is set
if [ -z "$GEMINI_API_KEY" ]; then
    echo "⚠️  GEMINI_API_KEY not set!"
    echo ""
    echo "To run the full demo with Gemini API:"
    echo "  export GEMINI_API_KEY='your-api-key-here'"
    echo ""
    echo "For now, running simulation mode (no API key needed)..."
    echo ""
    
    echo "📋 Step 1: Show available commands"
    gemini-triage --help
    echo ""
    
    echo "🎭 Step 2: Run simulation (mock errors)"
    gemini-triage simulate
    echo ""
    
    echo "✅ Demo complete!"
    echo ""
    echo "To see the full demo with real Gemini analysis:"
    echo "  1. Get API key: https://makersuite.google.com/app/apikey"
    echo "  2. Set: export GEMINI_API_KEY='your-key'"
    echo "  3. Run: ./quick-demo.sh"
    exit 0
fi

echo "✅ GEMINI_API_KEY detected!"
echo ""

echo "📋 Step 1: Show available commands"
gemini-triage --help
echo ""
read -p "Press Enter to continue..."

echo ""
echo "🎭 Step 2: Generate mock errors"
gemini-triage simulate
echo ""
read -p "Press Enter to continue..."

echo ""
echo "🔍 Step 3: Run buggy app with real-time triage"
echo "Starting buggy application..."
echo "(This will run for 10 seconds, then show triage results)"
echo ""

# Run the buggy app and pipe to triage (with timeout)
timeout 10s node buggy-app.js 2>&1 | gemini-triage watch --stdin || true

echo ""
echo "📊 Step 4: View session statistics"
gemini-triage stats
echo ""

echo "✅ Demo complete!"
echo ""
echo "Try these commands yourself:"
echo "  gemini-triage watch --stdin    # Pipe any logs"
echo "  gemini-triage suggest --file <path>  # Get patch suggestions"
echo "  gemini-triage stats            # View statistics"
