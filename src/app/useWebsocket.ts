import { useState, useEffect } from 'react';
import {CallbackWebSocketMessage, WebSocketMessage} from "@/app/interfaces";

type OnMessageCallback = (data: CallbackWebSocketMessage) => void;

const useWebSocket = (url: string, onMessageCallback: OnMessageCallback) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        console.log("connecting to url", url)
        const socketInstance = new WebSocket(url);

        socketInstance.onopen = () => {
            console.log("WebSocket is open now.");
        };

        socketInstance.onmessage = (e: MessageEvent) => {
            const data = JSON.parse(e.data);
            onMessageCallback(data);
        };

        socketInstance.onclose = (e: CloseEvent) => {
            console.log("WebSocket is closed now.");
        };

        socketInstance.onerror = (e: Event) => {
            console.error("WebSocket error observed:", e);
        };

        setSocket(socketInstance);

        return () => {
            console.log("Cleaning up WebSocket");
            socketInstance.close();
        };
    }, [url, onMessageCallback]);

    const sendMessage = (message: WebSocketMessage) => {
        console.log("Sending message: ", message);
        if (socket) {
            socket.send(JSON.stringify(message));
        }
    };

    return { sendMessage };
};

export default useWebSocket;
