<?php

$cards = array();

foreach (new DirectoryIterator('.') as $dir) {
  if (
    $dir->isDir() &&
    !$dir->isDot()
  ) {
    $dir_key = $dir->getFilename();
    $cards[$dir_key] = array();
    foreach (new DirectoryIterator($dir) as $file) {
      if ($file->isFile()) {
        array_push($cards[$dir_key], $file->getFilename());
      }
    }
  }
}

echo json_encode($cards);

?>