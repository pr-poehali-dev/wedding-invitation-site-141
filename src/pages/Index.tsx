import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const FLOWER_IMAGE = "https://cdn.poehali.dev/projects/a2d99f7d-7830-4d4a-9a9c-96665d730cac/files/d6033308-1142-472e-9cf7-048c7094102a.jpg";

const petals = ["🌸", "🌹", "🌺", "✿", "❀"];

function Petal({ id }: { id: number }) {
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

function Divider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-burgundy/30" />
      <span className="text-burgundy/50 text-xl">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-burgundy/30" />
    </div>
  );
}

type SurveyData = {
  name: string;
  attending: "yes" | "no" | "maybe" | "";
  guests: string;
  dietary: string;
  song: string;
  message: string;
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [survey, setSurvey] = useState<SurveyData>({
    name: "",
    attending: "",
    guests: "1",
    dietary: "",
    song: "",
    message: "",
  });

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    ["hero", "details", "survey", "contacts"].forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSurveySubmitted(true);
  };

  const navItems = [
    { id: "hero", label: "Приглашение" },
    { id: "details", label: "Детали" },
    { id: "survey", label: "Опрос" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-milk font-cormorant text-burgundy overflow-x-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <Petal key={i} id={i} />
      ))}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-milk/90 backdrop-blur-sm border-b border-burgundy/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-cormorant-infant italic text-burgundy/60 text-sm tracking-widest uppercase">
            А & М
          </span>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-montserrat text-xs tracking-widest uppercase transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-burgundy border-b border-burgundy"
                    : "text-burgundy/50 hover:text-burgundy/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        ref={(el) => (sectionRefs.current["hero"] = el)}
        className="min-h-screen flex flex-col items-center justify-center relative pt-20 pb-16 px-6"
      >
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-6">
              Мы приглашаем вас разделить с нами
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <h1 className="font-cormorant text-7xl md:text-9xl font-light text-burgundy leading-none mb-2">
              Алексей
            </h1>
            <div className="flex items-center justify-center gap-6 my-4">
              <div className="h-px w-16 bg-gold" />
              <span className="text-gold text-3xl font-light">&</span>
              <div className="h-px w-16 bg-gold" />
            </div>
            <h1 className="font-cormorant text-7xl md:text-9xl font-light text-burgundy leading-none mb-8">
              Мария
            </h1>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.7s", opacity: 0 }}>
            <p className="font-cormorant-infant italic text-2xl text-burgundy/70 mb-10 leading-relaxed">
              «Любовь долготерпит, милосердствует,<br />
              любовь не завидует...»
            </p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.9s", opacity: 0 }}>
            <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl mb-10">
              <img
                src={FLOWER_IMAGE}
                alt="Цветы"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "1.1s", opacity: 0 }}>
            <div className="bg-burgundy/5 border border-burgundy/15 px-10 py-6 inline-block">
              <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-burgundy/60 mb-2">
                Дата торжества
              </p>
              <p className="font-cormorant text-4xl text-burgundy">
                14 июня 2025 года
              </p>
              <p className="font-montserrat text-xs tracking-widest text-gold mt-1">
                Суббота · 16:00
              </p>
            </div>
          </div>

          <div className="mt-10 animate-fade-in" style={{ animationDelay: "1.3s", opacity: 0 }}>
            <button
              onClick={() => scrollTo("survey")}
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

      {/* DETAILS */}
      <section
        id="details"
        ref={(el) => (sectionRefs.current["details"] = el)}
        className="py-24 px-6 bg-milk-dark"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">
              Детали праздника
            </p>
            <h2 className="font-cormorant text-5xl font-light text-burgundy">
              Программа вечера
            </h2>
          </div>

          <Divider />

          <div className="space-y-10">
            {[
              { time: "15:30", title: "Сбор гостей", desc: "Встреча и приветственные напитки", icon: "Users" },
              { time: "16:00", title: "Церемония", desc: "Торжественная регистрация брака", icon: "Heart" },
              { time: "17:00", title: "Фотосессия", desc: "Прогулка и памятные снимки", icon: "Camera" },
              { time: "18:00", title: "Банкет", desc: "Торжественный ужин и танцы", icon: "Music" },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-start group">
                <div className="text-right min-w-[80px]">
                  <span className="font-montserrat text-sm text-gold font-light tracking-wider">
                    {item.time}
                  </span>
                </div>
                <div className="relative">
                  <div className="w-px h-full absolute left-5 top-10 bg-burgundy/15" />
                  <div className="w-10 h-10 rounded-full border border-burgundy/30 flex items-center justify-center bg-milk group-hover:bg-burgundy/10 transition-colors duration-300">
                    <Icon name={item.icon} size={16} className="text-burgundy/60" />
                  </div>
                </div>
                <div className="pb-8">
                  <h3 className="font-cormorant text-2xl text-burgundy">{item.title}</h3>
                  <p className="font-montserrat text-xs text-burgundy/50 mt-1 tracking-wide">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          <div className="text-center mt-12">
            <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-6">
              Место проведения
            </p>
            <h3 className="font-cormorant text-3xl text-burgundy mb-2">
              Банкетный зал «Усадьба»
            </h3>
            <p className="font-montserrat text-sm text-burgundy/50 tracking-wide mb-8">
              г. Москва, ул. Садовая, д. 15
            </p>

            <div className="relative w-full h-64 bg-burgundy/5 border border-burgundy/15 overflow-hidden">
              <iframe
                title="Карта"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.7!2d37.6155!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0KHQsNC00L7QstCw0Y8g0YPQu9C40YbQsCwg0JzQvtGB0LrQstCw!5e0!3m2!1sru!2sru!4v1"
                className="w-full h-full"
                style={{ filter: "sepia(40%) saturate(0.6) hue-rotate(310deg)" }}
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none border border-burgundy/10" />
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://yandex.ru/maps/?text=Москва+ул+Садовая+15"
                target="_blank"
                rel="noreferrer"
                className="font-montserrat text-xs tracking-widest uppercase text-burgundy border border-burgundy/30 px-6 py-3 hover:bg-burgundy hover:text-milk transition-all duration-300 flex items-center gap-2"
              >
                <Icon name="MapPin" size={14} />
                Яндекс Карты
              </a>
              <a
                href="https://maps.google.com/?q=Москва+ул+Садовая+15"
                target="_blank"
                rel="noreferrer"
                className="font-montserrat text-xs tracking-widest uppercase text-burgundy border border-burgundy/30 px-6 py-3 hover:bg-burgundy hover:text-milk transition-all duration-300 flex items-center gap-2"
              >
                <Icon name="Navigation" size={14} />
                Google Maps
              </a>
            </div>
          </div>

          <Divider />

          <div className="text-center">
            <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">
              Музыка вечера
            </p>
            <h3 className="font-cormorant text-3xl text-burgundy mb-6">
              Атмосфера праздника
            </h3>
            <div className="bg-burgundy/5 border border-burgundy/15 p-8 inline-block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center">
                  <Icon name="Music" size={20} className="text-burgundy/70" />
                </div>
                <div className="text-left">
                  <p className="font-cormorant text-xl text-burgundy">Живая музыка</p>
                  <p className="font-montserrat text-xs text-burgundy/50 tracking-wide">Струнный квартет & DJ</p>
                </div>
              </div>
              <p className="font-cormorant-infant italic text-burgundy/60 text-sm leading-relaxed">
                Предложите свою любимую песню в опросе ниже —<br />
                мы постараемся включить её в плейлист вечера
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SURVEY */}
      <section
        id="survey"
        ref={(el) => (sectionRefs.current["survey"] = el)}
        className="py-24 px-6 bg-milk"
      >
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">
              Подтверждение
            </p>
            <h2 className="font-cormorant text-5xl font-light text-burgundy mb-4">
              Будете с нами?
            </h2>
            <p className="font-cormorant-infant italic text-burgundy/60">
              Просим ответить до 1 мая 2025 года
            </p>
          </div>

          {surveySubmitted ? (
            <div className="text-center py-16 animate-fade-in-up" style={{ opacity: 0 }}>
              <div className="text-6xl mb-6">🌹</div>
              <h3 className="font-cormorant text-4xl text-burgundy mb-4">
                Спасибо, {survey.name || "дорогой гость"}!
              </h3>
              <p className="font-cormorant-infant italic text-burgundy/60 text-xl">
                {survey.attending === "yes"
                  ? "Мы с нетерпением ждём встречи с вами!"
                  : survey.attending === "maybe"
                  ? "Мы надеемся увидеть вас на празднике."
                  : "Жаль, что вас не будет — вы будете в наших сердцах."}
              </p>
              <button
                onClick={() => setSurveySubmitted(false)}
                className="mt-8 font-montserrat text-xs tracking-widest uppercase text-burgundy/50 border-b border-burgundy/20 hover:text-burgundy transition-colors duration-200"
              >
                Изменить ответ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSurveySubmit} className="space-y-6">
              <div>
                <label className="font-montserrat text-xs tracking-[0.2em] uppercase text-burgundy/60 block mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  value={survey.name}
                  onChange={(e) => setSurvey({ ...survey, name: e.target.value })}
                  placeholder="Имя и фамилия"
                  className="w-full bg-transparent border-b border-burgundy/30 py-3 font-cormorant text-lg text-burgundy placeholder:text-burgundy/25 focus:outline-none focus:border-burgundy transition-colors duration-200"
                />
              </div>

              <div>
                <label className="font-montserrat text-xs tracking-[0.2em] uppercase text-burgundy/60 block mb-4">
                  Смогу присутствовать? *
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "yes", label: "Да, буду!" },
                    { value: "maybe", label: "Постараюсь" },
                    { value: "no", label: "Не смогу" },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setSurvey({ ...survey, attending: opt.value as SurveyData["attending"] })}
                      className={`flex-1 py-3 font-montserrat text-xs tracking-wider uppercase border transition-all duration-300 ${
                        survey.attending === opt.value
                          ? "bg-burgundy text-milk border-burgundy"
                          : "bg-transparent text-burgundy border-burgundy/30 hover:border-burgundy/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {(survey.attending === "yes" || survey.attending === "maybe") && (
                <>
                  <div>
                    <label className="font-montserrat text-xs tracking-[0.2em] uppercase text-burgundy/60 block mb-2">
                      Количество гостей
                    </label>
                    <select
                      value={survey.guests}
                      onChange={(e) => setSurvey({ ...survey, guests: e.target.value })}
                      className="w-full bg-transparent border-b border-burgundy/30 py-3 font-cormorant text-lg text-burgundy focus:outline-none focus:border-burgundy transition-colors duration-200 cursor-pointer"
                    >
                      {["1", "2", "3", "4", "5+"].map((n) => (
                        <option key={n} value={n} className="bg-milk text-burgundy">
                          {n} {n === "1" ? "гость" : "гостя"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-montserrat text-xs tracking-[0.2em] uppercase text-burgundy/60 block mb-2">
                      Особые пожелания по меню
                    </label>
                    <input
                      type="text"
                      value={survey.dietary}
                      onChange={(e) => setSurvey({ ...survey, dietary: e.target.value })}
                      placeholder="Аллергии, вегетарианство..."
                      className="w-full bg-transparent border-b border-burgundy/30 py-3 font-cormorant text-lg text-burgundy placeholder:text-burgundy/25 focus:outline-none focus:border-burgundy transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="font-montserrat text-xs tracking-[0.2em] uppercase text-burgundy/60 block mb-2">
                      Ваша любимая песня для плейлиста 🎵
                    </label>
                    <input
                      type="text"
                      value={survey.song}
                      onChange={(e) => setSurvey({ ...survey, song: e.target.value })}
                      placeholder="Исполнитель — Название"
                      className="w-full bg-transparent border-b border-burgundy/30 py-3 font-cormorant text-lg text-burgundy placeholder:text-burgundy/25 focus:outline-none focus:border-burgundy transition-colors duration-200"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="font-montserrat text-xs tracking-[0.2em] uppercase text-burgundy/60 block mb-2">
                  Пожелание молодым
                </label>
                <textarea
                  rows={3}
                  value={survey.message}
                  onChange={(e) => setSurvey({ ...survey, message: e.target.value })}
                  placeholder="Ваши тёплые слова..."
                  className="w-full bg-transparent border-b border-burgundy/30 py-3 font-cormorant text-lg text-burgundy placeholder:text-burgundy/25 focus:outline-none focus:border-burgundy transition-colors duration-200 resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!survey.attending}
                  className="w-full bg-burgundy text-milk font-montserrat text-xs tracking-[0.3em] uppercase py-5 hover:bg-burgundy-light transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Отправить ответ
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section
        id="contacts"
        ref={(el) => (sectionRefs.current["contacts"] = el)}
        className="py-24 px-6 bg-milk-dark"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Организаторы
          </p>
          <h2 className="font-cormorant text-5xl font-light text-burgundy mb-4">
            Есть вопросы?
          </h2>
          <p className="font-cormorant-infant italic text-burgundy/60 text-xl mb-12">
            Свяжитесь с нами — мы ответим на любые вопросы
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
            {[
              {
                name: "Анастасия",
                role: "Координатор торжества",
                phone: "+7 (999) 123-45-67",
                telegram: "@nastya_wed",
                icon: "Crown",
              },
              {
                name: "Дмитрий",
                role: "По вопросам трансфера",
                phone: "+7 (999) 765-43-21",
                telegram: "@dmitry_wed",
                icon: "Car",
              },
            ].map((contact, i) => (
              <div
                key={i}
                className="bg-milk border border-burgundy/15 p-8 text-left hover:border-burgundy/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={contact.icon} size={16} className="text-burgundy/60" />
                  </div>
                  <div>
                    <h3 className="font-cormorant text-2xl text-burgundy">{contact.name}</h3>
                    <p className="font-montserrat text-xs text-gold tracking-wide">{contact.role}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-3 font-montserrat text-sm text-burgundy/70 hover:text-burgundy transition-colors duration-200"
                  >
                    <Icon name="Phone" size={14} className="text-gold" />
                    {contact.phone}
                  </a>
                  <a
                    href={`https://t.me/${contact.telegram.slice(1)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 font-montserrat text-sm text-burgundy/70 hover:text-burgundy transition-colors duration-200"
                  >
                    <Icon name="Send" size={14} className="text-gold" />
                    {contact.telegram}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          <div className="mt-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold/40" />
              <span className="font-cormorant-infant italic text-3xl text-burgundy/40">✦</span>
              <div className="h-px w-12 bg-gold/40" />
            </div>
            <p className="font-cormorant text-2xl italic text-burgundy/50">
              Алексей & Мария
            </p>
            <p className="font-montserrat text-xs tracking-widest text-gold mt-2">
              14 · 06 · 2025
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}