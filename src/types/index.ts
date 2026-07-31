export type OrderStatus =
  | "cancelled"
  | "order placed"
  | "payment completed"
  | "assigned"
  | "applied"
  | "dispatched"
  | "delivered";

export type ProductType = "Judgement" | "Interim Order" | "Other";

export interface TagInfo {
  id: string;
  label: string;
  color: TagColorKey;
}

export type TagColorKey =
  | "blue"
  | "green"
  | "terracotta"
  | "brown"
  | "gold"
  | "purple"
  | "steel"
  | "rose"
  | "grey"
  | "teal"
  | "plum";

export interface Clerk {
  id: string;
  name: string;
  phone: string;
  clerkId: string;
  avatar?: string;
}

export interface OrderTimeline {
  paymentCompleted?: string;
  orderPlaced?: string;
  assigned?: string;
  applied?: string;
  dispatched?: string;
  delivered?: string;
}

export interface CaseDetails {
  caseNumber: string;
  legalName: string;
  name: string;
  email: string;
  phone: string;
  deliveryFeedback?: string;
}

export interface AddressDetails {
  pincode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
}

export interface ProductDetails {
  type: string;
  orderDate: string;
  file?: string;
}

export interface ESignDocument {
  digioId: string;
  status: string;
  signedDocumentUrl?: string;
  auditLogUrl?: string;
}

export interface Order {
  id: number;
  orderId: string;
  trackingId?: string;
  applicantName: string;
  phone: string;
  caseNumber: string;
  courtComplex: string;
  district: string;
  productType: ProductType;
  productLabel: string;
  productSubLabel: string;
  orderDate: string;
  orderTime: string;
  status: OrderStatus;
  tags: TagInfo[];
  clerk?: Clerk;
  timeline: OrderTimeline;
  caseDetails: CaseDetails;
  address: AddressDetails;
  product: ProductDetails;
  eSign?: ESignDocument;
  isTestUser?: boolean;
}
