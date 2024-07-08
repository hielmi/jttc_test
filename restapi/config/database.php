<?php
class Database
{
  private $host = "localhost";
  private $db_name = "jttc_test";
  private $username = "root";
  private $password = "";
  public $conn;

  public function getConnection()
  {
    $this->conn = null;
    try {
      $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
      $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

      // Create tables if they do not exist
      $this->createTables();
    } catch (PDOException $exception) {
      echo "Connection error: " . $exception->getMessage();
    }
    return $this->conn;
  }

  private function createTables()
  {
    $tables = [
      "CREATE TABLE IF NOT EXISTS `jabatan_pegawai`(
                `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                `jabatan` VARCHAR(255) NOT NULL
            );",
      "CREATE TABLE IF NOT EXISTS `kontrak`(
                `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                `kontrak` VARCHAR(255) NOT NULL
            );",
      "CREATE TABLE IF NOT EXISTS `pegawai`(
                `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                `name` VARCHAR(255) NOT NULL,
                `id_jabatan` INT NOT NULL,
                `id_kontrak` INT NOT NULL,
                FOREIGN KEY (`id_jabatan`) REFERENCES `jabatan_pegawai`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (`id_kontrak`) REFERENCES `kontrak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
            );"
    ];

    foreach ($tables as $sql) {
      $this->conn->exec($sql);
    }
  }
}
