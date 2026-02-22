# Simple PowerShell demo script
# Shows the CLI without requiring API key

Write-Host "`n🚀 Gemini Triage Agent - Simple Demo`n" -ForegroundColor Cyan

Write-Host "Step 1: Show available commands" -ForegroundColor Green
Write-Host "Command: gemini-triage --help`n" -ForegroundColor Gray
gemini-triage --help

Write-Host "`n`nStep 2: Show setup guide" -ForegroundColor Green
Write-Host "Command: gemini-triage init`n" -ForegroundColor Gray
gemini-triage init

Write-Host "`n`nStep 3: Generate mock errors" -ForegroundColor Green
Write-Host "Command: gemini-triage simulate`n" -ForegroundColor Gray
gemini-triage simulate

Write-Host "`n`nStep 4: Show buggy application output" -ForegroundColor Green
Write-Host "Command: node buggy-app.js`n" -ForegroundColor Gray
Write-Host "(Running for 3 seconds...)`n" -ForegroundColor Yellow

$job = Start-Job -ScriptBlock { 
    Set-Location $using:PWD
    node buggy-app.js 2>&1 
}
Start-Sleep -Seconds 3
Stop-Job $job
$output = Receive-Job $job
Remove-Job $job

Write-Host $output

Write-Host "`n`n✅ Demo Complete!`n" -ForegroundColor Green
Write-Host "To use with real Gemini API analysis:" -ForegroundColor Cyan
Write-Host "  1. Get API key: https://makersuite.google.com/app/apikey"
Write-Host '  2. Set: $env:GEMINI_API_KEY="your-key"'
Write-Host "  3. Run: node buggy-app.js 2>&1 | gemini-triage watch --stdin`n"
