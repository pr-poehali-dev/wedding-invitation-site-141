import Icon from "@/components/ui/icon";

export default function Divider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-burgundy/30" />
      <Icon name="Sparkles" size={16} className="text-burgundy/40" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-burgundy/30" />
    </div>
  );
}