<?
$data  = $_POST['data'];
$name = $_POST['name'];
$fp = fopen("log.txt.demo",'a');
fwrite($fp,$name."=".$data."\n");
fclose($fp);
?>
