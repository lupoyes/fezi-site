"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface CustomCalendarDropdownProps {
  selectedDate?: string;
  onDateChange?: (date: string) => void;
  minDate?: Date;
  className?: string;
}

export default function CustomCalendarDropdown({
  selectedDate = new Date().toISOString().split("T")[0],
  onDateChange,
  minDate = new Date(),
  className = "",
}: CustomCalendarDropdownProps) {
  const [date, setDate] = useState(selectedDate);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const dayNames = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (d: string) => {
    const date = new Date(d + "T00:00:00");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const isDateDisabled = (y: number, m: number, d: number): boolean => {
    const t = new Date(y, m, d).getTime();
    const minT = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    ).getTime();
    return t < minT || t > minT + 31536000000; // 1 Jahr
  };

  const selectDate = (y: number, m: number, d: number) => {
    if (isDateDisabled(y, m, d)) return;
    const selected = new Date(y, m, d).toISOString().split("T")[0];
    setDate(selected);
    onDateChange?.(selected);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const navigateMonth = (dir: 1 | -1) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + dir);
    setCurrentMonth(newDate);
  };

  const DayButton = ({
    y,
    m,
    d,
    isSel,
    isToday,

    isOutside,
  }: {
    y: number;
    m: number;
    d: number;
    isSel?: boolean;
    isToday?: boolean;
    isOutside?: boolean;
  }) => {
    const dis = isDateDisabled(y, m, d);
    return (
      <button
        onClick={() => selectDate(y, m, d + 1)}
        disabled={dis}
        className={clsx(
          "w-10 h-10 flex items-center justify-center text-sm rounded focus:outline-none transition",
          {
            "bg-primary text-white": isSel,
            "border-1 border-primary": isToday && !isSel,
            "text-gray-900 hover:bg-gray-100":
              !isSel && !isToday && !dis && !isOutside,
            "text-gray-300": isOutside && !isSel,
            "text-gray-300 hover:text-gray-400": !isSel && !isToday && dis,
            "text-gray-300 cursor-not-allowed": dis,
          }
        )}
      >
        {d}
      </button>
    );
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
    const prevMonthDays = new Date(year, month, 0).getDate();
    const today = new Date();
    const selected = new Date(date + "T00:00:00");

    const days = [];

    // Previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const pm = month === 0 ? 11 : month - 1;
      const py = month === 0 ? year - 1 : year;
      days.push(<DayButton key={`prev-${d}`} y={py} m={pm} d={d} isOutside />);
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const isSel =
        selected.getDate() === d &&
        selected.getMonth() === month &&
        selected.getFullYear() === year;
      const isToday =
        today.getDate() === d &&
        today.getMonth() === month &&
        today.getFullYear() === year;
      days.push(
        <DayButton
          key={d}
          y={year}
          m={month}
          d={d}
          isSel={isSel}
          isToday={isToday}
        />
      );
    }

    // Next month
    const totalCells = Math.ceil((firstDayIndex + daysInMonth) / 7) * 7;
    const remaining = totalCells - (firstDayIndex + daysInMonth);
    for (let d = 1; d <= remaining; d++) {
      const nm = month === 11 ? 0 : month + 1;
      const ny = month === 11 ? year + 1 : year;
      days.push(<DayButton key={`next-${d}`} y={ny} m={nm} d={d} isOutside />);
    }

    return days;
  };

  return (
    <div className={clsx("relative", className)}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3"
        type="button"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-900">{formatDate(date)}</span>
          <ChevronDown
            strokeWidth={3}
            className={clsx("w-4 h-4 transition", { "rotate-180": isOpen })}
          />
        </div>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4"
          role="dialog"
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              aria-label="Vorheriger Monat"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button
              onClick={() => navigateMonth(1)}
              aria-label="Nächster Monat"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((d) => (
              <div
                key={d}
                className="text-xs text-gray-500 w-10 h-8 flex justify-center items-center font-medium"
              >
                {d.slice(0, 2)}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
        </div>
      )}
    </div>
  );
}
