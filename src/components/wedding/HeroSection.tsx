import Icon from "@/components/ui/icon";

const FLOWER_IMAGE = "https://cdn.poehali.dev/projects/a2d99f7d-7830-4d4a-9a9c-96665d730cac/files/d6033308-1142-472e-9cf7-048c7094102a.jpg";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
  onScrollToSurvey: () => void;
};

export default function HeroSection({ sectionRef, onScrollToSurvey }: Props) {
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative pt-20 pb-16 px-6"
    >
      <div className="text-center max-w-2xl mx-auto relative z-10">
        <div className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-6">
            Мы приглашаем вас на нашу свадьбу
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <h1 className="font-cormorant text-7xl md:text-9xl font-light text-burgundy leading-none mb-2">
            Юрий
          </h1>
          <div className="flex items-center justify-center gap-6 my-4">
            <div className="h-px w-16 bg-gold" />
            <span className="text-gold text-3xl font-light">&</span>
            <div className="h-px w-16 bg-gold" />
          </div>
          <h1 className="font-cormorant text-7xl md:text-9xl font-light text-burgundy leading-none mb-8">
            Анна
          </h1>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.7s", opacity: 0 }}>
          <p className="font-cormorant-infant italic text-2xl text-burgundy/70 mb-10 leading-relaxed">
            «Там, где любовь, там и жизнь»
          </p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.9s", opacity: 0 }}>
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl mb-10">
            <img src={FLOWER_IMAGE} alt="Цветы" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "1.1s", opacity: 0 }}>
          <div className="bg-burgundy/5 border border-burgundy/15 px-10 py-6 inline-block">
            <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-burgundy/60 mb-2">
              Дата торжества
            </p>
            <p className="font-cormorant text-4xl text-burgundy">
              19 июня 2026 года
            </p>
            <p className="font-montserrat text-xs tracking-widest text-gold mt-1">
              Пятница · 16:30
            </p>
          </div>
        </div>

        <div className="mt-10 animate-fade-in" style={{ animationDelay: "1.3s", opacity: 0 }}>
          <button
            onClick={onScrollToSurvey}
            className="font-montserrat text-xs tracking-[0.3em] uppercase text-milk bg-burgundy px-10 py-4 hover:bg-burgundy-light transition-colors duration-300"
          >
            Подтвердить присутствие
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={20} className="text-burgundy/40" />
      </div>
    </section>
  );
}
