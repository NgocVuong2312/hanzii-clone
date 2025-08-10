import React from "react";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { menuItems } from "../MenuItem";
import { Image } from "primereact/image";
import { Avatar } from "primereact/avatar";

export default function Menu() {
  const navigate = useNavigate();
  return (
    <div className=" w-full flex justify-content-between align-items-center mt-3 bg-white-alpha-80 p-1	border-round-2xl">
      <div className="cursor-pointer flex align-items-center">
        <Image
          src="/logo.png"
          alt="Image"
          width="30px"
          height="30px"
          className="mr-3"
        />
        <a
          href="/"
          className="no-underline text-black-alpha-90 text-2xl font-bold inline-block"
        >
          Hanzi.net
        </a>
      </div>
      <div className="flex gap-4 font-medium">
  {menuItems.map((m) => (
    <a
      key={m.label}
      onClick={(e) => {
        e.preventDefault(); // Ngăn tải lại trang
        navigate(m.src);
      }}
      href={m.src}
      className="flex text-black-alpha-90  align-items-center gap-2 px-3 py-2 border-round-lg no-underline cursor-pointer"
    >
      {m.label}
    </a>
  ))}
</div>
      <div className="flex align-items-center gap-3 h-full ">
        <div
          className="flex align-items-center p-2 border border-round-xl "
          style={{backgroundColor:"#f2f2f2"}}
        >
          <i className="pi pi-bell text-base border-right-1 pr-1 "></i>
          <i className="pi pi-cog ml-1  "></i>
        </div>
        <img
          src="/logo.png"
          alt="Image"
          width="30px"
          height="30px"
          style={{
            borderRadius:"50%"
          }}
          className="mr-3 border-round-3xl"
        />
      </div>
    </div>
  );
}
