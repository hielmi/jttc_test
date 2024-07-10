<?php
include_once '../cors.php';
include_once '../../config/database.php';
include_once '../../models/jabatan.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
  http_response_code(405);
  echo json_encode(array("message" => "Request method not allowed."));
  exit(0);
}

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
