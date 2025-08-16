import React from "react";

export default function Footer() {
  return (
    <div className="bg-white my-4 p-4 w-100 border-round-xl">
      <div className="row g-4">
        {/* Logo */}
        <div className="col-lg-4 col-md-6">
          <h1 className="fw-bold">Hanzii</h1>
          <h6 className="text-muted">Từ điển Trung - Việt</h6>
        </div>

        {/* Thông tin */}
        <div className="col-lg-2 col-md-6">
          <h6 className="fw-bold mb-2">Thông tin</h6>
          <ul className="list-unstyled mb-0">
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Chính sách</a></li>
            <li><a href="#">Điều khoản</a></li>
            <li><a href="#">Trợ giúp</a></li>
          </ul>
        </div>

        {/* Chính sách */}
        <div className="col-lg-2 col-md-6">
          <h6 className="fw-bold mb-2">Chính sách</h6>
          <ul className="list-unstyled mb-0">
            <li><a href="#">Giao dịch</a></li>
            <li><a href="#">Hướng dẫn mua hàng</a></li>
            <li><a href="#">Thanh toán</a></li>
            <li><a href="#">Kiểm hàng</a></li>
            <li><a href="#">Bảo mật thông tin</a></li>
            <li><a href="#">Vận chuyển & giao nhận</a></li>
            <li><a href="#">Tiếp nhận & khiếu nại</a></li>
            <li><a href="#">Đổi trả, hoàn tiền</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div className="col-lg-2 col-md-6">
          <h6 className="fw-bold mb-2">Liên hệ</h6>
          <ul className="list-unstyled mb-0">
            <li><a href="tel:+84976696764">(+84) 976 696 764</a></li>
            <li><a href="mailto:support@hanzii.net">support@hanzii.net</a></li>
            <li>
              <span>Các ứng dụng khác</span>
              <div className="d-flex flex-wrap gap-2 mt-1">
                <img src="faztaa.png" alt="Faztaa" width="32" height="32" />
                <img src="dunno.png" alt="Dunno" width="32" height="32" />
                <img src="todaii_english.png" alt="Todaii English" width="32" height="32" />
                <img src="/todaii_german.png" alt="Todaii German" width="32" height="32" />
                <img src="/todaii_japanese.png" alt="Todaii Japanese" width="32" height="32" />
                <img src="/todaiichinese40x40.png" alt="Todaii Chinese" width="32" height="32" />
              </div>
            </li>
          </ul>
        </div>

        {/* Tải ngay */}
        <div className="col-lg-2 col-md-6">
          <h6 className="fw-bold mb-2">Tải ngay</h6>
          <div className="d-flex flex-column gap-2">
            <img src="/{B76F85BE-4A14-4FFB-9DDE-FD218ECE3A35}.png" alt="App 1" width="120" className="border-round-lg" />
            <img src="/{41EDC3FE-DE73-4E7A-8E3D-32C6CF0CBBB0}.png" alt="App 2" width="120" className="border-round-lg" />
            <img src="/{8F7B7854-C68A-4941-B8DA-732B7AC6D40C}.png" alt="App 3" width="120" className="border-round-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
