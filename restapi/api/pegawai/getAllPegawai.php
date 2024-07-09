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

$stmt = $pegawai->readAll();
$num = $stmt->rowCount();

if ($num > 0) {
  $pegawai_arr = array();
  $pegawai_arr["records"] = array();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $pegawai_item = array(
      "id" => $id,
      "name" => $name,
      "id_jabatan" => $id_jabatan,
      "id_kontrak" => $id_kontrak
    );

    array_push($pegawai_arr["records"], $pegawai_item);
  }

  http_response_code(200);
  echo json_encode($pegawai_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "No pegawai found."));
}
