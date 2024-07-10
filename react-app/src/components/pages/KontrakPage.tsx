import { FormEvent, useEffect, useState } from "react";
import Navbar from "../Fragments/Navbar";
import axiosInstance from "../../lib/axios/instance";
import Swal from "sweetalert2";
interface Kontrak {
  id: number;
  kontrak: string;
}

const KontrakPage = () => {
  const [kontrakList, setKontrakList] = useState<Kontrak[]>([]);
  const [selectedKontrak, setSelectedKontrak] = useState<Partial<Kontrak>>({});
  useEffect(() => {
    fetchKontrak();
  }, []);

  const fetchKontrak = async () => {
    const response = await axiosInstance.get("/kontrak/getAllKontrak.php");
    const data = response.data.records;
    setKontrakList(data);
  };

  const handleDelete = async (id: number) => {
    try {
      if (id) {
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
              "/kontrak/deleteKontrak.php",
              { data: { id } }
            );

            if (response.status) {
              Swal.fire({
                title: "Deleted!",
                text: "Kontrak has been deleted.",
                icon: "success",
              });
              fetchKontrak();
            } else {
              throw new Error("Failed to delete kontrak");
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form: any = e.target as HTMLFormElement;

    const data = {
      kontrak: form.name.value,
    };

    try {
      const response = await axiosInstance.post(
        "/kontrak/addKontrak.php",
        data
      );

      if (response.status) {
        Swal.fire({
          title: "success",
          text: "Success added kontrak",
          icon: "success",
        });
        fetchKontrak();
      } else {
        throw new Error("Failed to add kontrak");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Failed to add kontrak",
        icon: "error",
      });
    }
  };

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name }: any = e.target as HTMLFormElement;

    const data = {
      id: selectedKontrak.id,
      kontrak: name.value,
    };

    try {
      if (data) {
        const response = await axiosInstance.put(
          "/kontrak/updateKontrak.php",
          data
        );

        if (response.status) {
          Swal.fire({
            title: "success",
            text: "Success updated kontrak",
            icon: "success",
          });
          fetchKontrak();
        }
      } else {
        throw Error("Failed to update kontrak");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Failed to update kontrak",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Kontrak List</h2>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Kontrak
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Kontrak</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kontrakList.map((kontrak: Kontrak, index: number) => (
              <tr key={kontrak.id}>
                <td>{index + 1}</td>
                <td>{kontrak.kontrak}</td>
                <td>
                  <button
                    className="btn btn-primary mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalEdit"
                    onClick={() => setSelectedKontrak(kontrak)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(kontrak.id)}
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
                    Nama Kontrak
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Masukkan durasi kontrak"
                    required
                  />
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
                    Nama Kontrak
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    defaultValue={selectedKontrak?.kontrak}
                    required
                  />
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

export default KontrakPage;
