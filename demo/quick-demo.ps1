# Quick demo script for Gemini Triage Agent (PowerShell)
# Run this to see a complete demo flow

Write-Host "🚀 Gemini Triage Agent - Quick Demo" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if API key is set
if (-not $env:GEMINI_API_KEY) {
    Write-Host "⚠️  GEMINI_API_KEY not set!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To run the full demo with Gemini API:"
    Write-Host '  $env:GEMINI_API_KEY="your-api-key-here"'
    Write-Host ""
    Write-Host "For now, running simulation mode (no API key needed)..." -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "📋 Step 1: Show available commands" -ForegroundColor Green
    gemini-triage --help
    Write-Host ""
    
    Write-Host "🎭 Step 2: Run simulation (mock errors)" -ForegroundColor Green
    gemini-triage simulate
    Write-Host ""
    
    Write-Host "✅ Demo complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To see the full demo with real Gemini analysis:"
    Write-Host "  1. Get API key: https://makersuite.google.com/app/apikey"
    Write-Host '  2. Set: $env:GEMINI_API_KEY="your-key"'
    Write-Host "  3. Run: .\quick-demo.ps1"
    exit 0
}

Write-Host "✅ GEMINI_API_KEY detected!" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Step 1: Show available commands" -ForegroundColor Green
gemini-triage --help
Write-Host ""
Read-Host "Press Enter to continue"

Write-Host ""
Write-Host "🎭 Step 2: Generate mock errors" -ForegroundColor Green
gemini-triage simulate
Write-Host ""
Read-Host "Press Enter to continue"

Write-Host ""
Write-Host "🔍 Step 3: Run buggy app with real-time triage" -ForegroundColor Green
Write-Host "Starting buggy application..."
Write-Host "(This will run for 10 seconds, then show triage results)"
Write-Host ""

# Run the buggy app and pipe to triage
$job = Start-Job -ScriptBlock { node buggy-app.js 2>&1 | gemini-triage watch --stdin }
Wait-Job $job -Timeout 10
Stop-Job $job
Remove-Job $job

Write-Host ""
Write-Host "📊 Step 4: View session statistics" -ForegroundColor Green
gemini-triage stats
Write-Host ""

Write-Host "✅ Demo complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Try these commands yourself:"
Write-Host "  gemini-triage watch --stdin    # Pipe any logs"
Write-Host "  gemini-triage suggest --file <path>  # Get patch suggestions"
Write-Host "  gemini-triage stats            # View statistics"
