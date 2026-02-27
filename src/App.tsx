import { useState } from "react";
import { SalonBookingDemo } from "./demos/salon/SalonBooking";
import { DoctorAppointmentDemo } from "./demos/doctor/DoctorAppointment";
import { TravelConsultationDemo } from "./demos/travel/TravelConsultation";
import { RepairBookingDemo } from "./demos/repair/RepairBooking";

type Demo = "home" | "salon" | "doctor" | "travel" | "repair";

const DEMOS = [
  { id: "salon", label: "Salon Booking", emoji: "💇‍♀️", color: "#d946ef", desc: "Hair, skin & beauty services" },
  { id: "doctor", label: "Doctor Appointment", emoji: "🏥", color: "#0ea5e9", desc: "Clinic & specialist booking" },
  { id: "travel", label: "Travel Consultation", emoji: "✈️", color: "#f59e0b", desc: "Trip planning & quotes" },
  { id: "repair", label: "Repair & Service", emoji: "🔧", color: "#10b981", desc: "Home repair & technician visit" },
] as const;

export default function App() {
  const [active, setActive] = useState<Demo>("home");

  if (active === "salon") return <div><BackButton onBack={() => setActive("home")} /><SalonBookingDemo /></div>;
  if (active === "doctor") return <div><BackButton onBack={() => setActive("home")} /><DoctorAppointmentDemo /></div>;
  if (active === "travel") return <div><BackButton onBack={() => setActive("home")} /><TravelConsultationDemo /></div>;
  if (active === "repair") return <div><BackButton onBack={() => setActive("home")} /><RepairBookingDemo /></div>;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl">
            ⚡
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">FormForge <span className="text-indigo-400">UI</span></h1>
        </div>
        <p className="text-gray-400 text-lg max-w-md">
          Open-source booking & form widgets for any service business
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
          <span>⚛️ React + TypeScript</span>
          <span>•</span>
          <span>📱 Mobile-first</span>
          <span>•</span>
          <span>💬 WhatsApp ready</span>
        </div>
      </div>

      {/* Demo cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {DEMOS.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setActive(demo.id as Demo)}
            className="group bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-600 rounded-2xl p-6 text-left transition-all hover:scale-[1.02] hover:shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div
                style={{ backgroundColor: `${demo.color}20`, color: demo.color }}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              >
                {demo.emoji}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg group-hover:text-indigo-300 transition">{demo.label}</h3>
                <p className="text-gray-500 text-sm mt-1">{demo.desc}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span
                style={{ backgroundColor: `${demo.color}20`, color: demo.color }}
                className="text-xs font-medium px-2 py-1 rounded-full"
              >
                Live Demo →
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-600 text-sm">
        <p>Built with ❤️ by <span className="text-gray-400">Tech Twin Mark</span></p>
        <p className="mt-1">
          <a href="https://github.com" className="text-indigo-400 hover:underline">GitHub</a>
          {" · "}
          <a href="https://npmjs.com" className="text-indigo-400 hover:underline">npm</a>
          {" · "}
          <a href="#" className="text-indigo-400 hover:underline">Docs</a>
        </p>
      </div>
    </div>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-md hover:bg-white transition"
    >
      ← Back to demos
    </button>
  );
}
