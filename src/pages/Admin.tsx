import { useState } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/bca1d50f-6b2f-45e3-8d1a-e6b6ac0cb92e";

type Response = {
  id: number;
  name: string;
  attending: string;
  guests: string;
  children: string;
  alcohol: string[];
  secondDay: string;
  transfer: string;
  dietary: string;
  song: string;
  message: string;
  createdAt: string;
};

const attendingLabel: Record<string, string> = {
  yes: "✅ Да",
  no: "❌ Нет",
  maybe: "🤔 Возможно",
  "": "—",
};

const yesNoLabel: Record<string, string> = {
  yes: "✅ Да",
  no: "❌ Нет",
  maybe: "🤔 Возможно",
  "": "—",
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}?p=${encodeURIComponent(password)}`, {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (res.ok) {
        setResponses(data.responses);
        setAuthed(true);
      } else {
        setError("Неверный пароль");
      }
    } catch {
      setError("Ошибка соединения");
    }
    setLoading(false);
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?p=${encodeURIComponent(password)}`, {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (res.ok) setResponses(data.responses);
    } catch (_e) {
      console.error(_e);
    }
    setLoading(false);
  };

  const clearAll = async () => {
    if (!confirm("Удалить все ответы? Это действие нельзя отменить.")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?p=${encodeURIComponent(password)}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (res.ok) setResponses([]);
    } catch (_e) {
      console.error(_e);
    }
    setLoading(false);
  };

  const deleteOne = async (id: number) => {
    if (!confirm("Удалить этот ответ?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}?p=${encodeURIComponent(password)}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (res.ok) setResponses((prev) => prev.filter((r) => r.id !== id));
    } catch (_e) {
      console.error(_e);
    }
  };

  const attending = responses.filter((r) => r.attending === "yes").length;
  const maybe = responses.filter((r) => r.attending === "maybe").length;
  const no = responses.filter((r) => r.attending === "no").length;
  const totalGuests = responses
    .filter((r) => r.attending === "yes" || r.attending === "maybe")
    .reduce((sum, r) => sum + (parseInt(r.guests) || 1), 0);
  const secondDay = responses.filter((r) => r.secondDay === "yes").length;

  if (!authed) {
    return (
      <div className="min-h-screen bg-milk font-cormorant flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Юрий & Анна
          </p>
          <h1 className="font-cormorant text-4xl text-burgundy mb-2">Страница организатора</h1>
          <p className="font-cormorant-infant italic text-burgundy/50 mb-10">Введите пароль для входа</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full bg-transparent border-b border-burgundy/30 py-3 font-cormorant text-xl text-burgundy placeholder:text-burgundy/25 focus:outline-none focus:border-burgundy text-center tracking-widest"
            />
            {error && (
              <p className="font-montserrat text-xs text-red-500">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy text-milk font-montserrat text-xs tracking-[0.3em] uppercase py-4 hover:bg-burgundy/80 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-milk font-cormorant text-burgundy">
      {/* Header */}
      <div className="bg-milk border-b border-burgundy/10 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-cormorant text-2xl text-burgundy">Ответы гостей</h1>
          <p className="font-montserrat text-xs text-burgundy/40 tracking-wide">Юрий & Анна · 19 июня 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 font-montserrat text-xs tracking-widest uppercase text-burgundy border border-burgundy/30 px-4 py-2 hover:bg-burgundy hover:text-milk transition-all duration-300"
          >
            <Icon name="RefreshCw" size={14} />
            Обновить
          </button>
          <button
            onClick={clearAll}
            disabled={loading}
            className="flex items-center gap-2 font-montserrat text-xs tracking-widest uppercase text-red-600 border border-red-300 px-4 py-2 hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            <Icon name="Trash2" size={14} />
            Очистить
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Всего ответов", value: responses.length, icon: "Users" },
            { label: "Придут", value: attending, icon: "CheckCircle" },
            { label: "Возможно", value: maybe, icon: "HelpCircle" },
            { label: "Не придут", value: no, icon: "XCircle" },
            { label: "Всего гостей", value: totalGuests, icon: "UserPlus" },
            { label: "Второй день", value: secondDay, icon: "CalendarDays" },
          ].map((stat, i) => (
            <div key={i} className="bg-burgundy/5 border border-burgundy/15 px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon name={stat.icon} size={14} className="text-gold" />
                <p className="font-montserrat text-xs text-burgundy/50 tracking-wide uppercase">{stat.label}</p>
              </div>
              <p className="font-cormorant text-4xl text-burgundy">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        {responses.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-cormorant-infant italic text-2xl text-burgundy/40">Ответов пока нет</p>
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((r) => (
              <div key={r.id} className="bg-white/60 border border-burgundy/10 p-5 hover:border-burgundy/25 transition-colors duration-200">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-cormorant text-2xl text-burgundy">{r.name}</h3>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-montserrat text-xs text-burgundy/40 whitespace-nowrap hidden sm:block">
                      {new Date(r.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <button
                      onClick={() => deleteOne(r.id)}
                      className="text-burgundy/30 hover:text-red-500 transition-colors duration-200"
                      title="Удалить ответ"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className="font-montserrat text-[10px] uppercase tracking-wider text-burgundy/40 mb-1">Присутствие</p>
                    <p className="font-cormorant text-lg">{attendingLabel[r.attending] ?? "—"}</p>
                  </div>
                  <div>
                    <p className="font-montserrat text-[10px] uppercase tracking-wider text-burgundy/40 mb-1">Гостей</p>
                    <p className="font-cormorant text-lg">{r.guests || "1"}</p>
                  </div>
                  <div>
                    <p className="font-montserrat text-[10px] uppercase tracking-wider text-burgundy/40 mb-1">Дети</p>
                    <p className="font-cormorant text-lg">{r.children === "0" ? "Нет" : r.children}</p>
                  </div>
                  <div>
                    <p className="font-montserrat text-[10px] uppercase tracking-wider text-burgundy/40 mb-1">Второй день</p>
                    <p className="font-cormorant text-lg">{yesNoLabel[r.secondDay] ?? "—"}</p>
                  </div>
                  <div>
                    <p className="font-montserrat text-[10px] uppercase tracking-wider text-burgundy/40 mb-1">Алкоголь</p>
                    <p className="font-cormorant text-lg">{r.alcohol?.length ? r.alcohol.join(", ") : "Не употребляет"}</p>
                  </div>
                  {r.dietary && (
                    <div className="col-span-2">
                      <p className="font-montserrat text-[10px] uppercase tracking-wider text-burgundy/40 mb-1">Меню</p>
                      <p className="font-cormorant text-lg">{r.dietary}</p>
                    </div>
                  )}
                  {r.song && (
                    <div className="col-span-2">
                      <p className="font-montserrat text-[10px] uppercase tracking-wider text-burgundy/40 mb-1">Песня</p>
                      <p className="font-cormorant text-lg">{r.song}</p>
                    </div>
                  )}
                  {r.message && (
                    <div className="col-span-2 md:col-span-4">
                      <p className="font-montserrat text-[10px] uppercase tracking-wider text-burgundy/40 mb-1">Пожелание</p>
                      <p className="font-cormorant-infant italic text-lg text-burgundy/70">«{r.message}»</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}