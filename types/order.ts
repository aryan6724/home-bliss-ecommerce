export type OrderItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type PublicOrder = {
  orderId: string;
  date: string;
  customer: {
    name: string;
    phone: string;
    city: string;
    paymentMethod: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
};