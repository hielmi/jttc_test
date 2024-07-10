<?php

include_once '../cors.php';
include_once '../../config/database.php';
include_once '../../models/jabatan.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(array("message" => "Request method not allowed."));
  exit(0);
}

$database = new Database();
$db = $database->getConnection();

$jabatan = new JabatanPegawai($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->jabatan)) {
  $jabatan->jabatan = $data->jabatan;

  if ($jabatan->create()) {
    http_response_code(201);
    echo json_encode(array("message" => "Jabatan Pegawai was created."));
  } else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to create jabatan pegawai."));
  }
} else {
  http_response_code(400);
  echo json_encode(array("message" => "Unable to create jabatan pegawai. Data is incomplete."));
}
