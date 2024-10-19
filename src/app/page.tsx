"use client";
import Menu from "@/components/menu";
import Image from "next/image";
import nilluLogo from "@/app/static/nillu-logo.jpeg";
import React, {useState} from "react";
import Orders from "@/components/orders";


export default function Home() {
  const [activePage, setActivePage] = useState("orders")
  return <div>
    <div className="flex flex-row items-center justify-center text-white">
      <button onClick={()=>setActivePage("menu")} className="text-3xl text-white hover:underline transition duration-300 mx-2">Menu</button>
      <Image src={nilluLogo} alt="Nillu Bistrot" className="w-[100px] mx-2"/>
      <button onClick={()=>setActivePage("orders")} className="text-3xl text-white hover:underline transition duration-300 mx-2">Orders</button>
    </div>

    {activePage === 'menu' && <Menu />}
    {activePage === 'orders' && <Orders />}
  </div>
}