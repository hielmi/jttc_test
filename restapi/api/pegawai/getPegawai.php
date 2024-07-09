<?php
include_once '../cors.php';
include_once '../../config/database.php';
include_once '../../models/pegawai.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  http_response_code(405);
  echo json_encode(array("message" => "Request method not allowed."));
  exit(0);
}

$database = new Database();
$db = $database->getConnection();

$pegawai = new Pegawai($db);

$pegawai->id = isset($_GET['id']) ? $_GET['id'] : die();

$pegawai->readOne();

if ($pegawai->name != null) {
  $pegawai_arr = array(
    "id" => $pegawai->id,
    "name" => $pegawai->name,
    "id_jabatan" => $pegawai->id_jabatan,
    "id_kontrak" => $pegawai->id_kontrak
  );

  http_response_code(200);
  echo json_encode($pegawai_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "Pegawai does not exist."));
}
