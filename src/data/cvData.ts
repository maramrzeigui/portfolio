// =============================================================================
//  DONNÉES DU PORTFOLIO — Maram Rzeigui
//  Pour modifier votre portfolio, il suffit de changer le texte ci-dessous.
// =============================================================================

export const cvData = {
  personal: {
    name: "Maram Rzeigui",
    title: "Ingénieure Informatique · Entrepreneure & Freelance",
    role: "Ingénieure en Génie Logiciel — Full Stack & Mobile",
    profile:
      "Ingénieure en Informatique spécialisée en Systèmes d'Information Mobile, avec une solide expérience en génie logiciel, développement web et intelligence artificielle. Autonome, curieuse et orientée résultats, je m'adapte rapidement aux nouvelles technologies et aux projets innovants. Freelancer active, je conçois des solutions sur mesure pour des clients variés.",
    email: "maramrzeigui14@gmail.com",
    phone: "+216 52 300 663",
    location: "Tunis, Tunisie",
    // Déposez votre photo dans public/profile.jpg pour remplacer l'avatar à initiales.
    image: "/profile.jpg",
    initials: "MR",
    cv: "/CV-Maram-Rzeigui.pdf",
    social: {
      github: "https://github.com/maramrzeigui",
      linkedin: "https://www.linkedin.com/in/maram-rzeigui-49a9bb268",
      email: "mailto:maramrzeigui14@gmail.com",
    },
  },

  // --- Compétences techniques (groupées par catégorie) -----------------------
  skillGroups: [
    {
      title: "Langages de programmation",
      items: ["Python", "Java", "Dart", "JavaScript", "TypeScript", "C", "C#"],
    },
    {
      title: "Backend",
      items: ["Spring Boot", "Node.js", "NestJS", "ASP.NET Core", "API REST", "GraphQL"],
    },
    {
      title: "Frontend & Mobile",
      items: ["React", "Next.js", "Angular", "Flutter", "FlutterFlow", "Kotlin", "Swift", "HTML / CSS", "Bootstrap"],
    },
    {
      title: "Bases de données & Hébergement",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "SQLite", "Vercel"],
    },
    {
      title: "Microservices & DevOps",
      items: ["Spring Cloud", "Eureka", "API Gateway", "Docker", "CI/CD", "Git", "Agile / Scrum"],
    },
    {
      title: "Intégrations & IA",
      items: ["Stripe", "API Hugging Face", "SMTP", "QuestPDF", "Blockchain / Crypto"],
    },
  ],

  // --- Expérience professionnelle --------------------------------------------
  experience: [
    {
      role: "Développeuse Mobile & Back-Office — Freelance",
      company: "Société RZ — Maison d'hôtes & Randonnée",
      date: "2026",
      location: "Jbel Chitana, Nefza, Tabarka",
      type: "work",
      description:
        "Développement d'une application mobile et d'un back-office pour une maison d'hôtes en zone naturelle : parcours de randonnée consultables hors-ligne et bouton SOS hors-ligne. Réalisé en collaboration avec Pneud et SMSA.",
      tech: ["Flutter", "Mobile", "Back-office", "Géolocalisation"],
    },
    {
      role: "Développeuse Full-Stack — Freelance",
      company: "Speranza Pizza (France)",
      date: "2025",
      location: "À distance",
      type: "work",
      description:
        "Développement d'un site web de commande en ligne pour une société française (Firebase), hébergé sur Vercel avec nom de domaine Hostinger, intégrant les paiements Stripe, ainsi qu'une application mobile Dashboard Admin.",
      tech: ["Firebase", "Stripe", "Vercel", "Mobile Admin"],
    },
    {
      role: "Stagiaire Développeuse .NET / Blazor",
      company: "Linedata",
      date: "Juil. – Août 2025",
      location: "Centre Urbain Nord, Tunis",
      type: "work",
      description:
        "Développement de 2 applications web Blazor communiquant en temps réel via SignalR (Hubs). Architecture Message-Driven UI et intégration de fonctionnalités IA en C# / .NET.",
      tech: ["Blazor", "C#", ".NET", "SignalR"],
    },
    {
      role: "Stagiaire — Télécommunications",
      company: "Télécom, Tabarka",
      date: "Juil. – Août 2024",
      location: "Tabarka",
      type: "work",
      description:
        "Immersion en entreprise de télécommunications. Sensibilisation aux enjeux sociaux et environnementaux, communication professionnelle et capacité d'adaptation.",
      tech: ["Télécom", "Communication"],
    },
  ],

  // --- Formation -------------------------------------------------------------
  education: [
    {
      degree: "Cycle d'ingénieur en Informatique",
      school: "ESPRIT — École Supérieure Privée d'Ingénierie et de Technologie",
      location: "Tunis",
      date: "2022 – Présent",
      focus: "Spécialité : Systèmes d'Information Mobile (SIM)",
    },
    {
      degree: "Baccalauréat — Sciences expérimentales",
      school: "Lycée 2 Mars 1943",
      location: "Tabarka",
      date: "2019 – 2020",
      focus: "",
    },
  ],

  // --- Projets ---------------------------------------------------------------
  projects: [
    {
      title: "Medaichain — Plateforme de santé décentralisée",
      image: "/projects/medaichain.jpg",
      date: "2026",
      category: "Mobile & Web",
      description:
        "Application mobile et web sécurisant les dossiers médicaux via la blockchain et optimisant la collaboration entre médecins, laboratoires et patients.",
      tech: ["Flutter", "NestJS", "PostgreSQL", "Blockchain", "Dart", "TypeScript", "REST API"],
      links: [
        { label: "Mobile", url: "https://github.com/Yassminette5/medaichain-mobile" },
        { label: "Backend", url: "https://github.com/Yassminette5/medaichain-backend" },
      ],
    },
    {
      title: "Studio de musique — Applications natives",
      image: "/projects/music-studio.jpg",
      date: "2025",
      category: "Mobile",
      description:
        "Création de deux applications natives Android et iOS avec backend NestJS et base de données MongoDB Atlas (Cloud), incluant des fonctionnalités d'IA.",
      tech: ["Kotlin", "Swift", "NestJS", "TypeScript", "MongoDB Atlas", "REST", "IA"],
      links: [],
    },
    {
      title: "PIDEV — Projet Intégré Java & Web",
      image: "/projects/pidev.jpg",
      date: "2025",
      category: "Web & Desktop",
      description:
        "Application composée de deux clients (Java Desktop & Web) connectés à une base de données commune.",
      tech: ["JavaFX", "JDBC", "MySQL", "Symfony 6.4", "Doctrine ORM", "Twig", "MVC"],
      links: [],
    },
    {
      title: "Site Web Full Stack dynamique",
      image: "/projects/fullstack-web.jpg",
      date: "2024",
      category: "Web",
      description:
        "Création d'un site web dynamique avec front-end (HTML / CSS / JS) et back-end PHP + MySQL.",
      tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      links: [],
    },
    {
      title: "Application Desktop C++ — Qt & Oracle",
      image: "/projects/cpp-desktop.jpg",
      date: "2024",
      category: "Desktop",
      description:
        "Création d'une application avec interface graphique et gestion de données Oracle.",
      tech: ["C++", "Qt", "Oracle"],
      links: [],
    },
    {
      title: "Jeu vidéo en C sous Linux",
      image: "/projects/c-game.jpg",
      date: "2023",
      category: "Desktop",
      description:
        "Création d'un jeu en langage C sur VirtualBox avec Linux Ubuntu.",
      tech: ["C", "Linux Ubuntu", "VirtualBox"],
      links: [],
    },
  ],

  // --- Langues ---------------------------------------------------------------
  languages: [
    { name: "Arabe", level: "Langue maternelle", value: 100 },
    { name: "Français", level: "Courant", value: 95 },
    { name: "Anglais", level: "Professionnel", value: 80 },
    { name: "Allemand", level: "Notions", value: 40 },
  ],

  // --- Centres d'intérêt -----------------------------------------------------
  interests: [
    {
      title: "Engagement associatif",
      description: "Membre actif du club technique Cisco à ESPRIT.",
    },
    {
      title: "Entrepreneuriat & Botanique",
      description: "Lancement et gestion autonome d'un projet entrepreneurial autour des plantes.",
    },
  ],
};

export type CvData = typeof cvData;
