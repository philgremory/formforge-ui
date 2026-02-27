// ============================================
// FORMFORGE UI — Core TypeScript Types
// ============================================

// --- Booking / Appointment Types ---

export interface TimeSlot {
  id: string;
  time: string;         // e.g. "10:00 AM"
  available: boolean;
  staffId?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;     // in minutes
  price: number;
  currency?: string;    // default "INR"
  description?: string;
  icon?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  available?: boolean;
  rating?: number;
}

export interface BookingData {
  date: Date | null;
  timeSlot: TimeSlot | null;
  services: Service[];
  staff: StaffMember | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  location?: string;
}

// --- Form Types ---

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "phone" | "textarea" | "select" | "file" | "otp";
  placeholder?: string;
  required?: boolean;
  options?: string[];   // for select fields
  value?: string;
}

export interface StepConfig {
  id: string;
  title: string;
  subtitle?: string;
  fields: FormField[];
}

// --- Widget Types ---

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  text: string;
  date?: string;
}

export interface PricingItem {
  service: Service;
  quantity: number;
}

// --- Theme / Config Types ---

export interface FormForgeTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
  borderRadius?: string;
  businessName: string;
  logo?: string;
  whatsappNumber?: string;
}

// --- Hook Return Types ---

export interface UseBookingSlotsReturn {
  slots: TimeSlot[];
  loading: boolean;
  selectedSlot: TimeSlot | null;
  selectSlot: (slot: TimeSlot) => void;
  refreshSlots: (date: Date) => void;
}

export interface UseFormValidationReturn {
  errors: Record<string, string>;
  validate: (fields: FormField[], values: Record<string, string>) => boolean;
  clearErrors: () => void;
  setFieldError: (field: string, message: string) => void;
}
