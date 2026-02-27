import { useState } from "react";
import { BookingCalendar } from "../../components/BookingCalendar";
import { TimeSlotPicker } from "../../components/TimeSlotPicker";
import { StepWizard } from "../../components/StepWizard";
import { WhatsAppButton, WhatsAppConfirm } from "../../components/WhatsAppButton";
import { useBookingSlots, useFormValidation } from "../../hooks";
import { TimeSlot } from "../../types";

const PRIMARY = "#10b981"; // green for repair/service

const SERVICES = [
  { id: "ac", name: "AC Repair / Service", icon: "❄️", price: 499, duration: 60 },
  { id: "mobile", name: "Mobile Repair", icon: "📱", price: 299, duration: 45 },
  { id: "tv", name: "TV Repair", icon: "📺", price: 399, duration: 90 },
  { id: "washing", name: "Washing Machine", icon: "🫧", price: 449, duration: 60 },
  { id: "fridge", name: "Refrigerator Repair", icon: "🧊", price: 549, duration: 90 },
  { id: "plumber", name: "Plumbing Work", icon: "🔧", price: 349, duration: 60 },
];

const STEPS = [
  { id: "service", title: "Service", icon: "🔧" },
  { id: "schedule", title: "Schedule", icon: "📅" },
  { id: "address", title: "Address", icon: "📍" },
  { id: "confirm", title: "Confirm", icon: "✅" },
];

export function RepairBookingDemo() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", landmark: "", issue: "" });
  const [booked, setBooked] = useState(false);

  const { slots, refreshSlots } = useBookingSlots(8, 20, 60);
  const { errors, validate } = useFormValidation();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    refreshSlots(date);
  };

  const handleNext = () => {
    if (step === 0 && !selectedService) { alert("Please select a service"); return; }
    if (step === 1 && (!selectedDate || !selectedSlot)) { alert("Please select date and time"); return; }
    if (step === 2) {
      const valid = validate([
        { id: "name", label: "Name", type: "text", required: true },
        { id: "phone", label: "Phone", type: "phone", required: true },
        { id: "address", label: "Address", type: "text", required: true },
      ], form);
      if (!valid) return;
    }
    setStep(s => s + 1);
  };

  if (booked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Booking Confirmed!</h2>
          <p className="text-gray-500 text-sm mb-6">FixIt Express — Our technician is on the way</p>
          <div className="bg-emerald-50 rounded-2xl p-4 text-left space-y-2 mb-6">
            <p className="text-sm"><span className="text-gray-400">Service:</span> <span className="font-medium">{selectedService?.icon} {selectedService?.name}</span></p>
            <p className="text-sm"><span className="text-gray-400">Date:</span> <span className="font-medium">{selectedDate?.toDateString()}</span></p>
            <p className="text-sm"><span className="text-gray-400">Time:</span> <span className="font-medium">{selectedSlot?.time}</span></p>
            <p className="text-sm"><span className="text-gray-400">Address:</span> <span className="font-medium">{form.address}</span></p>
            <p className="text-sm font-bold flex justify-between"><span>Visit Charge:</span> <span className="text-emerald-600">₹{selectedService?.price}</span></p>
          </div>
          <WhatsAppConfirm
            phoneNumber="919876543210"
            businessName="FixIt Express"
            bookingDetails={{
              Service: `${selectedService?.icon} ${selectedService?.name}`,
              Date: selectedDate?.toDateString() || "",
              Time: selectedSlot?.time || "",
              Address: form.address,
              Name: form.name,
              Phone: form.phone,
            }}
          />
        </div>
        <WhatsAppButton phoneNumber="919876543210" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔧</div>
          <h1 className="text-2xl font-bold text-gray-800">FixIt Express</h1>
          <p className="text-gray-400 text-sm">Home repair & service at your doorstep</p>
        </div>

        <StepWizard steps={STEPS} currentStep={step} onNext={handleNext} onBack={() => setStep(s => s - 1)} onSubmit={() => setBooked(true)} primaryColor={PRIMARY}>
          {/* Step 0 — Service */}
          {step === 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">What needs fixing?</h3>
              <div className="grid grid-cols-2 gap-3">
                {SERVICES.map((svc) => (
                  <button key={svc.id} onClick={() => setSelectedService(svc)}
                    style={selectedService?.id === svc.id ? { borderColor: PRIMARY, backgroundColor: `${PRIMARY}10` } : {}}
                    className={`p-4 rounded-2xl border-2 text-left transition
                      ${selectedService?.id === svc.id ? "" : "border-gray-100 hover:border-gray-200"}`}>
                    <span className="text-3xl block mb-2">{svc.icon}</span>
                    <p className="font-semibold text-gray-800 text-sm">{svc.name}</p>
                    <p className="text-xs mt-1" style={selectedService?.id === svc.id ? { color: PRIMARY } : { color: "#6b7280" }}>
                      from ₹{svc.price}
                    </p>
                  </button>
                ))}
              </div>
              {selectedService && (
                <div className="mt-3 p-3 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-emerald-700">✓ Selected: <strong>{selectedService.name}</strong> — Visit charge ₹{selectedService.price} + parts extra</p>
                </div>
              )}
            </div>
          )}

          {/* Step 1 — Date/Time */}
          {step === 1 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Schedule the visit</h3>
              <BookingCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} primaryColor={PRIMARY} />
              {selectedDate && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Available Time Slots</h3>
                  <TimeSlotPicker slots={slots} selectedSlot={selectedSlot} onSlotSelect={setSelectedSlot} primaryColor={PRIMARY} />
                </div>
              )}
            </div>
          )}

          {/* Step 2 — Address */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-1">Your Contact & Address</h3>
              {[
                { id: "name", label: "Your Name", placeholder: "Full name", type: "text" },
                { id: "phone", label: "Mobile Number", placeholder: "10-digit number", type: "tel" },
                { id: "address", label: "Full Address", placeholder: "House no, street, area", type: "text" },
                { id: "landmark", label: "Landmark (optional)", placeholder: "Near school / temple...", type: "text" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="text-sm font-medium text-gray-600 block mb-1">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition text-sm
                      ${errors[field.id] ? "border-red-300" : "border-gray-100 focus:border-emerald-300"}`} />
                  {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Describe the issue</label>
                <textarea placeholder="What's the problem? Any details help..." value={form.issue}
                  onChange={(e) => setForm(f => ({ ...f, issue: e.target.value }))} rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-emerald-300 outline-none transition text-sm resize-none" />
              </div>
            </div>
          )}

          {/* Step 3 — Confirm */}
          {step === 3 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Confirm Booking</h3>
              <div className="bg-emerald-50 rounded-2xl p-4 space-y-2">
                {[
                  ["Service", `${selectedService?.icon} ${selectedService?.name}`],
                  ["Date", selectedDate?.toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "short", day: "numeric" })],
                  ["Time", selectedSlot?.time],
                  ["Name", form.name],
                  ["Phone", form.phone],
                  ["Address", form.address],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
                <div className="border-t border-emerald-100 pt-2 flex justify-between font-bold">
                  <span>Visit Charge</span>
                  <span style={{ color: PRIMARY }}>₹{selectedService?.price}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">Technician will arrive within the selected time slot</p>
            </div>
          )}
        </StepWizard>
      </div>
      <WhatsAppButton phoneNumber="919876543210" message="Hi FixIt Express! I need a repair service." />
    </div>
  );
}
