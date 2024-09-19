import Counter from "@/components/menu/counter";
import Image from 'next/image';
import cartIcon from '@/app/static/cart-icon.png';
import hideIcon from '@/app/static/hide-icon.png';
import React, {useState} from 'react';


interface FloatingCartProps {
    quantities: { [key: string]: number };
    menuItems: MenuItems;
    onQuantityChange: (id: number, quantity: number) => void;
}

function getCartHeight(cartItemsAmount: number): number {
    const headerSize = 180
    const rowHeight = 85
    const itemsHeight = cartItemsAmount * rowHeight + headerSize
    const maxHeight = 463
    return Math.min(itemsHeight, maxHeight)
}

const FloatingCart: React.FC<FloatingCartProps> = ({
                                                       quantities,
                                                       menuItems,
                                                       onQuantityChange
                                                   }) => {
    const [isVisible, setIsVisible] = useState(true);

    const selectedItems = Object.keys(quantities)
        .filter(id => quantities[id] > 0)
        .map(id => {
            const item = menuItems.find(menuItem => menuItem.id === parseInt(id));
            return {
                ...item,
                quantity: quantities[id]
            };
        });

    const cartItemsAmount = selectedItems.length
    const cartHeight = getCartHeight(cartItemsAmount)
    const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const isCartEmpty = selectedItems.length === 0
    const toggleCart = () => {
        setIsVisible(!isVisible);
    };

    // @ts-ignore
    return (
        <>
            <div
                className="fixed right-4 z-50 transform transition-all duration-700"
                style={{bottom: isVisible ? `${cartHeight}px` : '20px'}}
            >
                {!isVisible &&
                    <div>
                        <span className="pl-[22px] text-[22px]">{cartItemsAmount}</span>
                        <Image
                            src={cartIcon}
                            alt={'Show Cart'}
                            width={50}
                            height={50}
                            className="cursor-pointer"
                            onClick={toggleCart}
                        />
                    </div>
                }
            </div>

            <div
                className={`overflow-auto h-auto w-auto min-w-[400px] fixed bottom-0 right-0 bg-white shadow-lg px-4 pt-2 transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{
                    maxHeight: isVisible ? `${cartHeight}px` : '0',

                }}
            >
                <div
                    className={`flex flex-row items-center ${isCartEmpty ? 'justify-between' : 'justify-end'}`}
                    style={{
                        maxHeight: isVisible ? `${cartHeight}px` : '0',
                    }}>

                    {isCartEmpty && (
                        <p>Seu carrinho está vazio.</p>
                    )}
                    {isVisible &&
                        <Image
                            src={hideIcon}
                            alt={'Hide Cart'}
                            width={50}
                            height={50}
                            className={`cursor-pointer`}
                            onClick={toggleCart}
                        />
                    }
                </div>
                {!isCartEmpty && (
                    <div className="grid grid-cols-[80px,1fr,80px,80px,auto] gap-4">
                        <span></span>
                        <span className="font-bold">Produto</span>
                        <span className="font-bold">Qtd.</span>
                        <span className="font-bold">Preço</span>
                        <span className="font-bold"></span>

                        {selectedItems.map((item) => (
                            <React.Fragment key={item.id}>
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-[70px]"
                                />
                                <span>{item.name}</span>
                                <span>{item.quantity}</span>
                                <span>R${(item.price * item.quantity).toFixed(2)}</span>
                                <Counter
                                    id={item.id + "_cart"}
                                    quantity={item.quantity}
                                    onQuantityChange={onQuantityChange}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                )
                }
                <div
                    className="sticky right-0 bottom-0 bg-white font-bold mt-4 flex flex-row justify-between align-center">
                <span
                    className="flex items-center">Total: R${totalPrice.toFixed(2)}</span>

                    <button type="submit"
                            className="mt-4 mb-6 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                        Finalizar compra
                    </button>
                </div>
            </div>
        </>
    );
};

export default FloatingCart;
