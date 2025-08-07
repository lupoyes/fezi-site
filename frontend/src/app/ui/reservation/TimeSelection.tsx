import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import CustomCalendarDropdown from "@/app/(pages)/reservierung/events-feiern/page";
type Time = { value: string; time: string };
type AvaiableTimes = { time: string; avaiable: boolean };
import type { FormData } from "@/app/(pages)/reservierung/tischplatz/page";

type Props = {
  formData: any;
  handleInputChange: (field: keyof FormData, value: string) => void;
  fetchAvaiableTimes: () => void;
  avaiableTimes: AvaiableTimes[];
  setStage: (stage: "time" | "data" | "completed") => void;
  setFormData: (fn: (prev: any) => any) => void;
  startTimer: () => void;
  times: Time[];
};

export default function TimeSelection({
  formData,
  handleInputChange,
  fetchAvaiableTimes,
  avaiableTimes,
  setStage,
  setFormData,
  startTimer,
  times,
}: Props) {
  return (
    <div className="flex flex-col space-y-4">
      {/* Datum, Uhrzeit, Personen */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:border md:border-gray-300 md:rounded-sm">
          <CustomCalendarDropdown
            className="flex-1/2 border-1 border-neutral-300 md:border-t-0 md:border-b-0 md:border-l-0 md:rounded-none rounded"
            onDateChange={(e) => setFormData((prev) => ({ ...prev, datum: e }))}
          />

          <div className="flex-1/2 relative border-1 border-neutral-300 rounded md:border-none">
            <select
              value={formData.uhrzeit}
              onChange={(e) => handleInputChange("uhrzeit", e.target.value)}
              className="w-full appearance-none cursor-pointer z-1"
              style={{
                backgroundColor: "transparent",
                border: "none",
                padding: "12px",
              }}
            >
              {times.map((time, index) => (
                <option value={time.value} key={index}>
                  {time.time}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2"
              strokeWidth="3"
              size={16}
            />
          </div>
        </div>

        {/* Personenanzahl */}
        <div className="relative flex flex-row border border-gray-300 rounded-sm mb-1">
          <select
            value={formData.personenanzahl}
            onChange={(e) =>
              handleInputChange("personenanzahl", e.target.value)
            }
            className="px-4 appearance-none cursor-pointer w-full z-1"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
              <option value={count} key={count}>
                {count} {count === 1 ? "Person" : "Personen"}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 -translate-y-1/2"
            strokeWidth="3"
            size={16}
          />
        </div>

        <button
          className="py-3 px-6 bg-primary text-white font-bold hover:bg-primary/90 transition-colors rounded"
          onClick={fetchAvaiableTimes}
        >
          Tisch finden
        </button>
      </div>

      {/* Verfügbare Zeiten */}
      {avaiableTimes.length > 0 && (
        <>
          <p className="text-gray-600 mt-4">Verfügbare Zeiten:</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {avaiableTimes.map((time, index) => (
              <button
                key={index}
                onClick={() => {
                  if (time.avaiable) {
                    setStage("data");
                    setFormData((prev: any) => ({
                      ...prev,
                      uhrzeit: time.time,
                    }));
                    startTimer();
                  }
                }}
                className={clsx(
                  "px-4 py-2 rounded-lg transition-all font-medium",
                  {
                    "bg-primary text-white hover:bg-primary/90 cursor-pointer":
                      time.avaiable,
                    "bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed":
                      !time.avaiable,
                  }
                )}
                disabled={!time.avaiable}
              >
                {time.time} Uhr
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
