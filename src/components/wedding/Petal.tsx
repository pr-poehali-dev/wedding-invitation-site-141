const petals = ["🌸", "🌹", "🌺", "✿", "❀"];

export default function Petal({ id }: { id: number }) {
  const left = `${(id * 17 + 5) % 95}%`;
  const delay = `${(id * 1.3) % 8}s`;
  const duration = `${5 + (id % 4)}s`;
  const emoji = petals[id % petals.length];
  return (
    <span
      className="fixed pointer-events-none select-none text-lg opacity-0"
      style={{
        left,
        top: "-30px",
        animationName: "petal-fall",
        animationDuration: duration,
        animationDelay: delay,
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
        zIndex: 0,
      }}
    >
      {emoji}
    </span>
  );
}
