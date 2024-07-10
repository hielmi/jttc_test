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

$kontrak->id = isset($_GET['id']) ? $_GET['id'] : die();

$kontrak->readOne();

if ($kontrak->kontrak != null) {
  $kontrak_arr = array(
    "id" => $kontrak->id,
    "kontrak" => $kontrak->kontrak
  );

  http_response_code(200);
  echo json_encode($kontrak_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "Kontrak does not exist."));
}
