$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$dataPath = Join-Path $projectRoot 'src/data/mathMockQuestions.json'
$sourceRoot = Join-Path $projectRoot 'public/mock-exam-pages'
$outputRoot = Join-Path $projectRoot 'public/mock-question-images'

Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null
$questions = Get-Content -Raw -LiteralPath $dataPath | ConvertFrom-Json
$count = 0

foreach ($question in $questions) {
  if (-not $question.questionImageCrop -or -not $question.questionImageSourceUrl) { continue }
  $sourceName = Split-Path -Leaf $question.questionImageSourceUrl
  $sourcePath = Join-Path $sourceRoot $sourceName
  $outputPath = Join-Path $outputRoot "$($question.id).png"
  $image = [System.Drawing.Image]::FromFile($sourcePath)
  try {
    $crop = $question.questionImageCrop
    $x = [Math]::Max(0, [Math]::Floor($image.Width * [double]$crop.x / 100))
    $y = [Math]::Max(0, [Math]::Floor($image.Height * [double]$crop.y / 100))
    $width = [Math]::Min($image.Width - $x, [Math]::Ceiling($image.Width * [double]$crop.width / 100))
    $height = [Math]::Min($image.Height - $y, [Math]::Ceiling($image.Height * [double]$crop.height / 100))
    $bitmap = New-Object System.Drawing.Bitmap $width, $height
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $destination = New-Object System.Drawing.Rectangle 0, 0, $width, $height
        $source = New-Object System.Drawing.Rectangle $x, $y, $width, $height
        $graphics.DrawImage($image, $destination, $source, [System.Drawing.GraphicsUnit]::Pixel)
      } finally { $graphics.Dispose() }
      $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally { $bitmap.Dispose() }
  } finally { $image.Dispose() }
  $count++
}

Write-Host "Created $count question-only image crops in public/mock-question-images."
