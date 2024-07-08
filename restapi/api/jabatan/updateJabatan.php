<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/jabatan.php';

$database = new Database();
$db = $database->getConnection();

$jabatan = new JabatanPegawai($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && !empty($data->jabatan)) {
  $jabatan->id = $data->id;
  $jabatan->jabatan = $data->jabatan;

  if ($jabatan->update()) {
    http_response_code(200);
    echo json_encode(array("message" => "Jabatan was updated."));
  } else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to update jabatan."));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to update jabatan. Data is incomplete."));
}
