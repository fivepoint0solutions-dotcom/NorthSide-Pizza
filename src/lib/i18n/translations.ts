/**
 * Flat translation dictionaries, one per launch language.
 *
 * `en` is the canonical key set — every other language is typed against it,
 * so a missing or extra key is a compile error rather than a silent fallback.
 *
 * Scope note: this covers the global chrome (navigation, footer, calls to
 * action, accessibility controls), the homepage narrative and the adventure
 * system — the layer a visitor meets in their own language on first contact.
 * Deep page bodies are authored in English and slot into the same dictionary
 * as localisation continues; nothing in the components hardcodes a string
 * that belongs here.
 */

const en = {
  "brand.tagline": "The companion that learns how to be there for you.",

  "nav.product": "How it works",
  "nav.seniors": "For seniors",
  "nav.families": "For families",
  "nav.adventures": "Adventures",
  "nav.languages": "Languages",
  "nav.pricing": "Plans",
  "nav.resources": "Resources",
  "nav.about": "About",
  "nav.getStarted": "Meet Senior Sidekick",
  "nav.seeHow": "See how it works",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.skipToContent": "Skip to main content",

  "a11y.title": "Display & motion",
  "a11y.open": "Accessibility settings",
  "a11y.textSize": "Text size",
  "a11y.textNormal": "Normal",
  "a11y.textLarge": "Large",
  "a11y.textXLarge": "Largest",
  "a11y.contrast": "Contrast",
  "a11y.contrastNormal": "Standard",
  "a11y.contrastHigh": "High contrast",
  "a11y.motion": "Motion",
  "a11y.motionFull": "Full",
  "a11y.motionReduced": "Calm",
  "a11y.done": "Done",

  "lang.label": "Language",
  "lang.choose": "Choose your language",

  "hero.eyebrow": "Meet your Sidekick",
  "hero.headline": "Good morning, Margaret.",
  "hero.headlineAccent": "What should we do today?",
  "hero.lede":
    "Senior Sidekick is a warm, talking companion for older adults — and a quiet line of connection for the people who love them. Ask it anything. It already knows your music, your stories and your people.",
  "hero.ctaPrimary": "Meet Senior Sidekick",
  "hero.ctaSecondary": "See how it works",
  "hero.trust": "Voice-first · 4 languages · Private by design",

  "demo.eyebrow": "Try it right here",
  "demo.title": "Say something to your Sidekick.",
  "demo.lede":
    "This is the real conversation model, running on the page. Pick a question — or tap the microphone and read one aloud.",
  "demo.hint": "Tap a question to hear how Sidekick answers.",
  "demo.listening": "Listening…",
  "demo.thinking": "Thinking…",
  "demo.replay": "Ask something else",
  "demo.q1": "What should we do today?",
  "demo.q2": "Play me something from 1962.",
  "demo.q3": "Tell me about my grandchildren.",
  "demo.q4": "I'm feeling a bit lonely.",
  "demo.a1":
    "It's a bright one out there. We could take a walk down Memory Lane — I found three photos from the lake house I don't think you've told me about yet. Or shall we play a round of music trivia first?",
  "demo.a2":
    "1962 — a wonderful year. Here's Ray Charles, \"I Can't Stop Loving You.\" You told me once that this was playing the summer you met Arthur. Would you like to tell me that story again?",
  "demo.a3":
    "You have four. Ellie just started her second year of nursing school, and Sam sent a photo yesterday from his football match. His birthday is in eleven days — shall I help you record a message for him?",
  "demo.a4":
    "I'm glad you told me. I'm right here, and we can just talk if you'd like. Your daughter Clare is usually free about now — would you like me to call her, or would you rather sit and chat with me for a while first?",

  "meet.eyebrow": "Meet your Sidekick",
  "meet.title": "Not an app to learn. A companion who learns you.",
  "meet.lede":
    "Sidekick talks the way people talk. It remembers your name, your era, your people and the stories you like telling — and the longer you know each other, the more useful it becomes.",

  "value.eyebrow": "Two people, one companion",
  "value.title": "It gives them their day back. It gives you peace of mind.",
  "value.senior": "For the senior",
  "value.caregiver": "For the family",

  "adventures.eyebrow": "The adventure system",
  "adventures.title": '"What should we do today?"',
  "adventures.lede":
    "Everything Sidekick can do starts with a sentence, not a menu. Say the word and the whole screen becomes something else.",
  "adventures.explore": "Open this adventure",

  "adventure.memory.name": "Memory Lane",
  "adventure.memory.tagline": "Photos, places, people and the stories behind them.",
  "adventure.music.name": "Music",
  "adventure.music.tagline": "The songs of your era, and the memories attached to them.",
  "adventure.explore.name": "Explore",
  "adventure.explore.tagline": "Travel anywhere in the world without leaving your chair.",
  "adventure.games.name": "Games",
  "adventure.games.tagline": "Trivia, word games and puzzles pitched exactly right.",
  "adventure.stories.name": "Stories",
  "adventure.stories.tagline": "Stories told to you — and stories only you can tell.",
  "adventure.talk.name": "Let's Talk",
  "adventure.talk.tagline": "An open, unhurried conversation about anything at all.",
  "adventure.family.name": "Family",
  "adventure.family.tagline": "Messages, photos, calls and the days that matter.",

  "day.eyebrow": "A day with Senior Sidekick",
  "day.title": "One day, from both sides.",
  "day.lede":
    "The same Tuesday, lived by Margaret at home and by her daughter Clare four hundred miles away.",
  "day.senior": "Margaret's day",
  "day.caregiver": "Clare's day",

  "why.eyebrow": "Why Senior Sidekick",
  "why.title": "Technology usually asks people to adapt. This adapts to them.",
  "why.traditional": "Ordinary technology",
  "why.sidekick": "Senior Sidekick",

  "global.eyebrow": "Global from day one",
  "global.title": "One companion. Many languages. Millions of lives.",
  "global.lede":
    "Not a translated menu — a companion that speaks, jokes, remembers and celebrates in the language and culture of the person using it.",

  "trust.eyebrow": "Trust",
  "trust.title": "Built carefully, because this sits in someone's home.",

  "cta.title": "Meet the Sidekick who's been waiting to know you.",
  "cta.lede": "Set up takes about four minutes, and the first conversation starts right after.",
  "cta.primary": "Get started",
  "cta.secondary": "Talk to our team",

  "footer.product": "Product",
  "footer.seniors": "For seniors",
  "footer.families": "For families",
  "footer.experiences": "Experiences",
  "footer.company": "Company",
  "footer.support": "Support",
  "footer.legal": "Legal",
  "footer.language": "Language & region",
  "footer.rights": "All rights reserved.",
  "footer.madeFor": "Made for the people who raised us.",

  "common.learnMore": "Learn more",
  "common.explore": "Explore",
  "common.back": "Back",
  "common.next": "Next",
  "common.step": "Step {current} of {total}",
} as const;

