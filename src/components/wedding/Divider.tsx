export default function Divider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-burgundy/30" />
      <span className="text-burgundy/50 text-xl">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-burgundy/30" />
    </div>
  );
}
