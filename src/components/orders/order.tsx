"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {upgradeOrderStatus, downgradeOrderStatus} from "@/app/api";
import {useEffect, useState} from "react";

const statusColors: { [key: string]: string } = {
  PENDING: "bg-red-300",
  PREPARING: "bg-amber-200",
  READY: "bg-green-300",
  CANCELED: "bg-red-300",
  FINISHED: "bg-green-300",
};

const getBgColor = (status: string) => statusColors[status];

export default function OrderComponent({ order }: { order: Order }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/orders/');

        socket.onopen = () => {
            console.log("WebSocket is open now.");
        };

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        socket.onclose = (e) => {
            console.log("WebSocket is closed now.");
        };

        setSocket(socket);

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket) {
            socket.send(JSON.stringify({ 'message': "Testing websocket." }));
        }
    };

      const openEditOrderModal = (order: Order) => {
          // TODO: Create method content
          sendMessage()
      };
      const cancelOrder = (orderId: number) => {
          // TODO: Create method content
          sendMessage()
      };


    const bgColor = getBgColor(order.status);

    return (
        <div className={`min-w-[325px] h-auto p-5 m-3  ${bgColor}`}>
            <div className="w-full flex justify-between">
                <span className="font-bold text-3xl">#{order.id}</span>
                <div>
                    <button className="mx-1" onClick={()=>openEditOrderModal(order)} >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                            alt=""
                            className="w-[30px]"
                        />
                    </button>
                    <button className="mx-1" onClick={()=>cancelOrder(order.id)} >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3334/3334328.png"
                            alt=""
                            className="w-[30px]"
                        />
                    </button>
                </div>
            </div>
            <div className="w-full flex justify-between items-center ">
                <button onClick={()=>downgradeOrderStatus(order.id)} className="icon-hover">
                    <FontAwesomeIcon size="2x" icon={faArrowLeft}/>
                </button>

                <span className="text-2xl">{order.status}</span>
                <button onClick={()=>upgradeOrderStatus(order.id)} className="icon-hover">
                    <FontAwesomeIcon size="2x" icon={faArrowRight}/>
                </button>

            </div>
            <div className="w-full flex justify-center items-center">
                <span className="text-xl">
                    Mesa: {order.table_id}
                </span>
            </div>

            {order.items.map((item, index) => (
                <div className="my-4" key={index}>
                    <h2 className="font-bold text-xl">{item.product__category__name}</h2>
                    <ul className="list-disc ml-6">
                        <li>{item.quantity}x {item.product__name}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}
