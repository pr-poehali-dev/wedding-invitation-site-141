import { useState, useEffect, useRef } from "react";
import { type SurveyData } from "@/components/wedding/types";
import Petal from "@/components/wedding/Petal";
import HeroSection from "@/components/wedding/HeroSection";
import DetailsSection from "@/components/wedding/DetailsSection";
import SurveySection from "@/components/wedding/SurveySection";
import ContactsSection from "@/components/wedding/ContactsSection";

const navItems = [
  { id: "hero", label: "Приглашение" },
  { id: "details", label: "Детали" },
  { id: "survey", label: "Опрос" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [survey, setSurvey] = useState<SurveyData>({
    name: "",
    attending: "",
    guests: "1",
    children: "0",
    alcohol: [],
    secondDay: "",
    transfer: "",
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

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://functions.poehali.dev/e17b77e0-c386-413c-af44-ca8f8f6dc579", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: survey.name,
          attending: survey.attending,
          guests: survey.guests,
          children: survey.children,
          alcohol: survey.alcohol,
          secondDay: survey.secondDay,
          transfer: survey.transfer,
          dietary: survey.dietary,
          song: survey.song,
          message: survey.message,
        }),
      });
    } catch (_e) {
      console.error("Ошибка отправки ответа", _e);
    }
    setSurveySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-milk font-cormorant text-burgundy overflow-x-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <Petal key={i} id={i} />
      ))}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-milk/90 backdrop-blur-sm border-b border-burgundy/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-cormorant-infant italic text-burgundy/60 text-sm tracking-widest uppercase">
            Ю & А
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

      <HeroSection
        sectionRef={(el) => (sectionRefs.current["hero"] = el)}
        onScrollToSurvey={() => scrollTo("survey")}
      />

      <DetailsSection
        sectionRef={(el) => (sectionRefs.current["details"] = el)}
      />

      <SurveySection
        sectionRef={(el) => (sectionRefs.current["survey"] = el)}
        survey={survey}
        setSurvey={setSurvey}
        surveySubmitted={surveySubmitted}
        setSurveySubmitted={setSurveySubmitted}
        onSubmit={handleSurveySubmit}
      />

      <ContactsSection
        sectionRef={(el) => (sectionRefs.current["contacts"] = el)}
      />
    </div>
  );
}