import { ChevronLeft, ChevronRight, ListChecks } from "lucide-react";

interface FooterProps {
  marked: boolean;
  onToggleMark: () => void;
  onOpenList: () => void;
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export default function Footer({
  marked,
  onToggleMark,
  onOpenList,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: FooterProps) {
  return (
    <footer className="sticky bottom-0 z-20 flex h-12 items-stretch justify-between border-t border-slate-200 bg-slate-100 sm:h-14">
      <label className="flex cursor-pointer select-none items-center gap-2 px-4 text-sm text-slate-700 sm:px-8">
        <input
          type="checkbox"
          checked={marked}
          onChange={onToggleMark}
          className="h-5 w-5 cursor-pointer rounded border-slate-400 accent-blue-600"
        />
        Mark item for review
      </label>

      <div className="flex items-stretch">
        <button
          type="button"
          onClick={onOpenList}
          aria-label="Danh sách câu hỏi"
          className="flex w-14 items-center justify-center bg-[#0b3a82] text-white transition hover:bg-[#0d4aa6] sm:w-16"
        >
          <ListChecks size={22} />
        </button>
        <button
          type="button"
          onClick={onPrev}
          disabled={disablePrev}
          aria-label="Câu trước"
          className="flex w-14 items-center justify-center bg-green-600 text-white transition hover:bg-green-500 disabled:opacity-50 sm:w-16"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext}
          aria-label="Câu sau"
          className="flex w-14 items-center justify-center bg-green-500 text-white transition hover:bg-green-400 disabled:opacity-50 sm:w-16"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </footer>
  );
}
