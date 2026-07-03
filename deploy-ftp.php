<?php
/** Hostinger FTP deploy for los-almendros-web */
$host = 'ftp.constructoralosalmendros.cl'; // cambiar si corresponde
$user = 'uXXXXXXXXXX';                         // tu usuario FTP
$pass = 'XXXXXXXXXX';                          // tu contraseña FTP
$remoteRoot = '/public_html';                  // ruta remota en Hostinger
$localRoot   = __DIR__;                         // raíz local (carpeta del proyecto)

$opts = [
  'ftp' => [
    'overwrite' => true,
    'resume'    => true,
  ]
];

$conn = @ftp_connect($host, 21, 15);
if (!$conn) { http_response_code(500); echo "FTP connect failed\n"; exit(1); }

$login = @ftp_login($conn, $user, $pass);
if (!$login) { ftp_close($conn); http_response_code(500); echo "FTP auth failed\n"; exit(1); }

ftp_pasv($conn, true);

$deleted = [];
$uploaded = [];
$localFiles = new RecursiveIteratorIterator(
  new RecursiveDirectoryIterator($localRoot, RecursiveDirectoryIterator::SKIP_DOTS),
  RecursiveIteratorIterator::SELF_FIRST
);

$remoteDirs = [];
foreach ($localFiles as $path => $info) {
  if ($info->isDir()) {
    $rel = str_replace($localRoot, '', $path);
    $rel = ltrim(str_replace('\\', '/', $rel), '/');
    if ($rel === '') continue;
    $remoteDir = $remoteRoot . '/' . $rel;
    if (!in_array($remoteDir, $remoteDirs, true)) {
      @ftp_mkdir($conn, $remoteDir);
      $remoteDirs[] = $remoteDir;
    }
  } else {
    $rel = str_replace($localRoot, '', $path);
    $rel = ltrim(str_replace('\\', '/', $rel), '/');
    $remotePath = $remoteRoot . '/' . $rel;
    $ok = ftp_put($conn, $remotePath, $path, FTP_BINARY);
    $uploaded[] = $rel;
  }
}

ftp_close($conn);

header('Content-Type: text/plain');
echo "UPLOADED:\n" . implode("\n", $uploaded) . "\n";
