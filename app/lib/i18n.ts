export type Locale = "es" | "en";

type Dict = Record<string, string>;

const es: Dict = {
  "nav.quiz": "Cuestionario",
  "nav.templates": "Agendas",
  "nav.physical": "Accesorios",
  "nav.order": "Pedido",
  "nav.cta": "Crear mi agenda",
  "nav.home": "Inicio",
  "nav.calendar": "Calendarios",
  "nav.customize": "Personalizacion",
  "nav.about": "Nosotros",

  "hero.eyebrow": "Tu vida. Tu estilo. Tu agenda.",
  "hero.title": "Tu agenda personalizada al 100%",
  "hero.titleMain": "Tu agenda personalizada",
  "hero.titleAccent": "al 100%",
  "hero.lead":
    "Disena cada detalle a tu manera y transforma tus planes en logros. Todo en un solo lugar: agendas, calendarios y accesorios pensados para inspirar tu mejor version.",
  "hero.startQuiz": "Crear mi agenda",
  "hero.viewTemplates": "Ver como funciona",
  "hero.feature1": "Personaliza cada detalle",
  "hero.feature2": "Organizacion sin limites",
  "hero.feature3": "Disenada para inspirarte",

  "quiz.kicker": "Cuestionario de personalidad y metas",
  "quiz.title": "La agenda se adapta a ti antes de elegir el acabado",
  "quiz.lead":
    "Responde 5 preguntas y una IA sugiere color, portada, tipografia, distribucion, frase, stickers, calendario y vision board.",
  "quiz.personality": "Como quieres sentir tu agenda?",
  "quiz.goal": "Que meta principal pesa mas ahora?",
  "quiz.rhythm": "Que ritmo tienes durante el dia?",
  "quiz.visual": "Que estilo visual prefieres?",
  "quiz.structure": "Cuanta estructura necesitas?",
  "quiz.promptLabel": "Cuentanos con tus palabras que buscas lograr",
  "quiz.promptPlaceholder":
    "Ej: quiero equilibrar trabajo, aprendizaje y metas financieras sin saturarme.",
  "quiz.askAi": "Pedir recomendacion a la IA",
  "quiz.asking": "Pensando tu recomendacion...",
  "quiz.aiTitle": "Recomendacion de tu asistente",
  "quiz.apply": "Aplicar recomendacion",
  "quiz.applied": "Aplicado a tu configurador",
  "quiz.aiOffline":
    "Modo local: conecta ANTHROPIC_API_KEY para recomendaciones generadas por IA en tiempo real.",

  "templates.kicker": "Disenos preseleccionados",
  "templates.title": "Elige un punto de partida y ajustalo a tu gusto",
  "templates.lead":
    "Cada plantilla cambia portada, contraportada, colores, tipografia, stickers, paginas internas, calendario, vision board y utiles a la vez.",
  "templates.use": "Usar este diseno",
  "templates.active": "Diseno activo",

  "customizer.kicker": "Portada",
  "customizer.title": "Nombre, frase y estilo de portada",
  "customizer.coverTitle": "Nombre en portada",
  "customizer.initials": "Iniciales",
  "customizer.phrase": "Frase personalizada en portada",
  "customizer.accent": "Color principal",
  "customizer.system": "Estilo de portada",
  "customizer.tone": "Tono de frase diaria",

  "physical.kicker": "Personalizacion fisica",
  "physical.title": "Tamano, tapa, empastado y acabados premium",
  "physical.size": "Tamano de agenda",
  "physical.sizeStandard": "Estandar",
  "physical.cover": "Tipo de tapa / pasta",
  "physical.coverFitFull": "Tapa cubre completa",
  "physical.coverFitExact": "Tapa tamano exacto de hoja",
  "physical.binding": "Tipo de empastado",
  "physical.separators": "Separadores entre meses",
  "physical.ringColor": "Color de anillado / broche",
  "physical.elasticColor": "Color de elastico o cierre",
  "physical.finishes": "Acabados premium",
  "physical.goldFoil": "Sello de nombre en pan de oro (portada)",
  "physical.silverFoil": "Sello de nombre en plateado (portada)",
  "physical.pageSeal": "Sello pequeno en paginas interiores",

  "layout.kicker": "Personalizacion interna",
  "layout.title": "Elige como se reparte cada hoja",
  "layout.lead": "Cada cambio actualiza la pagina interna en vivo, como un simulador.",

  "stickers.kicker": "Stickers y etiquetas",
  "stickers.title": "Marca tus dias como quieras",
  "stickers.lead":
    "Elige los stickers que quieres incluir y mira como se verian en el calendario y la agenda.",
  "stickers.cycleToggle": "Incluir sticker discreto de ciclo (opcional)",

  "calendar.kicker": "Calendario",
  "calendar.title": "Vista mensual con tus stickers aplicados",

  "vision.kicker": "Vision board",
  "vision.title": "Tu collage de metas en vivo",

  "packs.kicker": "Tienda virtual",
  "packs.title": "Pack y resumen de compra",
  "packs.select": "Elegir pack",
  "packs.selected": "Pack elegido",

  "order.kicker": "Pedido y PDF de produccion",
  "order.title": "Al pagar se genera la ficha para produccion",
  "order.lead":
    "Al confirmar el pago se genera un resumen tipo PDF con todo lo elegido y se envia al correo del taller para producir tu agenda.",
  "order.pay": "Pagar y generar PDF",
  "order.paying": "Procesando pago...",
  "order.paid": "Pago confirmado",
  "order.emailSent": "Resumen enviado al correo del taller.",
  "order.emailOffline":
    "Modo local: conecta RESEND_API_KEY para enviar el resumen automaticamente por correo.",
  "order.download": "Descargar / imprimir PDF",
  "order.total": "Total",
  "order.name": "Tu nombre",
  "order.email": "Tu correo",
  "order.stickers": "Stickers elegidos",

  "book.open": "Toca para abrir la agenda",
  "book.close": "Cerrar agenda",
  "book.viewBack": "Ver contraportada",
  "book.viewFront": "Ver portada",
  "book.previewKicker": "Tu agenda, en vivo",
};

