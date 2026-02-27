import { useState } from "react";
import { StepWizard } from "../../components/StepWizard";
import { WhatsAppButton, WhatsAppConfirm } from "../../components/WhatsAppButton";
import { useFormValidation } from "../../hooks";

const PRIMARY = "#f59e0b"; // amber for travel

const DESTINATIONS = [
  { id: "t1", name: "Goa", emoji: "🏖️", nights: "3-5 nights", from: 8999 },
  { id: "t2", name: "Kerala", emoji: "🌴", nights: "4-6 nights", from: 12999 },
  { id: "t3", name: "Rajasthan", emoji: "🏰", nights: "5-7 nights", from: 15999 },
  { id: "t4", name: "Manali", emoji: "🏔️", nights: "4-6 nights", from: 11999 },
  { id: "t5", name: "Andaman", emoji: "🌊", nights: "5-7 nights", from: 24999 },
  { id: "t6", name: "Bali", emoji: "🌺", nights: "5-7 nights", from: 35999 },
];

const PACKAGE_TYPES = [
  { id: "budget", label: "Budget", desc: "Best value, shared transport", icon: "💰" },
  { id: "standard", label: "Standard", desc: "3-star hotels, guided tour", icon: "⭐" },
  { id: "premium", label: "Premium", desc: "4-5 star, private transport", icon: "👑" },
];

const STEPS = [
  { id: "dest", title: "Destination", icon: "🌍" },
  { id: "details", title: "Trip Details", icon: "📋" },
  { id: "contact", title: "Contact", icon: "📞" },
  { id: "confirm", title: "Get Quote", icon: "💬" },
];

