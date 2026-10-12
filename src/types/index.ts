export type Language = 'pt' | 'en';
export type ThemeMode = 'light' | 'dark';

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  isPromo: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  shortDescription: string;
  specs: {
    processor?: string;
    screen?: string;
    ram?: string;
    storage?: string;
    os?: string;
    graphics?: string;
    connectivity?: string;
    battery?: string;
    warranty?: string;
    [key: string]: string | undefined;
  };
  variants?: {
    colors?: string[];
    storage?: string[];
  };
  sku: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  itemCount: number;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  startingPrice: number;
  warranty: string;
  turnaroundTime: string;
  popular: boolean;
  image?: string;
}

export interface QuoteRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  email: string;
  phone: string;
  urgency: 'baixa' | 'normal' | 'alta' | 'urgente';
  description: string;
  location: string;
  status: 'Pendente' | 'Em Análise' | 'Respondido' | 'Concluído';
  createdAt: string;
  estimatedBudget?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'mpesa' | 'emola' | 'transfer' | 'pickup';
  status: 'Confirmada' | 'Em preparação' | 'Enviada' | 'Entregue' | 'Cancelada';
  trackingTimeline: {
    status: string;
    date: string;
    note: string;
  }[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  type: 'Factura' | 'Proforma';
  orderId?: string;
  clientName: string;
  clientNuit?: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  date: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  vatRate: number; // e.g. 0.16 (16% em Moçambique)
  vatAmount: number;
  total: number;
  status: 'Paga' | 'Pendente' | 'Expirada';
  bankDetails: {
    bankBIM: string;
    bankBCI: string;
    mpesaNumber: string;
  };
  notes?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  role: 'customer' | 'admin';
  avatar?: string;
  provider?: 'google' | 'local';
}
