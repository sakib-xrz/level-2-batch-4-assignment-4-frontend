export interface Bicycle {
  _id: string;
  name: string;
  brand: string;
  price: number;
  product_model: string;
  image: string;
  category: string;
  description: string;
  quantity: number;
  in_stock: boolean;
  id: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface BicycleApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: Bicycle[] | [];
}
