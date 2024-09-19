import React from 'react';

interface CounterProps {
  id: number;
  quantity: number;
  onQuantityChange: (id: number, quantity: number) => void;
}

const Counter = ({ id, quantity, onQuantityChange }: CounterProps) => {
  const handleIncrement = () => onQuantityChange(id, quantity + 1);
  const handleDecrement = () => onQuantityChange(id, quantity > 0 ? quantity - 1 : 0);

  return (
    <div className="relative flex items-center max-w-[8rem]">
      <button
        type="button"
        id={`decrement-button-product-${id}`}
        data-input-counter-decrement={`quantity-product-${id}`}
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        onClick={handleDecrement}
      >
        <svg
          className="w-3 h-3 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
        </svg>
      </button>
      <input
        type="text"
        id={`quantity-product-${id}`}
        value={quantity}
        data-input-counter
        className="border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 bg-gray-200"
        placeholder="999"
      />
      <button
        type="button"
        id={`increment-button-product-${id}`}
        data-input-counter-increment={`quantity-product-${id}`}
        className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        onClick={handleIncrement}
      >
        <svg
          className="w-3 h-3 text-gray-900 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
        </svg>
      </button>
    </div>
  );
};

export default Counter;
