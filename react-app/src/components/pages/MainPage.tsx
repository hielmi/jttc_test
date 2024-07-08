/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Fragments/Navbar";

const MainPage = () => {
  const [pegawaiList, setPegawaiList] = useState([]);
  const [kontrakList, setKontrakList] = useState<any>([]);
  const [jabatanList, setJabatanList] = useState<any>([]);
  const [formData, setFormData] = useState({
    name: "",
    id_jabatan: "",
    id_kontrak: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responsePegawai = await axios.get(
        "http://localhost/restapi/api/pegawai/getAllPegawai.php"
      );
      const pegawaiData = responsePegawai.data.records;

      const responseJabatan = await axios.get(
        "http://localhost/restapi/api/jabatan/getAllJabatan.php"
      );
      const jabatanData = responseJabatan.data.records;

      const responseKontrak = await axios.get(
        "http://localhost/restapi/api/kontrak/getAllKontrak.php"
      );
      const kontrakData = responseKontrak.data.records;

      setPegawaiList(pegawaiData);
      setJabatanList(jabatanData);
      setKontrakList(kontrakData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost/restapi/api/pegawai/addPegawai.php",
        formData
      );
      console.log("Form submitted successfully:", response.data);

      // Reset form after successful submission (optional)
      setFormData({ name: "", id_jabatan: "", id_kontrak: "" });

      // Refetch data to update the list (optional)
      fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Pegawai List</h2>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Pegawai
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Jabatan</th>
              <th>Kontrak</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pegawaiList.map((pegawai: any) => (
              <tr key={pegawai.id}>
                <td>{pegawai.id}</td>
                <td>{pegawai.name}</td>
                <td>
                  {
                    jabatanList.find(
                      (jabatan: any) => jabatan.id === pegawai.id_jabatan
                    )?.jabatan
                  }
                </td>
                <td>
                  {
                    kontrakList.find(
                      (kontrak: any) => kontrak.id === pegawai.id_kontrak
                    )?.kontrak
                  }
                </td>
                <td>
                  <button className="btn btn-primary mx-2">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Tambah Pegawai
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nama Pegawai
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama pegawai"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="id_jabatan" className="form-label">
                    Jabatan
                  </label>
                  <select
                    className="form-select"
                    id="id_jabatan"
                    name="id_jabatan"
                    value={formData.id_jabatan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Jabatan</option>
                    {jabatanList.map((jabatan: any) => (
                      <option key={jabatan.id} value={jabatan.id}>
                        {jabatan.jabatan}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="id_kontrak" className="form-label">
                    Kontrak
                  </label>
                  <select
                    className="form-select"
                    id="id_kontrak"
                    name="id_kontrak"
                    value={formData.id_kontrak}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Kontrak</option>
                    {kontrakList.map((kontrak: any) => (
                      <option key={kontrak.id} value={kontrak.id}>
                        {kontrak.kontrak}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary ms-2">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
