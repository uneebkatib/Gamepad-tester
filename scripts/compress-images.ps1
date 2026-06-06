# PowerShell script to compress PNG images in public/ folder to JPEG to reduce size
Add-Type -AssemblyName System.Drawing

$publicDir = Join-Path $PSScriptRoot "..\public"
$pngs = Get-ChildItem -Path $publicDir -Filter *.png

$encoders = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
$jpegEncoder = $encoders | Where-Object { $_.FormatDescription -eq "JPEG" }

# Set compression quality to 75%
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75)

foreach ($png in $pngs) {
    $jpgPath = $png.FullName.Replace(".png", ".jpg")
    
    try {
        $bmp = [System.Drawing.Image]::FromFile($png.FullName)
        $bmp.Save($jpgPath, $jpegEncoder, $encoderParams)
        $bmp.Dispose()
        
        $oldSize = [math]::Round($png.Length / 1024, 1)
        $newSize = [math]::Round((Get-Item $jpgPath).Length / 1024, 1)
        $fileName = $png.Name
        $jpgName = Split-Path $jpgPath -Leaf
        
        Write-Host "OK: $fileName -> $jpgName ($oldSize KB -> $newSize KB)"
    } catch {
        Write-Host "ERROR: Failed to compress $($png.Name)" -ForegroundColor Red
    }
}
