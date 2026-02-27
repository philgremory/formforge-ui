// ============================================
// FormForge UI — Public Library Exports
// ============================================

// Components
export { BookingCalendar } from "./components/BookingCalendar";
export { TimeSlotPicker } from "./components/TimeSlotPicker";
export { ServiceSelector } from "./components/ServiceSelector";
export { StepWizard } from "./components/StepWizard";
export { WhatsAppButton, WhatsAppConfirm } from "./components/WhatsAppButton";

// Hooks
export {
  useBookingSlots,
  useFormValidation,
  useLeadEmail,
  usePricingCalculator,
} from "./hooks";

// Types
export type {
  TimeSlot,
  Service,
  StaffMember,
  BookingData,
  FormField,
  StepConfig,
  ContactFormData,
  TestimonialItem,
  PricingItem,
  FormForgeTheme,
  UseBookingSlotsReturn,
  UseFormValidationReturn,
} from "./types";
