"use client";
import OrderComponent from "@/components/orders/order"; // Ensure correct import path
import { getOrders } from "@/app/api";
import { useEffect, useState } from "react";

interface Response {
    status: string;
    orders: Order[];
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        getOrders().then((response: Response) => {
            setOrders(response.orders);
        }).catch((error) => {
            console.error('Error fetching orders:', error);
        });
    }, []);

    return (
        <div className="flex flex-row bg-white w-full min-h-[100px] h-auto overflow-x-scroll">
            {orders.length > 0 ? (
                orders.map(order => (
                    <OrderComponent key={order.id} order={order} />
                ))
            ) : (
                <p>No orders available</p> // Display a fallback message if no orders
            )}
        </div>
    );
}
