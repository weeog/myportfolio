# Servidor estático local para testar o site (fora do deploy).
# Serve a pasta do projeto em http://localhost:5500/
$raiz = (Get-Location).Path
$porta = 5500
$tipos = @{
  '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'
  '.js' = 'text/javascript; charset=utf-8'; '.json' = 'application/json; charset=utf-8'
  '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'
  '.webp' = 'image/webp'; '.avif' = 'image/avif'; '.ico' = 'image/x-icon'
  '.mp4' = 'video/mp4'; '.webm' = 'video/webm'; '.pdf' = 'application/pdf'
  '.otf' = 'font/otf'; '.ttf' = 'font/ttf'; '.woff' = 'font/woff'; '.woff2' = 'font/woff2'
  '.txt' = 'text/plain; charset=utf-8'; '.xml' = 'application/xml; charset=utf-8'
}
$servidor = New-Object System.Net.HttpListener
$servidor.Prefixes.Add("http://localhost:$porta/")
$servidor.Start()
Write-Host "wee. servindo $raiz em http://localhost:$porta/"
try {
  while ($servidor.IsListening) {
    $ctx = $servidor.GetContext()
    $res = $ctx.Response
    try {
      $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
      $caminho = [IO.Path]::GetFullPath((Join-Path $raiz $rel))
      if (-not $caminho.StartsWith($raiz, [StringComparison]::OrdinalIgnoreCase)) { $res.StatusCode = 403 }
      else {
        if (Test-Path -LiteralPath $caminho -PathType Container) { $caminho = Join-Path $caminho 'index.html' }
        if (-not (Test-Path -LiteralPath $caminho -PathType Leaf)) {
          $res.StatusCode = 404
          $caminho = Join-Path $raiz '404.html'
        }
        if (Test-Path -LiteralPath $caminho -PathType Leaf) {
          $ext = [IO.Path]::GetExtension($caminho).ToLower()
          $tipo = $tipos[$ext]; if (-not $tipo) { $tipo = 'application/octet-stream' }
          $bytes = [IO.File]::ReadAllBytes($caminho)
          $res.ContentType = $tipo
          $res.Headers['Cache-Control'] = 'no-store'
          $res.ContentLength64 = $bytes.Length
          $res.OutputStream.Write($bytes, 0, $bytes.Length)
        }
      }
    } catch { try { $res.StatusCode = 500 } catch {} }
    finally { try { $res.Close() } catch {} }
    Write-Host "$($ctx.Request.HttpMethod) $($ctx.Request.Url.AbsolutePath) -> $($res.StatusCode)"
  }
} finally { $servidor.Stop() }