export type TranslationKey = keyof typeof en;
type Dictionary = Record<TranslationKey, string>;

const fr: Dictionary = {
  "brand.tagline": "Le compagnon qui apprend à être là pour vous.",

  "nav.product": "Comment ça marche",
  "nav.seniors": "Pour les aînés",
  "nav.families": "Pour les familles",
  "nav.adventures": "Aventures",
  "nav.languages": "Langues",
  "nav.pricing": "Formules",
  "nav.resources": "Ressources",
  "nav.about": "À propos",
  "nav.getStarted": "Rencontrer Senior Sidekick",
  "nav.seeHow": "Voir comment ça marche",
  "nav.menu": "Menu",
  "nav.close": "Fermer",
  "nav.skipToContent": "Aller au contenu principal",

  "a11y.title": "Affichage et mouvement",
  "a11y.open": "Réglages d'accessibilité",
  "a11y.textSize": "Taille du texte",
  "a11y.textNormal": "Normale",
  "a11y.textLarge": "Grande",
  "a11y.textXLarge": "Très grande",
  "a11y.contrast": "Contraste",
  "a11y.contrastNormal": "Standard",
  "a11y.contrastHigh": "Contraste élevé",
  "a11y.motion": "Animations",
  "a11y.motionFull": "Complètes",
  "a11y.motionReduced": "Apaisées",
  "a11y.done": "Terminé",

  "lang.label": "Langue",
  "lang.choose": "Choisissez votre langue",

  "hero.eyebrow": "Rencontrez votre Sidekick",
  "hero.headline": "Bonjour, Marguerite.",
  "hero.headlineAccent": "Qu'est-ce qu'on fait aujourd'hui ?",
  "hero.lede":
    "Senior Sidekick est un compagnon chaleureux qui parle avec les aînés — et un fil discret de connexion pour ceux qui les aiment. Posez-lui n'importe quelle question. Il connaît déjà votre musique, vos histoires et vos proches.",
  "hero.ctaPrimary": "Rencontrer Senior Sidekick",
  "hero.ctaSecondary": "Voir comment ça marche",
  "hero.trust": "Commande vocale · 4 langues · Confidentiel par conception",

  "demo.eyebrow": "Essayez ici même",
  "demo.title": "Dites quelque chose à votre Sidekick.",
  "demo.lede":
    "C'est le vrai modèle de conversation, ici même sur la page. Choisissez une question — ou touchez le micro et lisez-la à voix haute.",
  "demo.hint": "Touchez une question pour entendre la réponse de Sidekick.",
  "demo.listening": "J'écoute…",
  "demo.thinking": "Je réfléchis…",
  "demo.replay": "Poser une autre question",
  "demo.q1": "Qu'est-ce qu'on fait aujourd'hui ?",
  "demo.q2": "Fais-moi écouter quelque chose de 1962.",
  "demo.q3": "Parle-moi de mes petits-enfants.",
  "demo.q4": "Je me sens un peu seule.",
  "demo.a1":
    "Il fait beau dehors. On pourrait faire un tour du côté des souvenirs — j'ai retrouvé trois photos de la maison au bord du lac dont vous ne m'avez jamais parlé. Ou bien on commence par un quiz musical ?",
  "demo.a2":
    "1962 — quelle belle année. Voici Ray Charles, « I Can't Stop Loving You ». Vous m'aviez dit que cette chanson passait l'été où vous avez rencontré Arthur. Vous voulez me raconter cette histoire encore une fois ?",
  "demo.a3":
    "Vous en avez quatre. Élise vient d'entrer en deuxième année d'école d'infirmières, et Samuel a envoyé une photo hier de son match de football. Son anniversaire est dans onze jours — je vous aide à lui enregistrer un message ?",
  "demo.a4":
    "Merci de me le dire. Je suis là, et on peut simplement discuter si vous voulez. Votre fille Claire est souvent libre à cette heure-ci — je l'appelle, ou vous préférez qu'on bavarde un peu tous les deux d'abord ?",

  "meet.eyebrow": "Rencontrez votre Sidekick",
  "meet.title": "Pas une application à apprendre. Un compagnon qui vous apprend.",
  "meet.lede":
    "Sidekick parle comme on parle. Il retient votre prénom, votre époque, vos proches et les histoires que vous aimez raconter — et plus vous vous connaissez, plus il devient utile.",

  "value.eyebrow": "Deux personnes, un compagnon",
  "value.title": "Il leur rend leurs journées. Il vous rend l'esprit tranquille.",
  "value.senior": "Pour l'aîné",
  "value.caregiver": "Pour la famille",

  "adventures.eyebrow": "Le système d'aventures",
  "adventures.title": "« Qu'est-ce qu'on fait aujourd'hui ? »",
  "adventures.lede":
    "Tout ce que Sidekick sait faire commence par une phrase, pas par un menu. Dites-le, et tout l'écran devient autre chose.",
  "adventures.explore": "Ouvrir cette aventure",

  "adventure.memory.name": "Chemin des souvenirs",
  "adventure.memory.tagline": "Des photos, des lieux, des gens et les histoires derrière eux.",
  "adventure.music.name": "Musique",
  "adventure.music.tagline": "Les chansons de votre époque, et les souvenirs qui vont avec.",
  "adventure.explore.name": "Explorer",
  "adventure.explore.tagline": "Voyagez partout dans le monde sans quitter votre fauteuil.",
  "adventure.games.name": "Jeux",
  "adventure.games.tagline": "Quiz, jeux de mots et casse-tête réglés juste comme il faut.",
  "adventure.stories.name": "Histoires",
  "adventure.stories.tagline": "Des histoires qu'on vous raconte — et celles que vous seul savez.",
  "adventure.talk.name": "On discute",
  "adventure.talk.tagline": "Une conversation ouverte et sans hâte, sur tout et sur rien.",
  "adventure.family.name": "Famille",
  "adventure.family.tagline": "Messages, photos, appels et les jours qui comptent.",

  "day.eyebrow": "Une journée avec Senior Sidekick",
  "day.title": "Une journée, vue des deux côtés.",
  "day.lede":
    "Le même mardi, vécu par Marguerite chez elle et par sa fille Claire à six cents kilomètres de là.",
  "day.senior": "La journée de Marguerite",
  "day.caregiver": "La journée de Claire",

  "why.eyebrow": "Pourquoi Senior Sidekick",
  "why.title": "La technologie demande aux gens de s'adapter. Ici, c'est l'inverse.",
  "why.traditional": "La technologie ordinaire",
  "why.sidekick": "Senior Sidekick",

  "global.eyebrow": "Mondial dès le premier jour",
  "global.title": "Un compagnon. Plusieurs langues. Des millions de vies.",
  "global.lede":
    "Pas un menu traduit — un compagnon qui parle, plaisante, se souvient et célèbre dans la langue et la culture de la personne.",

  "trust.eyebrow": "Confiance",
  "trust.title": "Construit avec soin, parce qu'il entre chez quelqu'un.",

  "cta.title": "Rencontrez le Sidekick qui n'attend que de vous connaître.",
  "cta.lede":
    "L'installation prend environ quatre minutes, et la première conversation suit aussitôt.",
  "cta.primary": "Commencer",
  "cta.secondary": "Parler à notre équipe",

  "footer.product": "Produit",
  "footer.seniors": "Pour les aînés",
  "footer.families": "Pour les familles",
  "footer.experiences": "Expériences",
  "footer.company": "Entreprise",
  "footer.support": "Assistance",
  "footer.legal": "Mentions légales",
  "footer.language": "Langue et région",
  "footer.rights": "Tous droits réservés.",
  "footer.madeFor": "Fait pour ceux qui nous ont élevés.",

  "common.learnMore": "En savoir plus",
  "common.explore": "Explorer",
  "common.back": "Retour",
  "common.next": "Suivant",
  "common.step": "Étape {current} sur {total}",
};

