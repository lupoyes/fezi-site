import {
  Calendar,
  User,
  Mail,
  Phone,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import type { FormData } from "@/app/(pages)/reservierung/tischplatz/page";

type Props = {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
  validationErrors: Partial<Record<keyof FormData, string>>;
  handleSubmit: () => void;
  isSubmitting: boolean;
  timeLeft: number;
  formatTime: (seconds: number) => string;
};

// Eingabefeld-Konfiguration
type InputConfig = {
  id: keyof FormData;
  label: string;
  icon: LucideIcon;
  placeholder: string;
  type?: string;
};

const inputFields: InputConfig[] = [
  {
    id: "vorname",
    label: "Vorname",
    icon: User,
    placeholder: "Max",
  },
  {
    id: "nachname",
    label: "Nachname",
    icon: User,
    placeholder: "Mustermann",
  },
  {
    id: "email",
    label: "E-Mail-Adresse",
    icon: Mail,
    placeholder: "max@example.com",
    type: "email",
  },
  {
    id: "telefon",
    label: "Telefonnummer",
    icon: Phone,
    placeholder: "+49 123 456789",
    type: "tel",
  },
];

export default function FormDataInput({
  formData,
  handleInputChange,
  validationErrors,
  handleSubmit,
  isSubmitting,
  timeLeft,
  formatTime,
}: Props) {
  return (
    <div className="flex flex-col space-y-4">
      {/* 🔸 Timer Hinweis */}
      <div
        className={clsx(
          "w-full p-3 rounded-lg flex items-center gap-2 font-medium",
          {
            "bg-primary/5 text-primary border border-primary/40": timeLeft > 0,
            "bg-red-50 text-red-800 border border-red-200": timeLeft === 0,
          }
        )}
      >
        {timeLeft > 0 ? (
          <>
            <Calendar className="w-4 h-4" />
            <div>
              Der Tisch ist für{" "}
              <span className="font-bold">{formatTime(timeLeft)}</span>{" "}
              reserviert.
            </div>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4" />
            Die Zeit ist abgelaufen. Es kann sein, dass der Tisch bereits
            vergeben ist!
          </>
        )}
      </div>

      {/* 🔸 Formularfelder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputFields.map(
          ({ id, label, icon: Icon, placeholder, type = "text" }) => (
            <div className="space-y-1" key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
              >
                <Icon className="w-4 h-4 inline mr-1" />
                {label} *
              </label>
              <input
                id={id}
                type={type}
                value={formData[id] as string}
                onChange={(e) => handleInputChange(id, e.target.value)}
                className={clsx(
                  "w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                  {
                    "border-red-300 bg-red-50": validationErrors[id],
                    "border-gray-300": !validationErrors[id],
                  }
                )}
                placeholder={placeholder}
              />
              {validationErrors[id] && (
                <p className="text-red-600 text-sm">{validationErrors[id]}</p>
              )}
            </div>
          )
        )}
      </div>

      {/* 🔸 Newsletter Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          id="newsletter"
          type="checkbox"
          checked={formData.newsletter}
          onChange={(e) => handleInputChange("newsletter", e.target.checked)}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/50"
        />
        <label htmlFor="newsletter" className="text-sm text-gray-700">
          Ich möchte den Newsletter erhalten
        </label>
      </div>

      {/* 🔸 Submit Button */}
      <div className="pt-2">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={clsx(
            "w-full py-3 px-6 rounded-lg font-bold text-white transition-all",
            {
              "bg-primary hover:bg-primary/90": !isSubmitting,
              "bg-gray-400 cursor-not-allowed": isSubmitting,
            }
          )}
        >
          {isSubmitting
            ? "Reservierung wird bestätigt..."
            : "Reservierung bestätigen"}
        </button>
      </div>
    </div>
  );
}
