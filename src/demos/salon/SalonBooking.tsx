import { useState } from "react";
import { BookingCalendar } from "../../components/BookingCalendar";
import { TimeSlotPicker } from "../../components/TimeSlotPicker";
import { ServiceSelector } from "../../components/ServiceSelector";
import { StepWizard } from "../../components/StepWizard";
import { WhatsAppButton, WhatsAppConfirm } from "../../components/WhatsAppButton";
import { useBookingSlots, useFormValidation } from "../../hooks";
import { Service, TimeSlot } from "../../types";

const PRIMARY = "#d946ef"; // pink/fuchsia for salon

const SALON_SERVICES: Service[] = [
  { id: "s1", name: "Haircut & Styling", duration: 45, price: 500, icon: "✂️", description: "Wash, cut & blow dry" },
  { id: "s2", name: "Hair Coloring", duration: 90, price: 1800, icon: "🎨", description: "Global color / highlights" },
  { id: "s3", name: "Facial Treatment", duration: 60, price: 1200, icon: "✨", description: "Deep cleansing + massage" },
  { id: "s4", name: "Manicure", duration: 30, price: 400, icon: "💅", description: "Shape, buff & polish" },
  { id: "s5", name: "Pedicure", duration: 45, price: 600, icon: "🦶", description: "Scrub, massage & polish" },
  { id: "s6", name: "Bridal Package", duration: 180, price: 8000, icon: "👰", description: "Full bridal makeup + hair" },
];

const STEPS = [
  { id: "service", title: "Services", icon: "💆" },
  { id: "datetime", title: "Date & Time", icon: "📅" },
  { id: "details", title: "Your Info", icon: "👤" },
  { id: "confirm", title: "Confirm", icon: "✅" },
];

export function SalonBookingDemo() {
  const [step, setStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [booked, setBooked] = useState(false);

  const { slots, refreshSlots } = useBookingSlots(9, 20, 30);
  const { errors, validate, setFieldError } = useFormValidation();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    refreshSlots(date);
  };

  const handleToggleService = (service: Service) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handleNext = () => {
    if (step === 0 && selectedServices.length === 0) {
      alert("Please select at least one service");
      return;
    }
    if (step === 1 && (!selectedDate || !selectedSlot)) {
      alert("Please select a date and time slot");
      return;
    }
    if (step === 2) {
      const valid = validate(
        [
          { id: "name", label: "Name", type: "text", required: true },
          { id: "phone", label: "Phone", type: "phone", required: true },
        ],
        form
      );
      if (!valid) return;
    }
    setStep((s) => s + 1);
  };

  if (booked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6">We'll see you at <strong>Glamour Studio</strong></p>
          <div className="bg-fuchsia-50 rounded-2xl p-4 text-left space-y-2 mb-6">
            <p className="text-sm"><span className="text-gray-400">Services:</span> <span className="font-medium">{selectedServices.map(s => s.name).join(", ")}</span></p>
            <p className="text-sm"><span className="text-gray-400">Date:</span> <span className="font-medium">{selectedDate?.toDateString()}</span></p>
            <p className="text-sm"><span className="text-gray-400">Time:</span> <span className="font-medium">{selectedSlot?.time}</span></p>
            <p className="text-sm"><span className="text-gray-400">Name:</span> <span className="font-medium">{form.name}</span></p>
            <p className="text-sm"><span className="text-gray-400">Total:</span> <span className="font-bold text-fuchsia-600">₹{selectedServices.reduce((s, sv) => s + sv.price, 0)}</span></p>
          </div>
          <WhatsAppConfirm
            phoneNumber="919876543210"
            businessName="Glamour Studio"
            bookingDetails={{
              Services: selectedServices.map((s) => s.name).join(", "),
              Date: selectedDate?.toDateString() || "",
              Time: selectedSlot?.time || "",
              Name: form.name,
              Phone: form.phone,
            }}
          />
        </div>
        <WhatsAppButton phoneNumber="919876543210" message="Hello Glamour Studio!" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💇‍♀️</div>
          <h1 className="text-2xl font-bold text-gray-800">Glamour Studio</h1>
          <p className="text-gray-400 text-sm">Book your appointment</p>
        </div>

        <StepWizard
          steps={STEPS}
          currentStep={step}
          onNext={handleNext}
          onBack={() => setStep((s) => s - 1)}
          onSubmit={() => setBooked(true)}
          primaryColor={PRIMARY}
        >
          {/* Step 0 — Services */}
          {step === 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Choose your services</h3>
              <ServiceSelector
                services={SALON_SERVICES}
                selectedServices={selectedServices}
                onToggle={handleToggleService}
                primaryColor={PRIMARY}
              />
            </div>
          )}

          {/* Step 1 — Date & Time */}
          {step === 1 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Pick a date</h3>
              <BookingCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                primaryColor={PRIMARY}
              />
              {selectedDate && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Available slots for {selectedDate.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}
                  </h3>
                  <TimeSlotPicker
                    slots={slots}
                    selectedSlot={selectedSlot}
                    onSlotSelect={setSelectedSlot}
                    primaryColor={PRIMARY}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 2 — Customer Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-1">Your details</h3>
              {[
                { id: "name", label: "Full Name", placeholder: "Enter your name", type: "text" },
                { id: "phone", label: "Mobile Number", placeholder: "10-digit number", type: "tel" },
                { id: "email", label: "Email (optional)", placeholder: "you@email.com", type: "email" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="text-sm font-medium text-gray-600 block mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition text-sm
                      ${errors[field.id] ? "border-red-300 bg-red-50" : "border-gray-100 focus:border-fuchsia-300"}`}
                  />
                  {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Special requests (optional)</label>
                <textarea
                  placeholder="Any special requests or notes..."
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-fuchsia-300 outline-none transition text-sm resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3 — Confirmation */}
          {step === 3 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Review your booking</h3>
              <div className="bg-fuchsia-50 rounded-2xl p-4 space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Services</span>
                  <span className="font-medium text-right">{selectedServices.map(s => s.name).join(", ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium">{selectedSlot?.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium">{selectedServices.reduce((s, sv) => s + sv.duration, 0)} mins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{form.name}</span>
                </div>
                <div className="border-t border-fuchsia-100 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span style={{ color: PRIMARY }}>₹{selectedServices.reduce((s, sv) => s + sv.price, 0)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">By confirming, we'll send a WhatsApp reminder before your appointment</p>
            </div>
          )}
        </StepWizard>
      </div>
      <WhatsAppButton phoneNumber="919876543210" />
    </div>
  );
}
