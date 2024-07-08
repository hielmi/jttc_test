<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../models/jabatan.php';

$database = new Database();
$db = $database->getConnection();

$jabatan = new JabatanPegawai($db);

$jabatan->id = isset($_GET['id']) ? $_GET['id'] : die();

$jabatan->readOne();

if ($jabatan->jabatan != null) {
  $jabatan_arr = array(
    "id" => $jabatan->id,
    "jabatan" => $jabatan->jabatan
  );

  http_response_code(200);
  echo json_encode($jabatan_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "Jabatan does not exist."));
}
