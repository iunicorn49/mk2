<?php
require_once "./config.php";

// 连接服务器
function connect() {
  return mysqli_connect(DB_ADDRESS, DB_USER, DB_PASSWORD, DB_NAME);
}

// 获取多组数据
function execute_table($sql) {
  $conn = connect();
  $arr = array();
  $reader = mysqli_query($conn, $sql);
  while($item = mysqli_fetch_assoc($reader)) {
    array_push($arr, $item);
  };
  mysqli_free_result($reader);
  mysqli_close($conn);
  return $arr;
}


 ?>
