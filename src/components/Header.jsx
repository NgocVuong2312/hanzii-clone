import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { menuItems } from "../MenuItem";
import { Image } from "primereact/image";

export default function Menu() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activetab, setactivetab] = useState(location.pathname);
  const navigate = useNavigate();

  const handleNavigate = (src) => {
    navigate(src);
    setactivetab(src);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {/* Thanh menu chính */}
      <div className="flex justify-content-between align-items-center mt-3 bg-white-alpha-80 p-1 border-round-2xl relative">
        {/* Icon bars cho mobile */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={isOpen ? "pi pi-times" : "pi pi-bars"}></i>
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
                setIsOpen(false);
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
          <img
            src="/logo.png"
            alt="Image"
            width="30px"
            height="30px"
            style={{ borderRadius: "50%" }}
            className="mr-3 border-round-3xl"
          />
        </div>
      </div>

      {/* Menu phụ cho mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white shadow-md border-round-b-2xl ${
          isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
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
    </div>
  );
}
