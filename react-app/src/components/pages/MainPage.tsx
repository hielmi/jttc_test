import { useEffect, useState } from "react";
import Navbar from "../Fragments/Navbar";
import axiosInstance from "../../lib/axios/instance";
import Swal from "sweetalert2";

interface Pegawai {
  id: number;
  name: string;
  id_jabatan: number;
  id_kontrak: number;
}

interface Jabatan {
  id: number;
  jabatan: string;
}

interface Kontrak {
  id: number;
  kontrak: string;
}

const MainPage = () => {
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
  const [kontrakList, setKontrakList] = useState<Kontrak[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);

  const [selectedPegawai, setSelectedPegawai] = useState<Partial<Pegawai>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responsePegawai = await axiosInstance.get(
        "/pegawai/getAllPegawai.php"
      );
      const pegawaiData = responsePegawai.data.records;

      const responseJabatan = await axiosInstance.get(
        "/jabatan/getAllJabatan.php"
      );
      const jabatanData = responseJabatan.data.records;

      const responseKontrak = await axiosInstance.get(
        "/kontrak/getAllKontrak.php"
      );
      const kontrakData = responseKontrak.data.records;

      setPegawaiList(pegawaiData);
      setJabatanList(jabatanData);
      setKontrakList(kontrakData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { name, id_jabatan, id_kontrak }: any = e.target as HTMLFormElement;

      const data = {
        name: name.value,
        id_jabatan: id_jabatan.value,
        id_kontrak: id_kontrak.value,
      };

      const response = await axiosInstance.post(
        "/pegawai/addPegawai.php",
        data
      );
      console.log("Form submitted successfully:", response.data);

      fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (!id) {
        return Swal.fire({
          title: "Please selected pegawai!",
          text: "Please selected pegawai before deleted pegawai!",
          icon: "question",
        });
      }
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axiosInstance.delete(
            `/pegawai/deletePegawai.php`,
            {
              data: { id },
            }
          );

          if (response.status) {
            fetchData();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Something error!",
              icon: "error",
            });
          }
        }
        setSelectedPegawai({});
      });
    } catch (error) {
      console.error("Error deleting pegawai:", error);
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { name, id_jabatan, id_kontrak }: any = e.target as HTMLFormElement;

      const data = {
        id: selectedPegawai.id,
        name: name.value,
        id_jabatan: id_jabatan.value,
        id_kontrak: id_kontrak.value,
      };

      if (!selectedPegawai.id) {
        return Swal.fire({
          title: "Please selected pegawai!",
          text: "Please selected pegawai before want to update pegawai!",
          icon: "question",
        });
      }
      const response = await axiosInstance.put(
        `/pegawai/updatePegawai.php`,
        data
      );
      if (response.status) {
        fetchData();
        Swal.fire({
          title: "Updated!",
          text: "Your file has been updated.",
          icon: "success",
        });
      }
      setSelectedPegawai({});
    } catch (error) {
      console.error("Error updating pegawai:", error);
      Swal.fire({
        title: "Something error!",
        icon: "error",
      });
    }
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
            onClick={() => {
              setSelectedPegawai({});
            }}
          >
            Add Pegawai
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Jabatan</th>
              <th>Kontrak</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pegawaiList.map((pegawai: Pegawai, index: number) => (
              <tr key={pegawai.id}>
                <td>{index + 1}</td>
                <td>{pegawai.name}</td>
                <td>
                  {
                    jabatanList.find(
                      (jabatan: Jabatan) => jabatan.id === pegawai.id_jabatan
                    )?.jabatan
                  }
                </td>
                <td>
                  {
                    kontrakList.find(
                      (kontrak: Kontrak) => kontrak.id === pegawai.id_kontrak
                    )?.kontrak
                  }
                </td>
                <td>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => {
                      setSelectedPegawai(pegawai);
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalEdit"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(pegawai.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add Pegawai Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
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
                    required
                  >
                    <option value="">Pilih Jabatan</option>
                    {jabatanList.map((jabatan: Jabatan) => (
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
                    required
                  >
                    <option value="">Pilih Kontrak</option>
                    {kontrakList.map((kontrak: Kontrak) => (
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
      {/* Edit Pegawai Modal */}
      <div
        className="modal fade"
        id="exampleModalEdit"
        aria-labelledby="exampleModalEditLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalEditLabel">
                Edit Pegawai
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nama Pegawai
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    defaultValue={selectedPegawai.name}
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
                    defaultValue={selectedPegawai.id_jabatan}
                    value={selectedPegawai.id_jabatan || ""}
                    onChange={(e) =>
                      setSelectedPegawai({
                        ...selectedPegawai,
                        id_jabatan: parseInt(e.target.value),
                      })
                    }
                    required
                  >
                    <option value="">Pilih Jabatan</option>
                    {jabatanList.map((jabatan: Jabatan) => (
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
                    defaultValue={selectedPegawai.id_kontrak}
                    value={selectedPegawai.id_kontrak || ""}
                    onChange={(e) =>
                      setSelectedPegawai({
                        ...selectedPegawai,
                        id_kontrak: parseInt(e.target.value),
                      })
                    }
                    required
                  >
                    <option value="">Pilih Kontrak</option>
                    {kontrakList.map((kontrak: Kontrak) => (
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
