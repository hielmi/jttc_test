 <!-- public function getAllPegawai()
 {
 $query = 'select * from pegawai';
 $stmt = $this->pdo->prepare($query);
 $stmt->execute();
 $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
 echo json_encode($data);
 }
 public function getPegawaiById($id)
 {
 $query = 'select * from pegawai where id = ' . $id;
 $stmt = $this->pdo->prepare($query);
 $stmt->execute();
 $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
 echo json_encode($data);
 }

 public function addPegawai($name, $id_jabatan, $id_kontrak)
 {
 $query = "insert into pegawai (name, id_kontrak, id_jabatan) values (?,?,?)";
 $stmt = $this->pdo->prepare($query);
 $res = $stmt->execute([$name]);
 if ($res) {
 $data = ['name' => $name];
 echo json_encode($data);
 } else {
 echo json_encode(['error' => $stmt->errorCode()]);
 }
 }

 public function deletePegawai($id)
 {
 $query = "delete from pegawai where id = ?";
 $stmt = $this->pdo->prepare($query);
 $res = $stmt->execute([$id]);
 if ($res) {
 $data = ['id' => $id];
 echo json_encode($data);
 } else {
 echo json_encode(['error' => $stmt->errorCode()]);
 }
 }

 public function getAllJabatanPegawai()
 {
 $query = 'select * from jabatan_pegawai';
 $stmt = $this->pdo->prepare($query);
 $stmt->execute();
 $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
 echo json_encode($data);
 }
 public function getJabatanPegawai($id)
 {
 $query = 'select * from jabatan_pegawai
 where id_pegawai = ' . $id;
 $stmt = $this->pdo->prepare($query);
 $stmt->execute();
 $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
 echo json_encode($data);
 }
 public function addJabatanPegawai($jabatan, $id_pegawai)
 {
 $query = "insert into jabatan_pegawai (restoid,id_pegawai) values (?,?)";
 $stmt = $this->pdo->prepare($query);
 $res = $stmt->execute([$jabatan, $id_pegawai]);
 if ($res) {
 $data = ['jabatan' => $jabatan, 'id_pegawai' => $id_pegawai];
 echo json_encode($data);
 } else {
 echo json_encode(['error' => $stmt->errorCode()]);
 }
 }

 public function deleteJabatanPegawai($id)
 {
 $query = "delete from jabatan_pegawai where id = ?";
 $stmt = $this->pdo->prepare($query);
 $res = $stmt->execute([$id]);
 if ($res) {
 $data = ['id' => $id];
 echo json_encode($data);
 } else {
 echo json_encode(['error' => $stmt->errorCode()]);
 }
 }

 public function getAllKontrak()
 {
 $query = 'select * from kontrak';
 $stmt = $this->pdo->prepare($query);
 $stmt->execute();
 $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
 echo json_encode($data);
 }
 public function getKontrakByid($id)
 {
 $query = 'select * from kontrak
 where id = ' . $id;
 $stmt = $this->pdo->prepare($query);
 $stmt->execute();
 $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
 echo json_encode($data);
 }
 public function addKontrak($jabatan, $id_pegawai)
 {
 $query = "insert into jabatan_pegawai (jabatan) values (?,?)";
 $stmt = $this->pdo->prepare($query);
 $res = $stmt->execute([$jabatan, $id_pegawai]);
 if ($res) {
 $data = ['jabatan' => $jabatan, 'id_pegawai' => $id_pegawai];
 echo json_encode($data);
 } else {
 echo json_encode(['error' => $stmt->errorCode()]);
 }
 }

 public function deleteKontrak($id)
 {
 $query = "delete from kontrak where id = ?";
 $stmt = $this->pdo->prepare($query);
 $res = $stmt->execute([$id]);
 if ($res) {
 $data = ['id' => $id];
 echo json_encode($data);
 } else {
 echo json_encode(['error' => $stmt->errorCode()]);
 }
 } -->

 <?php

  echo "ini page utama"

  ?>