export function TravelConsultationDemo() {
  const [step, setStep] = useState(0);
  const [destination, setDestination] = useState<typeof DESTINATIONS[0] | null>(null);
  const [packageType, setPackageType] = useState<string>("");
  const [tripDetails, setTripDetails] = useState({ travelers: "2", nights: "4", date: "", budget: "" });
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const { errors, validate } = useFormValidation();

  const handleNext = () => {
    if (step === 0 && !destination) { alert("Please select a destination"); return; }
    if (step === 1) {
      if (!packageType) { alert("Please select a package type"); return; }
      if (!tripDetails.date) { alert("Please select a preferred travel month"); return; }
    }
    if (step === 2) {
      const valid = validate(
        [{ id: "name", label: "Name", type: "text", required: true }, { id: "phone", label: "Phone", type: "phone", required: true }, { id: "email", label: "Email", type: "email", required: false }],
        contact
      );
      if (!valid) return;
    }
    setStep(s => s + 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✈️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Quote Request Sent!</h2>
          <p className="text-gray-500 text-sm mb-6">Our travel expert will call you within 2 hours</p>
          <div className="bg-amber-50 rounded-2xl p-4 text-left space-y-2 mb-6">
            <p className="text-sm"><span className="text-gray-400">Destination:</span> <span className="font-medium">{destination?.emoji} {destination?.name}</span></p>
            <p className="text-sm"><span className="text-gray-400">Package:</span> <span className="font-medium">{packageType}</span></p>
            <p className="text-sm"><span className="text-gray-400">Travelers:</span> <span className="font-medium">{tripDetails.travelers} people</span></p>
            <p className="text-sm"><span className="text-gray-400">Duration:</span> <span className="font-medium">{tripDetails.nights} nights</span></p>
            <p className="text-sm"><span className="text-gray-400">Est. from:</span> <span className="font-bold text-amber-600">₹{destination?.from.toLocaleString()} per person</span></p>
          </div>
          <WhatsAppConfirm
            phoneNumber="917208788981"
            businessName="Traveleezz"
            bookingDetails={{
              Destination: `${destination?.emoji} ${destination?.name}`,
              Package: packageType,
              Travelers: `${tripDetails.travelers} people`,
              Nights: `${tripDetails.nights} nights`,
              "Travel Date": tripDetails.date || "Flexible",
              Name: contact.name,
            }}
          />
        </div>
        <WhatsAppButton phoneNumber="917208788981" message="Hi Traveleezz! I want to plan a trip." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">✈️</div>
          <h1 className="text-2xl font-bold text-gray-800">Traveleezz</h1>
          <p className="text-gray-400 text-sm">Plan your dream vacation</p>
        </div>

        <StepWizard steps={STEPS} currentStep={step} onNext={handleNext} onBack={() => setStep(s => s - 1)} onSubmit={() => setSubmitted(true)} primaryColor={PRIMARY} submitLabel="Get Free Quote 🎉">
          {/* Step 0 — Destination */}
          {step === 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Where do you want to go?</h3>
              <div className="grid grid-cols-2 gap-3">
                {DESTINATIONS.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setDestination(dest)}
                    style={destination?.id === dest.id ? { borderColor: PRIMARY, backgroundColor: `${PRIMARY}15` } : {}}
                    className={`p-4 rounded-2xl border-2 text-left transition
                      ${destination?.id === dest.id ? "" : "border-gray-100 hover:border-gray-200"}`}
                  >
                    <span className="text-3xl block mb-1">{dest.emoji}</span>
                    <p className="font-semibold text-gray-800 text-sm">{dest.name}</p>
                    <p className="text-xs text-gray-400">{dest.nights}</p>
                    <p className="text-xs font-medium mt-1" style={destination?.id === dest.id ? { color: PRIMARY } : { color: "#6b7280" }}>
                      from ₹{dest.from.toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — Trip Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-1">Tell us about your trip</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "travelers", label: "Travelers", type: "number", placeholder: "2" },
                  { id: "nights", label: "Nights", type: "number", placeholder: "4" },
                ].map((f) => (
                  <div key={f.id}>
                    <label className="text-sm font-medium text-gray-600 block mb-1">{f.label}</label>
                    <input type="text" inputMode="numeric" placeholder={f.placeholder} value={tripDetails[f.id as keyof typeof tripDetails]}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        if (val === "" || parseInt(val) >= 1) setTripDetails(t => ({ ...t, [f.id]: val }));
                      }}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-amber-300 outline-none text-sm" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Preferred Travel Month</label>
                <input type="month" value={tripDetails.date} onChange={(e) => setTripDetails(t => ({ ...t, date: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-amber-300 outline-none text-sm" />
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2 text-sm">Package Type</h4>
                <div className="space-y-2">
                  {PACKAGE_TYPES.map((pkg) => (
                    <button key={pkg.id} onClick={() => setPackageType(pkg.label)}
                      style={packageType === pkg.label ? { borderColor: PRIMARY, backgroundColor: `${PRIMARY}10` } : {}}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition text-left
                        ${packageType === pkg.label ? "" : "border-gray-100 hover:border-gray-200"}`}>
                      <span className="text-2xl">{pkg.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{pkg.label}</p>
                        <p className="text-xs text-gray-400">{pkg.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Contact */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-1">Your Contact Details</h3>
              {[
                { id: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                { id: "phone", label: "Mobile Number", placeholder: "10-digit number", type: "tel" },
                { id: "email", label: "Email", placeholder: "you@email.com", type: "email" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="text-sm font-medium text-gray-600 block mb-1">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={contact[field.id as keyof typeof contact]}
                    onChange={(e) => setContact(c => ({ ...c, [field.id]: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition text-sm
                      ${errors[field.id] ? "border-red-300" : "border-gray-100 focus:border-amber-300"}`} />
                  {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Review Your Enquiry</h3>
              <div className="bg-amber-50 rounded-2xl p-4 space-y-2">
                {[
                  ["Destination", `${destination?.emoji} ${destination?.name}`],
                  ["Package", packageType],
                  ["Travelers", `${tripDetails.travelers} people`],
                  ["Nights", `${tripDetails.nights} nights`],
                  ["Month", tripDetails.date || "Flexible"],
                  ["Name", contact.name],
                  ["Phone", contact.phone],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
                <div className="border-t border-amber-100 pt-2">
                  <p className="text-xs text-gray-400 text-center">Our expert will call you within 2 hours with a customized quote!</p>
                </div>
              </div>
            </div>
          )}
        </StepWizard>
      </div>
      <WhatsAppButton phoneNumber="917208788981" message="Hi! I want to plan a trip with Traveleezz." />
    </div>
  );
}
