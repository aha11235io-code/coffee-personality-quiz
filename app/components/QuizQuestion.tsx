"use client";

interface Answer {
  text: string;
  icon: string;
  personality: string;
}

interface QuizQuestionProps {
  question: string;
  answers: Answer[];
  currentIndex: number;
  total: number;
  onAnswer: (personality: string) => void;
}

export default function QuizQuestion({
  question,
  answers,
  currentIndex,
  total,
  onAnswer,
}: QuizQuestionProps) {
  const progress = ((currentIndex) / total) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "#F5EDE0" }}>
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-10">
          <p style={{ fontFamily: "var(--font-inter), sans-serif", color: "#8B5A2B", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>
            Basecamp Coffee
          </p>
          <p style={{ color: "#C4956A", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>
            Question {currentIndex + 1} of {total}
          </p>
          {/* Progress bar */}
          <div style={{ width: "100%", height: "3px", background: "#EDD9C0", borderRadius: "3px" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #C4956A, #8B5A2B)",
                borderRadius: "3px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Question */}
        <h1
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "28px",
            color: "#2d2d2d",
            lineHeight: "1.4",
            marginBottom: "36px",
            fontWeight: 400,
          }}
        >
          {question}
        </h1>

        {/* Answers */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {answers.map((answer, i) => (
            <button
              key={i}
              onClick={() => onAnswer(answer.personality)}
              style={{
                borderTop: i === 0 ? "1px solid #EDD9C0" : "none",
                borderBottom: "1px solid #EDD9C0",
                borderLeft: "none",
                borderRight: "none",
                background: "transparent",
                padding: "18px 0",
                fontSize: "15px",
                color: "#444",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                transition: "all 0.15s ease",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.paddingLeft = "10px";
                (e.currentTarget as HTMLButtonElement).style.color = "#3D2B1A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.paddingLeft = "0px";
                (e.currentTarget as HTMLButtonElement).style.color = "#6B4226";
              }}
            >
              <span style={{ fontSize: "20px", filter: "grayscale(100%)", opacity: 0.7, flexShrink: 0 }}>
                {answer.icon}
              </span>
              <span>{answer.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
