import { SCHEDULE } from "@/lib/wmac-constants";

const groupColors: Record<string, string> = {
  aikido: "bg-red/10 text-red border-red/20",
  judo: "bg-red/10 text-red-dark border-red/20",
  "daito-ryu": "bg-red/10 text-red-dark border-red/20",
  "karate-university": "bg-red-light text-red border-red/20",
  "just-move": "bg-teal/10 text-teal border-teal/20",
  open: "bg-gray-light text-ink/60 border-gray",
};

export default function ScheduleTable({ compact = false }: { compact?: boolean }) {
  const data = compact ? SCHEDULE.slice(0, 3) : SCHEDULE;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-red/20">
            <th className="text-left font-serif font-bold py-3 pr-4 text-ink">Day</th>
            <th className="text-left font-serif font-bold py-3 pr-4 text-ink">Time</th>
            <th className="text-left font-serif font-bold py-3 text-ink">Class</th>
          </tr>
        </thead>
        <tbody>
          {data.map((day) =>
            day.classes.map((cls, i) => (
              <tr
                key={`${day.day}-${i}`}
                className="border-b border-gray-light"
              >
                <td className="py-2.5 pr-4 font-medium text-ink/80">
                  {i === 0 ? day.day : ""}
                </td>
                <td className="py-2.5 pr-4 text-ink/60 tabular-nums">
                  {cls.time}
                </td>
                <td className="py-2.5">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs border ${
                      groupColors[cls.group] || groupColors.open
                    }`}
                  >
                    {cls.name}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
