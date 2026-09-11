import { Calendar, MapPin, Clock, Users, Trophy } from 'lucide-react';

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
    achievement?: string;
  };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function PastEventCard({ event }: EventProps) {
  return (
    <div className="group card-tech hover:scale-[1.02] transition-all duration-500 overflow-hidden">
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-20`}></div>

        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${event.gradient} text-white`}>
            {event.category}
          </span>
        </div>

        {event.achievement && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-tech-orange text-white text-xs font-semibold">
              <Trophy size={12} />
              {event.achievement}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-semibold">Event Completed</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">{event.time}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-tech-green" />
            <span className="text-muted-foreground">{event.location}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-tech-orange" />
            <span className="text-muted-foreground">{event.participants}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <a
            href="https://www.instagram.com/theroboticsclub/"
            className="w-full block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors text-center"
          >
            View Event Details
          </a>
        </div>
      </div>
    </div>
  );
}
