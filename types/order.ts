export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productSlug: string;
  productName: string;
  productType: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  orderId: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  paymentMethod: 'cod';
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  notes?: string;
}