const en: Dict = {
  "nav.quiz": "Questionnaire",
  "nav.templates": "Planners",
  "nav.physical": "Accessories",
  "nav.order": "Order",
  "nav.cta": "Create my planner",
  "nav.home": "Home",
  "nav.calendar": "Calendars",
  "nav.customize": "Customization",
  "nav.about": "About",

  "hero.eyebrow": "Your life. Your style. Your planner.",
  "hero.title": "Your fully personalized planner",
  "hero.titleMain": "Your fully personalized",
  "hero.titleAccent": "planner",
  "hero.lead":
    "Design every detail your way and turn your plans into achievements. All in one place: planners, calendars and accessories built to inspire your best self.",
  "hero.startQuiz": "Create my planner",
  "hero.viewTemplates": "See how it works",
  "hero.feature1": "Personalize every detail",
  "hero.feature2": "Unlimited organization",
  "hero.feature3": "Designed to inspire you",

  "quiz.kicker": "Personality & goals questionnaire",
  "quiz.title": "Your planner adapts to you before picking finishes",
  "quiz.lead":
    "Answer 5 questions and an AI suggests color, cover, typography, layout, quote, stickers, calendar and vision board.",
  "quiz.personality": "How do you want your planner to feel?",
  "quiz.goal": "Which main goal matters most right now?",
  "quiz.rhythm": "What is your daily rhythm?",
  "quiz.visual": "What visual style do you prefer?",
  "quiz.structure": "How much structure do you need?",
  "quiz.promptLabel": "Tell us in your own words what you want to achieve",
  "quiz.promptPlaceholder":
    "E.g. I want to balance work, learning and financial goals without burning out.",
  "quiz.askAi": "Ask the AI for a recommendation",
  "quiz.asking": "Thinking about your recommendation...",
  "quiz.aiTitle": "Your assistant's recommendation",
  "quiz.apply": "Apply recommendation",
  "quiz.applied": "Applied to your configurator",
  "quiz.aiOffline":
    "Local mode: connect ANTHROPIC_API_KEY for live AI-generated recommendations.",

  "templates.kicker": "Curated designs",
  "templates.title": "Pick a starting point and make it yours",
  "templates.lead":
    "Each template changes cover, back cover, colors, typography, stickers, inner pages, calendar, vision board and tools at once.",
  "templates.use": "Use this design",
  "templates.active": "Active design",

  "customizer.kicker": "Cover",
  "customizer.title": "Name, phrase and cover style",
  "customizer.coverTitle": "Name on cover",
  "customizer.initials": "Initials",
  "customizer.phrase": "Custom phrase on cover",
  "customizer.accent": "Main color",
  "customizer.system": "Cover style",
  "customizer.tone": "Daily quote tone",

  "physical.kicker": "Physical customization",
  "physical.title": "Size, cover, binding and premium finishes",
  "physical.size": "Planner size",
  "physical.sizeStandard": "Standard",
  "physical.cover": "Cover / pasta type",
  "physical.coverFitFull": "Cover fully wraps pages",
  "physical.coverFitExact": "Cover exact page size",
  "physical.binding": "Binding type",
  "physical.separators": "Month-to-month dividers",
  "physical.ringColor": "Ring / clasp color",
  "physical.elasticColor": "Elastic or closure color",
  "physical.finishes": "Premium finishes",
  "physical.goldFoil": "Gold foil name stamp (cover)",
  "physical.silverFoil": "Silver foil name stamp (cover)",
  "physical.pageSeal": "Small stamp on inner pages",

  "layout.kicker": "Inner customization",
  "layout.title": "Choose how each page is laid out",
  "layout.lead": "Every change updates the inner page live, like a simulator.",

  "stickers.kicker": "Stickers & labels",
  "stickers.title": "Mark your days your way",
  "stickers.lead":
    "Pick the stickers you want included and preview them on the calendar and planner.",
  "stickers.cycleToggle": "Include discreet cycle sticker (optional)",

  "calendar.kicker": "Calendar",
  "calendar.title": "Monthly view with your stickers applied",

  "vision.kicker": "Vision board",
  "vision.title": "Your goals collage, live",

  "packs.kicker": "Store",
  "packs.title": "Pack and order summary",
  "packs.select": "Choose pack",
  "packs.selected": "Selected pack",

  "order.kicker": "Order and production PDF",
  "order.title": "Paying generates the production sheet",
  "order.lead":
    "Confirming payment generates a PDF-style summary of everything chosen and sends it to the workshop email to produce your planner.",
  "order.pay": "Pay and generate PDF",
  "order.paying": "Processing payment...",
  "order.paid": "Payment confirmed",
  "order.emailSent": "Summary sent to the workshop email.",
  "order.emailOffline":
    "Local mode: connect RESEND_API_KEY to send the summary by email automatically.",
  "order.download": "Download / print PDF",
  "order.total": "Total",
  "order.name": "Your name",
  "order.email": "Your email",
  "order.stickers": "Chosen stickers",

  "book.open": "Tap to open the planner",
  "book.close": "Close planner",
  "book.viewBack": "View back cover",
  "book.viewFront": "View front cover",
  "book.previewKicker": "Your planner, live",
};

const dictionaries: Record<Locale, Dict> = { es, en };

export function translate(locale: Locale, key: string): string {
  return dictionaries[locale][key] ?? dictionaries.es[key] ?? key;
}
