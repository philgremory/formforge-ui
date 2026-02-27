import { useState } from "react";
import { BookingCalendar } from "../../components/BookingCalendar";
import { TimeSlotPicker } from "../../components/TimeSlotPicker";
import { StepWizard } from "../../components/StepWizard";
import { WhatsAppButton, WhatsAppConfirm } from "../../components/WhatsAppButton";
import { useBookingSlots, useFormValidation } from "../../hooks";
import { TimeSlot } from "../../types";

const PRIMARY = "#0ea5e9"; // sky blue for doctor

const DOCTORS = [
  { id: "d1", name: "Dr. Priya Sharma", specialty: "General Physician", fee: 500, avatar: "👩‍⚕️", slots: 20 },
  { id: "d2", name: "Dr. Rahul Mehta", specialty: "Dermatologist", fee: 800, avatar: "👨‍⚕️", slots: 15 },
  { id: "d3", name: "Dr. Anjali Singh", specialty: "Gynecologist", fee: 700, avatar: "👩‍⚕️", slots: 12 },
  { id: "d4", name: "Dr. Vikram Patel", specialty: "Orthopedic", fee: 900, avatar: "👨‍⚕️", slots: 10 },
];

const STEPS = [
  { id: "doctor", title: "Doctor", icon: "🏥" },
  { id: "datetime", title: "Schedule", icon: "📅" },
  { id: "patient", title: "Patient", icon: "🧑" },
  { id: "confirm", title: "Confirm", icon: "✅" },
];

export function DoctorAppointmentDemo() {
  const [step, setStep] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof DOCTORS[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [form, setForm] = useState({ name: "", age: "", phone: "", symptoms: "" });
  const [booked, setBooked] = useState(false);

  const { slots, refreshSlots } = useBookingSlots(9, 17, 20);
  const { errors, validate } = useFormValidation();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    refreshSlots(date);
  };

  const handleNext = () => {
    if (step === 0 && !selectedDoctor) { alert("Please select a doctor"); return; }
    if (step === 1 && (!selectedDate || !selectedSlot)) { alert("Please select date and time"); return; }
    if (step === 2) {
      const valid = validate(
        [
          { id: "name", label: "Patient Name", type: "text", required: true },
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
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🏥</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Appointment Booked!</h2>
          <p className="text-gray-500 text-sm mb-6">MediCare Clinic</p>
          <div className="bg-sky-50 rounded-2xl p-4 text-left space-y-2 mb-6">
            <p className="text-sm"><span className="text-gray-400">Doctor:</span> <span className="font-medium">{selectedDoctor?.name}</span></p>
            <p className="text-sm"><span className="text-gray-400">Specialty:</span> <span className="font-medium">{selectedDoctor?.specialty}</span></p>
            <p className="text-sm"><span className="text-gray-400">Date:</span> <span className="font-medium">{selectedDate?.toDateString()}</span></p>
            <p className="text-sm"><span className="text-gray-400">Time:</span> <span className="font-medium">{selectedSlot?.time}</span></p>
            <p className="text-sm"><span className="text-gray-400">Patient:</span> <span className="font-medium">{form.name}</span></p>
            <p className="text-sm font-bold flex justify-between"><span>Consultation Fee:</span> <span className="text-sky-600">₹{selectedDoctor?.fee}</span></p>
          </div>
          <WhatsAppConfirm
            phoneNumber="919876543210"
            businessName="MediCare Clinic"
            bookingDetails={{
              Doctor: selectedDoctor?.name || "",
              Date: selectedDate?.toDateString() || "",
              Time: selectedSlot?.time || "",
              Patient: form.name,
            }}
          />
        </div>
        <WhatsAppButton phoneNumber="919876543210" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏥</div>
          <h1 className="text-2xl font-bold text-gray-800">MediCare Clinic</h1>
          <p className="text-gray-400 text-sm">Book a doctor appointment</p>
        </div>

        <StepWizard steps={STEPS} currentStep={step} onNext={handleNext} onBack={() => setStep(s => s - 1)} onSubmit={() => setBooked(true)} primaryColor={PRIMARY}>
          {/* Step 0 — Choose Doctor */}
          {step === 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 mb-2">Select a Doctor</h3>
              {DOCTORS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc)}
                  style={selectedDoctor?.id === doc.id ? { borderColor: PRIMARY, backgroundColor: `${PRIMARY}10` } : {}}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition text-left
                    ${selectedDoctor?.id === doc.id ? "" : "border-gray-100 hover:border-gray-200"}`}
                >
                  <span className="text-3xl">{doc.avatar}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.specialty}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{doc.slots} slots available today</p>
                  </div>
                  <span style={selectedDoctor?.id === doc.id ? { color: PRIMARY } : {}} className="font-bold text-gray-700">
                    ₹{doc.fee}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Step 1 — Date & Time */}
          {step === 1 && (
            <div>
              <BookingCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} primaryColor={PRIMARY} />
              {selectedDate && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Available Slots</h3>
                  <TimeSlotPicker slots={slots} selectedSlot={selectedSlot} onSlotSelect={setSelectedSlot} primaryColor={PRIMARY} />
                </div>
              )}
            </div>
          )}

          {/* Step 2 — Patient Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-1">Patient Information</h3>
              {[
                { id: "name", label: "Patient Name", placeholder: "Full name", type: "text" },
                { id: "age", label: "Age", placeholder: "Age in years", type: "number" },
                { id: "phone", label: "Mobile Number", placeholder: "10-digit number", type: "tel" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="text-sm font-medium text-gray-600 block mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition text-sm
                      ${errors[field.id] ? "border-red-300 bg-red-50" : "border-gray-100 focus:border-sky-300"}`}
                  />
                  {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Symptoms / Reason for visit</label>
                <textarea placeholder="Describe your symptoms briefly..." value={form.symptoms} onChange={(e) => setForm(f => ({ ...f, symptoms: e.target.value }))} rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-sky-300 outline-none transition text-sm resize-none" />
              </div>
            </div>
          )}

          {/* Step 3 — Confirm */}
          {step === 3 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Confirm Appointment</h3>
              <div className="bg-sky-50 rounded-2xl p-4 space-y-2">
                {[
                  ["Doctor", selectedDoctor?.name],
                  ["Specialty", selectedDoctor?.specialty],
                  ["Date", selectedDate?.toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "short", day: "numeric" })],
                  ["Time", selectedSlot?.time],
                  ["Patient", form.name],
                  ["Age", form.age ? `${form.age} years` : "-"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
                <div className="border-t border-sky-100 pt-2 flex justify-between font-bold">
                  <span>Consultation Fee</span>
                  <span style={{ color: PRIMARY }}>₹{selectedDoctor?.fee}</span>
                </div>
              </div>
            </div>
          )}
        </StepWizard>
      </div>
      <WhatsAppButton phoneNumber="919876543210" message="Hello! I need to book a doctor appointment." />
    </div>
  );
}
