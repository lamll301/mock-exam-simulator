import { useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import Header from "./Header";
import Footer from "./Footer";
import QuestionListModal from "./QuestionListModal";

/* ---------------------------- Types & mock data ---------------------------- */

type Section = "Listening" | "Reading";

type Content =
  | { type: "image"; src: string; alt: string }
  | { type: "passage"; title?: string; lines: string[] }
  | { type: "empty" };

interface Question {
  id: number;
  text?: string;
  options: string[]; // nhãn A, B, C, D sinh tự động
}

interface Screen {
  section: Section;
  instruction: string;
  content: Content;
  questions: Question[];
}

const TOTAL = 200;
const EXAM_SECONDS = 2 * 60 * 60;

const MOCK_SCREENS: Screen[] = [
  {
    section: "Listening",
    instruction: "Select the one statement that best describes what you see in the picture.",
    content: {
      type: "image",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=60",
      alt: "Three people working at a table",
    },
    questions: [{ id: 1, options: ["", "", "", ""] }],
  },
  {
    section: "Listening",
    instruction: "Select the best response to the question.",
    content: { type: "empty" },
    questions: [{ id: 7, options: ["", "", ""] }],
  },
  {
    section: "Reading",
    instruction: "Select the best answer to complete the sentence.",
    content: { type: "empty" },
    questions: [
      {
        id: 102,
        text: "As an employee of the company, make sure to enter the free shipping code when placing ------- order online.",
        options: ["you", "your", "yours", "yourself"],
      },
    ],
  },
  {
    section: "Reading",
    instruction: "Select the best answer to complete the text.",
    content: {
      type: "passage",
      lines: [
        "Let's explore Indonesia with our Indo Packages. With over 10 years in business, we are confident that you will enjoy every single moment you spend there. You can ---[131]--- lie on the sandy beaches of Bali, shop in the bustling malls of Jakarta, or hike through the thick jungles of Sumatra. And if you are on a ---[132]--- budget, you can find many good deals with us. Just visit our website at indopackages.com. ---[133]--- You can also book ---[134]--- flights on our website. So, what are you waiting for? Call us at 902-555-0166 and set a date for your adventure!",
      ],
    },
    questions: [
      { id: 131, text: "Question 131", options: ["either", "neither", "both", "also"] },
      { id: 132, text: "Question 132", options: ["huge", "generous", "personal", "tight"] },
      {
        id: 133,
        text: "Question 133",
        options: [
          "First-class flight tickets and tour packages are available online only.",
          "The website includes information about Indonesian tourist attractions.",
          "Our best-selling package is luxury tours to the Java Islands.",
          "There you will find thousands of hotels starting at $20 per night.",
        ],
      },
    ],
  },
  {
    section: "Reading",
    instruction: "Read the following coupon then answer the questions.",
    content: {
      type: "passage",
      title: "Miller's Steakhouse",
      lines: [
        "For an unrivaled dining experience!",
        "Dine with a group of 6 or more and get 25% off premium steak meals at Miller's Steakhouse from Oct 1 to Nov 30. Not valid for salads or children's menus. Coupons must be presented and scanned upon ordering, and cannot be combined with any other offers or specials.",
        "For more information on our current promotions, please call 222-456-3338 or visit MillersSteakhouse.com.",
      ],
    },
    questions: [
      {
        id: 153,
        text: "What is indicated about Miller's Steakhouse?",
        options: [
          "It has a separate menu for children.",
          "Its signature dish is steak and salad.",
          "It specializes in dine-in meals only.",
          "It is suitable for large group meals.",
        ],
      },
      {
        id: 154,
        text: "What is NOT true about the coupon?",
        options: [
          "It must be presented upon ordering.",
          "It can be used with other discounts.",
          "It is available for a limited time.",
          "It is applicable to one dish.",
        ],
      },
    ],
  },
];

/* --------------------------------- Helpers -------------------------------- */

const optionLabel = (i: number) => `(${String.fromCharCode(65 + i)})`;

const buildTitle = (screen: Screen): string => {
  const ids = screen.questions.map((q) => q.id);
  const range =
    ids.length > 1 ? `${ids[0]} - ${ids[ids.length - 1]}` : `${ids[0]}`;
  return `${screen.section}: Questions ${range} of ${TOTAL}`;
};

function useCountdown(initialSeconds: number): number {
  const [left, setLeft] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

const findScreenIndex = (questionId: number): number =>
  MOCK_SCREENS.findIndex((sc) => sc.questions.some((q) => q.id === questionId));

const getMarkedQuestionIds = (markedScreens: Set<number>): Set<number> =>
  new Set([...markedScreens].flatMap((i) => MOCK_SCREENS[i].questions.map((q) => q.id)));

/* ------------------------------ Sub components ----------------------------- */

function ContentPanel({ screen }: { screen: Screen }) {
  const { content, instruction } = screen;
  return (
    <section className="flex min-h-[320px] flex-col overflow-y-auto rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:h-full lg:min-h-0">
      <h2 className="mb-5 text-sm font-bold text-[#1f4e86] sm:text-base">{instruction}</h2>

      {content.type === "image" && (
        <img
          src={content.src}
          alt={content.alt}
          className="mx-auto max-h-[420px] w-full max-w-xl border border-slate-300 object-cover grayscale"
        />
      )}

      {content.type === "passage" && (
        <div className="mx-auto w-full max-w-xl border border-slate-800 p-4 text-sm leading-7 text-slate-800">
          {content.title && (
            <p className="mb-1 text-center text-base font-bold">{content.title}</p>
          )}
          {content.lines.map((line, i) => (
            <p key={i} className={i === 0 && content.title ? "mb-1 text-center italic" : "mb-2"}>
              {line}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

interface QuestionPanelProps {
  questions: Question[];
  answers: Record<number, number>;
  onSelect: (qid: number, optionIndex: number) => void;
}

function QuestionPanel({ questions, answers, onSelect }: QuestionPanelProps) {
  const multi = questions.length > 1;
  return (
    <section className="flex min-h-[320px] flex-col rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:h-full lg:min-h-0">
      <h2 className="mb-3 text-base font-bold text-[#1f4e86]">Question</h2>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">
        {questions.map((q) => (
          <div key={q.id}>
            <p className="mb-2 text-xs font-bold">
              {q.id}. {q.text ?? `Question ${q.id}`}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const checked = answers[q.id] === i;
                return (
                  <label
                    key={i}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-xs transition ${
                      checked
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={checked}
                      onChange={() => onSelect(q.id, i)}
                      className="h-4 w-4 accent-blue-600"
                    />
                    <span className="font-semibold">
                      {optionLabel(i)} {opt}
                    </span>
                  </label>
                );
              })}
            </div>
            {multi && <div className="mt-4 border-b border-slate-100" />}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function Toeic() {
  const secondsLeft = useCountdown(EXAM_SECONDS);

  const [screenIndex, setScreenIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

  const screen = MOCK_SCREENS[screenIndex];
  const title = useMemo(() => buildTitle(screen), [screen]);

  const answeredIds = useMemo(() => new Set(Object.keys(answers).map(Number)), [answers]);
  const markedIds = useMemo(() => getMarkedQuestionIds(marked), [marked]);
  const currentIds = useMemo(() => screen.questions.map((q) => q.id), [screen]);

  const handleJump = (questionId: number) => {
    const idx = findScreenIndex(questionId);
    if (idx >= 0) {
      setScreenIndex(idx);
      setPaletteOpen(false);
    }
  };

  const handleSelect = (qid: number, optionIndex: number) =>
    setAnswers((prev) => ({ ...prev, [qid]: optionIndex }));

  const handleToggleMark = () =>
    setMarked((prev) => {
      const next = new Set(prev);
      next.has(screenIndex) ? next.delete(screenIndex) : next.add(screenIndex);
      return next;
    });

  const goPrev = () => setScreenIndex((i) => Math.max(0, i - 1));
  const goNext = () => setScreenIndex((i) => Math.min(MOCK_SCREENS.length - 1, i + 1));

  const handleSubmit = () => setSubmitOpen(true);

  const handleConfirmSubmit = () => {
    // TODO: gọi API nộp bài
    console.log("Submit", answers);
    setSubmitOpen(false);
  };

  return (
    <>
      <Layout
        header={
          <Header
            title={title}
            answered={Object.keys(answers).length}
            total={TOTAL}
            secondsLeft={secondsLeft}
            onSubmit={handleSubmit}
          />
        }
        footer={
          <Footer
            marked={marked.has(screenIndex)}
            onToggleMark={handleToggleMark}
            onOpenList={() => setPaletteOpen(true)}
            onPrev={goPrev}
            onNext={goNext}
            disablePrev={screenIndex === 0}
            disableNext={screenIndex === MOCK_SCREENS.length - 1}
          />
        }
      >
        <div className="grid min-h-0 w-full flex-1 grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)]">
          <ContentPanel screen={screen} />
          <QuestionPanel
            questions={screen.questions}
            answers={answers}
            onSelect={handleSelect}
          />
        </div>
      </Layout>

      <QuestionListModal
        open={paletteOpen}
        mode="palette"
        total={TOTAL}
        answeredIds={answeredIds}
        markedIds={markedIds}
        currentIds={currentIds}
        onSelect={handleJump}
        onClose={() => setPaletteOpen(false)}
      />

      <QuestionListModal
        open={submitOpen}
        mode="submit"
        total={TOTAL}
        answeredIds={answeredIds}
        onClose={() => setSubmitOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </>
  );
}
