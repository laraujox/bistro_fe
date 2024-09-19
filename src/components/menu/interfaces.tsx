interface MenuItem {
    id: number;
    name: string;
    image_url: string;
    price: number;
    description: string;
    category: number;
}

type MenuItems = MenuItem[];

interface Category {
    id: number;
    name: string;
}

type Categories = Category[];