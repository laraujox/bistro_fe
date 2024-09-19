"use client";

interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
}

export default function CategoriesMenu({ categories, selectedCategory, onCategoryChange }: CategoryMenuProps) {


    return (<div>
        <ul className="flex w-full h-[75px] items-center justify-center bg-vanilla">
            <li className={`mt-2 cursor-pointer hover:underline text-black mx-5 ${
                  selectedCategory === null ? "underline" : ""
                }`}
                key="0" onClick={() => {
                onCategoryChange(null)
            }}
            >
                Todos
            </li>
            {categories.map(category => (
                <li className={`mt-2 cursor-pointer hover:underline text-black mx-5 ${
                  selectedCategory?.id === category.id ? "underline" : ""
                }`}
                    key={category.id} onClick={() => {
                    onCategoryChange(category)
                }}
                >
                    {category.name}
                </li>
            ))}
        </ul>
    </div>);
}
