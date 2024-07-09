<?php
include_once '../cors.php';
include_once '../../config/database.php';
include_once '../../models/pegawai.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(array("message" => "Request method not allowed."));
  exit(0);
}

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
