<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/kontrak.php';

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
