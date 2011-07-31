list_all_data(<?

$log = trim(file_get_contents('log.txt.demo'));
$pictures = explode("\n",$log);
$data = array();

foreach($pictures as $picture)
{
    $t = explode("=",$picture);
    $data[] = array("name"=>$t[0],'data'=>$t[1]);
}
echo json_encode(array_reverse($data));?>);
