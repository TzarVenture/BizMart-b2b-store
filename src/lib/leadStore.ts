import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Quotation Sent'
  | 'Follow-up'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export type LeadSource =
  | 'Product Enquiry'
  | 'Request Quote'
  | 'Quick RFQ'
  | 'Bulk Requirement'
  | 'WhatsApp'
  | 'Call CTA'
  | 'Contact Form';

export interface Lead {
  id: string;
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  productId?: number;
  productTitle: string;
  quantity: number;
  unit: string;
  location: string;
  requirementDetails?: string;
  gstNumber?: string;
  source: LeadSource;
  status: LeadStatus;
  assignedTo: string;
  createdAt: string;
  followUpDate?: string;
  notes?: string[];
  estimatedValue?: number;
}

export interface RFQItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  moq: number;
  quantity: number;
  unit: string;
}

export interface BuyerUser {
  name: string;
  phone: string;
  email?: string;
  companyName?: string;
  city?: string;
  gstNumber?: string;
  isLoggedIn: boolean;
}

interface LeadStoreState {
  leads: Lead[];
  rfqBasket: RFQItem[];
  isRfqModalOpen: boolean;
  selectedProductForRfq: {
    id: number;
    title: string;
    image: string;
    moq: number;
    price: number;
    unit?: string;
  } | null;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status' | 'assignedTo'>) => Lead;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadSalesperson: (id: string, assignedTo: string) => void;
  addLeadNote: (id: string, note: string) => void;
  setFollowUpDate: (id: string, date: string) => void;
  deleteLead: (id: string) => void;
  // RFQ Basket
  addToRfqBasket: (item: Omit<RFQItem, 'quantity' | 'unit'> & { quantity?: number; unit?: string }) => void;
  removeFromRfqBasket: (productId: number) => void;
  updateRfqQuantity: (productId: number, quantity: number) => void;
  clearRfqBasket: () => void;
  // Modal controls
  openRfqModal: (product?: { id: number; title: string; image: string; moq: number; price: number; unit?: string }) => void;
  closeRfqModal: () => void;
  isSignInModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  // Buyer Authentication & Enquiries Portal
  buyerUser: BuyerUser | null;
  loginBuyer: (user: Partial<BuyerUser>) => void;
  logoutBuyer: () => void;
  isEnquiriesModalOpen: boolean;
  openEnquiriesModal: () => void;
  closeEnquiriesModal: () => void;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 'LEAD-8941',
    customerName: 'Rajesh Verma',
    companyName: 'Apex Precision Engineering Ltd',
    phone: '+91 98230 45671',
    email: 'procurement@apexprecision.in',
    productId: 1,
    productTitle: 'Essence Mascara Lash Princess',
    quantity: 500,
    unit: 'Pieces',
    location: 'Mumbai, Maharashtra',
    requirementDetails: 'Need 500 pieces batch delivery by next Friday with GST invoice.',
    gstNumber: '27AABCA1234F1Z8',
    source: 'Request Quote',
    status: 'Quotation Sent',
    assignedTo: 'Rahul Sharma',
    createdAt: '2026-09-30T07:30:00.000Z',
    followUpDate: '2026-10-02',
    notes: ['Quotation sent with 12% bulk discount. Client reviewing payment terms.'],
    estimatedValue: 415000,
  },
  {
    id: 'LEAD-8940',
    customerName: 'Sunita Aggarwal',
    companyName: 'Aggarwal Retail & Traders',
    phone: '+91 99100 23418',
    email: 'sunita@aggarwaltraders.com',
    productId: 78,
    productTitle: 'Apple MacBook Pro 14',
    quantity: 15,
    unit: 'Units',
    location: 'New Delhi, Delhi',
    requirementDetails: 'Corporate purchase for engineering department laptops.',
    source: 'Quick RFQ',
    status: 'New',
    assignedTo: 'Priya Patel',
    createdAt: '2026-09-30T11:00:00.000Z',
    notes: ['Inquiry received from homepage quick RFQ widget.'],
    estimatedValue: 2850000,
  },
  {
    id: 'LEAD-8939',
    customerName: 'Vikramaditya Rao',
    companyName: 'Deccan Logistics & Spares',
    phone: '+91 94480 88219',
    email: 'vikram@deccanlogistics.com',
    productId: 121,
    productTitle: 'Sports Accessories Multi-Tool Kit',
    quantity: 250,
    unit: 'Sets',
    location: 'Bengaluru, Karnataka',
    requirementDetails: 'Looking for distributor pricing and sample dispatched for quality check.',
    source: 'Product Enquiry',
    status: 'Qualified',
    assignedTo: 'Amit Kumar',
    createdAt: '2026-09-29T15:30:00.000Z',
    followUpDate: '2026-10-01',
    notes: ['Sample dispatched via BlueDart tracking #BL782910.'],
    estimatedValue: 185000,
  },
];

