import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { menuItems } from "../MenuItem";
import { Image } from "primereact/image";
import { Button } from "antd";
import { Modal, Form, Input, Tabs } from "antd";

export default function Menu() {
  const URL = "http://localhost:3002/User";
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(false); // menu mobile
  const [isOpenLogin, setIsOpenLogin] = useState(false); // popup login
  const [activetab, setactivetab] = useState(location.pathname);
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (User) {
      setLoginSuccess(true);
      setUserName(User.username);
    }
  }, [User]);
  const handleLogout = () => {
    setIsOpenLogout(true);
  };
  const fetchUsers = async () => {
    const response = await axios.get(URL);
    setUsers(response.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleLogin = () => {
    setIsOpenLogin(true); // mở popup khi bấm nút login
    setIsOpenRegister(false);
  };
  const login = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(userEmail)) {
      alert("Email không hợp lệ!");
      return;
    }
    let pass = userPassword?.trim();
    if (!pass.trim()) {
      alert("Mật khẩu không được để trống!");
      return;
    } else if (pass?.length < 8 || pass?.length > 16) {
      alert("Mật khẩu phải từ 8 đến 16 ký tự!");
      return;
    } else if (!/[A-Z]/.test(pass)) {
      alert("Mật khẩu phải có ít nhất một chữ cái viết hoa!");
      return;
    } else if (!/[a-z]/.test(pass)) {
      alert("Mật khẩu phải có ít nhất một chữ cái viết thường!");
      return;
    } else if (!/[0-9]/.test(pass)) {
      alert("Mật khẩu phải có ít nhất một chữ số!");
      return;
    } else if (!/[^A-Za-z0-9]/.test(pass)) {
      alert("Mật khẩu phải có ít nhất một ký tự đặc biệt!");
      return;
    }
    const account = users.find(
      (acc) => acc.email === userEmail && acc.password === userPassword
    );

    if (account) {
      setIsOpenLogin(false);
      setLoginSuccess(true);
      localStorage.setItem("user", JSON.stringify({ username: account.username }));
      window.location.reload();
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const handleNavigate = (src) => {
    navigate(src);
    setactivetab(src);
    setIsOpenMenu(false);
  };
  const handleRegister = () => {
    setIsOpenRegister(true);
    setIsOpenLogin(false);
  };

  const register = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(userEmail)) {
      alert("Email không hợp lệ!");
      return;
    }
    let pass = userPassword?.trim();
    if (!pass.trim()) {
      alert("Mật khẩu không được để trống!");
      return;
    } else if (pass?.length < 8 || pass?.length > 16) {
      alert("Mật khẩu phải từ 8 đến 16 ký tự!");
      return;
    } else if (!/[A-Z]/.test(pass)) {
      alert("Mật khẩu phải có ít nhất một chữ cái viết hoa!");
      return;
    } else if (!/[a-z]/.test(pass)) {
      alert("Mật khẩu phải có ít nhất một chữ cái viết thường!");
      return;
    } else if (!/[0-9]/.test(pass)) {
      alert("Mật khẩu phải có ít nhất một chữ số!");
      return;
    } else if (!/[^A-Za-z0-9]/.test(pass)) {
      alert("Mật khẩu phải có ít nhất một ký tự đặc biệt!");
      return;
    }
    const userExist = users.find((user) => user.email === userEmail);
    if (userExist) {
      alert("User already exists");
      return;
    }
    const newUser = {
      username: userName,
      email: userEmail,
      password: userPassword,
    };
    axios
      .post(URL, newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        alert("Registration successful");
        setIsOpenRegister(false);
      })
      .catch((error) => {
        console.error("There was an error registering the user!", error);
      });
  };

  return (
    <div className="w-full">
      {/* Thanh menu chính */}
      <div className="flex justify-content-between align-items-center mt-3 bg-white-alpha-80 p-1 border-round-2xl relative">
        {/* Icon bars cho mobile */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          <i className={isOpenMenu ? "pi pi-times" : "pi pi-bars"}></i>
        </div>

        {/* Logo */}
        <div className="cursor-pointer flex align-items-center">
          <Image
            src="/logo.png"
            alt="Image"
            width="30px"
            height="30px"
            className="mx-3"
          />
          <a
            href="/"
            className="no-underline text-black-alpha-90 text-2xl font-bold inline-block"
          >
            Hanzi.net
          </a>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-4 font-medium">
          {menuItems.map((m) => (
            <a
              key={m.label}
              href={m.src}
              onClick={(e) => {
                e.preventDefault();
                navigate(m.src);
                setactivetab(m.src);
                setIsOpenMenu(false);
              }}
              style={
                activetab === m.src
                  ? { backgroundColor: "#e3ecf6", color: "#324671" }
                  : { color: "black" }
              }
              className="flex align-items-center gap-2 px-3 py-2 border-round-xl no-underline cursor-pointer"
            >
              {activetab === m.src && <i className={m.icon}></i>}
              {m.label}
            </a>
          ))}
        </div>

        {/* Account */}
        <div className="flex align-items-center gap-3 h-full">
          <div
            className="hidden md:flex align-items-center p-2 border border-round-xl"
            style={{ backgroundColor: "#f2f2f2" }}
          >
            <i className="pi pi-bell text-base border-right-1 pr-1"></i>
            <i className="pi pi-cog ml-1"></i>
          </div>
          {loginSuccess && (
            <img
              src="/logo.png"
              alt="Image"
              width="30px"
              height="30px"
              style={{ borderRadius: "50%" }}
              onClick={handleLogout}
            />
          )}
          {!loginSuccess && (
            <Button onClick={handleLogin} label="Đăng Nhập">
              Đăng Nhập
            </Button>
          )}
        </div>
      </div>

      {/* Menu phụ cho mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white shadow-md border-round-b-2xl ${
          isOpenMenu ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-column gap-2 px-3 py-4">
          {menuItems.map((m) => (
            <div
              key={m.label}
              onClick={() => handleNavigate(m.src)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer ${
                activetab === m.src ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <i className={`${m.icon} text-lg`}></i>
              <span className="text-base">{m.label}</span>
            </div>
          ))}

          {/* Thông báo */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer hover:bg-gray-100">
            <i className="pi pi-bell text-lg" />
            <span>Thông báo</span>
          </div>

          {/* Cài đặt */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer hover:bg-gray-100">
            <i className="pi pi-cog text-lg" />
            <span className="text-base">Cài đặt</span>
          </div>
        </div>
      </div>

      <Modal
        open={isOpenLogin}
        onCancel={() => setIsOpenLogin(false)}
        footer={null}
        centered
        title="Đăng Nhập"
      >
        <Form layout="vertical" onFinish={login}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input onChange={(e) => setUserEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password onChange={(e) => setUserPassword(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>

          <Button type="link" block onClick={handleRegister}>
            Chưa có tài khoản? Đăng ký
          </Button>
        </Form>
      </Modal>

      {/* Modal Register */}
      <Modal
        open={isOpenRegister}
        onCancel={() => setIsOpenRegister(false)}
        footer={null}
        centered
        title="Đăng ký"
      >
        <Form layout="vertical" onFinish={register}>
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input onChange={(e) => setUserName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input onChange={(e) => setUserEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password onChange={(e) => setUserPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng ký
            </Button>
          </Form.Item>

          <Button type="link" block onClick={handleLogin}>
            Đã có tài khoản? Đăng nhập
          </Button>
        </Form>
      </Modal>

      {/* Modal Logout */}
      <Modal
        open={isOpenLogout}
        onCancel={() => setIsOpenLogout(false)}
        footer={null}
        centered
        title="Đăng xuất"
      >
        <p>Bạn có chắc muốn đăng xuất?</p>
        <div className="flex gap-3 mt-3">
          <Button
            danger
            onClick={() => {
              setLoginSuccess(false);
              localStorage.removeItem("user");
              setIsOpenLogout(false);
              window.location.reload();
            }}
          >
            Đăng xuất
          </Button>
          <Button onClick={() => setIsOpenLogout(false)}>Hủy</Button>
        </div>
      </Modal>
    </div>
  );
}
