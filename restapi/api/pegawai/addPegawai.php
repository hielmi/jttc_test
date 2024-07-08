<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/pegawai.php';

$database = new Database();
$db = $database->getConnection();

$pegawai = new Pegawai($db);

$data = json_decode(file_get_contents("php://input"));

if (
  !empty($data->name) &&
  !empty($data->id_jabatan) &&
  !empty($data->id_kontrak)
) {
  $pegawai->name = $data->name;
  $pegawai->id_jabatan = $data->id_jabatan;
  $pegawai->id_kontrak = $data->id_kontrak;

  if ($pegawai->create()) {
    http_response_code(201);
    echo json_encode(array("message" => "Pegawai was created."));
  } else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to create pegawai."));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to create pegawai. Data is incomplete."));
}
