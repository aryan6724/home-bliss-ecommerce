export type AdminOrderItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type AdminOrder = {
  _id: string;
  orderId: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    pincode: string;
    paymentMethod: string;
  };
  items: AdminOrderItem[];
  total: number;
  status: string;
  createdAt: string;
};