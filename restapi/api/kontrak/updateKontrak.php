<?php
include_once '../cors.php';
include_once '../../config/database.php';
include_once '../../models/kontrak.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
  http_response_code(405);
  echo json_encode(array("message" => "Request method not allowed."));
  exit(0);
}

$database = new Database();
$db = $database->getConnection();

$kontrak = new Kontrak($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && !empty($data->kontrak)) {
  $kontrak->id = $data->id;
  $kontrak->kontrak = $data->kontrak;

  if ($kontrak->update()) {
    http_response_code(200);
    echo json_encode(array("message" => "Kontrak was updated."));
  } else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to update kontrak."));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to update kontrak. Data is incomplete."));
}
