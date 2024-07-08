<?php
class JabatanPegawai
{
  private $conn;
  private $table_name = "jabatan_pegawai";

  public $id;
  public $jabatan;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function create()
  {
    $query = "INSERT INTO " . $this->table_name . " SET jabatan=:jabatan";
    $stmt = $this->conn->prepare($query);

    $this->jabatan = htmlspecialchars(strip_tags($this->jabatan));

    $stmt->bindParam(":jabatan", $this->jabatan);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  public function readAll()
  {
    $query = "SELECT id, jabatan FROM " . $this->table_name . " ORDER BY id ASC";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  public function readOne()
  {
    $query = "SELECT jabatan FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $this->id);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
      $this->jabatan = $row['jabatan'];
    } else {
      $this->jabatan = null;
    }
  }

  public function update()
  {
    $query = "UPDATE " . $this->table_name . " SET jabatan = :jabatan WHERE id = :id";
    $stmt = $this->conn->prepare($query);

    $this->jabatan = htmlspecialchars(strip_tags($this->jabatan));
    $this->id = htmlspecialchars(strip_tags($this->id));

    $stmt->bindParam(':jabatan', $this->jabatan);
    $stmt->bindParam(':id', $this->id);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  public function delete()
  {
    $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
    $stmt = $this->conn->prepare($query);

    $this->id = htmlspecialchars(strip_tags($this->id));
    $stmt->bindParam(':id', $this->id);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }
}
