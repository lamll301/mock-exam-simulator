import { Clock, Volume2 } from "lucide-react";

interface HeaderProps {
  title: string;
  answered: number;
  total: number;
  secondsLeft: number;
  onToggleAudio?: () => void;
  onSubmit: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

export const formatTime = (totalSeconds: number): string => {
  const s = Math.max(0, totalSeconds);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
};

export default function Header({
  title,
  answered,
  total,
  secondsLeft,
  onToggleAudio,
  onSubmit,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#06214f] text-white shadow-md">
      <div className="relative mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 py-2 sm:px-6 sm:py-3 lg:flex-nowrap">
        <h1 className="order-1 w-full text-center text-sm font-bold sm:text-base lg:absolute lg:left-1/2 lg:w-auto lg:-translate-x-1/2 lg:whitespace-nowrap lg:text-lg">
          {title}
        </h1>

        <div className="order-2 flex w-full items-center justify-center gap-2 lg:ml-auto lg:w-auto lg:justify-end">
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label="Âm thanh"
            className="flex h-8 w-9 items-center justify-center rounded-md bg-blue-500 transition hover:bg-blue-400"
          >
            <Volume2 size={16} />
          </button>

          <span className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-800">
            {answered}/{total}
          </span>

          <span className="flex items-center gap-1.5 rounded-md bg-blue-500 px-3 py-1.5 text-xs font-semibold tabular-nums">
            <Clock size={14} />
            {formatTime(secondsLeft)}
          </span>

          <button
            type="button"
            onClick={onSubmit}
            className="rounded-md bg-orange-500 px-3 py-1.5 text-xs font-bold transition hover:bg-orange-400 sm:px-4"
          >
            Submit
          </button>
        </div>
      </div>
    </header>
  );
}
