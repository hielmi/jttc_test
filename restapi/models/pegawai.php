<?php
class Pegawai
{
  private $conn;
  private $table_name = "pegawai";

  public $id;
  public $name;
  public $id_jabatan;
  public $id_kontrak;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function create()
  {
    $query = "INSERT INTO " . $this->table_name . " SET name=:name, id_jabatan=:id_jabatan, id_kontrak=:id_kontrak";
    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->id_jabatan = htmlspecialchars(strip_tags($this->id_jabatan));
    $this->id_kontrak = htmlspecialchars(strip_tags($this->id_kontrak));

    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":id_jabatan", $this->id_jabatan);
    $stmt->bindParam(":id_kontrak", $this->id_kontrak);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  public function update()
  {
    $query = "UPDATE " . $this->table_name . " 
              SET name = :name, id_jabatan = :id_jabatan, id_kontrak = :id_kontrak
              WHERE id = :id";

    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->id_jabatan = htmlspecialchars(strip_tags($this->id_jabatan));
    $this->id_kontrak = htmlspecialchars(strip_tags($this->id_kontrak));
    $this->id = htmlspecialchars(strip_tags($this->id));

    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':id_jabatan', $this->id_jabatan);
    $stmt->bindParam(':id_kontrak', $this->id_kontrak);
    $stmt->bindParam(':id', $this->id);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  public function readAll()
  {
    $query = "SELECT id, name, id_jabatan, id_kontrak FROM " . $this->table_name . " ORDER BY id ASC";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  public function readOne()
  {
    $query = "SELECT name, id_jabatan, id_kontrak 
              FROM " . $this->table_name . " 
              WHERE id = ? 
              LIMIT 0,1";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $this->id);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
      $this->name = $row['name'];
      $this->id_jabatan = $row['id_jabatan'];
      $this->id_kontrak = $row['id_kontrak'];
    } else {
      $this->name = null;
      $this->id_jabatan = null;
      $this->id_kontrak = null;
    }
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
