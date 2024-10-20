"use client";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Make sure this is imported!
import {CallbackWebSocketMessage, WebSocketMessage} from "@/app/interfaces";
import useWebSocket from "@/app/useWebsocket";
import {ORDERS_WEBSOCKET_URL} from "@/app/constants";
import {useCallback, useState} from "react";

const statusColors: { [key: string]: string } = {
  PENDING: "bg-red-300",
  PREPARING: "bg-amber-200",
  READY: "bg-green-300",
  CANCELED: "bg-red-300",
  FINISHED: "bg-green-300",
};

const getBgColor = (status: string) => statusColors[status] || "bg-gray-300"; // Fallback for unknown status

interface OrderComponentProps {
  order: Order;
}

export default function OrderComponent({ order }: OrderComponentProps) {
  const [currentOrder, setCurrentOrder] = useState<Order>(order);

  const onMessageCallback = useCallback((data: CallbackWebSocketMessage) => {
    console.log("WebSocket Message Received: ", data);
    setCurrentOrder((prevOrder) => ({
      ...prevOrder,
      status: data.order_status,
    }));
    console.log(`Order ${currentOrder.id} updated to status: ${data.order_status}`)
  }, [currentOrder.id]); // Empty dependency array means this callback will be memoized and not change on re-renders

  const { sendMessage } = useWebSocket(
    ORDERS_WEBSOCKET_URL, onMessageCallback
  );
  const openEditOrderModal = (order: Order) => {
    // TODO: Implement this method's logic
    console.log("Open Edit Order Modal", order);
  };

  const cancelOrder = (orderId: number) => {
    // TODO: Implement this method's logic
    console.log("Cancel Order", orderId);
  };

  const handleUpgradeOrderStatus = (orderId: number) => {
    sendMessage({ upgrade: true, order_id: orderId });
  };

  const handleDowngradeOrderStatus = (orderId: number) => {
    sendMessage({ upgrade: false, order_id: orderId });
  };

  const bgColor = getBgColor(currentOrder.status);

  return (
    <div className={`min-w-[325px] h-auto p-5 m-3 ${bgColor} transition-colors duration-500 ease-in-out `}>
      <div className="w-full flex justify-between">
        <span className="font-bold text-3xl">#{currentOrder.id}</span>
        <div>
          <button className="blur-sm mx-1" onClick={() => openEditOrderModal(order)}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
              alt="Edit"
              className="w-[30px]"
            />
          </button>
          <button className="blur-sm mx-1" onClick={() => cancelOrder(currentOrder.id)}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3334/3334328.png"
              alt="Cancel"
              className="w-[30px]"
            />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-between items-center ">
        <button onClick={() => handleDowngradeOrderStatus(currentOrder.id)} className="icon-hover">
          <FontAwesomeIcon size="2x" icon={faArrowLeft}/>
        </button>

        <span className="text-2xl">{currentOrder.status}</span>

        <button onClick={() => handleUpgradeOrderStatus(currentOrder.id)} className="icon-hover">
          <FontAwesomeIcon size="2x" icon={faArrowRight}/>
        </button>
      </div>

      <div className="w-full flex justify-center items-center">
        <span className="text-xl">Mesa: {currentOrder.table_id}</span>
      </div>

      {currentOrder.items.map((item, index) => (
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
