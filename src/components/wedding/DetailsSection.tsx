import Icon from "@/components/ui/icon";
import Divider from "./Divider";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
};

export default function DetailsSection({ sectionRef }: Props) {
  const headingRef = useScrollReveal();
  const timelineRef = useScrollReveal(0.1);
  const venueRef = useScrollReveal(0.1);

  return (
    <section
      id="details"
      ref={sectionRef}
      className="py-24 px-6 bg-milk-dark"
    >
      <div className="max-w-3xl mx-auto">

        <div ref={headingRef} className="scroll-reveal text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Детали праздника
          </p>
          <h2 className="font-cormorant text-5xl font-light text-burgundy">
            Программа вечера
          </h2>
        </div>

        <Divider />

        <div ref={timelineRef} className="scroll-reveal space-y-10">
          {[
            { time: "16:00", title: "Сбор гостей", desc: "Встреча и приветственные напитки", icon: "Users" },
            { time: "16:30", title: "Церемония", desc: "Торжественная регистрация брака", icon: "Heart" },
            { time: "17:00", title: "Фуршет", desc: "Лёгкие закуски и напитки", icon: "UtensilsCrossed" },
            { time: "17:30", title: "Фотосессия", desc: "Прогулка и памятные снимки", icon: "Camera" },
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

        {/* Color palette */}
        <div className="scroll-reveal text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Цветовая гамма
          </p>
          <h3 className="font-cormorant text-3xl font-light text-burgundy mb-8">
            Палитра нашей свадьбы
          </h3>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative w-full md:w-64 h-48 rounded-sm overflow-hidden shadow-lg flex-shrink-0">
              <img
                src="https://cdn.poehali.dev/projects/a2d99f7d-7830-4d4a-9a9c-96665d730cac/bucket/6c13d089-d4bd-47ca-899d-17413fdbc15b.jpg"
                alt="Цветовая палитра свадьбы"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              {[
                { color: "#5C1A28", name: "Тёмный бордо", desc: "Основной акцент" },
                { color: "#8B2635", name: "Бордо", desc: "Детали декора" },
                { color: "#6B7E6B", name: "Шалфей", desc: "Зелень и флористика" },
                { color: "#C4A882", name: "Золото", desc: "Металлические акценты" },
                { color: "#F5F0DC", name: "Крем", desc: "Основной фон" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 border border-white/30 shadow-md"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="text-left">
                    <p className="font-cormorant text-lg text-burgundy leading-none">{item.name}</p>
                    <p className="font-montserrat text-xs text-burgundy/50 tracking-wide">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        <div ref={venueRef} className="scroll-reveal text-center mt-12">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-6">
            Места проведения
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
            <div className="flex-1 bg-burgundy/5 border border-burgundy/15 px-6 py-5">
              <p className="font-montserrat text-xs tracking-widest uppercase text-gold mb-2">Церемония</p>
              <h3 className="font-cormorant text-2xl text-burgundy mb-1">Екатерининский зал</h3>
              <p className="font-montserrat text-xs text-burgundy/50 tracking-wide mb-3">Дворец бракосочетания · г. Краснодар</p>
              <div className="flex gap-2">
                <a href="https://yandex.ru/maps/?text=Краснодар+Дворец+бракосочетания+Екатерининский+зал" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 font-montserrat text-xs text-burgundy border border-burgundy/30 px-3 py-2 hover:bg-burgundy hover:text-milk transition-all duration-300">
                  <Icon name="MapPin" size={12} />Яндекс
                </a>
                <a href="https://maps.google.com/?q=Краснодар+Дворец+бракосочетания+Екатерининский+зал" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 font-montserrat text-xs text-burgundy border border-burgundy/30 px-3 py-2 hover:bg-burgundy hover:text-milk transition-all duration-300">
                  <Icon name="Navigation" size={12} />Google
                </a>
              </div>
            </div>
            <div className="flex-1 bg-burgundy/5 border border-burgundy/15 px-6 py-5">
              <p className="font-montserrat text-xs tracking-widest uppercase text-gold mb-2">Банкет</p>
              <h3 className="font-cormorant text-2xl text-burgundy mb-1">Двин Холл</h3>
              <p className="font-montserrat text-xs text-burgundy/50 tracking-wide mb-3">Банкетный зал · г. Краснодар</p>
              <div className="flex gap-2">
                <a href="https://yandex.ru/maps/?text=Краснодар+Двин+Холл" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 font-montserrat text-xs text-burgundy border border-burgundy/30 px-3 py-2 hover:bg-burgundy hover:text-milk transition-all duration-300">
                  <Icon name="MapPin" size={12} />Яндекс
                </a>
                <a href="https://maps.google.com/?q=Краснодар+Двин+Холл" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 font-montserrat text-xs text-burgundy border border-burgundy/30 px-3 py-2 hover:bg-burgundy hover:text-milk transition-all duration-300">
                  <Icon name="Navigation" size={12} />Google
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}