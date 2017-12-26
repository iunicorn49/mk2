<?php
require_once "./fn.php";

$sql = "SELECT * FROM banner";

$result = execute_table($sql);

echo json_encode(array(
  'message' => 'success',
  'result' => $result
));

 ?>
