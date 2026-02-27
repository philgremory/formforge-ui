import { TimeSlot } from "../../types";

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSlotSelect: (slot: TimeSlot) => void;
  primaryColor?: string;
}

// Correctly parse "1:00 PM" → 13, "12:00 PM" → 12, "12:00 AM" → 0
function getHour24(timeStr: string): number {
  const [timePart, period] = timeStr.split(" ");
  let [hour] = timePart.split(":").map(Number);
  if (period === "AM") {
    if (hour === 12) hour = 0;
  } else {
    if (hour !== 12) hour += 12;
  }
  return hour;
}

export function TimeSlotPicker({
  slots,
  selectedSlot,
  onSlotSelect,
  primaryColor = "#6366f1",
}: TimeSlotPickerProps) {
  const morningSlots = slots.filter((s) => {
    const h = getHour24(s.time);
    return h >= 5 && h < 12;
  });
  const afternoonSlots = slots.filter((s) => {
    const h = getHour24(s.time);
    return h >= 12 && h < 17;
  });
  const eveningSlots = slots.filter((s) => {
    const h = getHour24(s.time);
    return h >= 17;
  });

  const renderGroup = (label: string, group: TimeSlot[]) => {
    if (group.length === 0) return null;
    return (
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          {label}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {group.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            return (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => onSlotSelect(slot)}
                style={isSelected ? { backgroundColor: primaryColor, color: "#fff", borderColor: primaryColor } : {}}
                className={`
                  py-2 px-1 rounded-lg border text-sm font-medium transition
                  ${!slot.available
                    ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through"
                    : isSelected
                    ? "shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                  }
                `}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className="text-3xl mb-2">📅</div>
        <p className="text-sm">Please select a date first</p>
      </div>
    );
  }

  return (
    <div>
      {renderGroup("🌅 Morning", morningSlots)}
      {renderGroup("☀️ Afternoon", afternoonSlots)}
      {renderGroup("🌆 Evening", eveningSlots)}
    </div>
  );
}
