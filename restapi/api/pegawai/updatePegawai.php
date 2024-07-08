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
  !empty($data->id) &&
  !empty($data->name) &&
  !empty($data->id_jabatan) &&
  !empty($data->id_kontrak)
) {
  $pegawai->id = $data->id;
  $pegawai->name = $data->name;
  $pegawai->id_jabatan = $data->id_jabatan;
  $pegawai->id_kontrak = $data->id_kontrak;

  if ($pegawai->update()) {
    http_response_code(200);
    echo json_encode(array("message" => "Pegawai was updated."));
  } else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to update pegawai."));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to update pegawai. Data is incomplete."));
}