export const useLeadStore = create<LeadStoreState>()(
  persist(
    (set, get) => ({
      leads: INITIAL_LEADS,
      rfqBasket: [],
      isRfqModalOpen: false,
      selectedProductForRfq: null,
      isSignInModalOpen: false,
      buyerUser: null,
      isEnquiriesModalOpen: false,

      addLead: (leadData) => {
        const newLead: Lead = {
          ...leadData,
          id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
          createdAt: new Date().toISOString(),
          status: 'New',
          assignedTo: 'Rahul Sharma',
          notes: ['New lead generated via website conversion.'],
        };
        set((state) => ({
          leads: [newLead, ...state.leads],
        }));
        return newLead;
      },

      updateLeadStatus: (id, status) => {
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
        }));
      },

      updateLeadSalesperson: (id, assignedTo) => {
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, assignedTo } : l)),
        }));
      },

      addLeadNote: (id, note) => {
        set((state) => ({
          leads: state.leads.map((l) =>
            l.id === id ? { ...l, notes: [...(l.notes || []), note] } : l
          ),
        }));
      },

      setFollowUpDate: (id, followUpDate) => {
        set((state) => ({
          leads: state.leads.map((l) => (l.id === id ? { ...l, followUpDate } : l)),
        }));
      },

      deleteLead: (id) => {
        set((state) => ({
          leads: state.leads.filter((l) => l.id !== id),
        }));
      },

      // RFQ Basket
      addToRfqBasket: (item) => {
        set((state) => {
          const existing = state.rfqBasket.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              rfqBasket: state.rfqBasket.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + (item.quantity || item.moq || 1) }
                  : i
              ),
            };
          }
          return {
            rfqBasket: [
              ...state.rfqBasket,
              {
                ...item,
                quantity: item.quantity || item.moq || 10,
                unit: item.unit || 'Pieces',
              },
            ],
          };
        });
      },

      removeFromRfqBasket: (productId) => {
        set((state) => ({
          rfqBasket: state.rfqBasket.filter((i) => i.productId !== productId),
        }));
      },

      updateRfqQuantity: (productId, quantity) => {
        set((state) => ({
          rfqBasket: state.rfqBasket.map((i) =>
            i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },

      clearRfqBasket: () => {
        set({ rfqBasket: [] });
      },

      // Modal Controls
      openRfqModal: (product) => {
        set({
          isRfqModalOpen: true,
          selectedProductForRfq: product || null,
        });
      },

      closeRfqModal: () => {
        set({
          isRfqModalOpen: false,
          selectedProductForRfq: null,
        });
      },

      openSignInModal: () => {
        set({ isSignInModalOpen: true });
      },

      closeSignInModal: () => {
        set({ isSignInModalOpen: false });
      },

      loginBuyer: (userData) => {
        const phone = userData.phone || '+91 98765 43210';
        const name = userData.name || (phone.includes('@') ? phone.split('@')[0] : 'Rajesh Sharma');
        set({
          buyerUser: {
            name,
            phone,
            email: userData.email || (phone.includes('@') ? phone : `${name.toLowerCase().replace(/\s+/g, '')}@buyer.in`),
            companyName: userData.companyName || 'Sharma Industrial Supplies',
            city: userData.city || 'Bengaluru',
            gstNumber: userData.gstNumber || '29ABCDE1234F1Z5',
            isLoggedIn: true,
          },
          isSignInModalOpen: false,
        });
      },

      logoutBuyer: () => {
        set({ buyerUser: null });
      },

      openEnquiriesModal: () => {
        set({ isEnquiriesModalOpen: true });
      },

      closeEnquiriesModal: () => {
        set({ isEnquiriesModalOpen: false });
      },
    }),
    {
      name: 'bizmart-leads-storage',
    }
  )
);
