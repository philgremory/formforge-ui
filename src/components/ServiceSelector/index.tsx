import { Service } from "../../types";

interface ServiceSelectorProps {
  services: Service[];
  selectedServices: Service[];
  onToggle: (service: Service) => void;
  multiSelect?: boolean;
  primaryColor?: string;
  currency?: string;
}

export function ServiceSelector({
  services,
  selectedServices,
  onToggle,
  multiSelect = true,
  primaryColor = "#6366f1",
  currency = "₹",
}: ServiceSelectorProps) {
  const isSelected = (service: Service) =>
    selectedServices.some((s) => s.id === service.id);

  return (
    <div className="space-y-3">
      {services.map((service) => {
        const selected = isSelected(service);
        return (
          <button
            key={service.id}
            onClick={() => onToggle(service)}
            style={selected ? { borderColor: primaryColor, backgroundColor: `${primaryColor}10` } : {}}
            className={`
              w-full flex items-center justify-between p-4 rounded-xl border-2 transition text-left
              ${selected
                ? "shadow-sm"
                : "border-gray-100 bg-white hover:border-gray-200"
              }
            `}
          >
            <div className="flex items-center gap-3">
              {service.icon && (
                <span className="text-2xl">{service.icon}</span>
              )}
              <div>
                <p className="font-semibold text-gray-800 text-sm">{service.name}</p>
                <p className="text-xs text-gray-400">{service.duration} mins</p>
                {service.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{service.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                style={selected ? { color: primaryColor } : {}}
                className="font-bold text-gray-700"
              >
                {currency}{service.price}
              </span>
              <div
                style={selected ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition
                  ${selected ? "" : "border-gray-300"}`}
              >
                {selected && <span className="text-white text-xs">✓</span>}
              </div>
            </div>
          </button>
        );
      })}
      {multiSelect && selectedServices.length > 0 && (
        <div
          style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
          className="p-3 rounded-xl text-sm font-medium flex justify-between"
        >
          <span>{selectedServices.length} service(s) selected</span>
          <span>
            Total: {currency}
            {selectedServices.reduce((sum, s) => sum + s.price, 0)}
          </span>
        </div>
      )}
    </div>
  );
}