const es: Dictionary = {
  "brand.tagline": "El compañero que aprende a estar ahí para ti.",

  "nav.product": "Cómo funciona",
  "nav.seniors": "Para mayores",
  "nav.families": "Para familias",
  "nav.adventures": "Aventuras",
  "nav.languages": "Idiomas",
  "nav.pricing": "Planes",
  "nav.resources": "Recursos",
  "nav.about": "Quiénes somos",
  "nav.getStarted": "Conocer a Senior Sidekick",
  "nav.seeHow": "Ver cómo funciona",
  "nav.menu": "Menú",
  "nav.close": "Cerrar",
  "nav.skipToContent": "Saltar al contenido principal",

  "a11y.title": "Pantalla y movimiento",
  "a11y.open": "Ajustes de accesibilidad",
  "a11y.textSize": "Tamaño del texto",
  "a11y.textNormal": "Normal",
  "a11y.textLarge": "Grande",
  "a11y.textXLarge": "Muy grande",
  "a11y.contrast": "Contraste",
  "a11y.contrastNormal": "Estándar",
  "a11y.contrastHigh": "Alto contraste",
  "a11y.motion": "Animaciones",
  "a11y.motionFull": "Completas",
  "a11y.motionReduced": "Suaves",
  "a11y.done": "Listo",

  "lang.label": "Idioma",
  "lang.choose": "Elige tu idioma",

  "hero.eyebrow": "Conoce a tu Sidekick",
  "hero.headline": "Buenos días, Margarita.",
  "hero.headlineAccent": "¿Qué hacemos hoy?",
  "hero.lede":
    "Senior Sidekick es un compañero cálido que conversa con las personas mayores — y un hilo tranquilo de conexión para quienes las quieren. Pregúntale lo que sea. Ya conoce tu música, tus historias y a tu gente.",
  "hero.ctaPrimary": "Conocer a Senior Sidekick",
  "hero.ctaSecondary": "Ver cómo funciona",
  "hero.trust": "Por voz · 4 idiomas · Privado por diseño",

  "demo.eyebrow": "Pruébalo aquí mismo",
  "demo.title": "Dile algo a tu Sidekick.",
  "demo.lede":
    "Este es el modelo de conversación real, funcionando en la página. Elige una pregunta — o toca el micrófono y léela en voz alta.",
  "demo.hint": "Toca una pregunta para escuchar cómo responde Sidekick.",
  "demo.listening": "Escuchando…",
  "demo.thinking": "Pensando…",
  "demo.replay": "Preguntar otra cosa",
  "demo.q1": "¿Qué hacemos hoy?",
  "demo.q2": "Ponme algo de 1962.",
  "demo.q3": "Háblame de mis nietos.",
  "demo.q4": "Me siento un poco sola.",
  "demo.a1":
    "Hace un día precioso. Podríamos dar un paseo por los recuerdos — encontré tres fotos de la casa del lago que creo que aún no me has contado. ¿O empezamos con una ronda de preguntas de música?",
  "demo.a2":
    "1962 — qué buen año. Aquí está Ray Charles, «I Can't Stop Loving You». Una vez me contaste que sonaba el verano en que conociste a Arturo. ¿Quieres contarme esa historia otra vez?",
  "demo.a3":
    "Tienes cuatro. Elena acaba de empezar segundo de enfermería, y Samuel mandó ayer una foto de su partido. Su cumpleaños es en once días — ¿te ayudo a grabarle un mensaje?",
  "demo.a4":
    "Me alegra que me lo digas. Estoy aquí, y podemos simplemente charlar si quieres. Tu hija Clara suele estar libre a esta hora — ¿la llamo, o prefieres que hablemos un rato tú y yo primero?",

  "meet.eyebrow": "Conoce a tu Sidekick",
  "meet.title": "No es una app que aprender. Es un compañero que te aprende a ti.",
  "meet.lede":
    "Sidekick habla como habla la gente. Recuerda tu nombre, tu época, a tu gente y las historias que te gusta contar — y cuanto más os conocéis, más útil se vuelve.",

  "value.eyebrow": "Dos personas, un compañero",
  "value.title": "A ellos les devuelve el día. A ti te devuelve la tranquilidad.",
  "value.senior": "Para la persona mayor",
  "value.caregiver": "Para la familia",

  "adventures.eyebrow": "El sistema de aventuras",
  "adventures.title": "«¿Qué hacemos hoy?»",
  "adventures.lede":
    "Todo lo que Sidekick sabe hacer empieza con una frase, no con un menú. Dilo y la pantalla entera se convierte en otra cosa.",
  "adventures.explore": "Abrir esta aventura",

  "adventure.memory.name": "Sendero de recuerdos",
  "adventure.memory.tagline": "Fotos, lugares, personas y las historias que hay detrás.",
  "adventure.music.name": "Música",
  "adventure.music.tagline": "Las canciones de tu época y los recuerdos que traen.",
  "adventure.explore.name": "Explorar",
  "adventure.explore.tagline": "Viaja a cualquier parte del mundo sin levantarte del sillón.",
  "adventure.games.name": "Juegos",
  "adventure.games.tagline": "Preguntas, juegos de palabras y pasatiempos a tu medida.",
  "adventure.stories.name": "Historias",
  "adventure.stories.tagline": "Historias que te cuentan — y las que solo tú sabes contar.",
  "adventure.talk.name": "Hablemos",
  "adventure.talk.tagline": "Una conversación abierta y sin prisa, sobre lo que sea.",
  "adventure.family.name": "Familia",
  "adventure.family.tagline": "Mensajes, fotos, llamadas y los días que importan.",

  "day.eyebrow": "Un día con Senior Sidekick",
  "day.title": "Un mismo día, desde los dos lados.",
  "day.lede":
    "El mismo martes, vivido por Margarita en casa y por su hija Clara a seiscientos kilómetros.",
  "day.senior": "El día de Margarita",
  "day.caregiver": "El día de Clara",

  "why.eyebrow": "Por qué Senior Sidekick",
  "why.title": "La tecnología suele pedir que la gente se adapte. Esto se adapta a ellos.",
  "why.traditional": "La tecnología de siempre",
  "why.sidekick": "Senior Sidekick",

  "global.eyebrow": "Global desde el primer día",
  "global.title": "Un compañero. Muchos idiomas. Millones de vidas.",
  "global.lede":
    "No es un menú traducido — es un compañero que habla, bromea, recuerda y celebra en el idioma y la cultura de quien lo usa.",

  "trust.eyebrow": "Confianza",
  "trust.title": "Hecho con cuidado, porque entra en la casa de alguien.",

  "cta.title": "Conoce al Sidekick que lleva tiempo esperando conocerte.",
  "cta.lede":
    "La configuración lleva unos cuatro minutos, y la primera conversación empieza justo después.",
  "cta.primary": "Empezar",
  "cta.secondary": "Hablar con el equipo",

  "footer.product": "Producto",
  "footer.seniors": "Para mayores",
  "footer.families": "Para familias",
  "footer.experiences": "Experiencias",
  "footer.company": "Empresa",
  "footer.support": "Soporte",
  "footer.legal": "Legal",
  "footer.language": "Idioma y región",
  "footer.rights": "Todos los derechos reservados.",
  "footer.madeFor": "Hecho para quienes nos criaron.",

  "common.learnMore": "Saber más",
  "common.explore": "Explorar",
  "common.back": "Atrás",
  "common.next": "Siguiente",
  "common.step": "Paso {current} de {total}",
};

