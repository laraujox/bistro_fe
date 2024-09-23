"use client";
import OrderComponent from "@/components/orders/order"; // Ensure correct import path
import { getOrders } from "@/app/api";
import { useEffect, useState } from "react";

interface Response {
    status: string;
    orders: Order[];
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]); // Initialize as an empty array

    useEffect(() => {
        getOrders().then((response: Response) => { // Ensure the response is an array of Orders
            setOrders(response.orders); // Set orders if it's an array
        }).catch((error) => {
            console.error('Error fetching orders:', error);
        });
    }, []);

    return (
        <div className="bg-white w-full h-[900px]">
            {orders.length > 0 ? ( // Check if orders array has content
                orders.map(order => (
                    <OrderComponent key={order.id} order={order} />
                ))
            ) : (
                <p>No orders available</p> // Display a fallback message if no orders
            )}
        </div>
    );
}
