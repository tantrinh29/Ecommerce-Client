import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {
  addCategoryAPI,
  deleteCategoryById,
  listCategoryAPI,
  updateCategoryAPI,
} from "../../api/categoryApi";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Categories() {
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      cateID: "",
      nameCategory: "",
    },
    validationSchema: Yup.object({
      nameCategory: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (isEditing) {
        const result = await updateCategoryAPI(values.cateID, values);
        if (result.status === true) {
          toast.success(result.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(result.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        const result = await addCategoryAPI(values);
        if (result.status === true) {
          toast.success(result.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(result.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
      fetchCategories();
      resetForm();
      handleClose();
    },
  });

  const handleShow = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
    setIsEditing(false);
    formik.resetForm();
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const result = await listCategoryAPI();
      setCategories(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    formik.setValues({
      cateID: category.id,
      nameCategory: category.nameCategory,
    });
    handleShow();
  };

  // delete
  const handleDelete = async (modelId) => {
    const userConfirm = window.confirm(
      `Bạn có chắc chắn muốn xóa ID ${modelId}?`
    );
    if (userConfirm) {
      try {
        const result = await deleteCategoryById(modelId);
        if (result.status === true) {
          toast.success(result.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(result.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        fetchCategories();
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="content-header">
        <ToastContainer />
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Category</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="#">Category</Link>
                </li>
                <li className="breadcrumb-item active">DS Category</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <section className="col-lg-12 connectedSortable">
            <div className="card-primary card-outline">
              <div className="card">
                <div className="card-header">
                  <div>
                    <button
                      type="button"
                      className="btn btn-info"
                      data-toggle="modal"
                      data-target="#modal-default"
                      onClick={() => {
                        setIsEditing(false);
                        handleShow();
                      }}
                    >
                      THÊM DANH MỤC
                    </button>
                  </div>
                </div>

                <Modal size="lg" show={modal} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>
                      {isEditing ? "EDIT DANH MỤC" : "THÊM DANH MỤC"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Tên Danh Mục</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nameCategory"
                          {...formik.getFieldProps("nameCategory")}
                          placeholder="Danh Mục"
                        />
                        {formik.touched.nameCategory &&
                        formik.errors.nameCategory ? (
                          <div className="text-danger">
                            {formik.errors.nameCategory}
                          </div>
                        ) : null}
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Đóng
                    </Button>
                    <Button variant="primary" onClick={formik.handleSubmit}>
                      {isEditing ? "Cập nhật" : "Thêm"}
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className="card-body">
                  <div className="table-responsive p-0">
                    <table className="table table-bordered table-striped table-hover">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>TÊN DANH MỤC</th>
                          <th>THỜI GIAN</th>
                          <th>THAO TÁC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.length > 0
                          ? ( categories.map((huydev, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{huydev.nameCategory}</td>
                                <td>
                                  {new Date(huydev.create_at).toLocaleString()}
                                </td>
                                <td style={{ gap: 20 }}>
                                  <button
                                    style={{
                                      color: "white",
                                      marginRight: 5,
                                    }}
                                    className="btn btn-info btn-sm btn-icon-left m-b-10"
                                    type="button"
                                    onClick={() => handleEdit(huydev)}
                                  >
                                    <i className="fas fa-edit mr-1"></i>
                                    <span className="">Edit</span>
                                  </button>

                                  <button
                                    style={{ color: "white" }}
                                    className="btn btn-danger btn-sm btn-icon-left m-b-10"
                                    type="button"
                                    onClick={() => handleDelete(huydev.id)}
                                  >
                                    <i className="fas fa-trash mr-1"></i>
                                    <span className="">Delete</span>
                                  </button>
                                </td>
                              </tr>
                            ))
                         ) : (
                          <td colspan="4" class="text-center">
                            <span class="text-danger font-weight-bold">
                              Không Có Dữ Liệu ...
                            </span>
                          </td>
                         )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card-footer clearfix">
                  VUI LÒNG THAO TÁC CẨN THẬN
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
