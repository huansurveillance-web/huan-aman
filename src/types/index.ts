export type ServiceCategory = 
  | 'cctv'
  | 'fiber-optic'
  | 'command-center'
  | 'network-cabling'
  | 'access-control'
  | 'amc-maintenance'
  | 'alarm-intrusion'
  | 'other';

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  modelNumber: string;
  price: number; // in PKR
  isPriceOnQuote?: boolean;
  shortDescription: string;
  description: string;
  specs: Record<string, string>;
  features: string[];
  imageUrl: string;
  badge?: string;
  isPackage?: boolean;
  packageIncludes?: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  warranty?: string;
}

export interface Category {
  id: string;
  value: string;
  label: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  includeInstallation: boolean;
  customNotes?: string;
}

export interface Review {
  id: string;
  authorName: string;
  companyOrRole: string;
  city: string;
  serviceType: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  status: 'approved' | 'pending' | 'rejected';
  featured?: boolean;
}

export interface QuoteLead {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  serviceCategory: ServiceCategory;
  propertyType: string;
  estimatedAreaOrPoints: string;
  cameraCountOrScale: string;
  budgetTier: 'economy' | 'standard' | 'enterprise';
  indoorOutdoorRequirement: string;
  timeline: string;
  additionalNotes?: string;
  aiRecommendation?: {
    summary: string;
    suggestedHardware: string[];
    infrastructurePlan: string;
    recommendedTier: string;
    estimatedPriceRangePKR: string;
    specialNotes: string;
  };
  cartItemsSummary?: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost';
  assignedTo?: string;
  notes?: string;
  quoteAmount?: number;
}

export interface CompanyStats {
  yearsInBusiness: number;
  sitesCompleted: number;
  sectorsServed: number;
  karachiResolutionHours: string;
  uptimeSLA: string;
  activeClients: number;
  ntnNumber: string;
  fbrStatus: string;
  salesTaxNumber: string;
  companyAddress: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  salesEmail: string;
  website?: string;
  slogan?: string;
  coverageArea?: string;
  notableClient?: string;
  standardWarranty?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}
