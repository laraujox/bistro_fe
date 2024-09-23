"use client";

export default function OrderComponent({ order }: { order: Order }) {
    return (
        <div>
            <div className="bg-red-300 w-[400px] h-auto p-5">
                <div className="w-full flex justify-between">
                    <span className="font-bold text-3xl">#{order.id}</span> {/* Order ID */}
                    <div>
                        <button className="mx-1">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                                alt=""
                                className="w-[30px]"
                            />
                        </button>
                        <button className="mx-1">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3334/3334328.png"
                                alt=""
                                className="w-[30px]"
                            />
                        </button>
                    </div>
                </div>
                <div className="w-full justify-center flex">
                    <span className="text-2xl">Mesa {order.table_id} ({order.status})</span> {/* Table number and status */}
                </div>

                {/* Rendering items dynamically */}
                {order.items.map((item, index) => (
                    <div className="my-4" key={index}>
                        <h2 className="font-bold text-xl">{item.product__category__name}</h2> {/* Category name */}
                        <ul className="list-disc ml-6">
                            <li>{item.quantity}x {item.product__name}</li> {/* Quantity and item name */}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