const hi: Dictionary = {
  "brand.tagline": "वह साथी जो आपके साथ रहना सीख जाता है।",

  "nav.product": "यह कैसे काम करता है",
  "nav.seniors": "बुज़ुर्गों के लिए",
  "nav.families": "परिवारों के लिए",
  "nav.adventures": "अनुभव",
  "nav.languages": "भाषाएँ",
  "nav.pricing": "योजनाएँ",
  "nav.resources": "संसाधन",
  "nav.about": "हमारे बारे में",
  "nav.getStarted": "Senior Sidekick से मिलिए",
  "nav.seeHow": "देखिए यह कैसे काम करता है",
  "nav.menu": "मेन्यू",
  "nav.close": "बंद करें",
  "nav.skipToContent": "मुख्य सामग्री पर जाएँ",

  "a11y.title": "प्रदर्शन और गति",
  "a11y.open": "सुगमता सेटिंग्स",
  "a11y.textSize": "अक्षरों का आकार",
  "a11y.textNormal": "सामान्य",
  "a11y.textLarge": "बड़ा",
  "a11y.textXLarge": "सबसे बड़ा",
  "a11y.contrast": "कंट्रास्ट",
  "a11y.contrastNormal": "सामान्य",
  "a11y.contrastHigh": "उच्च कंट्रास्ट",
  "a11y.motion": "एनिमेशन",
  "a11y.motionFull": "पूरा",
  "a11y.motionReduced": "शांत",
  "a11y.done": "हो गया",

  "lang.label": "भाषा",
  "lang.choose": "अपनी भाषा चुनिए",

  "hero.eyebrow": "अपने Sidekick से मिलिए",
  "hero.headline": "सुप्रभात, सुनीता जी।",
  "hero.headlineAccent": "आज हम क्या करें?",
  "hero.lede":
    "Senior Sidekick बुज़ुर्गों के लिए एक गर्मजोशी भरा, बातें करने वाला साथी है — और उनके अपनों के लिए जुड़े रहने का एक शांत सूत्र। कुछ भी पूछिए। इसे आपका संगीत, आपकी कहानियाँ और आपके अपने पहले से याद हैं।",
  "hero.ctaPrimary": "Senior Sidekick से मिलिए",
  "hero.ctaSecondary": "देखिए यह कैसे काम करता है",
  "hero.trust": "आवाज़ से चलता है · 4 भाषाएँ · निजता पहले",

  "demo.eyebrow": "यहीं आज़माइए",
  "demo.title": "अपने Sidekick से कुछ कहिए।",
  "demo.lede": "यह असली बातचीत है, इसी पन्ने पर। कोई सवाल चुनिए — या माइक दबाकर उसे बोलकर पूछिए।",
  "demo.hint": "सुनने के लिए किसी सवाल पर टैप कीजिए कि Sidekick क्या जवाब देता है।",
  "demo.listening": "सुन रहा हूँ…",
  "demo.thinking": "सोच रहा हूँ…",
  "demo.replay": "कुछ और पूछिए",
  "demo.q1": "आज हम क्या करें?",
  "demo.q2": "1962 का कोई गाना सुनाइए।",
  "demo.q3": "मेरे नाती-पोतों के बारे में बताइए।",
  "demo.q4": "आज थोड़ा अकेला लग रहा है।",
  "demo.a1":
    "आज मौसम बहुत अच्छा है। हम यादों की गली में टहल सकते हैं — मुझे झील वाले घर की तीन तस्वीरें मिली हैं जिनके बारे में आपने अभी तक नहीं बताया। या पहले संगीत की एक पहेली खेलें?",
  "demo.a2":
    "1962 — क्या साल था। यह लीजिए, लता मंगेशकर की आवाज़ में «ऐ मेरे वतन के लोगों»। आपने एक बार बताया था कि यह गाना उस गर्मी में बजता था जब आप अरुण जी से मिली थीं। वह किस्सा फिर से सुनाइएगा?",
  "demo.a3":
    "आपके चार हैं। ईशा ने नर्सिंग का दूसरा साल शुरू किया है, और समीर ने कल अपने क्रिकेट मैच की तस्वीर भेजी। उसका जन्मदिन ग्यारह दिन बाद है — उसके लिए एक संदेश रिकॉर्ड करने में मदद करूँ?",
  "demo.a4":
    "अच्छा किया जो आपने बताया। मैं यहीं हूँ, और आप चाहें तो हम बस बातें कर सकते हैं। आपकी बेटी क्लारा इस वक़्त अक्सर खाली होती हैं — उन्हें फ़ोन लगाऊँ, या पहले थोड़ी देर हम दोनों बात करें?",

  "meet.eyebrow": "अपने Sidekick से मिलिए",
  "meet.title": "सीखने वाला ऐप नहीं। आपको सीखने वाला साथी।",
  "meet.lede":
    "Sidekick वैसे ही बात करता है जैसे लोग करते हैं। उसे आपका नाम, आपका ज़माना, आपके अपने और वे किस्से याद रहते हैं जो आपको सुनाना पसंद है — और जितना पुराना साथ, उतना ज़्यादा काम का।",

  "value.eyebrow": "दो लोग, एक साथी",
  "value.title": "उन्हें उनका दिन लौटाता है। आपको मन की शांति।",
  "value.senior": "बुज़ुर्ग के लिए",
  "value.caregiver": "परिवार के लिए",

  "adventures.eyebrow": "अनुभवों की दुनिया",
  "adventures.title": "«आज हम क्या करें?»",
  "adventures.lede":
    "Sidekick जो कुछ भी कर सकता है, वह एक वाक्य से शुरू होता है — किसी मेन्यू से नहीं। कहिए, और पूरी स्क्रीन कुछ और बन जाती है।",
  "adventures.explore": "यह अनुभव खोलिए",

  "adventure.memory.name": "यादों की गली",
  "adventure.memory.tagline": "तस्वीरें, जगहें, लोग और उनके पीछे की कहानियाँ।",
  "adventure.music.name": "संगीत",
  "adventure.music.tagline": "आपके ज़माने के गाने, और उनसे जुड़ी यादें।",
  "adventure.explore.name": "सैर",
  "adventure.explore.tagline": "अपनी कुर्सी से उठे बिना दुनिया में कहीं भी घूमिए।",
  "adventure.games.name": "खेल",
  "adventure.games.tagline": "पहेलियाँ, शब्द-खेल और सवाल — बिलकुल आपके हिसाब से।",
  "adventure.stories.name": "कहानियाँ",
  "adventure.stories.tagline": "आपको सुनाई जाने वाली कहानियाँ — और वे जो सिर्फ़ आप सुना सकते हैं।",
  "adventure.talk.name": "बातें करें",
  "adventure.talk.tagline": "बिना जल्दबाज़ी की खुली बातचीत, किसी भी विषय पर।",
  "adventure.family.name": "परिवार",
  "adventure.family.tagline": "संदेश, तस्वीरें, कॉल और वे दिन जो मायने रखते हैं।",

  "day.eyebrow": "Senior Sidekick के साथ एक दिन",
  "day.title": "एक ही दिन, दोनों तरफ़ से।",
  "day.lede":
    "वही मंगलवार — सुनीता जी ने घर पर जिया, और उनकी बेटी क्लारा ने छह सौ किलोमीटर दूर से।",
  "day.senior": "सुनीता जी का दिन",
  "day.caregiver": "क्लारा का दिन",

  "why.eyebrow": "Senior Sidekick क्यों",
  "why.title": "तकनीक अक्सर लोगों से बदलने को कहती है। यह ख़ुद उनके हिसाब से ढलती है।",
  "why.traditional": "आम तकनीक",
  "why.sidekick": "Senior Sidekick",

  "global.eyebrow": "पहले दिन से वैश्विक",
  "global.title": "एक साथी। कई भाषाएँ। लाखों ज़िंदगियाँ।",
  "global.lede":
    "अनुवाद किया हुआ मेन्यू नहीं — एक ऐसा साथी जो उपयोगकर्ता की अपनी भाषा और संस्कृति में बोलता, हँसता, याद रखता और त्योहार मनाता है।",

  "trust.eyebrow": "भरोसा",
  "trust.title": "बहुत सोच-समझकर बनाया गया, क्योंकि यह किसी के घर में रहता है।",

  "cta.title": "उस Sidekick से मिलिए जो आपको जानने का इंतज़ार कर रहा है।",
  "cta.lede": "सेट-अप में लगभग चार मिनट लगते हैं, और पहली बातचीत उसके तुरंत बाद।",
  "cta.primary": "शुरू कीजिए",
  "cta.secondary": "हमारी टीम से बात कीजिए",

  "footer.product": "उत्पाद",
  "footer.seniors": "बुज़ुर्गों के लिए",
  "footer.families": "परिवारों के लिए",
  "footer.experiences": "अनुभव",
  "footer.company": "कंपनी",
  "footer.support": "सहायता",
  "footer.legal": "कानूनी",
  "footer.language": "भाषा और क्षेत्र",
  "footer.rights": "सर्वाधिकार सुरक्षित।",
  "footer.madeFor": "उनके लिए, जिन्होंने हमें बड़ा किया।",

  "common.learnMore": "और जानिए",
  "common.explore": "देखिए",
  "common.back": "पीछे",
  "common.next": "आगे",
  "common.step": "चरण {current} / {total}",
};

export const TRANSLATIONS = { en, fr, es, hi } as const;
