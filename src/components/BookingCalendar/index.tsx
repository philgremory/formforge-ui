import { useState } from "react";

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  disabledDates?: Date[];
  minDate?: Date;
  primaryColor?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export function BookingCalendar({
  selectedDate,
  onDateSelect,
  disabledDates = [],
  minDate = new Date(),
  primaryColor = "#6366f1",
}: BookingCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < new Date(minDate.setHours(0,0,0,0))) return true;
    return disabledDates.some(
      (dd) => dd.toDateString() === d.toDateString()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return new Date(viewYear, viewMonth, day).toDateString() === selectedDate.toDateString();
  };

  const isToday = (day: number) =>
    new Date(viewYear, viewMonth, day).toDateString() === today.toDateString();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <div style={{ fontFamily: "inherit" }} className="w-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
        >
          ‹
        </button>
        <span className="font-semibold text-gray-800">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) =>
          day === null ? (
            <div key={`empty-${i}`} />
          ) : (
            <button
              key={day}
              disabled={isDisabled(day)}
              onClick={() => onDateSelect(new Date(viewYear, viewMonth, day))}
              style={
                isSelected(day)
                  ? { backgroundColor: primaryColor, color: "#fff" }
                  : isToday(day)
                  ? { borderColor: primaryColor, color: primaryColor }
                  : {}
              }
              className={`
                aspect-square rounded-full text-sm flex items-center justify-center transition
                ${isDisabled(day) ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}
                ${isToday(day) && !isSelected(day) ? "border-2 font-bold" : ""}
                ${isSelected(day) ? "font-bold shadow-md" : "text-gray-700"}
              `}
            >
              {day}
            </button>
          )
        )}
      </div>
    </div>
  );
}
