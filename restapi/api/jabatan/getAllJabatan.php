<?php
include_once '../cors.php';
include_once '../../config/database.php';
include_once '../../models/jabatan.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  http_response_code(405);
  echo json_encode(array("message" => "Request method not allowed."));
  exit(0);
}

$database = new Database();
$db = $database->getConnection();

$jabatan = new JabatanPegawai($db);

$stmt = $jabatan->readAll();
$num = $stmt->rowCount();

if ($num > 0) {
  $jabatan_arr = array();
  $jabatan_arr["records"] = array();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $jabatan_item = array(
      "id" => $id,
      "jabatan" => $jabatan
    );

    array_push($jabatan_arr["records"], $jabatan_item);
  }

  http_response_code(200);
  echo json_encode($jabatan_arr);
} else {
  http_response_code(404);
  echo json_encode(array("message" => "No jabatan found."));
}
