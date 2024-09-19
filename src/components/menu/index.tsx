"use client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Counter from "@/components/menu/counter";
import Loading from "@/components/menu/loading";
import {getCategories, getProducts} from "@/components/menu/api";
import CategoriesMenu from "@/components/menu/categoriesMenu";
import FloatingCart from "@/components/menu/FloatingCart";


export default function Menu() {
  const [categories, setCategories] = useState<Categories>([]);
  const [menuItems, setMenuItems] = useState<MenuItems>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItems>([]);
  const initialQuantities: { [key: string]: number } = {};

  useEffect(() => {
    getCategories().then(response => {
        setCategories(response);
    })
    getProducts().then(response => {
      setMenuItems(response);

      response.forEach((item: { id: string | number; }) => {
        initialQuantities[item.id] = 0;
      });
      setQuantities(initialQuantities);
    })
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredMenuItems(menuItems.filter(menuItem => menuItem.category === selectedCategory.id));
    } else {
      setFilteredMenuItems(menuItems);
    }
  }, [selectedCategory, menuItems]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setQuantities({ ...quantities, [id]: newQuantity });
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const orderData = Object.keys(quantities)
        .filter(id => quantities[id]>0)
        .map(id=>({
          id: parseInt(id),
          quantity: quantities[id]
    }))
    if (orderData.length === 0) {
      alert("Please select at least one product!");
      return;
    }
    try{
      await axios.post(
        'http://localhost:8000/order',
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      );
      alert("Order placed!")
      setQuantities(initialQuantities)
    } catch (error) {
      console.log("Error submitting the form to the API.", error)
    }
  };

  return <div>
    <CategoriesMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
    />
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">
      <div className="bg-white w-full">
        <div
            className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div
              className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
              filteredMenuItems.length > 0 ?
                  (
                      filteredMenuItems.map((item, index) => (
                          <div key={index} className="flex flex-col justify-between">
                            <div className="group relative">
                              <div
                                  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                              </div>
                              <div className="mt-4 flex justify-between">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                    <a href="#">
                                      <span aria-hidden="true"
                                            className="absolute inset-0"></span>
                                      {item.name}
                                    </a>
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">R${item.price}</p>
                              </div>
                            </div>
                            <Counter
                                id={item.id}
                                quantity={quantities[item.id]}
                                onQuantityChange={handleQuantityChange}

                            />
                          </div>
                      ))
                  )
                  :
                  (
                      <Loading/>
                  )
            }
          </div>
        </div>
      </div>
      <button type="submit"
              className="mt-4 mb-6 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">Finalizar
        compra
      </button>
      <FloatingCart
          quantities={quantities}
          menuItems={menuItems}
          onQuantityChange={handleQuantityChange}
      />

    </form>
  </div>
}