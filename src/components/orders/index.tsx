"use client";
import Order from "@/components/orders/order";
import {getOrders} from "@/app/api";
import {useEffect, useState} from "react";

export default function Orders(){
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrders().then((response => {
            setOrders(response);
            console.log(response)
        }))
    }, []);
    return <div>
        <div className="bg-white w-full h-[900px]">
            <Order/>
        </div>
    </div>
}