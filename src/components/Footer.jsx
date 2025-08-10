import React from "react";

export default function Footer() {
  return (
    <div className=" bg-white my-4 p-4 w-full justify-content-center border-round-xl" >
      <div className="row g-4">
        <div className="col-md-3 col-sm-6">
          <h1 className="fw-bold">Hanzii</h1>
          <h6 className="text-muted">Từ điển Trung - Việt</h6>
        </div>

        <div className="col-md-3 col-sm-6">
          <h6 className="fw-bold mb-2">Thông tin</h6>
          <ul className="list-unstyled">
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Chính sách</a>
            </li>
            <li>
              <a href="#">Điều khoản</a>
            </li>
            <li>
              <a href="#">Trợ giúp</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 col-sm-6">
          <h6 className="fw-bold mb-2">Chính sách</h6>
          <ul className="list-unstyled">
            <li>
              <a href="#">Giao dịch</a>
            </li>
            <li>
              <a href="#">Hướng dẫn mua hàng</a>
            </li>
            <li>
              <a href="#">Thanh toán</a>
            </li>
            <li>
              <a href="#">Kiểm hàng</a>
            </li>
            <li>
              <a href="#">Bảo mật thông tin</a>
            </li>
            <li>
              <a href="#">Vận chuyển & giao nhận</a>
            </li>
            <li>
              <a href="#">Tiếp nhận & khiếu nại</a>
            </li>
            <li>
              <a href="#">Đổi trả, hoàn tiền</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 col-sm-6">
          <h6 className="fw-bold mb-2">Liên hệ</h6>
          <ul className="list-unstyled">
            <li>
              <a href="tel:+84976696764">(+84) 976 696 764</a>
            </li>
            <li>
              <a href="mailto:support@hanzii.net">support@hanzii.net</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
