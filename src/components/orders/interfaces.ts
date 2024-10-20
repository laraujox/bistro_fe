interface Item {
    id: number;
    product__name: string;
    product__category__name: string;
    quantity: number;
}

interface Order {
    id: number;
    table_id: string;
    status: string;
    items: Item[];
}
