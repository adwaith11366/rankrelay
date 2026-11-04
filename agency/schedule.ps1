# Registers the daily agent run at 07:15 local time, ahead of the 08:00 AM bulletin.
$root = Split-Path -Parent $PSScriptRoot
$action = New-ScheduledTaskAction -Execute "node.exe" -Argument "agency\run-all.mjs --no-email" -WorkingDirectory $root
$trigger = New-ScheduledTaskTrigger -Daily -At 7:15am
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "RankRelay Daily Run" -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null
Get-ScheduledTask -TaskName "RankRelay Daily Run" | Select-Object TaskName, State
