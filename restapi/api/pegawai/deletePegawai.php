<?php
include_once '../cors.php';
include_once '../../config/database.php';
include_once '../../models/pegawai.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
  http_response_code(405);
  echo json_encode(array("message" => "Request method not allowed."));
  exit(0);
}


$database = new Database();
$db = $database->getConnection();

$pegawai = new Pegawai($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
  $pegawai->id = $data->id;

  if ($pegawai->delete()) {
    http_response_code(200);
    echo json_encode(array("message" => "Pegawai was deleted."));
  } else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to delete pegawai."));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to delete pegawai. Data is incomplete."));
}
