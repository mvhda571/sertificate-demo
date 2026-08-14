param(
  [Parameter(Mandatory = $true)][string]$DocxPath
)

$ErrorActionPreference = 'Stop'
$workspace = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$curriculumPath = Join-Path $workspace 'src\data\mathCurriculum.json'
$outputPath = Join-Path $workspace 'src\data\mathTeacherAdvice6.json'

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [IO.Compression.ZipFile]::OpenRead($DocxPath)
try {
  $entry = $zip.GetEntry('word/document.xml')
  $reader = [IO.StreamReader]::new($entry.Open())
  try { [xml]$xml = $reader.ReadToEnd() } finally { $reader.Dispose() }
} finally { $zip.Dispose() }

$ns = [Xml.XmlNamespaceManager]::new($xml.NameTable)
$ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$paragraphs = @($xml.SelectNodes('//w:p', $ns) | ForEach-Object {
  $text = (($_.SelectNodes('.//w:t', $ns) | ForEach-Object { $_.InnerText }) -join '').Trim()
  if ($text) { $text }
})

function Test-Heading([string]$text) {
  return $text -match '^\D{0,8}(\d+(?:\u2013|\u2014|-)\d+|\d+)\.' -or $text -match '\b[IVX]+ BOB\.'
}

function Normalize([string]$text) {
  $value = $text.ToLowerInvariant().Replace([char]0x2018, "'").Replace([char]0x2019, "'").Replace('`', "'")
  $value = $value -replace '^.*?\d+\s*(?:-|\u2013|\u2014)\s*dars\]\s*', ''
  $value = $value -replace '^\D{0,5}\d+(?:[–—-]\d+)?\.\s*', ''
  $value = $value -replace '\d+\s*(?:-|\u2013|\u2014)\s*\d+\s*-?\s*mavzular?\.?\s*', ''
  $value = $value -replace '[^a-z0-9'' ]', ' '
  return ($value -replace '\s+', ' ').Trim()
}

function Tokens([string]$text) {
  $ignored = @('va','bilan','uchun','haqida','tushuncha','mavzu','mavzular','matematika','material','sinf','uning','son','sonlar')
  $normalized = Normalize $text
  return @($normalized -split ' ' | Where-Object { $_.Length -gt 2 -and $_ -notin $ignored } | Select-Object -Unique)
}

$firstChapter = -1
for ($i = 0; $i -lt $paragraphs.Count; $i++) {
  if ($paragraphs[$i] -match 'I BOB\. Natural sonlarning') { if ($firstChapter -ge 0) { $firstChapter = $i; break }; $firstChapter = $i }
}
if ($firstChapter -lt 0) { throw 'Konspektning birinchi bobi topilmadi.' }

$sections = @()
for ($i = $firstChapter; $i -lt $paragraphs.Count; $i++) {
  if (-not (Test-Heading $paragraphs[$i])) { continue }
  $end = $i + 1
  while ($end -lt $paragraphs.Count -and -not (Test-Heading $paragraphs[$end])) { $end++ }
  $body = if ($end -gt $i + 1) { @($paragraphs[($i + 1)..($end - 1)]) } else { @() }
  $sections += [pscustomobject]@{ Title = $paragraphs[$i]; Body = $body }
}

function Pick-Section([string]$title) {
  $wanted = Tokens $title
  $best = $null
  $bestScore = -1
  foreach ($section in $sections) {
    $candidate = Tokens $section.Title
    $common = @($wanted | Where-Object { $_ -in $candidate }).Count
    $score = $common * 10 - [Math]::Abs($wanted.Count - $candidate.Count)
    if ((Normalize $section.Title) -eq (Normalize $title)) { $score += 100 }
    if ($score -gt $bestScore) { $best = $section; $bestScore = $score }
  }
  return $best
}

function Strip-Label([string]$text) {
  return ($text -replace '^.*?(Eslab qol!|Qisqa layfhak:|Ta''rif\.|Muhim formula:|Misol\.)\s*', '').Trim()
}

