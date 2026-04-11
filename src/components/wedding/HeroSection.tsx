import Icon from "@/components/ui/icon";

const FLOWER_IMAGE = "https://cdn.poehali.dev/projects/a2d99f7d-7830-4d4a-9a9c-96665d730cac/files/3175be7c-2491-4d1b-a5fa-a839ab9a3134.jpg";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
  onScrollToSurvey: () => void;
};

function AnimatedName({ name, baseDelay }: { name: string; baseDelay: number }) {
  return (
    <>
      {name.split("").map((letter, i) => (
        <span
          key={i}
          className="hero-name-letter"
          style={{ animationDelay: `${baseDelay + i * 0.07}s` }}
        >
          {letter}
        </span>
      ))}
    </>
  );
}

export default function HeroSection({ sectionRef, onScrollToSurvey }: Props) {
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative pt-24 pb-16 px-6"
    >
      <div className="text-center max-w-2xl mx-auto relative z-10">

        <div className="hero-reveal-fade" style={{ animationDelay: "0.1s" }}>
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-6">
            Мы приглашаем вас на нашу свадьбу
          </p>
        </div>

        <div>
          <h1 className="font-cormorant text-6xl md:text-9xl font-light text-burgundy leading-none mb-2">
            <AnimatedName name="Юрий" baseDelay={0.4} />
          </h1>

          <div className="flex items-center justify-center gap-6 my-4">
            <div
              className="hero-line-grow h-px w-16 bg-gold"
              style={{ animationDelay: "0.85s" }}
            />
            <span
              className="hero-reveal-fade text-gold text-3xl font-light"
              style={{ animationDelay: "1s" }}
            >
              &
            </span>
            <div
              className="hero-line-grow h-px w-16 bg-gold"
              style={{ animationDelay: "0.85s" }}
            />
          </div>

          <h1 className="font-cormorant text-6xl md:text-9xl font-light text-burgundy leading-none mb-8">
            <AnimatedName name="Анна" baseDelay={1.1} />
          </h1>
        </div>

        <div className="hero-reveal-up" style={{ animationDelay: "1.5s" }}>
          <p className="font-cormorant-infant italic text-2xl text-burgundy/70 mb-10 leading-relaxed">
            «Там, где любовь, там и жизнь»
          </p>
        </div>

        <div className="hero-reveal-up" style={{ animationDelay: "1.7s" }}>
          <p className="font-cormorant text-lg md:text-xl text-burgundy/80 leading-relaxed mb-10 max-w-lg mx-auto">
            Мы рады сообщить Вам, что состоится самое главное торжество в нашей жизни — день нашей свадьбы!<br />
            Приглашаем Вас разделить с нами радость этого незабываемого дня.
          </p>
        </div>

        <div className="hero-reveal-fade" style={{ animationDelay: "2.0s" }}>
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl mb-10">
            <img src={FLOWER_IMAGE} alt="Цветы" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="hero-reveal-up" style={{ animationDelay: "2.1s" }}>
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

        <div className="hero-reveal-fade" style={{ animationDelay: "2.4s" }}>
          <div className="mt-10">
            <button
              onClick={onScrollToSurvey}
              className="font-montserrat text-xs tracking-[0.3em] uppercase text-milk bg-burgundy px-10 py-4 hover:bg-burgundy-light transition-colors duration-300"
            >
              Подтвердить присутствие
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={20} className="text-burgundy/40" />
      </div>
    </section>
  );
}