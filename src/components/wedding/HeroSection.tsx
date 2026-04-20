import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const FLOWER_IMAGE = "https://cdn.poehali.dev/projects/a2d99f7d-7830-4d4a-9a9c-96665d730cac/files/3175be7c-2491-4d1b-a5fa-a839ab9a3134.jpg";
const WEDDING_DATE = new Date("2026-06-19T16:30:00");

function useCountdown() {
  const calc = () => {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-cormorant text-3xl md:text-5xl font-light text-burgundy leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-montserrat text-[10px] md:text-xs tracking-widest uppercase text-gold mt-1">
        {label}
      </span>
    </div>
  );
}

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
  const countdown = useCountdown();

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-start relative pt-28 pb-10 px-4"
    >
      <div className="text-center max-w-xl mx-auto relative z-10 w-full">

        <div className="hero-reveal-fade" style={{ animationDelay: "0.1s" }}>
          <p className="font-montserrat text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-gold mb-4">
            Мы приглашаем вас на нашу свадьбу
          </p>
        </div>

        <div>
          <h1 className="font-cormorant text-5xl md:text-9xl font-light text-burgundy leading-none mb-1">
            <AnimatedName name="Юрий" baseDelay={0.4} />
          </h1>

          <div className="flex items-center justify-center gap-4 my-2">
            <div className="hero-line-grow h-px w-12 md:w-16 bg-gold" style={{ animationDelay: "0.85s" }} />
            <span className="hero-reveal-fade text-gold text-2xl md:text-3xl font-light" style={{ animationDelay: "1s" }}>
              &
            </span>
            <div className="hero-line-grow h-px w-12 md:w-16 bg-gold" style={{ animationDelay: "0.85s" }} />
          </div>

          <h1 className="font-cormorant text-5xl md:text-9xl font-light text-burgundy leading-none mb-5">
            <AnimatedName name="Анна" baseDelay={1.1} />
          </h1>
        </div>

        <div className="hero-reveal-up" style={{ animationDelay: "1.5s" }}>
          <p className="font-cormorant-infant italic text-lg md:text-2xl text-burgundy/70 mb-5 leading-relaxed">
            «Там, где любовь, там и жизнь»
          </p>
        </div>

        <div className="hero-reveal-up" style={{ animationDelay: "1.7s" }}>
          <p className="font-cormorant text-base md:text-xl text-burgundy/80 leading-relaxed mb-6 max-w-sm md:max-w-lg mx-auto px-2">
            Мы рады сообщить Вам, что состоится самое главное торжество в нашей жизни — день нашей свадьбы!<br />
            Приглашаем Вас разделить с нами радость этого незабываемого дня.
          </p>
        </div>

        <div className="hero-reveal-fade" style={{ animationDelay: "2.0s" }}>
          <div className="w-44 h-44 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl mb-6">
            <img src={FLOWER_IMAGE} alt="Цветы" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="hero-reveal-up" style={{ animationDelay: "2.1s" }}>
          <div className="bg-burgundy/5 border border-burgundy/15 px-6 md:px-10 py-4 md:py-6 inline-block">
            <p className="font-montserrat text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-burgundy/60 mb-1">
              Дата торжества
            </p>
            <p className="font-cormorant text-2xl md:text-4xl text-burgundy">
              19 июня 2026 года
            </p>
            <p className="font-montserrat text-[10px] md:text-xs tracking-widest text-gold mt-1">
              Пятница · 16:30
            </p>
          </div>
        </div>

        <div className="hero-reveal-up" style={{ animationDelay: "2.3s" }}>
          <div className="mt-5">
            <p className="font-montserrat text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-burgundy/40 mb-3">
              До свадьбы осталось
            </p>
            <div className="flex items-center justify-center gap-2 md:gap-10 overflow-x-auto px-2">
              <CountdownUnit value={countdown.days} label="дней" />
              <span className="font-cormorant text-2xl text-burgundy/30 mb-3 shrink-0">·</span>
              <CountdownUnit value={countdown.hours} label="часов" />
              <span className="font-cormorant text-2xl text-burgundy/30 mb-3 shrink-0">·</span>
              <CountdownUnit value={countdown.minutes} label="минут" />
              <span className="font-cormorant text-2xl text-burgundy/30 mb-3 shrink-0">·</span>
              <CountdownUnit value={countdown.seconds} label="секунд" />
            </div>
          </div>
        </div>

        <div className="hero-reveal-fade" style={{ animationDelay: "2.4s" }}>
          <div className="mt-6">
            <button
              onClick={onScrollToSurvey}
              className="font-montserrat text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-milk bg-burgundy px-8 md:px-10 py-3 md:py-4 hover:bg-burgundy-light transition-colors duration-300"
            >
              Подтвердить присутствие
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={18} className="text-burgundy/40" />
      </div>
    </section>
  );
}