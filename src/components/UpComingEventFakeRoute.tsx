import React from "react";
import { X, Calendar, MapPin, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  description?: string;
  longDescription?: string;
  category?: string;
  participants?: string | number;
  image?: string;
  images?: string[];
  gradient?: string;
  registrationLink?: string;
  resumeFormatLink?: string;
  rules?: string[];
  contacts?: { name: string; phone: string }[];
}

export default function UpComingEventFakeRoute({
  event,
  open,
  onClose,
}: {
  event: Event | null | undefined;
  open: boolean;
  onClose: () => void;
}) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "To be announced";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "To be announced";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateRange = (startDate?: string, endDate?: string) => {
    const start = formatDate(startDate);
    return endDate ? `${start} - ${formatDate(endDate)}` : start;
  };

  if (!open || !event) return null;

  const sections = [
    {
      title: "Date",
      text: formatDateRange(event.date, event.endDate),
      icon: <Calendar className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Time",
      text: event.time || "Yet to be announced",
      icon: <Clock className="w-5 h-5 text-violet-400" />,
    },
    {
      title: "Location",
      text: event.location || "Venue not announced",
      icon: <MapPin className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: "Participants",
      text: String(event.participants || "Open registration"),
      icon: <Users className="w-5 h-5 text-orange-400" />,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-background via-[hsl(240,50%,10%)] to-background text-foreground overflow-hidden"
    >
      {/* TOP NAVBAR */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4">
        <button
          onClick={onClose}
          aria-label="Close details"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-sm sm:text-lg font-bold text-gradient truncate px-4">
          {event.title}
        </h2>

{event.registrationLink && (
  <a
    href={event.registrationLink}
    target="_blank"
    rel="noopener noreferrer"
    className="hidden sm:inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold btn-accent rounded-full"
  >
    Register
  </a>
)}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        {/* MOBILE: Image First, then Content */}
        <div className="lg:hidden w-full">
          {/* Image Section */}
          {event.image && (
            <div className="relative w-full flex items-center justify-center bg-background/20 px-4 pt-3 pb-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto max-h-[32vh] object-contain"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
          )}

          {/* Content Section */}
          <div className="relative z-10 px-4 pt-4 pb-5 space-y-4">
            {/* Title + Description */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight leading-none text-foreground">
                {event.title}
              </h1>

              {(event.longDescription || event.description) && (
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  {event.longDescription || event.description}
                </p>
              )}
            </div>

            {event.rules && event.rules.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Rules
                </p>
                <ul className="space-y-2">
                  {event.rules.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-foreground/90 text-justify"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Event Details */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 mt-0.5 text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatDateRange(event.date, event.endDate)}
                  </p>
                </div>
              </div>

              {event.time && (
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-0.5 text-accent" />

                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium text-foreground">
                      {event.time}
                    </p>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-tech-green" />

                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {event.contacts && event.contacts.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Contact
                </p>
                <div className="space-y-2">
                  {event.contacts.map((contact) => (
                    <a
                      key={contact.phone}
                      href={`tel:${contact.phone}`}
                      className="block text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {contact.name}: {contact.phone}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="pt-4 border-t border-border">
              {event.registrationLink ? (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full block btn-hero text-sm py-2 text-center"
                >
                  Register Now
                </a>
              ) : event.resumeFormatLink ? (
                <a
                  href={event.resumeFormatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full block btn-hero text-sm py-2 text-center"
                >
                  Handwritten Resume - View Format
                </a>
              ) : (
                <span className="block text-center text-sm text-muted-foreground">
                  Registration details coming soon
                </span>
              )}
            </div>
          </div>
        </div>

        {/* DESKTOP: Side by Side */}
        <div className="hidden lg:block">
          <div className="card-tech m-6">
            <div className="grid grid-cols-5 gap-8 items-center">
              {/* Left Content */}
              <div className="col-span-2 space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    {event.title}
                  </h1>
                  {(event.longDescription || event.description) && (
                    <p className="text-base text-muted-foreground leading-relaxed text-justify">
                      {event.longDescription || event.description}
                    </p>
                  )}
                </div>

                {event.rules && event.rules.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Rules
                    </p>
                    <ul className="space-y-2">
                      {event.rules.map((rule, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-foreground/90 text-justify"
                        >
                          <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                          <span className="leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Event Details */}
                <div className="space-y-3 py-4 border-t border-border/30">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-semibold text-foreground">
                        {formatDateRange(event.date, event.endDate)}
                      </p>
                    </div>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="font-semibold text-foreground">
                          {event.time}
                        </p>
                      </div>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-tech-green" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Location
                        </p>
                        <p className="font-semibold text-foreground">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {event.contacts && event.contacts.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Contact
                    </p>
                    <div className="space-y-2">
                      {event.contacts.map((contact) => (
                        <a
                          key={contact.phone}
                          href={`tel:${contact.phone}`}
                          className="block text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {contact.name}: {contact.phone}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="pt-4 border-t border-border">
                  {event.registrationLink ? (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full block btn-hero text-sm py-2 text-center"
                    >
                      Register Now
                    </a>
                  ) : event.resumeFormatLink ? (
                    <a
                      href={event.resumeFormatLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full block btn-hero text-sm py-2 text-center"
                    >
                      Handwritten Resume - View Format
                    </a>
                  ) : (
                    <span className="block text-center text-sm text-muted-foreground">
                      Registration details coming soon
                    </span>
                  )}
                </div>
              </div>

              {/* Right Image */}
              {event.image && (
                <div className="col-span-3 min-h-[32rem] flex items-center justify-center sticky top-6 self-start">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full max-h-[70vh] object-contain rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GALLERY - Grid */}
        {event.images && event.images.length > 0 && (
          <div className="w-full px-4 sm:px-6 py-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-lg"
                >
                  <img
                    src={img}
                    alt={`gallery-${idx}`}
                    className="w-full h-40 object-cover rounded-lg shadow hover:shadow-lg transition-all duration-300 group-hover:scale-110 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
