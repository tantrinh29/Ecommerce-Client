import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {
  addProductAPI,
  deleteProductById,
  listProductAPI,
  updateProductAPI,
} from "../../api/productApi";
import { listCategoryAPI } from "../../api/categoryApi";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils";

export default function Products() {
  // lấy danh mục
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await listProductAPI();
      setProducts(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await listCategoryAPI();
      setCategories(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShow = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
    setIsEditing(false);
    formik.resetForm();
  };

  // Sử lý form
  const formik = useFormik({
    initialValues: {
      nameProduct: "",
      priceProduct: "",
      imageProduct: "",
      introduceProduct: "",
      descProduct: "",
      categoryID: "",
    },

    validationSchema: Yup.object({
      nameProduct: Yup.string().required("Name is required"),
      priceProduct: Yup.string().required("Price is required"),
      imageProduct: Yup.string().required("Image is required"),
      introduceProduct: Yup.string().required("Introduce is required"),
      descProduct: Yup.string().required("Description is required"),
      categoryID: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (isEditing) {
        const result = await updateProductAPI(values.cateID, values);
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
        const result = await addProductAPI(values);
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
      fetchProducts();
      resetForm();
      handleClose();
    },
  });

  const handleEdit = (product) => {
    formik.setValues({
      productID: product.id,
      nameProduct: product.nameProduct,
      priceProduct: product.priceProduct,
      imageProduct: product.imageProduct,
      introduceProduct: product.introduceProduct,
      descProduct: product.descProduct,
      categoryID: product.categoryID,
    });
    setIsEditing(true);
    handleShow();
  };

  // delete
  const handleDelete = async (modelId) => {
    const userConfirm = window.confirm(
      `Bạn có chắc chắn muốn xóa ID ${modelId}?`
    );
    if (userConfirm) {
      try {
        const result = await deleteProductById(modelId);
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
      } catch (error) {
        console.error(error);
      }
      fetchProducts();
    }
  };

  return (
    <>
      <div className="content-header">
        <ToastContainer />
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Product</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="#">Product</Link>
                </li>
                <li className="breadcrumb-item active">DS Product</li>
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
                      THÊM SẢN PHẨM
                    </button>
                  </div>
                </div>

                <Modal size="lg" show={modal} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>
                      {isEditing ? "EDIT SẢN PHẨM" : "THÊM SẢN PHẨM"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Tên Sản Phẩm</label>
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          placeholder="Enter product name"
                          {...formik.getFieldProps("nameProduct")}
                        />
                        {formik.touched.nameProduct &&
                        formik.errors.nameProduct ? (
                          <div className="text-danger">
                            {formik.errors.nameProduct}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="productPrice"> Price</label>
                        <input
                          type="number"
                          className="form-control"
                          id="productPrice"
                          placeholder="Enter product price"
                          {...formik.getFieldProps("priceProduct")}
                        />
                        {formik.touched.priceProduct &&
                        formik.errors.priceProduct ? (
                          <div className="text-danger">
                            {formik.errors.priceProduct}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="productImage"> Image</label>
                        <input
                          type="text"
                          className="form-control"
                          id="productImage"
                          placeholder="Enter product image"
                          {...formik.getFieldProps("imageProduct")}
                        />
                        {formik.touched.imageProduct &&
                        formik.errors.imageProduct ? (
                          <div className="text-danger">
                            {formik.errors.imageProduct}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="productCategory">Category</label>
                        <select
                          className="form-control"
                          id="productCategory"
                          {...formik.getFieldProps("categoryID")}
                        >
                          <option value="">Select category</option>
                          {categories.map((huyit) => (
                            <option key={huyit.id} value={huyit.id}>
                              {huyit.nameCategory}
                            </option>
                          ))}
                        </select>
                        {formik.touched.categoryID &&
                        formik.errors.categoryID ? (
                          <div className="text-danger">
                            {formik.errors.categoryID}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="productIntroduce">Introduce</label>
                        <textarea
                          className="form-control"
                          id="productIntroduce"
                          rows="3"
                          placeholder="Enter product Introduce"
                          {...formik.getFieldProps("introduceProduct")}
                        ></textarea>
                        {formik.touched.introduceProduct &&
                        formik.errors.introduceProduct ? (
                          <div className="text-danger">
                            {formik.errors.introduceProduct}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="descProduct"> Description</label>
                        <JoditEditor
                          id="descProduct"
                          name="descProduct"
                          onBlur={formik.handleBlur}
                          value={formik.values.descProduct}
                          onChange={(content) =>
                            formik.setFieldValue("descProduct", content)
                          }
                        />
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
                          <th>IMAGE</th>
                          <th width="150">NAME</th>
                          <th>PRICE</th>
                          <th width="200">INTRODUCE</th>
                          <th>CATEGORY</th>
                          <th>THỜI GIAN</th>
                          <th>THAO TÁC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length > 0
                          ? ( products.map((huydev, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    width={100}
                                    src={huydev.imageProduct}
                                    alt=""
                                  ></img>
                                </td>
                                <td>{huydev.nameProduct}</td>
                                <td>{formatPrice(huydev.priceProduct)}</td>
                                <td>{huydev.introduceProduct}</td>
                                <td>{huydev.nameCategory}</td>
                                <td>
                                  {new Date(huydev.created_at).toLocaleString()}
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
                          <td colspan="8" class="text-center">
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
