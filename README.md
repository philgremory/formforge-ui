# ⚡ FormForge UI

> Open-source booking & form widget library for service businesses — built with React + TypeScript

[![npm](https://img.shields.io/npm/v/formforge-ui)](https://npmjs.com/package/formforge-ui)
[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

---

## 🎯 What is FormForge UI?

FormForge UI is a free, open-source library that lets developers quickly add booking systems, appointment forms, and service widgets to any website.

**Perfect for:**
- 💇 Salon / beauty businesses
- 🏥 Doctors / clinics
- ✈️ Travel agencies
- 🔧 Repair & home services
- 🎓 Freelancers / consultants

---

## 🚀 Quick Start

```bash
npm install formforge-ui
```

### Basic Booking Widget

```tsx
import { BookingCalendar, TimeSlotPicker, useBookingSlots } from 'formforge-ui';
import { useState } from 'react';

export function MyBookingPage() {
  const [date, setDate] = useState(null);
  const { slots, selectedSlot, selectSlot, refreshSlots } = useBookingSlots();

  return (
    <div>
      <BookingCalendar
        selectedDate={date}
        onDateSelect={(d) => { setDate(d); refreshSlots(d); }}
        primaryColor="#6366f1"
      />
      <TimeSlotPicker
        slots={slots}
        selectedSlot={selectedSlot}
        onSlotSelect={selectSlot}
        primaryColor="#6366f1"
      />
    </div>
  );
}
```

---

## 📦 Components

### `<BookingCalendar />`

Interactive calendar for date selection.

| Prop | Type | Description |
|------|------|-------------|
| `selectedDate` | `Date \| null` | Currently selected date |
| `onDateSelect` | `(date: Date) => void` | Called when user picks a date |
| `primaryColor` | `string` | Brand color (hex) |
| `minDate` | `Date` | Earliest selectable date |
| `disabledDates` | `Date[]` | Dates to disable |

---

### `<TimeSlotPicker />`

Shows available time slots grouped by Morning / Afternoon / Evening.

| Prop | Type | Description |
|------|------|-------------|
| `slots` | `TimeSlot[]` | Array of slot objects |
| `selectedSlot` | `TimeSlot \| null` | Currently selected slot |
| `onSlotSelect` | `(slot: TimeSlot) => void` | Called on slot click |
| `primaryColor` | `string` | Brand color |

---

### `<ServiceSelector />`

Multi-select or single-select list of services with price.

| Prop | Type | Description |
|------|------|-------------|
| `services` | `Service[]` | List of services |
| `selectedServices` | `Service[]` | Currently selected |
| `onToggle` | `(service: Service) => void` | Called on toggle |
| `multiSelect` | `boolean` | Allow multiple (default: true) |
| `currency` | `string` | Currency symbol (default: ₹) |

---

### `<StepWizard />`

Multi-step form with progress bar, navigation and submit.

| Prop | Type | Description |
|------|------|-------------|
| `steps` | `Step[]` | Array of step objects |
| `currentStep` | `number` | Active step index |
| `onNext` | `() => void` | Next button handler |
| `onBack` | `() => void` | Back button handler |
| `onSubmit` | `() => void` | Submit on last step |
| `primaryColor` | `string` | Brand color |

---

### `<WhatsAppButton />`

Floating WhatsApp button (fixed position).

```tsx
<WhatsAppButton
  phoneNumber="919876543210"
  message="Hello! I want to book an appointment."
  position="bottom-right"
/>
```

### `<WhatsAppConfirm />`

Inline button that sends booking details to WhatsApp.

```tsx
<WhatsAppConfirm
  phoneNumber="919876543210"
  businessName="Glamour Studio"
  bookingDetails={{
    Service: "Haircut",
    Date: "Monday, 10 March",
    Time: "11:00 AM",
  }}
/>
```

---

## 🪝 Hooks

### `useBookingSlots(startHour, endHour, interval)`

Generates time slots for any date.

```tsx
const { slots, selectedSlot, selectSlot, refreshSlots, loading } = useBookingSlots(9, 18, 30);

// Call refreshSlots when user picks a date
refreshSlots(new Date());
```

### `useFormValidation()`

Validates form inputs with built-in rules.

```tsx
const { errors, validate, clearErrors } = useFormValidation();

// Returns true if valid, false if errors
const isValid = validate(fields, values);
```

### `useLeadEmail()`

Sends form data to your backend.

```tsx
const { sendLead, sending, sent, error } = useLeadEmail();

await sendLead('/api/leads', { name, phone, service });
```

### `usePricingCalculator()`

Tracks selected services and calculates total.

```tsx
const { items, toggle, total, totalDuration } = usePricingCalculator();
```

---

## 🎨 Theming

All components accept a `primaryColor` prop. Just pass your brand color:

```tsx
<BookingCalendar primaryColor="#d946ef" />  // Pink for salon
<BookingCalendar primaryColor="#0ea5e9" />  // Blue for doctor
<BookingCalendar primaryColor="#f59e0b" />  // Amber for travel
<BookingCalendar primaryColor="#10b981" />  // Green for repair
```

---

## 💻 Local Development

```bash
git clone https://github.com/your-username/formforge-ui
cd formforge-ui
npm install
npm run dev
```

Open http://localhost:5173 to see all 4 demos.

---

## 📁 Project Structure

```
formforge-ui/
├── src/
│   ├── components/         # All UI components
│   │   ├── BookingCalendar/
│   │   ├── TimeSlotPicker/
│   │   ├── ServiceSelector/
│   │   ├── StepWizard/
│   │   └── WhatsAppButton/
│   ├── hooks/              # Reusable React hooks
│   ├── types/              # TypeScript interfaces
│   ├── demos/              # 4 demo apps
│   │   ├── salon/
│   │   ├── doctor/
│   │   ├── travel/
│   │   └── repair/
│   └── index.ts            # Public exports
├── package.json
└── README.md
```

---

## 🤝 Contributing

Pull requests welcome! This project is open source and free for everyone.

---

## 📄 License

MIT — Free to use in personal and commercial projects.

---

Made with ❤️ by **Tech Twin Mark**
