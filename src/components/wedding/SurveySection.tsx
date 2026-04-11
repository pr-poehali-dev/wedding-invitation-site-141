import { type SurveyData } from "./types";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
  survey: SurveyData;
  setSurvey: (data: SurveyData) => void;
  surveySubmitted: boolean;
  setSurveySubmitted: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function SurveySection({
  sectionRef,
  survey,
  setSurvey,
  surveySubmitted,
  setSurveySubmitted,
  onSubmit,
}: Props) {
  const headingRef = useScrollReveal();
  const formRef = useScrollReveal(0.05);

  return (
    <section
      id="survey"
      ref={sectionRef}
      className="py-24 px-6 bg-milk"
    >
      <div className="max-w-xl mx-auto">
        <div ref={headingRef} className="scroll-reveal text-center mb-12">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Подтверждение
          </p>
          <h2 className="font-cormorant text-5xl font-light text-burgundy mb-4">
            Будете с нами?
          </h2>
          <p className="font-cormorant-infant italic text-burgundy/60">
            Просим ответить до 1 мая 2026 года
          </p>
        </div>

        {surveySubmitted ? (
          <div className="text-center py-16 scroll-reveal scroll-visible">
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
          <form ref={formRef} onSubmit={onSubmit} className="scroll-reveal space-y-6">
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
                    Будут ли с вами дети?
                  </label>
                  <select
                    value={survey.children}
                    onChange={(e) => setSurvey({ ...survey, children: e.target.value })}
                    className="w-full bg-transparent border-b border-burgundy/30 py-3 font-cormorant text-lg text-burgundy focus:outline-none focus:border-burgundy transition-colors duration-200 cursor-pointer"
                  >
                    {["0", "1", "2", "3", "4+"].map((n) => (
                      <option key={n} value={n} className="bg-milk text-burgundy">
                        {n === "0" ? "Нет, без детей" : n === "1" ? "1 ребёнок" : `${n} детей`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-montserrat text-xs tracking-[0.2em] uppercase text-burgundy/60 block mb-4">
                    Предпочтения по алкоголю
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Шампанское", "Вино", "Коньяк", "Виски", "Водка", "Пиво", "Не употребляю"].map((drink) => (
                      <button
                        type="button"
                        key={drink}
                        onClick={() => {
                          const list = survey.alcohol.includes(drink)
                            ? survey.alcohol.filter((d) => d !== drink)
                            : drink === "Не употребляю"
                            ? ["Не употребляю"]
                            : [...survey.alcohol.filter((d) => d !== "Не употребляю"), drink];
                          setSurvey({ ...survey, alcohol: list });
                        }}
                        className={`px-4 py-2 font-montserrat text-xs tracking-wide border transition-all duration-300 ${
                          survey.alcohol.includes(drink)
                            ? "bg-burgundy text-milk border-burgundy"
                            : "bg-transparent text-burgundy border-burgundy/30 hover:border-burgundy/60"
                        }`}
                      >
                        {drink}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-montserrat text-xs tracking-[0.2em] uppercase text-burgundy/60 block mb-4">
                    Будете ли присутствовать на втором дне свадьбы?
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: "yes", label: "Да, буду!" },
                      { value: "maybe", label: "Возможно" },
                      { value: "no", label: "Нет" },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setSurvey({ ...survey, secondDay: opt.value as SurveyData["secondDay"] })}
                        className={`flex-1 py-3 font-montserrat text-xs tracking-wider uppercase border transition-all duration-300 ${
                          survey.secondDay === opt.value
                            ? "bg-burgundy text-milk border-burgundy"
                            : "bg-transparent text-burgundy border-burgundy/30 hover:border-burgundy/60"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
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
  );
}