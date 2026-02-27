import { useState, useCallback } from "react";
import { TimeSlot, FormField, UseBookingSlotsReturn, UseFormValidationReturn } from "../types";

export function useBookingSlots(
  startHour = 9,
  endHour = 19,
  intervalMinutes = 30,
  bookedTimes: string[] = []
): UseBookingSlotsReturn {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const generateSlots = useCallback(
    (date: Date) => {
      setLoading(true);
      const generated: TimeSlot[] = [];
      const now = new Date();

      for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += intervalMinutes) {
          const slotDate = new Date(date);
          slotDate.setHours(hour, min, 0, 0);
          const isPast = slotDate < now;

          const period = hour < 12 ? "AM" : "PM";
          const displayHour = hour % 12 === 0 ? 12 : hour % 12;
          const displayMin = String(min).padStart(2, "0");
          const timeStr = `${displayHour}:${displayMin} ${period}`;
          const isBooked = bookedTimes.includes(timeStr);

          generated.push({
            id: `slot-${hour}-${min}`,
            time: timeStr,
            available: !isPast && !isBooked,
          });
        }
      }

      setSlots(generated);
      setSelectedSlot(null);
      setTimeout(() => setLoading(false), 300);
    },
    [startHour, endHour, intervalMinutes, bookedTimes]
  );

  return {
    slots,
    loading,
    selectedSlot,
    selectSlot: setSelectedSlot,
    refreshSlots: generateSlots,
  };
}

export function useFormValidation(): UseFormValidationReturn {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(
    (fields: FormField[], values: Record<string, string>): boolean => {
      const newErrors: Record<string, string> = {};

      fields.forEach((field) => {
        const value = (values[field.id] || "").trim();

        // Required check
        if (field.required && !value) {
          newErrors[field.id] = `${field.label} is required`;
          return;
        }

        // Email validation — applies even if optional, when a value is entered
        if (field.type === "email" && value) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(value)) {
            newErrors[field.id] = "Please enter a valid email (e.g. you@gmail.com)";
          }
        }

        // Phone validation — Indian 10-digit mobile
        if (field.type === "phone" && value) {
          const phoneRegex = /^[6-9]\d{9}$/;
          if (!phoneRegex.test(value.replace(/\s/g, ""))) {
            newErrors[field.id] = "Please enter a valid 10-digit mobile number";
          }
        }

        // Age / positive number validation
        if (field.id === "age" && value) {
          const num = parseInt(value);
          if (isNaN(num) || num < 1 || num > 120) {
            newErrors[field.id] = "Please enter a valid age between 1 and 120";
          }
        }

        // Travelers / nights — must be positive
        if ((field.id === "travelers" || field.id === "nights") && value) {
          const num = parseInt(value);
          if (isNaN(num) || num < 1) {
            newErrors[field.id] = `${field.label} must be at least 1`;
          }
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    []
  );

  const clearErrors = useCallback(() => setErrors({}), []);
  const setFieldError = useCallback((field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  }, []);

  return { errors, validate, clearErrors, setFieldError };
}

export function useLeadEmail() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendLead = useCallback(async (endpoint: string, data: Record<string, unknown>) => {
    setSending(true);
    setError(null);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setError("Could not send. Please try again or contact via WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return { sendLead, sending, sent, error, reset: () => { setSent(false); setError(null); } };
}

export function usePricingCalculator() {
  const [items, setItems] = useState<Array<{ id: string; name: string; price: number; duration: number }>>([]);

  const addItem = useCallback((item: { id: string; name: string; price: number; duration: number }) => {
    setItems((prev) => prev.find((i) => i.id === item.id) ? prev : [...prev, item]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggle = useCallback((item: { id: string; name: string; price: number; duration: number }) => {
    setItems((prev) =>
      prev.find((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, item]
    );
  }, []);

  const total = items.reduce((sum, i) => sum + i.price, 0);
  const totalDuration = items.reduce((sum, i) => sum + i.duration, 0);

  return { items, addItem, removeItem, toggle, total, totalDuration };
}
