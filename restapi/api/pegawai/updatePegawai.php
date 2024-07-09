<?php
include_once '../cors.php';
include_once '../../config/database.php';
include_once '../../models/pegawai.php';


if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
  http_response_code(405);
  echo json_encode(array("message" => "Request method not allowed."));
  exit(0);
}

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
