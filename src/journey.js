import { worlds, skillTree } from './data'

const P = (o) => ({ kind: 'project', ...o })
const gh = (id) => worlds.find((w) => w.id === id)?.url

/* Le jeu est organisé en chapitres ; chaque île = un projet (avec le contexte : freelance, stage, académique, perso). */
const ALL = [
  { kind: 'start', theme: 'start', chapter: 'Départ', world: 'Village de départ', icon: '', color: '#b83f72', xp: 0 },

  // ── Chapitre 1 : IA & Data
  P({ chapter: 'IA & Data', theme: 'medai', world: 'Hôpital Blockchain', icon: '🩺', color: '#e5484d', xp: 900, diff: 5,
    title: 'MedAIChain', photo: '/real/problems/medai.jpg', ai: 'Une IA médicale lit les analyses (20 valeurs), propose un diagnostic et le niveau d\'urgence, 93,5 % de précision, sans que les données quittent l\'hôpital.', easy: { problem: 'Les dossiers médicaux sont éparpillés entre médecins, pharmacies et laboratoires, et les ordonnances papier peuvent être falsifiées.', solution: 'Une application où le patient garde tout son dossier au même endroit, une IA qui lit ses analyses, et des ordonnances impossibles à falsifier.' }, moves: [{ icon: '⛓️', name: 'File de mint', fx: 'Les ordonnances NFT passent une par une : plus de collision de nonce.' }, { icon: '🔁', name: 'Retry exponentiel', fx: 'Les transactions pré-signées sont rejouées sans doublon.' }, { icon: '🧠', name: 'LLM 100 % local', fx: 'Llama 3.2 fine-tuné : aucune donnée patient ne sort.' }], logo: '/real/logos/medaichain.png', orgs: [{ src: '/real/logos/esprit.svg', name: 'ESPRIT' }], obstacle: { boss: 'La Collision de Nonce', emoji: '💥', text: 'Sur Polygon, des ordonnances signées en même temps entraient en collision de nonce et des erreurs RPC transitoires faisaient échouer les mints… alors que les données patient ne devaient jamais quitter l\'infrastructure.' }, solution: 'Une file d\'attente qui sérialise les mints, des transactions pré-signées rejouées avec retry exponentiel, et un LLM médical GGUF servi 100 % en local.', pitch: 'Plateforme e-santé décentralisée avec IA médicale 100 % locale',
    ctx: 'Projet académique · équipe de 5', date: '01/2026 à 05/2026',
    mission: 'Permettre au patient de centraliser et partager son dossier médical en toute sécurité avec médecins, pharmacies et laboratoires.',
    built: [
      'Pipeline IA : OCR → 20 biomarqueurs → LLM médical Llama 3.2 3B fine-tuné (LoRA/QLoRA) qui produit un diagnostic structuré et un niveau d\'urgence.',
      '6 modèles ML de prédiction de pathologie.',
      'Ordonnances tracées en NFT ERC-721 sur Polygon, wallets chiffrés AES-256-GCM.',
    ],
    impact: [{ v: '93,5 %', k: 'précision ML' }, { v: '20', k: 'biomarqueurs extraits' }, { v: '100 %', k: 'IA en local' }],
    stack: ['Flutter', 'Llama 3.2', 'LoRA', 'OCR', 'Polygon', 'AES-256'], link: gh('medaichain') }),
  P({ chapter: 'IA & Data', theme: 'mentora', world: 'Campus Gamifié', icon: '🎓', color: '#6d5dfc', xp: 700, diff: 4,
    title: 'MentoraBall', photo: '/real/problems/mentora.jpg', link: 'https://github.com/ProjectWeb-java/Mentora', code2: 'https://github.com/koussayFaidi2003/javapi', ai: 'L\'IA Gemini résume, traduit ou explique un cours en un clic, et la voix permet de naviguer sans les mains.', easy: { problem: 'Les étudiants décrochent devant des cours trop longs, et leurs comptes peuvent être piratés.', solution: 'Une plateforme où l\'IA résume les cours en un clic, qu\'on pilote à la voix, et qui se protège par reconnaissance faciale.' }, moves: [{ icon: '🤖', name: 'Gemini en cours', fx: 'Résumer, traduire, approfondir en un clic.' }, { icon: '🎙️', name: 'Commandes vocales', fx: 'Navigation mains libres dans toute la plateforme.' }, { icon: '🛡️', name: 'Face ID', fx: 'Après 3 échecs, la reconnaissance faciale verrouille l\'accès.' }], logo: '/real/logos/mentora.png', orgs: [{ src: '/real/logos/esprit.svg', name: 'ESPRIT' }], obstacle: { boss: 'Le Pirate du Mot de Passe', emoji: '🏴‍☠️', text: 'Un simple mot de passe ne suffit pas : les comptes étudiants restent exposés aux tentatives de connexion répétées.' }, solution: 'Après 3 échecs, la connexion bascule vers la reconnaissance faciale, en plus d\'OAuth2, reCAPTCHA et JWT.', pitch: 'Plateforme éducative gamifiée boostée à l\'IA',
    ctx: 'Projet académique · PIDEV · ESPRIT', date: '01/2025 à 05/2025',
    mission: 'Rendre l\'apprentissage plus interactif et accessible.',
    built: [
      'Google Gemini intégré aux cours : résumer, traduire ou approfondir un chapitre en un clic.',
      'Navigation mains libres par commandes vocales (cours, quiz, événements, blog).',
      'Bascule vers l\'authentification faciale après 3 échecs, avec OAuth2, reCAPTCHA et JWT.',
    ],
    impact: [{ v: '1 clic', k: 'résumé IA' }, { v: '100 %', k: 'mains libres' }, { v: 'Face ID', k: 'sécurité' }],
    stack: ['Gemini', 'Voice UI', 'OAuth2', 'JWT', 'reCAPTCHA'] }),

  P({ chapter: 'IA & Data', theme: 'smartovate', world: 'Forteresse Data', icon: '🛡️', color: '#a93ccf', xp: 900, diff: 5,
    title: 'Fraud Detection Pipeline', photo: '/real/problems/fraud.jpg', ai: 'Un modèle d\'IA (XGBoost) apprend les habitudes de chaque client et note chaque paiement pour repérer la fraude en direct.', easy: { problem: 'Parmi des milliers de paiements par minute, quelques-uns sont des fraudes, et il faut les repérer tout de suite.', solution: 'Un système qui analyse chaque paiement en temps réel et signale ceux qui semblent suspects.' }, moves: [{ icon: '🌊', name: 'Stream Kafka', fx: 'Chaque transaction est ingérée et validée en temps réel.' }, { icon: '🎯', name: 'Score XGBoost', fx: 'Les features comportementales démasquent la fraude.' }, { icon: '♻️', name: 'Idempotence', fx: 'Un rejeu du pipeline ne crée plus aucun doublon.' }], logo: '/real/logos/smartovate.png', orgs: [{ src: '/real/logos/smartovate.png', name: 'Smartovate' }], obstacle: { boss: 'Le Doublon Fantôme', emoji: '👻', text: 'Sur des données bancaires sensibles, chaque rejeu du pipeline risquait de créer des doublons, tout en devant scorer les transactions en temps réel.' }, solution: 'Un pipeline Kafka / Redpanda idempotent, des contrôles qualité à chaque étape et un modèle XGBoost suivi par des métriques.', pitch: 'Détection de fraude bancaire en streaming temps réel',
    ctx: 'Freelance · Junior AI Engineer @ Smartovate (Londres)', date: '09/2026 à en cours',
    mission: 'Scorer chaque transaction en temps réel pour repérer la fraude, sur des données bancaires sensibles.',
    built: [
      'Architecture streaming ingestion → validation → scoring → restitution avec Kafka / Redpanda.',
      'Modèle XGBoost avec features comportementales (profil client, écart au panier moyen, fréquence).',
      'Idempotence et contrôles qualité : un rejeu du pipeline ne crée aucun doublon.',
      'Observabilité : logs, métriques et dashboard de suivi du modèle.',
    ],
    impact: [{ v: 'Temps réel', k: 'scoring streaming' }, { v: '0', k: 'doublon au rejeu' }, { v: 'XGBoost', k: 'modèle de scoring' }],
    stack: ['Python', 'Kafka', 'Redpanda', 'XGBoost', 'PostgreSQL', 'AWS'] }),

  // ── Chapitre 2 : Mobile
  P({ chapter: 'Mobile', theme: 'rzprod', world: 'Montagnes du Nord', icon: '⛰️', color: '#2e9e2e', xp: 800, diff: 5,
    title: 'EcoGuide & EcoTracer', photo: '/real/problems/eco.jpg', ai: 'EcoBot, un assistant IA en français et en arabe, répond aux randonneurs sur les sentiers, la faune et la flore.', easy: { problem: 'Dans la montagne il n\'y a pas de réseau, et les cartes en ligne montrent de faux chemins : les randonneurs se perdent.', solution: 'Une application qui marche sans internet, avec les vrais sentiers enregistrés sur place et un bouton SOS.' }, moves: [{ icon: '🛰️', name: 'EcoTracer GPS', fx: 'Les vrais sentiers sont enregistrés sur le terrain.' }, { icon: '📦', name: 'Cache hors-ligne', fx: 'Cartes et sentiers stockés en SQLite sur le téléphone.' }, { icon: '🆘', name: 'SOS sans réseau', fx: 'Alerte de sortie de sentier et SOS géolocalisé.' }], logo: '/real/logos/ecoguide.png', orgs: [{ src: '/real/logos/rzprod.png', name: 'Rz Prod' }, { src: '/real/logos/undp-logo.png', name: 'PNUD' }, { src: '/real/logos/smsa-logo.png', name: 'SMSA' }, { src: '/real/logos/gef-logo.png', name: 'GEF' }, { src: '/real/logos/sgp-logo.png', name: 'SGP' }], link: 'https://www.smsa-ecoguide.com/', shots: [{ src: '/real/shots/ecoguide-accueil.jpg', cap: 'Accueil' }, { src: '/real/shots/ecoguide-cartes-hors-ligne.jpg', cap: 'Cartes hors-ligne' }, { src: '/real/shots/ecoguide-sentiers.jpg', cap: 'Sentiers' }, { src: '/real/shots/ecoguide-sos.jpg', cap: 'SOS' }, { src: '/real/shots/ecoguide-assistant.jpg', cap: 'EcoBot' }, { src: '/real/shots/ecoguide-quiz.jpg', cap: 'Quiz' }], obstacle: { boss: 'La Carte Menteuse', emoji: '🗺️', text: 'Aucun réseau dans la montagne, et les tracés de Google Earth étaient faux : sentiers forestiers invisibles ou décalés.' }, solution: 'EcoTracer enregistre les vrais sentiers au GPS sur le terrain (2 campagnes avec le comité local), puis EcoGuide les sert 100 % hors-ligne.', pitch: 'Randonnée et écotourisme 100 % hors-ligne en zone sans réseau',
    ctx: 'Freelance · Rz Prod × PNUD, GEF/SGP, SMSA', date: '05/2026 à 07/2026',
    mission: 'Guider et protéger les randonneurs du Parc de Jebel Chitana et Cap Negro, où il n\'y a aucune couverture réseau.',
    built: [
      'App Flutter offline-first : cartes et sentiers GeoJSON en cache SQLite, GPS, alerte de sortie de sentier, bouton SOS.',
      'EcoTracer : 2ᵉ app qui enregistre les vrais sentiers par GPS (Google Earth était imprécis).',
      'EcoBot : chatbot IA bilingue FR/AR sur la faune, la flore et l\'écotourisme, avec quiz.',
      'Back-office Flutter Web + API NestJS / PostgreSQL / PostGIS.',
    ],
    impact: [{ v: '100 %', k: 'hors-ligne' }, { v: '2', k: 'campagnes terrain' }, { v: '3 mois', k: 'livré à 2' }],
    stack: ['Flutter', 'SQLite', 'NestJS', 'PostGIS', 'GPS', 'Cloudinary'], link: gh('ecoguide') }),
  P({ chapter: 'Mobile', theme: 'volteo', world: 'Station Volteo', icon: '⚡', color: '#e5172f', xp: 800, diff: 5,
    title: 'Volteo', photo: '/real/problems/volteo.jpg', ai: 'Volta, un assistant IA qui tourne en local, planifie le trajet et conseille où et quand recharger.', easy: { problem: 'Avec une voiture électrique en Tunisie, c\'est difficile de trouver une borne libre et de payer la recharge.', solution: 'Une application qui montre les bornes, lance la recharge et la paie directement depuis le téléphone.' }, moves: [{ icon: '🔌', name: 'Simulateur OCPP', fx: 'Serveur OCPP 1.6J validé avec le simulateur de SAP.' }, { icon: '🗺️', name: 'Open Charge Map', fx: 'Import des vraies bornes publiques de Tunisie.' }, { icon: '💳', name: 'Wallet exact', fx: 'La recharge s\'arrête au solde exact, jamais en négatif.' }], logo: '/real/logos/volteo.png', orgs: [{ src: '/real/logos/tactic.png', name: 'Tac-Tic' }], shots: [{ src: '/real/shots/volteo-m-accueil.jpg', cap: 'Accueil' }, { src: '/real/shots/volteo-m-carte.jpg', cap: 'Carte des bornes' }, { src: '/real/shots/volteo-m-recharge.jpg', cap: 'Recharge en direct' }, { src: '/real/shots/volteo-cl-volta-reponse.jpg', cap: 'Assistant IA Volta' }, { src: '/real/shots/volteo-sa-stations.jpg', cap: 'Back-office' }], obstacle: { boss: 'La Borne Introuvable', emoji: '🔌', text: 'Pas de borne physique pour développer, très peu de bornes recensées en Tunisie sur OpenStreetMap, et un wallet qui ne doit jamais passer en négatif.' }, solution: 'Un serveur OCPP 1.6J validé avec le simulateur de SAP, l\'import Open Charge Map, et un wallet prépayé qui coupe la recharge au solde exact.', pitch: 'SaaS de recharge de véhicules électriques en Tunisie',
    ctx: 'Projet réalisé avec Tac-Tic', date: '2026',
    mission: 'Trouver, réserver et payer une borne de recharge depuis son téléphone.',
    built: [
      'Application mobile React Native et back-office React.',
      'API Laravel connectée aux bornes via le protocole OCPP 1.6J.',
      'Wallet avec paiement Flouci / e-DINAR et IA locale.',
    ],
    impact: [{ v: '3', k: 'apps (mobile, web, API)' }, { v: 'OCPP 1.6J', k: 'bornes connectées' }, { v: 'e-DINAR', k: 'paiement local' }],
    stack: ['React Native', 'React', 'Laravel', 'OCPP', 'TypeScript'], link: gh('volteo') }),
  P({ chapter: 'Mobile', theme: 'studio', game: 'studio', world: 'Studio Mag', icon: '🎹', color: '#c026d3', xp: 800, diff: 5,
    title: 'Mag Studio', photo: '/real/problems/mag.jpg', ai: 'L\'IA génère des paroles, de la musique et des voix pour aider à composer.', easy: { problem: 'Pour faire de la musique, il faut normalement un studio, des instruments et du matériel coûteux.', solution: 'Un studio de musique complet dans le téléphone (iPhone et Android), avec une IA qui aide à composer.' }, moves: [{ icon: '📡', name: 'BackendDiscovery', fx: 'L\'app retrouve seule l\'IP du serveur sur le réseau.' }, { icon: '🔐', name: 'Exception ATS', fx: 'iOS accepte enfin les appels vers l\'API locale.' }, { icon: '🎹', name: 'Studio IA', fx: 'Instruments, enregistrement et paroles générées par IA.' }], logo: '/real/logos/magstudio.png', orgs: [{ src: '/real/logos/esprit.svg', name: 'ESPRIT' }], shots: [{ src: '/real/shots/mag-piano.jpg', cap: 'Visuel · Piano' }, { src: '/real/shots/mag-mixer.jpg', cap: 'Visuel · Mixeur' }, { src: '/real/shots/mag-aiaudio.jpg', cap: 'Visuel · Studio IA' }], obstacle: { boss: 'L\'IP Fantôme', emoji: '📡', text: 'L\'app iPhone doit joindre l\'API NestJS lancée sur un ordinateur dont l\'adresse IP change à chaque réseau, et iOS bloque les appels HTTP non sécurisés.' }, solution: 'Un service BackendDiscovery qui teste les IP courantes (hotspot, Wi-Fi, réseau d\'entreprise) et garde la bonne en cache, plus une exception ATS.', pitch: 'Un studio de musique dans la poche, en natif iOS et Android',
    ctx: 'Projet académique · DAM · ESPRIT · en équipe', date: '2025',
    mission: 'Jouer, enregistrer et composer de la musique sur mobile, assisté par l\'IA.',
    built: [
      'App iOS en SwiftUI (MVVM) et app Android en Kotlin / Jetpack Compose, sur une API NestJS commune.',
      'Instruments virtuels : piano, guitare, basse, batterie, mixeur et beat maker.',
      'Enregistrement audio avec effets, export des pistes et studio vocal IA.',
      'Paroles et musique générées par IA (Gemini, Hugging Face, Replicate) et copilote musical.',
      'Authentification complète : inscription, vérification e-mail, mot de passe oublié, suppression de compte, thème clair / sombre.',
    ],
    impact: [{ v: '2', k: 'apps natives' }, { v: '6', k: 'instruments' }, { v: 'IA', k: 'paroles & voix' }],
    stack: ['Swift', 'SwiftUI', 'Kotlin', 'Compose', 'NestJS', 'Gemini'], link: 'https://github.com/azizgargouri/Mag-Studio-Ios', code: 'https://github.com/azizgargouri/Mag-Studio-Android' }),

  // ── Chapitre 3 : Web & DevOps
  P({ chapter: 'Web & DevOps', theme: 'speranza', world: 'Village Pizza', icon: '🍕', color: '#e0a100', xp: 700, diff: 4,
    title: 'Speranza Pizza', photo: '/real/problems/speranza.jpg', shots: [{ src: '/real/shots/speranza-facade.jpg', cap: 'Le restaurant' }, { src: '/real/shots/speranza-accueil.jpg', cap: 'Accueil (site en ligne)' }, { src: '/real/shots/speranza-menu.jpg', cap: 'Menu & commande' }], link: 'https://www.speranza-pizza.fr/', code: 'https://github.com/mouha-byte/Restaurant', easy: { problem: 'Le restaurant ne prenait les commandes que par téléphone, donc seulement les clients du quartier.', solution: 'Un site pour commander et payer en ligne : jusqu\'à 20 commandes par jour, bien au-delà du quartier.' }, moves: [{ icon: '🛒', name: 'Commande en ligne', fx: 'Le menu complet devient commandable sur le web.' }, { icon: '💳', name: 'Paiement Stripe', fx: 'Les clients paient en ligne, en toute sécurité.' }, { icon: '📱', name: 'Dashboard live', fx: 'Le restaurateur suit chaque commande en temps réel.' }], logo: '/real/logos/speranza-fav.png', obstacle: { boss: 'Le Quartier Trop Petit', emoji: '🏘️', text: 'Un restaurant dont la clientèle ne dépassait pas le quartier, sans aucun moyen de commander ni de payer en ligne.' }, solution: 'Un site de commande avec paiement Stripe et un dashboard temps réel : jusqu\'à 20 commandes en ligne par jour, bien au-delà du quartier.', pitch: 'Commande en ligne en production pour un restaurant français',
    ctx: 'Freelance · France (à distance)', date: '09/2025 à 10/2025',
    mission: 'Faire passer un restaurant de quartier à la commande en ligne.',
    built: [
      'Site de commande en ligne avec paiement Stripe (Firebase, Vercel, Hostinger).',
      'App mobile Dashboard Admin : suivi des commandes en temps réel pour le restaurateur.',
    ],
    impact: [{ v: '20', k: 'commandes / jour' }, { v: 'Stripe', k: 'paiement en ligne' }, { v: 'Live', k: 'en production' }],
    stack: ['Firebase', 'Stripe', 'Vercel', 'React'] }),
  P({ chapter: 'Web & DevOps', theme: 'linedata', world: 'Cité .NET', icon: '💻', color: '#e4003a', xp: 600, diff: 3,
    title: 'Blazor temps réel', photo: '/real/problems/blazor.jpg', ai: 'Des fonctionnalités d\'IA intégrées directement dans les applications .NET.', easy: { problem: 'Deux applications devaient afficher les mêmes informations en même temps, sans recharger la page.', solution: 'Une connexion en direct entre les deux applications : une action dans l\'une apparaît aussitôt dans l\'autre.' }, moves: [{ icon: '📡', name: 'SignalR Hubs', fx: 'Les deux apps échangent des messages instantanés.' }, { icon: '📨', name: 'Message-Driven UI', fx: 'Chaque action est propagée aux composants.' }, { icon: '🤖', name: 'IA en C#', fx: 'Des fonctionnalités intelligentes côté .NET.' }], logo: '/real/logos/linedata.svg', orgs: [{ src: '/real/logos/linedata.svg', name: 'Linedata' }], obstacle: { boss: 'Le Rechargement Infini', emoji: '🔄', text: 'Deux applications web devaient rester synchronisées instantanément, sans jamais recharger la page.' }, solution: 'Des Hubs SignalR entre les deux apps Blazor et une architecture Message-Driven UI qui propage chaque action.', pitch: 'Deux applications synchronisées instantanément',
    ctx: 'Stage · Linedata', date: '07/2025 à 08/2025',
    mission: 'Synchroniser des actions entre applications sans aucun rechargement.',
    built: [
      '2 applications web Blazor communiquant via SignalR (Hubs).',
      'Architecture Message-Driven UI pour une synchronisation fluide des composants.',
      'Intégration de fonctionnalités IA en C# / .NET.',
    ],
    impact: [{ v: '2', k: 'apps synchronisées' }, { v: '0', k: 'rechargement' }, { v: 'SignalR', k: 'temps réel' }],
    stack: ['C#', '.NET', 'Blazor', 'SignalR'] }),
  P({ chapter: 'Web & DevOps', theme: 'italia', world: 'Piazza ViaItalia', icon: '🇮🇹', color: '#009246', xp: 500, diff: 3,
    title: 'ViaItalia', photo: '/real/problems/via.jpg', easy: { problem: 'Partir étudier en Italie demande beaucoup de démarches, difficiles à suivre seul.', solution: 'Une plateforme qui guide l\'étudiant pas à pas : dossier, documents, rendez-vous et paiements.' }, moves: [{ icon: '🔑', name: 'JWT', fx: 'Chaque utilisateur est authentifié de façon sûre.' }, { icon: '🎭', name: 'Middleware de rôles', fx: 'Étudiant, conseiller, admin : chacun ses données.' }, { icon: '🗂️', name: 'Dossier par étapes', fx: 'Documents, rendez-vous et paiements suivis pas à pas.' }], shots: [{ src: '/real/shots/viaitalia-hero.png', cap: 'Page d\'accueil' }], obstacle: { boss: 'Le Mélange des Rôles', emoji: '🎭', text: 'Étudiants, conseillers et administrateurs partagent la même plateforme mais ne doivent pas voir les mêmes dossiers, documents, contrats et paiements.' }, solution: 'Une API Express avec middlewares d\'authentification JWT et de rôles, Prisma + MySQL et un dossier suivi étape par étape.', pitch: 'Accompagner les étudiants vers les universités italiennes',
    ctx: 'Projet personnel', date: '',
    mission: 'Centraliser les démarches des étudiants qui veulent étudier en Italie.',
    built: ['Front-end React et API Express.', 'ORM Prisma sur MySQL, authentification JWT.'],
    impact: [{ v: 'Full-stack', k: 'React + Express' }, { v: 'Prisma', k: 'MySQL' }, { v: 'JWT', k: 'auth' }],
    stack: ['React', 'Express', 'Prisma', 'MySQL', 'JWT'], link: gh('viaitalia') }),
  P({ chapter: 'Web & DevOps', theme: 'devops', world: 'Usine CI/CD', icon: '⚙️', color: '#d97706', xp: 500, diff: 3,
    title: 'Student Management DevOps', photo: '/real/problems/devops.jpg', easy: { problem: 'Mettre une application en ligne à la main prend du temps et laisse passer des erreurs.', solution: 'Une chaîne automatique qui vérifie, prépare et met en ligne l\'application à chaque modification.' }, moves: [{ icon: '🏗️', name: 'Pipeline Jenkins', fx: 'Build Maven automatique à chaque modification.' }, { icon: '🔍', name: 'SonarQube', fx: 'La qualité du code est vérifiée à chaque passage.' }, { icon: '🐳', name: 'Docker + Prometheus', fx: 'Image conteneurisée et supervision en continu.' }], orgs: [{ src: '/real/logos/esprit.svg', name: 'ESPRIT' }], obstacle: { boss: 'Le Déploiement à la Main', emoji: '🧨', text: 'Compiler, vérifier la qualité et livrer à la main à chaque modification, sans visibilité sur l\'application en production.' }, solution: 'Un pipeline Jenkins (Maven puis SonarQube), une image Docker et une supervision Prometheus.', pitch: 'Une app Spring Boot industrialisée de bout en bout',
    ctx: 'Projet académique', date: '',
    mission: 'Automatiser build, qualité, déploiement et supervision.',
    built: ['Pipeline Jenkins : build, tests et analyse SonarQube.', 'Conteneurisation Docker et monitoring Prometheus.'],
    impact: [{ v: 'CI/CD', k: 'Jenkins' }, { v: 'Sonar', k: 'qualité' }, { v: 'Prometheus', k: 'monitoring' }],
    stack: ['Spring Boot', 'Jenkins', 'SonarQube', 'Docker', 'Prometheus'], link: gh('devops') }),
  P({ chapter: 'Web & DevOps', theme: 'guesto', game: 'restaurant', world: 'Restaurant Guesto', icon: '🍽️', color: '#f26b1d', xp: 900, diff: 5,
    title: 'Guesto', photo: '/real/problems/guesto.jpg', easy: { problem: 'Au café, on attend longtemps que le serveur vienne prendre la commande.', solution: 'Le client scanne un QR code et commande depuis son téléphone ; le serveur est prévenu tout de suite.' }, moves: [{ icon: '📱', name: 'QR à table', fx: 'Le client commande lui-même depuis son téléphone.' }, { icon: '⚡', name: 'Supabase Realtime', fx: 'La commande arrive en direct chez le restaurant.' }, { icon: '🔔', name: 'Push OneSignal', fx: 'Le serveur est notifié même app fermée.' }], logo: '/real/logos/guesto.png', orgs: [{ src: '/real/logos/rzprod.png', name: 'Rz Prod' }], shots: [{ src: '/real/shots/guesto-cl-menu.jpg', cap: 'Menu client' }, { src: '/real/shots/guesto-cl-panier.jpg', cap: 'Panier' }, { src: '/real/shots/guesto-cl-servie.jpg', cap: 'Commande servie' }, { src: '/real/shots/guesto-bo-prepa.jpg', cap: 'Backoffice' }, { src: '/real/shots/guesto-ob-tables.jpg', cap: 'Tables & QR' }], obstacle: { boss: 'L\'App Endormie', emoji: '💤', text: 'Supabase n\'envoie pas de push : quand l\'app du serveur est fermée, une nouvelle commande passe inaperçue.' }, solution: 'Alertes Supabase Realtime dans l\'app, puis un circuit trigger SQL → webhook → Edge Function → OneSignal qui notifie client, serveur et restaurateur.', pitch: 'La plateforme qui digitalise les cafés et restaurants',
    ctx: 'Rz Prod · Tabarka', date: '2026',
    mission: 'Du QR code sur la table jusqu\'au plat servi : le client commande depuis son téléphone, le serveur est notifié, le restaurateur pilote tout depuis le backoffice.',
    built: [
      'Application client + backoffice restaurant en Next.js 16 / React 19 sur Supabase (auth, base, temps réel).',
      'Application serveur en Flutter : tables assignées, commandes en direct, notifications push OneSignal.',
      'Chat client ↔ restaurateur, connexion Google, commande en ligne ou par téléphone, avis sur l\'ambiance.',
      'Site vitrine (HTML/CSS/JS natifs) : parcours de commande en 8 étapes, démo backoffice → app client, formulaires.',
    ],
    impact: [{ v: '3', k: 'apps connectées' }, { v: 'Temps réel', k: 'Supabase + push' }, { v: 'Live', k: 'restaurants partenaires' }],
    stack: ['Next.js', 'React 19', 'Supabase', 'Flutter', 'OneSignal', 'Vercel'], link: 'https://www.guesto-service.com/', code: gh('guesto') }),
  P({ chapter: 'Web & DevOps', theme: 'travel', game: 'travel', world: 'Aéroport DiscoverWay', icon: '✈️', color: '#1f6f8b', xp: 600, diff: 3,
    title: 'DiscoverWay', photo: '/real/problems/travel.jpg', easy: { problem: 'Les offres de voyage sont dispersées et on ne peut pas réserver facilement en ligne.', solution: 'Un site d\'agence où l\'on choisit son voyage, réserve sa place et reçoit son billet en PDF.' }, moves: [{ icon: '🧭', name: 'Catalogue MVC', fx: 'Voyages, places et dates gérés proprement en PHP.' }, { icon: '🎫', name: 'Réservation', fx: 'Réserver, modifier ou annuler sa place en ligne.' }, { icon: '📄', name: 'Billet PDF', fx: 'Un justificatif généré avec FPDF.' }], logo: '/real/logos/discoverway.png', orgs: [{ src: '/real/logos/esprit.svg', name: 'ESPRIT' }], obstacle: { boss: 'Le Surbooking', emoji: '🧳', text: 'Des voyages à places limitées, des réservations à modifier ou annuler, et un voyageur qui a besoin d\'un justificatif.' }, solution: 'Un CRUD voyages et réservations en PHP MVC, une recherche, et un billet de réservation généré en PDF avec FPDF.', pitch: 'Site web d\'agence de voyage : voyages, réservations et billets PDF',
    ctx: 'Projet académique · Projet Web 2A · ESPRIT', date: '',
    mission: 'Permettre aux voyageurs de découvrir des destinations, réserver une place et récupérer leur réservation.',
    built: [
      'Architecture MVC en PHP : modèles, contrôleurs et vues pour les voyages et les réservations.',
      'CRUD complet des voyages (destination, prix, places, date, image) et des réservations, avec recherche.',
      'Génération de la réservation en PDF avec FPDF, et offre de croisières.',
      'Modules d\'équipe : blog, boutique, réclamations et gestion des utilisateurs.',
    ],
    impact: [{ v: '5', k: 'modules' }, { v: 'PDF', k: 'billets générés' }, { v: 'MVC', k: 'architecture' }],
    stack: ['PHP', 'MySQL', 'MVC', 'FPDF', 'HTML/CSS', 'JavaScript'], link: 'https://github.com/Yassine-Ayache/ProjetWeb2A36/tree/gestion-voyage' }),
  // ── Chapitre 4 : Profil
  { kind: 'edu', chapter: 'Profil', theme: 'esprit', world: 'Académie ESPRIT', icon: '🏛️', color: '#c8102e', xp: 400,
    title: 'Ingénieure en Informatique', photo: '/real/problems/esprit.jpg', easy: { problem: 'Passer de la théorie aux vrais projets, ça s\'apprend.', solution: 'Cinq ans d\'école d\'ingénieurs à ESPRIT, avec des projets concrets chaque année.' }, moves: [{ icon: '📚', name: 'Fondamentaux', fx: '5 ans d\'ingénierie informatique à ESPRIT.' }, { icon: '🛠️', name: 'Projets concrets', fx: 'Un projet intégré en équipe chaque année.' }, { icon: '🌍', name: '4 langues', fx: 'Arabe, français, anglais et allemand.' }], logo: '/real/logos/esprit.svg', obstacle: { boss: 'Le Mur de la Théorie', emoji: '🧱', text: 'Passer de la théorie à de vrais produits qui marchent, utilisés par de vrais utilisateurs.' }, solution: 'Cinq ans d\'ingénierie à ESPRIT, des projets concrets chaque année… et 4 langues pour travailler partout.', pitch: 'ESPRIT · Systèmes d\'Information Mobile & IA', date: '2022 à 2027',
    built: ['Diplôme d\'Ingénieur en Informatique, spécialité Mobile & IA.', 'Recherche un stage PFE de 6 mois en IA, Data ou mobile / full-stack.'],
    langs: [
      { flag: '/real/flags/tn.svg', name: 'Arabe', level: 'Maternelle', v: 100 },
      { flag: '/real/flags/fr.svg', name: 'Français', level: 'B2', v: 75 },
      { flag: '/real/flags/gb.svg', name: 'Anglais', level: 'B2 · EF SET', v: 75 },
      { flag: '/real/flags/de.svg', name: 'Allemand', level: 'A2', v: 35 },
    ] },
  { kind: 'skills', chapter: 'Profil', theme: 'forge', world: 'Forge des compétences', icon: '⚒️', color: '#b83f72', xp: 300,
    title: 'Inventaire', photo: '/real/problems/skills.jpg', easy: { problem: 'Il existe énormément d\'outils et de langages à maîtriser.', solution: 'Projet après projet, j\'ai appris l\'IA, le mobile, le web et le cloud.' }, moves: [{ icon: '🧠', name: 'IA & Data', fx: 'Python, XGBoost, Kafka, LLM.' }, { icon: '📱', name: 'Mobile & Web', fx: 'Flutter, Swift, Kotlin, React, Next.js.' }, { icon: '☁️', name: 'Cloud & DevOps', fx: 'Docker, Jenkins, AWS, Vercel.' }], obstacle: { boss: 'Le Coffre Verrouillé', emoji: '🔐', text: 'Tant d\'outils, de langages et de frameworks à maîtriser…' }, solution: 'Un inventaire de 6 branches, débloqué projet après projet.', pitch: 'Tout l\'équipement débloqué en route', skills: skillTree },
  { kind: 'contact', chapter: 'Profil', theme: 'portal', world: 'Portail final', icon: '🏆', color: '#b83f72', xp: 1000,
    title: 'Partie terminée… ou presque !', photo: '/real/problems/final.jpg', easy: { problem: 'Trouver le bon stage de fin d\'études.', solution: 'Vous ! Contactez-moi pour un stage PFE de 6 mois.' }, moves: [{ icon: '📄', name: 'Mon CV', fx: 'Un parcours complet, du code à la production.' }, { icon: '🤝', name: 'Motivation', fx: 'Prête pour un stage PFE de 6 mois.' }, { icon: '✉️', name: 'Me contacter', fx: 'Le dernier coup… c\'est à vous de le jouer !' }], obstacle: { boss: 'Boss final : le stage PFE', emoji: '🏰', text: 'Trouver l\'entreprise idéale pour un stage PFE de 6 mois en IA, Data ou mobile / full-stack.' }, solution: 'Vous ! 😉 Contactez-moi pour jouer ce niveau ensemble.', pitch: 'Le prochain niveau se joue avec vous' },
]

// ordre des îles : expérience professionnelle d'abord, puis les projets, puis le profil
const ORDER = ['Fraud Detection Pipeline', 'Volteo', 'Guesto', 'MedAIChain', 'EcoGuide & EcoTracer', 'Speranza Pizza', 'Blazor temps réel', 'ViaItalia', 'Student Management DevOps', 'MentoraBall', 'DiscoverWay', 'Mag Studio']
const PRO = new Set(['Fraud Detection Pipeline', 'Volteo', 'Guesto'])
const projects = ORDER.map((t) => ALL.find((l) => l.title === t)).filter(Boolean)
  .map((l) => ({ ...l, chapter: PRO.has(l.title) ? 'Expérience pro' : 'Projets' }))
export const journey = [
  ALL.find((l) => l.kind === 'start'),
  ...projects,
  ...ALL.filter((l) => l.chapter === 'Profil'),
]

journey.forEach((l, i) => {
  l.pos = i === 0 ? [0, -4.6, -10] : [6 + i * 13, -4.6 + Math.sin(i * 1.3) * 1.2, -9 - (i % 2) * 3.5]
})

export const chapters = [...new Set(journey.map((l) => l.chapter))]
export const totalXp = journey.reduce((s, l) => s + l.xp, 0)
