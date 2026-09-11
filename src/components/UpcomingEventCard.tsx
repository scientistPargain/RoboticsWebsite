import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { useState } from "react";
import UpComingEventFakeRoute from "@/components/UpComingEventFakeRoute";

interface EventProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    category: string;
    participants: string;
    image: string;
    gradient: string;
    registrationLink?: string;
    resumeFormatLink?: string;
  };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function UpcomingEventCard({ event }: EventProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group">
        <div
          onClick={() => setOpen(true)}
          className="card-tech hover:scale-[1.02] transition-all duration-500 overflow-hidden cursor-pointer"
        >
          <div className="relative h-48 lg:h-64 overflow-hidden rounded-t-2xl">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-20`}
            ></div>

            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${event.gradient} text-white`}
              >
                {event.category}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                {event.description}
              </p>
            </div>

            <div className="space-y-2 text-center">
              <p className="text-sm font-semibold text-foreground">
                Handwritten resume required
              </p>
            </div>

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
      </div>

      <UpComingEventFakeRoute
        event={event}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
