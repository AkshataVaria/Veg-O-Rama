<?php
  header('Content-Type: application/download');
  header('Content-Disposition: attachment; filename="menu.pdf"');
  header("Content-Length: " . filesize("menu.pdf"));
  $fp = fopen("menu.pdf", "r");
  fpassthru($fp);
  fclose($fp);
?>