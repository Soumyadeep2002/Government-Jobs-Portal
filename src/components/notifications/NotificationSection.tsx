import { motion } from "motion/react";
import { NotificationAlert } from "../../types";
import { Bell, AlertCircle, Award, Calendar, CheckSquare, Sparkles } from "lucide-react";

interface NotificationSectionProps {
  notifications: NotificationAlert[];
  onSelectJob: (jobId: string) => void;
}

export default function NotificationSection({ notifications, onSelectJob }: NotificationSectionProps) {
  
  const getBadgeStyle = (type: NotificationAlert["type"]) => {
    switch (type) {
      case "Urgent":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Admit Card":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Result":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default: // Latest
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
  };

  const getAlertIcon = (type: NotificationAlert["type"]) => {
    switch (type) {
      case "Urgent":
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
      case "Admit Card":
        return <Calendar className="h-4 w-4 text-amber-500" />;
      case "Result":
        return <Award className="h-4 w-4 text-emerald-500" />;
      default:
        return <Bell className="h-4 w-4 text-indigo-500" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs" id="notifications-rail">
      
      {/* Title & Badge */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-650">
            <Bell className="h-4 w-4" />
          </div>
          <h3 className="font-sans text-sm font-extrabold text-slate-800 tracking-tight">
            Latest Bulletin News
          </h3>
        </div>
        <span className="flex items-center gap-1 font-mono text-[9px] font-bold text-slate-400">
          <Sparkles className="h-2.5 w-2.5 text-amber-500" />
          REALTIME FEED
        </span>
      </div>

      {/* Narrative list cards */}
      <div className="space-y-3.5">
        {notifications.map((notif) => (
          <motion.div
            whileHover={{ scale: 1.01, y: -1 }}
            key={notif.id}
            id={`notif-card-${notif.id}`}
            className="group relative rounded-xl border border-slate-50 p-4 transition-all hover:bg-slate-50/70 hover:border-slate-100 text-left"
          >
            {/* Tag badge with Date */}
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-sans text-[10px] font-extrabold border uppercase tracking-wider ${getBadgeStyle(notif.type)}`}>
                {getAlertIcon(notif.type)}
                <span>{notif.type}</span>
              </span>
              <span className="font-mono text-[10px] font-semibold text-slate-400">
                {new Date(notif.date).toLocaleDateString("en-IN", {month: "short", day: "numeric"})}
              </span>
            </div>

            {/* Title */}
            <h4 className="font-sans text-xs font-bold leading-snug text-slate-800 transition-colors group-hover:text-indigo-600">
              {notif.title}
            </h4>

            {/* Description paragraph */}
            <p className="font-sans text-[11px] text-slate-500 leading-normal mt-1 pr-1 font-normal">
              {notif.description}
            </p>

            {/* Optional action if job attached */}
            {notif.jobId && (
              <button
                onClick={() => onSelectJob(notif.jobId!)}
                id={`btn-notif-job-link-${notif.id}`}
                className="mt-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Navigate to Attached Job Vacancy</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            )}
          </motion.div>
        ))}
      </div>



    </div>
  );
}