$curriculum = Get-Content -LiteralPath $curriculumPath -Raw -Encoding UTF8 | ConvertFrom-Json
$sectionPatterns = @{
  1='\b1(?:\u2013|\u2014|-)2\.'; 2='\b3(?:\u2013|\u2014|-)5\.'; 3='\b6(?:\u2013|\u2014|-)7\.'; 4='\b10\.'
  5='\b11(?:\u2013|\u2014|-)12\.'; 6='\b13(?:\u2013|\u2014|-)14\.'; 7='\b15(?:\u2013|\u2014|-)16\.'
  8='\b21(?:\u2013|\u2014|-)23\.'; 9='\b24(?:\u2013|\u2014|-)26\.'; 10='\b27(?:\u2013|\u2014|-)28\.'
  11='\b31(?:\u2013|\u2014|-)33\.'; 12='\b34(?:\u2013|\u2014|-)37\.'; 13='\b43(?:\u2013|\u2014|-)45\.'
  14='\b46(?:\u2013|\u2014|-)48\.'; 15='\b49(?:\u2013|\u2014|-)50\.'; 16='\b51(?:\u2013|\u2014|-)53\.'; 17='\b54\.'
  18='\b59(?:\u2013|\u2014|-)61\.'; 19='\b62(?:\u2013|\u2014|-)64\.'; 20='\b65(?:\u2013|\u2014|-)66\.'
  21='\b69(?:\u2013|\u2014|-)74\.'; 22='\b75(?:\u2013|\u2014|-)78\.'; 23='\b84(?:\u2013|\u2014|-)85\.'
  24='\b86(?:\u2013|\u2014|-)88\.'; 25='\b89(?:\u2013|\u2014|-)90\.'; 26='\b95(?:\u2013|\u2014|-)97\.'
  27='\b98(?:\u2013|\u2014|-)100\.'; 28='\b101(?:\u2013|\u2014|-)102\.'; 29='\b107(?:\u2013|\u2014|-)109\.'
  30='\b110(?:\u2013|\u2014|-)112\.'; 31='\b113\.'; 32='\b118(?:\u2013|\u2014|-)119\.'
  33='\b126(?:\u2013|\u2014|-)127\.'; 34='\b128(?:\u2013|\u2014|-)129\.'; 35='\b130(?:\u2013|\u2014|-)133\.'
  36='\b130(?:\u2013|\u2014|-)133\.'; 37='\b139(?:\u2013|\u2014|-)142\.'; 38='\b145(?:\u2013|\u2014|-)148\.'
  39='\b145(?:\u2013|\u2014|-)148\.'; 40='\b150(?:\u2013|\u2014|-)152\.'
  41='\b31(?:\u2013|\u2014|-)33\.'; 42='\b51(?:\u2013|\u2014|-)53\.'; 43='\b59(?:\u2013|\u2014|-)61\.'
  44='\b95(?:\u2013|\u2014|-)97\.'; 45='\b105(?:\u2013|\u2014|-)106\.'; 46='\b118(?:\u2013|\u2014|-)119\.'
  47='\b128(?:\u2013|\u2014|-)129\.'; 48='\b139(?:\u2013|\u2014|-)142\.'
}
$result = [ordered]@{}
foreach ($lesson in $curriculum.'6'.lessons) {
  $pattern = $sectionPatterns[[int]$lesson.id]
  $section = $sections | Where-Object { $_.Title -match $pattern } | Select-Object -First 1
  if (-not $section) { $section = Pick-Section $lesson.title }
  if (-not $section) { throw "Mavzu uchun bo'lim topilmadi: $($lesson.title)" }
  $remember = @($section.Body | Where-Object { $_ -match 'Eslab qol!' } | Select-Object -First 1)
  $lifehack = @($section.Body | Where-Object { $_ -match 'Qisqa layfhak:' } | Select-Object -First 1)
  $rule = @($section.Body | Where-Object { $_ -match 'Ta''rif\.|Muhim formula:|^📌' } | Select-Object -First 1)
  $example = @($section.Body | Where-Object { $_ -match '\b\d*-?misol\.' } | Select-Object -First 1)
  $essence = if ($remember.Count) { Strip-Label $remember[0] } elseif ($rule.Count) { Strip-Label $rule[0] } else { $section.Body | Select-Object -First 1 }
  $shortcut = if ($lifehack.Count) { Strip-Label $lifehack[0] } elseif ($rule.Count) { Strip-Label $rule[0] } else { $essence }
  $practice = if ($example.Count) { Strip-Label $example[0] } elseif ($rule.Count) { Strip-Label $rule[0] } else { $section.Body | Select-Object -First 1 }
  if ([string]::IsNullOrWhiteSpace([string]$essence)) { $essence = $section.Body | Select-Object -First 1 }
  if ([string]::IsNullOrWhiteSpace([string]$shortcut)) { $shortcut = $essence }
  if ([string]::IsNullOrWhiteSpace([string]$practice)) {
    $practice = if ($rule.Count) { Strip-Label $rule[0] } else { $section.Body | Select-Object -First 1 }
  }
  $result[[string]$lesson.id] = [ordered]@{
    sourceTitle = $section.Title
    essence = [string]$essence
    trap = [string]$shortcut
    practical = [string]$practice
  }
}

$json = $result | ConvertTo-Json -Depth 8
[IO.File]::WriteAllText($outputPath, "$json`n", [Text.UTF8Encoding]::new($false))
Write-Output "Matematika ustoz maslahatlari: $($result.Count) mavzu; manbada $($sections.Count) bo'lim"
