"use client";

import { eventDetail } from "@/lib/types";
import { useEffect } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export function EventsWrapper({ events }: { events: eventDetail[] | null }) {
  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className="w-full">
      {events ? (
        events.map((event) => {
          // Convert seconds to milliseconds
          const timestamp = Number(event.date) * 1000;

          // Convert to Shamsi (Jalali) Date
          const shamsiDate = new DateObject({
            date: timestamp, // Correct timestamp format
            calendar: persian, // Convert to Persian calendar
            locale: persian_fa, // Use Persian locale
          }).format("YYYY/MM/DD"); // Format as YYYY/MM/DD

          return (
            <div key={event.id} className="p-2 w-full">
              <div className="p-3 rounded-xl shadow">
                <h1 className="text-lg">{event.name}</h1>
                <br />
                <span className="text-gray">{shamsiDate}</span> {/* Show Correct Jalali Date */}
                <p>{event.description}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full text-center p-4 text-lg">
          هیچ رویدادی در این کافه وجود ندارد
        </div>
      )}
    </div>
  );
}
