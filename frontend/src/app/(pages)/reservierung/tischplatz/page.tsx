"use client";

import TimeSelection from "@/app/ui/reservation/TimeSelection";
import FormDataInput from "@/app/ui/reservation/FormDataInput";
import Confirmation from "@/app/ui/reservation/Confirmation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Calendar,
  User,
  Mail,
  Phone,
  Check,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { z } from "zod";
import CustomCalendarDropdown from "../events-feiern/page";

// ─────────────────────────────────────────────────────────────
// 🔹 KONSTANTEN
// ─────────────────────────────────────────────────────────────
const times = [
  { value: "16:00:00", time: "16:00 Uhr" },
  { value: "16:30:00", time: "16:30 Uhr" },
  { value: "17:00:00", time: "17:00 Uhr" },
  { value: "17:30:00", time: "17:30 Uhr" },
  { value: "18:00:00", time: "18:00 Uhr" },
  { value: "18:30:00", time: "18:30 Uhr" },
  { value: "19:00:00", time: "19:00 Uhr" },
  { value: "19:30:00", time: "19:30 Uhr" },
  { value: "20:00:00", time: "20:00 Uhr" },
  { value: "20:30:00", time: "20:30 Uhr" },
  { value: "21:00:00", time: "21:00 Uhr" },
];

// ─────────────────────────────────────────────────────────────
// 🔹 VALIDIERUNG (Zod Schema)
// ─────────────────────────────────────────────────────────────
const reservationSchema = z.object({
  vorname: z.string().min(2, "Vorname muss mindestens 2 Zeichen haben"),
  nachname: z.string().min(2, "Nachname muss mindestens 2 Zeichen haben"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  telefon: z.string().min(10, "Telefonnummer muss mindestens 10 Zeichen haben"),
  datum: z.string().min(1, "Datum ist erforderlich"),
  uhrzeit: z.string().min(1, "Uhrzeit ist erforderlich"),
  personenanzahl: z.string().min(1, "Personenanzahl ist erforderlich"),
  newsletter: z.boolean(),
});

// ─────────────────────────────────────────────────────────────
// 🔹 TYPEN
// ─────────────────────────────────────────────────────────────
type AvaiableTimes = {
  time: string;
  avaiable: boolean;
};

type ValidationErrors = Partial<
  Record<keyof typeof reservationSchema.shape, string>
>;

export type FormData = {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  datum: string;
  uhrzeit: string;
  personenanzahl: string;
  newsletter: boolean;
};

// ─────────────────────────────────────────────────────────────
// 🔹 HAUPTKOMPONENTE: ReservationPage
// ─────────────────────────────────────────────────────────────
export default function ReservationPage() {
  // 🔸 STATE
  const [formData, setFormData] = useState<FormData>({
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    datum: new Date().toISOString().split("T")[0],
    uhrzeit: "19:00:00",
    personenanzahl: "2",
    newsletter: false,
  });
  const [stage, setStage] = useState<"time" | "data" | "completed">("time");
  const [avaiableTimes, setAvaiableTimes] = useState<AvaiableTimes[]>([]);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // 🔸 HILFSFUNKTIONEN
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const fetchAvaiableTimes = () => {
    setAvaiableTimes([
      { time: "7:00", avaiable: false },
      { time: "7:30", avaiable: true },
      { time: "8:00", avaiable: true },
      { time: "8:30", avaiable: false },
      { time: "9:00", avaiable: true },
    ]);
  };

  const submitReservation = async (data: typeof formData) => {
    return new Promise<{ success: boolean; message: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Ihre Reservierung wurde erfolgreich bestätigt!",
        });
      }, 2000);
    });
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    try {
      reservationSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof ValidationErrors] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const result = await submitReservation(formData);
      if (result.success) {
        if (timerId) {
          clearInterval(timerId);
          setTimerId(null);
        }
        setStage("completed");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTimeLeft((time) => (time <= 1 ? 0 : time - 1));
    }, 1000);
    setTimerId(id);
  };

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  // ─────────────────────────────────────────────────────────────
  // 🔹 RENDER / UI LOGIK
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-96 m-5 p-6 rounded-2xl border border-gray-200 shadow-lg bg-white">
      {/* Step Indicator */}
      <h2 className="text-xl text-center md:text-2xl md:text-left font-bold mb-6 text-gray-800">
        Reserviere einen Sitzplatz
      </h2>
      <div className="flex flex-row gap-6 border-b border-gray-200 mb-6">
        <p
          className={clsx("font-bold -mb-px p-2 px-4", {
            "border-b-2 border-primary text-primary": stage === "time",
            "text-gray-500": stage !== "time",
          })}
        >
          1. Tisch finden
        </p>
        <p
          className={clsx("font-bold p-2 px-4 -mb-pxs", {
            "border-b-2 border-primary text-primary": stage === "data",
            "text-gray-500": stage !== "data",
          })}
        >
          2. Daten
        </p>
      </div>

      {/* STAGE: 1 - Verfügbare Zeiten & Auswahl */}
      {stage === "time" && (
        <TimeSelection
          formData={formData}
          handleInputChange={handleInputChange}
          fetchAvaiableTimes={fetchAvaiableTimes}
          avaiableTimes={avaiableTimes}
          setStage={setStage}
          setFormData={setFormData}
          startTimer={startTimer}
          times={times}
        />
      )}

      {/* STAGE: 2 - Formulardaten */}
      {stage === "data" && (
        <FormDataInput
          formData={formData}
          handleInputChange={handleInputChange}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          timeLeft={timeLeft}
          formatTime={formatTime}
        />
      )}

      {/* STAGE: 3 - Bestätigung */}
      {stage === "completed" && (
        <Confirmation
          formData={formData}
          setStage={setStage}
          setFormData={setFormData}
          setAvaiableTimes={setAvaiableTimes}
          setTimeLeft={setTimeLeft}
          setValidationErrors={setValidationErrors}
        />
      )}
    </div>
  );
}
