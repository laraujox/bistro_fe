export interface WebSocketMessage {
    upgrade: boolean;
    order_id: number;
    [key: string]: any;
}
export interface CallbackWebSocketMessage {
    order_status: string;
    order_id: number;
    [key: string]: any;
}