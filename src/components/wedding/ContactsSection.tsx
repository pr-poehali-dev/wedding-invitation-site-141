import Icon from "@/components/ui/icon";
import Divider from "./Divider";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
};

export default function ContactsSection({ sectionRef }: Props) {
  const headingRef = useScrollReveal();
  const cardsRef = useScrollReveal(0.1);
  const footerRef = useScrollReveal(0.1);

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="py-24 px-6 bg-milk-dark"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div ref={headingRef} className="scroll-reveal">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Организаторы
          </p>
          <h2 className="font-cormorant text-5xl font-light text-burgundy mb-4">
            Есть вопросы?
          </h2>
          <p className="font-cormorant-infant italic text-burgundy/60 text-xl mb-12">
            Свяжитесь с нами — мы ответим на любые вопросы
          </p>
        </div>

        <div ref={cardsRef} className="scroll-reveal grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
          {[
            {
              name: "Анна",
              role: "Невеста",
              phone: "+7 (914) 291-46-89",
              telegram: "@Ann_Mas",
              icon: "Crown",
            },
            {
              name: "Юрий",
              role: "Жених",
              phone: "+7 (918) 121-66-31",
              telegram: "@ririruo",
              icon: "Heart",
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

        <div ref={footerRef} className="scroll-reveal mt-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="font-cormorant-infant italic text-3xl text-burgundy/40">✦</span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <p className="font-cormorant text-2xl italic text-burgundy/50">
            Юрий & Анна
          </p>
          <p className="font-montserrat text-xs tracking-widest text-gold mt-2">
            19 · 06 · 2026
          </p>
        </div>
      </div>
    </section>
  );
}