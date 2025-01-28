export interface Order {
  _id: string;
  customer: Customer;
  phone: string;
  product: OrderProduct;
  quantity: number;
  delivery_address: string;
  payment_status: PaymentStatus;
  status: OrderStatus;
  transaction_id: string;
  sub_total: number;
  shipping_charge: number;
  grand_total: number;
  createdAt: string;
  id: string;
}

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";
type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Customer {
  _id: string;
  name: string;
  email: string;
  id: string;
}

export interface OrderProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  product_model: string;
  image: string;
  category: string;
  id: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface OrderApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: Order[] | [];
}
