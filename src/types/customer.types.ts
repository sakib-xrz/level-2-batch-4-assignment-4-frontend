export interface Customer {
  _id: string;
  name: string;
  email: string;
  role: string;
  is_blocked: boolean;
  createdAt: string;
  id: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface CustomersApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: Customer[];
}
