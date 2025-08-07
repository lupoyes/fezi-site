import { Check } from "lucide-react";

type Props = {
  formData: any;
  setStage: (stage: "time" | "data" | "completed") => void;
  setFormData: (data: any) => void;
  setAvaiableTimes: (times: any[]) => void;
  setTimeLeft: (time: number) => void;
  setValidationErrors: (errors: {}) => void;
};

export default function Confirmation({
  formData,
  setStage,
  setFormData,
  setAvaiableTimes,
  setTimeLeft,
  setValidationErrors,
}: Props) {
  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-green-800">
        Reservierung bestätigt!
      </h3>
      <p className="text-gray-600 text-center max-w-md">
        Vielen Dank, {formData.vorname}! Ihre Reservierung für{" "}
        {formData.personenanzahl}{" "}
        {formData.personenanzahl === "1" ? "Person" : "Personen"} am{" "}
        {new Date(formData.datum).toLocaleDateString("de-DE")} um{" "}
        {formData.uhrzeit} wurde erfolgreich bestätigt.
      </p>
      <p className="text-sm text-gray-500">
        Eine Bestätigungs-E-Mail wurde an {formData.email} gesendet.
      </p>
      <button
        onClick={() => {
          setStage("time");
          setFormData({
            vorname: "",
            nachname: "",
            email: "",
            telefon: "",
            datum: new Date().toISOString().split("T")[0],
            uhrzeit: "19:00:00",
            personenanzahl: "2",
            newsletter: false,
          });
          setAvaiableTimes([]);
          setTimeLeft(10 * 60);
          setValidationErrors({});
        }}
        className="mt-4 py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Neue Reservierung
      </button>
    </div>
  );
}
