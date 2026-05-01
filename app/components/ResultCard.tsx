"use client";

import { useEffect, useState } from "react";

interface ResultCardProps {
  personality: string;
  coffee: string;
  tagline: string;
  description: string;
  onRetake: () => void;
}

interface Particle {
  id: number;
  x: number;
  emoji: string;
  duration: number;
  delay: number;
  size: number;
}

const CONFETTI_COLORS = ["#C4956A", "#8B5A2B", "#E8C49A", "#F0A500", "#D47A3A", "#FFFBF6", "#3D2B1A", "#F5EDE0"];

function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const items: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      emoji: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 1.2,
      size: 8 + Math.random() * 10,
    }));
    setParticles(items);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "hidden", zIndex: 50 }}>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-60px) rotate(0deg) scale(1); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-40px",
            width: `${p.size}px`,
            height: `${p.size * (Math.random() > 0.5 ? 0.4 : 1)}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            background: p.emoji,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

export default function ResultCard({ personality, coffee, tagline, description, onRetake }: ResultCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "#F5EDE0" }}>
      <Confetti />
      <div className="w-full max-w-lg">
        {/* Brand */}
        <p style={{ fontFamily: "var(--font-inter), sans-serif", color: "#8B5A2B", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "48px" }}>
          Basecamp Coffee
        </p>

        {/* Result card */}
        <div style={{ background: "#FFFBF6", borderRadius: "4px", padding: "48px", boxShadow: "0 4px 32px rgba(139, 90, 43, 0.08)" }}>
          <p style={{ color: "#C4956A", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            Your coffee personality
          </p>

          <h1
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "36px",
              color: "#2d2d2d",
              lineHeight: "1.2",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            {personality}
          </h1>

          <div style={{ width: "48px", height: "2px", background: "#C4956A", margin: "24px 0" }} />

          <p style={{ color: "#8B5A2B", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
            Your coffee
          </p>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "22px", color: "#2d2d2d", marginBottom: "4px" }}>
            {coffee}
          </p>
          <p style={{ color: "#C4956A", fontSize: "14px", fontStyle: "italic", marginBottom: "28px" }}>
            "{tagline}"
          </p>

          <p style={{ color: "#444", fontSize: "15px", lineHeight: "1.7", marginBottom: "40px" }}>
            {description}
          </p>

          <button
            onClick={onRetake}
            style={{
              background: "transparent",
              border: "1px solid #C4956A",
              color: "#8B5A2B",
              padding: "12px 28px",
              fontSize: "13px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "2px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#C4956A";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#8B5A2B";
            }}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
