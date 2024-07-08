<?php
class Kontrak
{
  private $conn;
  private $table_name = "kontrak";

  public $id;
  public $kontrak;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function create()
  {
    $query = "INSERT INTO " . $this->table_name . " SET kontrak=:kontrak";
    $stmt = $this->conn->prepare($query);

    $this->kontrak = htmlspecialchars(strip_tags($this->kontrak));

    $stmt->bindParam(":kontrak", $this->kontrak);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }

  public function readAll()
  {
    $query = "SELECT id, kontrak FROM " . $this->table_name . " ORDER BY id ASC";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  public function readOne()
  {
    $query = "SELECT kontrak FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $this->id);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
      $this->kontrak = $row['kontrak'];
    } else {
      $this->kontrak = null;
    }
  }

  public function update()
  {
    $query = "UPDATE " . $this->table_name . " SET kontrak = :kontrak WHERE id = :id";
    $stmt = $this->conn->prepare($query);

    $this->kontrak = htmlspecialchars(strip_tags($this->kontrak));
    $this->id = htmlspecialchars(strip_tags($this->id));

    $stmt->bindParam(':kontrak', $this->kontrak);
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
