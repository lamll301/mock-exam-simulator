import { X } from "lucide-react";

interface PartDef {
  name: string;
  start: number;
  end: number;
}

interface SectionDef {
  name: string;
  parts: PartDef[];
}

export const EXAM_SECTIONS: SectionDef[] = [
  {
    name: "Listening",
    parts: [
      { name: "Part 1", start: 1, end: 6 },
      { name: "Part 2", start: 7, end: 31 },
      { name: "Part 3", start: 32, end: 70 },
      { name: "Part 4", start: 71, end: 100 },
    ],
  },
  {
    name: "Reading",
    parts: [
      { name: "Part 5", start: 101, end: 130 },
      { name: "Part 6", start: 131, end: 146 },
      { name: "Part 7", start: 147, end: 200 },
    ],
  },
];

interface QuestionListModalProps {
  open: boolean;
  /** palette: danh sách để nhảy câu | submit: popup NOTIFICATION khi nộp bài */
  mode: "palette" | "submit";
  answeredIds: Set<number>;
  markedIds?: Set<number>;
  currentIds?: number[];
  total: number;
  onSelect?: (questionId: number) => void;
  onClose: () => void;
  onConfirm?: () => void;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

function Chip({
  id,
  answered,
  marked,
  current,
  onClick,
}: {
  id: number;
  answered: boolean;
  marked: boolean;
  current: boolean;
  onClick?: () => void;
}) {
  const cls = `relative flex h-7 w-9 items-center justify-center rounded text-[11px] font-semibold ${
    answered ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-500"
  } ${current ? "ring-2 ring-blue-500 ring-offset-1" : ""} ${
    onClick ? "cursor-pointer transition hover:brightness-95" : ""
  }`;

  const content = (
    <>
      {id}
      {marked && (
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-white bg-blue-600" />
      )}
    </>
  );

  return onClick ? (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  ) : (
    <div className={cls}>{content}</div>
  );
}

export default function QuestionListModal({
  open,
  mode,
  answeredIds,
  markedIds,
  currentIds = [],
  total,
  onSelect,
  onClose,
  onConfirm,
}: QuestionListModalProps) {
  if (!open) return null;

  const isSubmit = mode === "submit";
  const unanswered = total - answeredIds.size;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3">
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col rounded-xl bg-white p-5 shadow-xl sm:p-7">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-3 top-3 rounded p-1 text-slate-500 hover:bg-slate-100"
        >
          <X size={18} />
        </button>

        {isSubmit ? (
          <div className="mb-5 text-center">
            <h3 className="text-2xl font-extrabold tracking-wide text-red-600">NOTIFICATION</h3>
            <p className="mt-3 text-sm font-medium text-slate-800 sm:text-base">
              {unanswered > 0
                ? "You have unanswered questions. Submit anyway?"
                : "Are you sure you want to submit?"}
            </p>
          </div>
        ) : (
          <h3 className="mb-4 text-center text-lg font-bold text-[#1f4e86]">Danh sách câu hỏi</h3>
        )}

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
          {EXAM_SECTIONS.map((section) => (
            <div key={section.name}>
              <div className="rounded-md bg-[#1f4e86] px-4 py-2.5 text-sm font-bold text-white">
                {section.name}
              </div>

              <div className="relative mt-3 space-y-5 pl-6">
                <span className="absolute bottom-0 left-[5px] top-2 w-px bg-slate-300" />

                {section.parts.map((part) => (
                  <div key={part.name} className="relative">
                    <span className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-slate-400" />
                    <p className="mb-2 text-sm font-bold text-[#1f4e86]">{part.name}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {range(part.start, part.end).map((id) => (
                        <Chip
                          key={id}
                          id={id}
                          answered={answeredIds.has(id)}
                          marked={!isSubmit && !!markedIds?.has(id)}
                          current={!isSubmit && currentIds.includes(id)}
                          onClick={!isSubmit && onSelect ? () => onSelect(id) : undefined}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <i className="h-3 w-3 rounded bg-orange-500" /> Answered
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-3 w-3 rounded bg-slate-200" /> Not Answered
            </span>
          </div>

          {isSubmit && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-md bg-orange-500 px-5 py-2 text-sm font-bold text-white hover:bg-orange-400"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
