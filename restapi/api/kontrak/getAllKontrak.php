<?php
include_once '../cors.php';
include_once '../../config/database.php';
include_once '../../models/kontrak.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  http_response_code(405);
  echo json_encode(array("message" => "Request method not allowed."));
  exit(0);
}

$database = new Database();
$db = $database->getConnection();

$kontrak = new Kontrak($db);

$stmt = $kontrak->readAll();
$num = $stmt->rowCount();

if ($num > 0) {
  $kontrak_arr = array();
  $kontrak_arr["records"] = array();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $kontrak_item = array(
      "id" => $id,
      "kontrak" => $kontrak
    );

    array_push($kontrak_arr["records"], $kontrak_item);
  }

  http_response_code(200);
  echo json_encode($kontrak_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "No kontrak found."));
}
