import { FormEvent, useEffect, useState } from "react";
import Navbar from "../Fragments/Navbar";
import axiosInstance from "../../lib/axios/instance";
import Swal from "sweetalert2";

interface Jabatan {
  id: number;
  jabatan: string;
}

const JabatanPage = () => {
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [selectedJabatan, setSelectedJabatan] = useState<Partial<Jabatan>>({});
  useEffect(() => {
    fetchJabatan();
  }, []);

  const fetchJabatan = async () => {
    const response = await axiosInstance.get("/jabatan/getAllJabatan.php");
    const data = response.data.records;
    setJabatanList(data);
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
              "/jabatan/deleteJabatan.php",
              { data: { id } }
            );

            if (response.status) {
              Swal.fire({
                title: "Deleted!",
                text: "Jabatan has been deleted.",
                icon: "success",
              });
              fetchJabatan();
            } else {
              throw new Error("Failed to delete Jabatan");
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
      jabatan: form.name.value,
    };

    try {
      const response = await axiosInstance.post(
        "/jabatan/addJabatan.php",
        data
      );

      if (response.status) {
        Swal.fire({
          title: "success",
          text: "Success added Jabatan",
          icon: "success",
        });
        fetchJabatan();
      } else {
        throw new Error("Failed to add Jabatan");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Failed to add Jabatan",
        icon: "error",
      });
    }
  };

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name }: any = e.target as HTMLFormElement;

    const data = {
      id: selectedJabatan.id,
      jabatan: name.value,
    };

    try {
      if (data) {
        const response = await axiosInstance.put(
          "/jabatan/updateJabatan.php",
          data
        );

        if (response.status) {
          Swal.fire({
            title: "success",
            text: "Success updated Jabatan",
            icon: "success",
          });
          fetchJabatan();
        }
      } else {
        throw Error("Failed to update Jabatan");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Failed to update Jabatan",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Jabatan List</h2>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Jabatan
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Jabatan</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jabatanList.map((jabatan: Jabatan, index: number) => (
              <tr key={jabatan.id}>
                <td>{index + 1}</td>
                <td>{jabatan.jabatan}</td>
                <td>
                  <button
                    className="btn btn-primary mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalEdit"
                    onClick={() => setSelectedJabatan(jabatan)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(jabatan.id)}
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
                Tambah Jabatan
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
                    Nama Jabatan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Masukkan Jabatan"
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
                    Nama Jabatan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    defaultValue={selectedJabatan.jabatan}
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

export default JabatanPage;
