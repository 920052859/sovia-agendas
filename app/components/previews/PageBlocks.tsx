"use client";

const HOURS = ["06:00", "08:00", "10:00", "12:00", "15:00", "18:00"];
const GOAL_AREAS: Record<"es" | "en", string[]> = {
  es: ["Trabajo", "Aprendizaje", "Desarrollo personal", "Independencia financiera", "Mini metas"],
  en: ["Work", "Learning", "Personal growth", "Financial independence", "Mini goals"],
};

export function HoursBlock({ locale }: { locale: "es" | "en" }) {
  return (
    <div className="hours">
      {HOURS.map((hour, index) => (
        <div className="hour-row" key={hour}>
          <span>{hour}</span>
          <i>
            {index % 2 === 0
              ? locale === "en"
                ? "Focus block"
                : "Bloque foco"
              : locale === "en"
                ? "Flex task"
                : "Tarea flexible"}
          </i>
        </div>
      ))}
    </div>
  );
}

export function AreasBlock({ locale }: { locale: "es" | "en" }) {
  return (
    <div className="goals-grid expanded">
      {GOAL_AREAS[locale].map((goal) => (
        <div key={goal}>
          <b>{goal}</b>
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}

export function FreeBlock() {
  return (
    <div className="free-lines">
      {Array.from({ length: 9 }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

export function DualBlock({ locale }: { locale: "es" | "en" }) {
  return (
    <div className="dual-grid">
      <div>
        <b>{locale === "en" ? "Day plan" : "Plan del dia"}</b>
        <HoursBlock locale={locale} />
      </div>
      <div>
        <b>{locale === "en" ? "Close" : "Cierre"}</b>
        <span>{locale === "en" ? "Main win" : "Logro principal"}</span>
        <span>{locale === "en" ? "Learning" : "Aprendizaje"}</span>
        <span>{locale === "en" ? "Next step" : "Proximo paso"}</span>
      </div>
    </div>
  );
}
