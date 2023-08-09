import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateOrderUser } from "../../redux/authSlide/authSlide";

export default function BillingInformation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.auth.user);

  const formik = useFormik({
    initialValues: {
      phone: user && user.phone ? user.phone : "",
      address: user && user.address ? user.address : "",
      note: "",
      email: user && user.email ? user.email : "", // Thêm giá trị mặc định cho ô input email
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Phone is required"),
      address: Yup.string().required("Address is required"),
      email: Yup.string().email("Invalid email").required("Email is required"), 
    }),
    onSubmit: async (values) => {
      const { phone, address, note } = values; 
      dispatch(updateOrderUser({ phone, address }, user.email));
      toast.success("Điền Thông Tin Khách Hàng Thành Công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.href = "/payment";
      }, 2000);
    },
  });
  return (
    <div className="container mx-auto p-5">
      <ToastContainer />
      <div className="row mt-3">
        <div className="col-sm-12">
          <h2 className="pb-3">Thông Tin Khách Hàng</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">
                Số Điện Thoại <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                {...formik.getFieldProps("phone")}
                value={formik.values.phone}
                placeholder="Số Điện Thoại"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-danger">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="email">
                Địa Chỉ Email <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="email"
                {...formik.getFieldProps("email")}
                value={formik.values.email}
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="address">
                Địa Chỉ <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Tên đường, Tòa nhà, Số nhà"
                {...formik.getFieldProps("address")}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-danger">{formik.errors.address}</div>
              ) : null}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="note">
                Ghi Chú Nếu Bạn Cần
                <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows="7"
                placeholder="Không nhập cũng đc"
                {...formik.getFieldProps("note")}
              ></textarea>
            </div>
            <div className="mt-3">
              <button className="btn btn-success">Tiếp Tục Thanh Toán</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
