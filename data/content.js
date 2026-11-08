/**
 * ============================================================================
 * FICHIER CENTRAL DE DONNÉES DU PORTFOLIO — Tsikomia Scidelo ANDRIASAHY
 * ============================================================================
 * COMMENT MODIFIER OU AJOUTER DU CONTENU :
 * 1. Méthode Visuelle (Sans Code) : Ouvrez "admin.html" dans votre navigateur,
 *    modifiez vos projets/expériences via le formulaire et cliquez sur "Exporter content.js".
 * 2. Méthode Directe : Modifiez directement les listes ci-dessous.
 *    - Pas besoin d'écrire de code HTML ! Utilisez simplement :
 *      • "bullets": ["Point 1", "Point 2"] pour les listes à puces
 *      • "gallery": ["assets/images/photo1.png", ...] pour les galeries d'images
 *      • "video": "assets/videos/demo.mp4" (ou un lien YouTube "https://youtu.be/...")
 * ============================================================================
 */

export const portfolioData = {
    fr: {
        nav: {
            about: "À propos",
            skills: "Compétences",
            projects: "Projets",
            experience: "Expériences",
            cv: "Formation & CV",
            certificates: "Certificats"
        },
        identity: {
            name: "Tsikomia Scidelo ANDRIASAHY",
            title: "Élève-Ingénieur en Systèmes Électroniques et Automatiques (GSEA)",
            availabilityBadge: "🎯 Recherche Stage PFE (6 mois) dès Février 2027 — Systèmes Embarqués, Automatique, Robotique & IA",
            institution: "École Nationale des Sciences Appliquées de Tanger (ENSA Tanger) — Université Abdelmalek Essaâdi (3ème année / Dernière année)",
            location: "Tanger, Maroc (Mobilité internationale)",
            specialties: [
                "Systèmes Embarqués (STM32, DSP, PIC)",
                "Électronique de Puissance & MPPT",
                "Automatique Avancée & Robotique ROS 2",
                "Instrumentation LabVIEW & Traitement du Signal",
                "IA Embarquée (CNN, Markov, ANFIS, GA)"
            ],
            contacts: {
                email: "scideloandriasahy@gmail.com",
                linkedin: "https://www.linkedin.com/in/scidelo",
                github: "https://github.com/scidelo-andriasahy",
                portfolio: "https://scidelo-andriasahy.github.io",
                superprof: "https://www.superprof.ma/Scidelo",
                phone: "+212 777 647 362"
            },
            image: "assets/images/SARY1.jpeg"
        },
        about: {
            title: "Profil & Objectif PFE",
            text: "Élève-ingénieur en dernière année du cycle Génie des Systèmes Électroniques et Automatiques (GSEA) à l'ENSA de Tanger, je me spécialise en systèmes embarqués, instrumentation, électronique de puissance, traitement du signal et automatique avancée. Fort de réalisations concrètes en R&D industrielle (conception d'onduleur hybride MPPT triphasé chez Fortico, diagnostic par imagerie thermique et IA embarquée sur nœuds IoT chez Smart Automation Technologies, bancs de mesure LabVIEW et robotique autonome sous ROS 2), j'associe maîtrise matérielle des capteurs/actionneurs et modélisation prédictive sous MATLAB/Simulink, C/C++ (MISRA C) et Python.",
            pfeHighlight: "Je recherche un stage de fin d'études (PFE) de 6 mois à partir de février 2027 afin de concevoir des systèmes embarqués critiques, développer des lois de commande intelligentes ou déployer des outils d'aide à la décision et de maintenance prédictive.",
            languages: [
                { lang: "Français", level: "Courant (Bilingue professionnel)" },
                { lang: "Anglais", level: "Technique (Lu, écrit, documentation R&D)" },
                { lang: "Malagasy", level: "Langue maternelle" },
                { lang: "Espagnol", level: "Notions" }
            ],
            interests: ["Veille technologique (Salons & Conférences)", "Jeu d'échecs", "Électronique DIY", "Cinéphilie", "Football & Pétanque"]
        },
        skills: {
            title: "Compétences Techniques",
            subtitle: "Double compétence matérielle (conception électronique, microcontrôleurs, capteurs) et logicielle (firmware temps réel, commande avancée, IA embarquée).",
            categories: [
                {
                    icon: "cpu",
                    title: "Systèmes Embarqués & Électronique",
                    items: ["STM32", "DSP TMS320C6713", "PIC (16F877A)", "ESP32", "Arduino", "Capteurs Industriels", "Électronique de Puissance", "KiCad (PCB)", "Proteus ISIS"]
                },
                {
                    icon: "code",
                    title: "Programmation & Firmware",
                    items: ["C (Norme MISRA C)", "C++", "Python", "VHDL", "Firmware Embarqué Temps Réel", "S-Functions C-MEX", "PlatformIO", "Structures de données optimisées"]
                },
                {
                    icon: "activity",
                    title: "Automatique & IA Embarquée",
                    items: ["Régulation PID", "Logique Floue (FLC)", "ANFIS", "Algorithmes Génétiques (GA)", "Réseaux de Neurones (ANN / CNN)", "Modèles de Markov", "Algorithme MPPT P&O", "SLAM & Navigation Nav2"]
                },
                {
                    icon: "sliders",
                    title: "Outils & Environnements R&D",
                    items: ["MATLAB / Simulink", "ROS 2 (Humble) & Gazebo", "LabVIEW (Instrumentation)", "Siemens TIA Portal (SCADA)", "Linux (Ubuntu)", "Git / GitHub", "LaTeX", "Android Studio"]
                }
            ]
        },
        projects: {
            title: "Projets Techniques & R&D",
            filterAll: "Tous",
            items: [
                {
                    id: 1,
                    title: "Robot Mobile Autonome AMR (ROS 2 Humble & Nav2)",
                    category: "Robotique & ROS 2",
                    tags: ["ROS 2 Humble", "Gazebo", "URDF/Xacro", "SLAM Toolbox", "Ceres Solver", "Nav2 (A* / DWB)", "LiDAR 2D & IMU", "Ubuntu"],
                    description: "Conception du jumeau numérique sous Gazebo, cartographie Graph-SLAM (Ceres) et navigation autonome Nav2 validée par déploiement physique.",
                    image: "assets/images/amr_ros2.svg",
                    video: "",
                    gallery: [
                        "assets/images/amr_ros2.svg"
                    ],
                    links: {},
                    details: `
### Résumé du Projet
Développement complet d'un **Robot Mobile Autonome (AMR)** sous **ROS 2 Humble (Ubuntu)**, allant de la modélisation physique en simulation jusqu'à la validation expérimentale sur prototype réel avec synchronisation temps réel de l'arbre de transformations (**TF2**).

### 1. Jumeau Numérique & Modélisation Capteurs (Gazebo)
- **Modélisation géométrique et dynamique (URDF / Xacro)** : Définition rigoureuse des matrices d'inertie, des géométries de collision et de la cinématique différentielle du châssis mobile.
- **Simulation multi-capteurs** : Intégration et paramétrage d'un **LiDAR 2D 360°** (\`/scan\`) et d'une centrale inertielle **IMU** (\`/imu/data\`) couplée à l'odométrie roue (\`/odom\`).
- **Arbre de repères TF2** : Synchronisation stricte de la chaîne \`map -> odom -> base_footprint -> base_link -> laser_frame\`.

### 2. Cartographie Graph-SLAM (SLAM Toolbox & Ceres)
- **Implémentation du Graph-SLAM asynchrone** via \`slam_toolbox\` pour la construction de cartes d'occupation 2D (*Occupancy Grid*) en environnement intérieur inconnu.
- **Optimisation non-linéaire par solveur Ceres** : Détection de fermeture de boucle (*Loop Closure*) et correction de la dérive odométrique cumulée.

### 3. Navigation Autonome via la Stack Nav2
- **Costmaps 2D multicouches** : Configuration des couches *Static Layer*, *Obstacle Layer* (raytracing LiDAR) et *Inflation Layer* pour garantir une marge de sécurité dynamique autour des obstacles.
- **Planification Globale & Locale** : Génération de trajectoire globale optimale via **A*** (*NavFn Planner*) et suivi local dynamique via le contrôleur **DWB (Dynamic Window Approach)** générant les consignes de vitesse \`/cmd_vel\`.
- **Déploiement Sim-to-Real** : Validation physique du comportement d'évitement d'obstacles et de la tenue de cap.
                    `
                },
                {
                    id: 2,
                    title: "Commande & Suivi de Trajectoire d'un Bras Manipulateur (2 DDL)",
                    category: "Automatique & IA Embarquée",
                    tags: ["MATLAB/Simulink", "DSP TMS320C6713", "C++ / C-MEX", "Logique Floue (FLC)", "GA-PID", "Réseau de Neurones (ANN)", "2-DOF"],
                    description: "Modélisation dynamique accélérée par C-MEX (×50), étude comparative ANN / GA-PID / Logique Floue, validation C++ et déploiement sur carte DSP TMS320C6713.",
                    image: "assets/images/brasrobotPH1.png",
                    video: "",
                    gallery: [
                        "assets/images/capturesimulinkTotal.png",
                        "assets/images/captureFuzzy.png",
                        "assets/images/captureregleFuzzy.png",
                        "assets/images/resultatfuzzy.png",
                        "assets/images/resultatPid.png",
                        "assets/images/TrajectoryTrackingComparaisonJoint1.png"
                    ],
                    codeSnippet: {
                        language: "matlab",
                        title: "Boucle d'Optimisation par Algorithme Génétique (GA-PID sous MATLAB)",
                        code: `%% --- 1. INITIALISATION DE LA POPULATION GA ---
par = Init(N, npar, range);
fitness = zeros(N, 1);
generation = 0; terminal = 0;

%% --- 2. BOUCLE D'ÉVOLUTION ET ÉVALUATION SIMULINK (C-MEX x50) ---
while ~terminal
    generation = generation + 1;
    for i = 1:N
        Kp1 = par(i,1); Ki1 = par(i,2); Kd1 = par(i,3);
        Kp2 = par(i,4); Ki2 = par(i,5); Kd2 = par(i,6);
        assignin('base', 'Kp1', Kp1); assignin('base', 'Ki1', Ki1); assignin('base', 'Kd1', Kd1);
        assignin('base', 'Kp2', Kp2); assignin('base', 'Ki2', Ki2); assignin('base', 'Kd2', Kd2);
        
        simOut = sim('GA_PID_2DOF_Sfunction', 'SrcWorkspace', 'current', 'StopTime', '40');
        % Calcul du critère ISE + pénalité énergétique sur le couple moteur
    end
end`
                    },
                    links: {
                        report: "assets/pdfs/ROBOT2DOF_Scidelo_FR.pdf"
                    },
                    details: `
### Résumé du Projet
Étude comparative approfondie et implémentation matérielle de trois stratégies de commande avancées appliquées à un bras manipulateur planaire à deux degrés de liberté (**2 DDL**) soumis à de forts couplages non linéaires (forces de Coriolis, centrifuges et gravité).

### Objectifs & Défis d'Ingénierie
- Assurer un suivi de trajectoire articulaire haute précision sans dépassement malgré les non-linéarités.
- Accélérer drastiquement le temps de simulation pour permettre l'optimisation évolutionnaire hors-ligne.
- Valider l'algorithme optimal en **C++** et le déployer sur cible matérielle **DSP TMS320C6713**.

### Méthodologie & Implémentation
- **Accélération par S-Functions C-MEX (×50)** : Réécriture du modèle dynamique de Lagrange et des contrôleurs en C-MEX sous Simulink, divisant par 50 le temps d'exécution.
- **PID optimisé par Algorithme Génétique (GA-PID)** : Minimisation d'une fonction coût multi-objectif combinant l'erreur quadratique intégrale (**ISE**) et la pénalisation de la saturation des actionneurs.
- **Commande par Réseau de Neurones (ANN) & Logique Floue (FLC)** : Synthèse d'un contrôleur flou de type Mamdani et apprentissage neuronal.
- **Sélection & Déploiement DSP** : La commande par **Logique Floue (FLC)** ayant démontré la meilleure robustesse aux perturbations, elle a été validée en **C++** puis déployée sur la carte **DSP Texas Instruments TMS320C6713**.
                    `
                },
                {
                    id: 3,
                    title: "Onduleur Hybride & MPPT Entrelacé 3 Phases (R&D Fortico)",
                    category: "Électronique de Puissance",
                    tags: ["KiCad", "Proteus", "MATLAB/Simulink", "MPPT P&O Triphasé", "Onduleur 24V/350VDC/230VAC", "Régulation PID"],
                    description: "Conception électronique (KiCad/Proteus) et commande Simulink d'un onduleur hybride avec MPPT entrelacé 3 phases et étages 24V / 350VDC / 230VAC.",
                    image: "assets/images/onduleur_mppt_fortico.svg",
                    video: "",
                    gallery: [
                        "assets/images/onduleur_mppt_fortico.svg"
                    ],
                    links: {},
                    details: `
### Contexte R&D (Fortico)
Projet de Recherche & Développement mené au sein de **Fortico** visant à concevoir une architecture complète de conversion d'énergie solaire hybride haute efficacité.

### Architecture Électronique de Puissance (KiCad & Proteus)
- **Étage 1 — Convertisseur Boost MPPT Entrelacé 3 Phases** : Répartition du courant d'entrée sur 3 cellules déphasées de **120°**, réduisant drastiquement l'ondulation de courant (ΔI) et le stress thermique des composants.
- **Étage 2 — Élévateur DC/DC (24V vers Bus 350V DC)** : Stabilisation du bus continu haute tension avec isolation et dimensionnement thermique des MOSFETs de puissance.
- **Étage 3 — Onduleur Monophasé (350V DC vers 230V AC / 50 Hz)** : Commande SPWM sinus pur avec filtrage LC pour minimiser le taux de distorsion harmonique (THD).

### Loi de Commande & Simulation (MATLAB/Simulink)
- Implémentation de l'algorithme **MPPT Perturb & Observe (P&O)** couplé à des boucles de **régulation PID**.
- Gestion intelligente du profil de charge batterie et commutation hybride transparente entre panneaux PV, stockage batterie et réseau électrique.
                    `
                },
                {
                    id: 4,
                    title: "Diagnostic par Imagerie Thermique & IA Embarquée IoT",
                    category: "Automatique & IA Embarquée",
                    tags: ["Imagerie Thermique", "CNN", "Modèles de Markov", "IoT Edge", "Maintenance Prédictive", "Python", "C/C++"],
                    description: "Étude comparative entre Modèles de Markov et Réseaux de Neurones Convolutifs (CNN) pour la détection d'anomalies thermiques sur nœuds IoT.",
                    image: "assets/images/diagnostic_thermique_ia.svg",
                    video: "",
                    gallery: [
                        "assets/images/diagnostic_thermique_ia.svg"
                    ],
                    links: {},
                    details: `
### Contexte R&D (Smart Automation Technologies — PFA)
Projet R&D consacré à la **maintenance prédictive industrielle** par analyse automatisée d'images thermographiques infrarouges et déploiement sur architecture **IoT Edge**.

### Analyse Comparative des Modèles d'IA (Markov vs CNN)
- **Approche Probabiliste (Modèles de Markov)** : Modélisation des transitions d'états thermiques offrant une empreinte mémoire ultra-légère et une forte explicabilité sur microcontrôleurs contraints.
- **Approche Deep Learning (CNN)** : Extraction hiérarchique des motifs spatiaux de points chauds (*Hotspots*) pour la classification précise des défauts électriques et mécaniques.
- **Compromis Précision / Ressources Embarquées** : Évaluation comparative du temps d'inférence, de la consommation RAM/Flash et du taux de détection (F1-Score).

### Déploiement sur Nœuds IoT
- Intégration de la chaîne d'inférence sur nœuds IoT pour la **détection automatique d'anomalies en temps réel** et la remontée d'alertes prédictives.
                    `
                },
                {
                    id: 5,
                    title: "Instrumentation Virtuelle & Oscilloscope Numérique (LabVIEW)",
                    category: "Instrumentation & Signal",
                    tags: ["LabVIEW", "Instrumentation Virtuelle", "Traitement du Signal", "IHM Temps Réel", "Banc de Mesure"],
                    description: "Développement d'un banc de mesure temps réel complet sous LabVIEW : générateur multi-signaux, curseurs et gestion dynamique d'échelles Volt/Div et ms/Div.",
                    image: "assets/images/Labview3.png",
                    video: "",
                    gallery: [
                        "assets/images/Labview1.png",
                        "assets/images/Labview2.png",
                        "assets/images/Labview3.png",
                        "assets/images/Labview4.png"
                    ],
                    links: {
                        report: "assets/pdfs/RAPPORT_LABVIEW.pdf"
                    },
                    details: `
### Résumé du Projet
Conception d'un banc d'instrumentation virtuelle complet sous **National Instruments LabVIEW** combinant un **générateur de fonctions multi-signaux** et un **oscilloscope numérique temps réel**.

### Fonctionnalités Clés du Banc de Mesure
- **Générateur de signaux synthétiques et bruités** : Génération temps réel de signaux sinusoïdaux, carrés, triangulaires et dents de scie avec contrôle de fréquence, d'amplitude et d'offset.
- **Gestion dynamique des calibres (Volt/Div & ms/Div)** : Adaptation mathématique et graphique instantanée des échelles verticales et de la base de temps horizontale.
- **IHM Ergonomique** : Face avant reproduisant fidèlement les commandes d'un oscilloscope de laboratoire avec curseurs de mesure et déclenchement (*Trigger*).

### Architecture Logicielle (Diagramme Bloc LabVIEW)
- Cadencement temps réel par boucles **While** déterministes et aiguillage par **Structures Case**.
- Manipulation dynamique des *Property Nodes* du *Waveform Graph* pour garantir une fluidité d'affichage optimale.
                    `
                },
                {
                    id: 6,
                    title: "Horloge H24 & Thermomètre Numérique Optimisés (PIC16F877A)",
                    category: "Systèmes Embarqués",
                    tags: ["PIC16F877A", "C Embarqué (MikroC)", "Proteus ISIS", "ADC 10-bit", "Capteur LM35", "Optimisation RAM/Flash"],
                    description: "Développement firmware multitâche en C sur PIC16F877A avec optimisation algorithmique bas-niveau de la mémoire Flash et RAM.",
                    image: "assets/images/imagePH2.png",
                    video: "",
                    gallery: [
                        "assets/images/Image1.png",
                        "assets/images/Image2.png",
                        "assets/images/Image3.png",
                        "assets/images/Image4.png",
                        "assets/images/Image5.png"
                    ],
                    links: {
                        report: "assets/pdfs/RAPPORT_H24_THERMO.pdf"
                    },
                    details: `
### Résumé du Projet
Conception matérielle et logicielle d'un système embarqué temps réel sur microcontrôleur **Microchip PIC16F877A** combinant une horloge numérique H24 et une chaîne d'acquisition thermique via capteur analogique **LM35**.

### Architecture Matérielle & Firmware
- **Acquisition ADC 10 bits** : Échantillonnage et conversion de la tension analogique du capteur LM35 (10 mV/°C) avec filtrage logiciel.
- **Interfaçage LCD 4 bits** : Pilotage d'un afficheur alphanumérique en mode 4 bits pour minimiser l'occupation des ports GPIO.
- **Optimisation Mémoire Bas-Niveau (Sans Bibliothèques Lourdes)** : Remplacement des routines standards de conversion flottante/chaîne par des algorithmes d'extraction décimale sur entiers, réduisant drastiquement l'empreinte en mémoire **ROM (Flash)** et **RAM**.
                    `
                },
                {
                    id: 7,
                    title: "Synthèse Logique & Caractérisation CMOS d'une Bascule JK",
                    category: "Systèmes Embarqués",
                    tags: ["Électronique Numérique", "Famille CMOS 74HC", "Machine à États (FSM)", "Proteus", "Marges de Bruit", "Analyse Temporelle"],
                    description: "Modélisation FSM de Moore, synthèse logique, calcul des marges de bruit, fréquence maximale (10,5 MHz) et validation physique CMOS sous Proteus.",
                    image: "assets/images/captureBasculeJK.png",
                    video: "",
                    gallery: [
                        "assets/images/simulation2.png",
                        "assets/images/simulation3reelle.png"
                    ],
                    links: {},
                    details: `
### Résumé du Projet
Conception intégrale d'une bascule JK synchrone à partir de portes élémentaires et d'une bascule D (**74HC74, 74HC08, 74HC32**), de la synthèse par machine à états finis (FSM) jusqu'à l'analyse des contraintes électriques et temporelles réelles.

### Synthèse & Caractérisation Électrique
- **Modélisation FSM (Moore)** et synthèse de l'équation caractéristique : **D = J·Q̅ + K̅·Q**.
- **Analyse des temps de propagation** : Détermination de la fréquence maximale d'horloge à **10,5 MHz** en tenant compte des temps de pré-positionnement (*Setup Time*) et de traversée des portes.
- **Bilan énergétique CMOS** : Évaluation de la dissipation dynamique à **16 mW** sous 10 MHz et vérification des marges de bruit hautes et basses.
                    `
                }
            ]
        },
        experience: {
            title: "Expériences Professionnelles & Engagements",
            filterAll: "Toutes",
            filterPro: "R&D & Professionnel",
            filterAssoc: "Leadership & Associatif",
            items: [
                {
                    type: "pro",
                    role: "Ingénieur Stagiaire R&D Électronique de Puissance",
                    organization: "Fortico",
                    organizationUrl: "https://sitewebfortico.vercel.app/fr",
                    location: "Stage R&D",
                    period: "Juil. 2026 - Oct. 2026",
                    tags: ["KiCad", "Proteus", "Simulink", "MPPT 3 Phases", "Onduleur Hybride", "PID"],
                    bullets: [
                        "Conception électronique (KiCad / Proteus) d'un onduleur hybride : convertisseur MPPT entrelacé 3 phases et étages de puissance 24V / 350VDC / 230VAC.",
                        "Simulation dynamique sous MATLAB/Simulink et synthèse des régulateurs PID : algorithme MPPT P&O, profil de charge batterie et gestion hybride réseau."
                    ]
                },
                {
                    type: "pro",
                    role: "Stagiaire R&D Intelligence Artificielle & IoT (PFA)",
                    organization: "Smart Automation Technologies",
                    organizationUrl: "https://www.linkedin.com/company/smart-automation-technologies/home/",
                    location: "Stage R&D",
                    period: "Juil. 2026 - Août 2026",
                    tags: ["IA Embarquée", "Markov vs CNN", "Imagerie Thermique", "IoT", "Maintenance Prédictive"],
                    bullets: [
                        "Analyse comparative de modèles d'IA (Modèles de Markov vs Réseaux Convolutifs CNN) pour le diagnostic industriel par imagerie thermique.",
                        "Déploiement sur nœuds IoT pour la détection automatique d'anomalies en temps réel et la maintenance prédictive."
                    ]
                },
                {
                    type: "pro",
                    role: "Stage Technique en Électricité & Supervision SCADA",
                    organization: "Amendis (Groupe Veolia)",
                    organizationUrl: "https://www.amendis.ma/",
                    location: "Tanger, Maroc",
                    period: "Juil. 2025 - Août 2025",
                    tags: ["SCADA Siemens", "Réseaux HTA/BT", "Automatisation", "Téléconduite BCC"],
                    bullets: [
                        "Immersion au département Électricité : analyse de l'architecture des réseaux de distribution (HTB/HTA vers MT/BT).",
                        "Supervision temps réel au Bureau Central de Conduite (BCC) via systèmes SCADA (Siemens) et protocoles de communication industrielle."
                    ]
                },
                {
                    type: "pro",
                    role: "Animateur d'Ateliers Robotique & Programmation",
                    organization: "STEAM Academy",
                    organizationUrl: "https://www.facebook.com/steamacademy.ma/",
                    location: "Tanger, Maroc",
                    period: "2025 - Présent",
                    tags: ["Robotique Éducative", "Pédagogie", "Capteurs & Actionneurs"],
                    bullets: [
                        "Encadrement d'enfants et jeunes autour des concepts fondamentaux de la robotique, de l'électronique et de la programmation logique."
                    ]
                },
                {
                    type: "pro",
                    role: "Professeur Particulier (Sciences & Technologie)",
                    organization: "Superprof / Indépendant & Centre Safouane",
                    organizationUrl: "https://www.superprof.ma/",
                    location: "Tanger, Maroc",
                    period: "2023 - Présent",
                    tags: ["Mathématiques", "Physique", "Sciences de l'Ingénieur"],
                    bullets: [
                        "Accompagnement méthodologique et cours particuliers en mathématiques, physique et technologie pour élèves et étudiants."
                    ]
                },
                {
                    type: "pro",
                    role: "Rédacteur Technique (Freelance)",
                    organization: "Alphorm",
                    organizationUrl: "https://www.alphorm.com/",
                    location: "Télétravail",
                    period: "Août 2024 - Mars 2025",
                    tags: ["Rédaction Technique", "Vulgarisation", "Veille Technologique"],
                    bullets: [
                        "Rédaction d'articles techniques spécialisés et vulgarisation de concepts technologiques avancés pour le blog de la plateforme de formation."
                    ]
                },
                {
                    type: "assoc",
                    role: "Adjoint Chargé Académique",
                    organization: "EISCLUB (ENSA International Students Club)",
                    organizationUrl: "https://www.linkedin.com/company/eisclubuae/home/",
                    location: "ENSA Tanger",
                    period: "2023 - 2024",
                    tags: ["Leadership", "Coordination Académique", "International"],
                    bullets: [
                        "Suivi de l'intégration académique des étudiants internationaux à l'ENSA de Tanger et organisation d'événements scientifiques et culturels."
                    ]
                },
                {
                    type: "assoc",
                    role: "Responsable Logistique (2 Mandats)",
                    organization: "TSINGY TANGER (Association des Étudiants Malgaches)",
                    organizationUrl: "https://tsingymaroc.org/",
                    location: "Tanger, Maroc",
                    period: "2022 - 2024",
                    tags: ["Gestion Logistique", "Organisation d'Événements", "Esprit d'Équipe"],
                    bullets: [
                        "Gestion opérationnelle du matériel, planification budgétaire et logistique lors des événements communautaires et inter-universitaires."
                    ]
                },
                {
                    type: "assoc",
                    role: "Engagements Associatifs, Robotique & Culturels",
                    organization: "EnsaTronics, CESAM Tanger, OJA, Enactus & FITUT",
                    organizationUrl: "https://cesamcentrale.org/category/sections-cesam/tanger/",
                    location: "Tanger & Madagascar",
                    period: "2018 - Présent",
                    tags: ["Club Robotique EnsaTronics", "CESAM", "OJA", "Théâtre FITUT"],
                    bullets: [
                        "Membre actif du club de robotique EnsaTronics (ENSA Tanger), de la CESAM Tanger et de l'Organisation des Jeunes Africains (OJA).",
                        "Dramaturge et acteur au Festival International du Théâtre Universitaire de Tanger (FITUT 2022) — Pièce « Amour interdit ».",
                        "Trésorier de l'association MPISERVY (2018-2021) et formateur humanitaire pour le Ministère de la Santé à Madagascar (Août 2018)."
                    ]
                }
            ]
        },
        certificates: {
            title: "Certifications & Distinctions",
            sections: [
                {
                    title: "Certifications Techniques & Scientifiques",
                    description: "En complément de ma formation d'ingénieur GSEA, je valide régulièrement mes compétences en modélisation numérique, intelligence artificielle et mathématiques appliquées.",
                    items: [
                        {
                            title: "Certification en Modélisation & Simulation (MATLAB / Simulink)",
                            issuer: "IngénieriePro",
                            date: "2025",
                            description: "Formation certifiante axée sur la modélisation dynamique, la simulation de systèmes de commande et le prototypage virtuel sous MATLAB/Simulink.",
                            skills: ["MATLAB/Simulink", "Ingénierie des Systèmes", "Automatique", "Prototypage Virtuel"],
                            images: ["assets/images/CertificatMatlab.png"],
                            links: ["assets/pdfs/CertificatMatlab.pdf"]
                        },
                        {
                            title: "Formation Certifiante en IA & Idéation Entrepreneuriale",
                            issuer: "Fondation CIDEAL — Programme INNO'VERT / ENSA Tanger",
                            date: "2025 - 2026",
                            description: "Programme d'innovation technologique et d'applications de l'Intelligence Artificielle pour le développement de solutions durables et entrepreneuriales à l'ENSA Tanger.",
                            skills: ["Intelligence Artificielle", "Innovation INNO'VERT", "Idéation", "Gestion de Projet"],
                            images: [],
                            links: []
                        },
                        {
                            title: "Participation Certifiée — International Youth Math Challenge (IYMC)",
                            issuer: "IYMC (Compétition Internationale de Mathématiques)",
                            date: "Distinction Internationale",
                            description: "Participation certifiée à la compétition mathématique internationale IYMC, attestant de solides bases analytiques pour la modélisation physique et l'automatique.",
                            skills: ["Mathématiques Appliquées", "Analyse", "Résolution de Problèmes"],
                            images: [],
                            links: []
                        }
                    ]
                },
                {
                    title: "Engagements Associatifs, Leadership & Soft Skills",
                    description: "La réussite d'un projet R&D repose autant sur la rigueur technique que sur la communication, la fiabilité logistique et l'esprit d'équipe.",
                    items: [
                        {
                            title: "Responsable Logistique & Membre du Bureau (3 Certificats de Reconnaissance)",
                            issuer: "Association TSINGY MAROC (Section Tanger)",
                            date: "2022 - 2024 (2 Mandats)",
                            description: "Reconnaissance officielle sur deux mandats consécutifs pour la gestion logistique, l'organisation d'événements et la représentation de la section Tanger.",
                            skills: ["Gestion des Ressources", "Leadership", "Résolution de Problèmes", "Fiabilité"],
                            images: [
                                "assets/images/certif_tsingy.png",
                                "assets/images/CertificatTsingyTanger1ereMandat.png",
                                "assets/images/CertificatTsingyTanger2eMandat.png"
                            ],
                            links: [
                                "assets/pdfs/CertificatdeReconnaissanceChargéLogistiqueSectionTANGERTSINGYMAROC2023_2024.pdf",
                                "assets/pdfs/CertificatTsingyTanger1ereMandat.pdf",
                                "assets/pdfs/CertificatTsingyTanger2eMandat.pdf"
                            ]
                        },
                        {
                            title: "Participation Officielle au Festival International du Théâtre Universitaire (FITUT)",
                            issuer: "FITUT Tanger",
                            date: "2022",
                            description: "Écriture et interprétation théâtrale devant un jury et un public internationaux lors de l'édition 2022 du FITUT à Tanger.",
                            skills: ["Prise de Parole en Public", "Créativité", "Esprit d'Équipe"],
                            images: ["assets/images/CertificatFITUT.png"],
                            links: ["assets/pdfs/CertificatFITUT.pdf"]
                        }
                    ]
                }
            ]
        },
        education: {
            title: "Formation Académique",
            downloadCV: "Télécharger mon CV PFE (PDF)",
            viewCV: "Ouvrir le CV dans un nouvel onglet",
            items: [
                {
                    degree: "Cycle d'Ingénieur d'État — Génie des Systèmes Électroniques et Automatiques (GSEA)",
                    institution: "<a href='https://ensat.ac.ma/Portail/genie-des-systemes-electroniques-et-automatiques-gsea/' target='_blank' rel='noopener' class='highlight-link'>École Nationale des Sciences Appliquées de Tanger (ENSA Tanger)</a> — Université Abdelmalek Essaâdi",
                    period: "2022 - 2027 (3ème année — Dernière année)",
                    details: "Spécialités : Systèmes embarqués, électronique de puissance, microcontrôleurs (STM32, PIC, DSP), traitement du signal, automatique avancée, robotique (ROS 2) et IA embarquée."
                },
                {
                    degree: "Licence 1 — Mathématiques et Informatique pour les Sciences Sociales (MISS)",
                    institution: "<a href='https://www.univ-fianarantsoa.mg/' target='_blank' rel='noopener' class='highlight-link'>Université de Fianarantsoa</a>, Madagascar",
                    period: "2021 - 2022",
                    details: "Algorithmique, programmation, algèbre linéaire, analyse mathématique et probabilités."
                },
                {
                    degree: "Baccalauréat Scientifique — Série C (Mention Très Bien)",
                    institution: "Houssen Memorial School (HMS), Tuléar, Madagascar",
                    period: "2020 - 2021",
                    details: "Spécialité Mathématiques et Sciences Physiques — Obtenu avec la Mention Très Bien."
                }
            ]
        },
        actions: {
            contact: "Me contacter",
            linkedin: "LinkedIn",
            github: "GitHub",
            report: "Consulter le rapport PDF",
            watchVideo: "Voir la démonstration vidéo"
        }
    },
    en: {
        nav: {
            about: "About",
            skills: "Skills",
            projects: "Projects",
            experience: "Experience",
            cv: "Education & CV",
            certificates: "Certificates"
        },
        identity: {
            name: "Tsikomia Scidelo ANDRIASAHY",
            title: "Final-Year Engineering Student in Electronic Systems & Automation (GSEA)",
            availabilityBadge: "🎯 Seeking 6-Month Graduation Internship (PFE) starting February 2027 — Embedded Systems, Control, Robotics & AI",
            institution: "National School of Applied Sciences of Tangier (ENSA Tangier) — Abdelmalek Essaâdi University (Final Year)",
            location: "Tangier, Morocco (International Mobility)",
            specialties: [
                "Embedded Systems (STM32, DSP, PIC)",
                "Power Electronics & MPPT",
                "Advanced Control & ROS 2 Robotics",
                "LabVIEW Instrumentation & Signal Processing",
                "Embedded AI (CNN, Markov, ANFIS, GA)"
            ],
            contacts: {
                email: "scideloandriasahy@gmail.com",
                linkedin: "https://www.linkedin.com/in/scidelo",
                github: "https://github.com/scidelo-andriasahy",
                portfolio: "https://scidelo-andriasahy.github.io",
                superprof: "https://www.superprof.ma/Scidelo",
                phone: "+212 777 647 362"
            },
            image: "assets/images/SARY1.jpeg"
        },
        about: {
            title: "Profile & PFE Objective",
            text: "Final-year engineering student in Electronic Systems and Automation (GSEA) at ENSA Tangier, specializing in embedded systems, instrumentation, power electronics, signal processing, and advanced control. Backed by hands-on R&D experience (3-phase interleaved MPPT hybrid inverter design at Fortico, thermal imaging diagnostics with embedded AI on IoT nodes at Smart Automation Technologies, LabVIEW test benches, and autonomous mobile robotics with ROS 2), I combine physical sensor/actuator mastery with predictive modeling in MATLAB/Simulink, C/C++ (MISRA C), and Python.",
            pfeHighlight: "I am looking for a 6-month graduation internship (PFE) starting in February 2027 to design critical embedded systems, develop intelligent control laws, or deploy predictive maintenance and decision-support tools.",
            languages: [
                { lang: "French", level: "Fluent (Full professional proficiency)" },
                { lang: "English", level: "Technical (Reading, writing, R&D documentation)" },
                { lang: "Malagasy", level: "Native" },
                { lang: "Spanish", level: "Basic" }
            ],
            interests: ["Tech Watch (Conferences & Fairs)", "Chess", "DIY Electronics", "Cinema", "Football & Petanque"]
        },
        skills: {
            title: "Technical Skills",
            subtitle: "Dual hardware (PCB design, microcontrollers, power electronics) and software (real-time firmware, intelligent control, embedded AI) expertise.",
            categories: [
                {
                    icon: "cpu",
                    title: "Embedded Systems & Electronics",
                    items: ["STM32", "DSP TMS320C6713", "PIC (16F877A)", "ESP32", "Arduino", "Industrial Sensors", "Power Electronics", "KiCad (PCB)", "Proteus ISIS"]
                },
                {
                    icon: "code",
                    title: "Programming & Firmware",
                    items: ["C (MISRA C Standard)", "C++", "Python", "VHDL", "Real-Time Embedded Firmware", "C-MEX S-Functions", "PlatformIO", "Memory-Optimized Algorithms"]
                },
                {
                    icon: "activity",
                    title: "Control Systems & Embedded AI",
                    items: ["PID Control", "Fuzzy Logic (FLC)", "ANFIS", "Genetic Algorithms (GA)", "Neural Networks (ANN / CNN)", "Markov Models", "MPPT P&O Algorithm", "SLAM & Nav2 Navigation"]
                },
                {
                    icon: "sliders",
                    title: "R&D Tools & Environments",
                    items: ["MATLAB / Simulink", "ROS 2 (Humble) & Gazebo", "LabVIEW (Instrumentation)", "Siemens TIA Portal (SCADA)", "Linux (Ubuntu)", "Git / GitHub", "LaTeX", "Android Studio"]
                }
            ]
        },
        projects: {
            title: "Technical & R&D Projects",
            filterAll: "All",
            items: [
                {
                    id: 1,
                    title: "Autonomous Mobile Robot AMR (ROS 2 Humble & Nav2)",
                    category: "Robotics & ROS 2",
                    tags: ["ROS 2 Humble", "Gazebo", "URDF/Xacro", "SLAM Toolbox", "Ceres Solver", "Nav2 (A* / DWB)", "2D LiDAR & IMU", "Ubuntu"],
                    description: "Digital twin design in Gazebo, Graph-SLAM mapping (Ceres), and autonomous navigation via Nav2 stack validated on physical hardware.",
                    image: "assets/images/amr_ros2.svg",
                    video: "",
                    gallery: [
                        "assets/images/amr_ros2.svg"
                    ],
                    links: {},
                    details: `
### Project Abstract
End-to-end development of an **Autonomous Mobile Robot (AMR)** running **ROS 2 Humble (Ubuntu)**, from physics-based digital twin simulation to real-world hardware deployment with full **TF2** coordinate frame synchronization.

### 1. Digital Twin & Sensor Simulation (Gazebo)
- **URDF / Xacro Modeling**: Accurate definition of inertia matrices, collision meshes, and differential-drive kinematics.
- **Sensor Suite Integration**: Simulated **360° 2D LiDAR** (\`/scan\`) and **IMU** (\`/imu/data\`) fused with wheel odometry (\`/odom\`).
- **TF2 Coordinate Tree**: Strict real-time synchronization across \`map -> odom -> base_footprint -> base_link -> laser_frame\`.

### 2. Graph-SLAM Mapping (SLAM Toolbox & Ceres Solver)
- **Asynchronous Graph-SLAM** implementation using \`slam_toolbox\` to build 2D occupancy grid maps in unknown indoor environments.
- **Non-Linear Optimization via Ceres Solver**: Loop closure detection and cumulative odometry drift correction.

### 3. Autonomous Navigation via Nav2 Stack
- **Multi-Layered 2D Costmaps**: Configured *Static*, *Obstacle*, and *Inflation* layers for dynamic obstacle avoidance.
- **Global & Local Planning**: Global path planning using **A*** (*NavFn*) paired with local trajectory tracking via **DWB (Dynamic Window Approach)** publishing \`/cmd_vel\` commands.
                    `
                },
                {
                    id: 2,
                    title: "2-DOF Robotic Arm Trajectory Tracking & Control (DSP Deployment)",
                    category: "Control & Embedded AI",
                    tags: ["MATLAB/Simulink", "DSP TMS320C6713", "C++ / C-MEX", "Fuzzy Logic (FLC)", "GA-PID", "Neural Network (ANN)", "2-DOF"],
                    description: "Dynamic modeling accelerated via C-MEX (×50), comparative study of ANN / GA-PID / Fuzzy Logic, C++ validation, and deployment on TMS320C6713 DSP.",
                    image: "assets/images/brasrobotPH1.png",
                    video: "",
                    gallery: [
                        "assets/images/capturesimulinkTotal.png",
                        "assets/images/captureFuzzy.png",
                        "assets/images/captureregleFuzzy.png",
                        "assets/images/resultatfuzzy.png",
                        "assets/images/resultatPid.png",
                        "assets/images/TrajectoryTrackingComparaisonJoint1.png"
                    ],
                    codeSnippet: {
                        language: "matlab",
                        title: "Genetic Algorithm Optimization Loop (GA-PID in MATLAB)",
                        code: `%% --- 1. GA POPULATION INITIALIZATION ---
par = Init(N, npar, range);
fitness = zeros(N, 1);
generation = 0; terminal = 0;

%% --- 2. EVOLUTION LOOP & C-MEX ACCELERATED SIMULATION (x50) ---
while ~terminal
    generation = generation + 1;
    for i = 1:N
        Kp1 = par(i,1); Ki1 = par(i,2); Kd1 = par(i,3);
        Kp2 = par(i,4); Ki2 = par(i,5); Kd2 = par(i,6);
        assignin('base', 'Kp1', Kp1); assignin('base', 'Ki1', Ki1); assignin('base', 'Kd1', Kd1);
        assignin('base', 'Kp2', Kp2); assignin('base', 'Ki2', Ki2); assignin('base', 'Kd2', Kd2);
        
        simOut = sim('GA_PID_2DOF_Sfunction', 'SrcWorkspace', 'current', 'StopTime', '40');
        % Multi-objective ISE + actuator energy penalty evaluation
    end
end`
                    },
                    links: {
                        report: "assets/pdfs/ROBOT2DOF_Scidelo_FR.pdf"
                    },
                    details: `
### Project Abstract
Comparative study and embedded implementation of three advanced control strategies applied to a two-degree-of-freedom (**2-DOF**) robotic manipulator with strong non-linear articular couplings.

### Engineering Methodology & Deployment
- **C-MEX S-Functions Acceleration (×50)**: Implemented the Lagrangian dynamic model and controllers in C-MEX, speeding up Simulink execution by 50x.
- **Comparative Control Study**: Evaluated **Artificial Neural Networks (ANN)**, **Genetic Algorithm-tuned PID (GA-PID)**, and **Fuzzy Logic Control (FLC)**.
- **C++ Validation & DSP TMS320C6713 Deployment**: Selected the Fuzzy Logic controller for its superior robustness, validated the control law in **C++**, and deployed it on a **Texas Instruments TMS320C6713 DSP** board.
                    `
                },
                {
                    id: 3,
                    title: "Hybrid Inverter & 3-Phase Interleaved MPPT (Fortico R&D)",
                    category: "Power Electronics",
                    tags: ["KiCad", "Proteus", "MATLAB/Simulink", "3-Phase MPPT P&O", "24V/350VDC/230VAC Inverter", "PID Control"],
                    description: "Hardware design (KiCad/Proteus) and Simulink PID control of a hybrid solar inverter featuring 3-phase interleaved MPPT and 24V/350VDC/230VAC power stages.",
                    image: "assets/images/onduleur_mppt_fortico.svg",
                    video: "",
                    gallery: [
                        "assets/images/onduleur_mppt_fortico.svg"
                    ],
                    links: {},
                    details: `
### R&D Context (Fortico)
Power electronics R&D project focused on designing a high-efficiency hybrid solar inverter architecture.

### Hardware & Control Architecture
- **3-Phase Interleaved MPPT Boost Stage**: 120° phase-shifted converter topology reducing input current ripple and thermal stress.
- **24V / 350VDC / 230VAC Power Stages**: Full schematic capture and PCB layout in **KiCad**, physical co-simulation in **Proteus**.
- **Simulink Control & Grid Management**: **Perturb & Observe (P&O) MPPT** algorithm, **PID voltage/current loops**, multi-stage battery charging profile, and hybrid grid switching.
                    `
                },
                {
                    id: 4,
                    title: "Thermal Imaging Diagnostics & Embedded IoT AI",
                    category: "Control & Embedded AI",
                    tags: ["Thermal Imaging", "CNN", "Markov Models", "IoT Edge", "Predictive Maintenance", "Python", "C/C++"],
                    description: "Comparative analysis of Markov Models vs. Convolutional Neural Networks (CNN) for thermal anomaly detection deployed on IoT nodes.",
                    image: "assets/images/diagnostic_thermique_ia.svg",
                    video: "",
                    gallery: [
                        "assets/images/diagnostic_thermique_ia.svg"
                    ],
                    links: {},
                    details: `
### R&D Context (Smart Automation Technologies — PFA)
Industrial predictive maintenance R&D project utilizing infrared thermal imaging and **Edge IoT** inference.

### Comparative AI Study & IoT Deployment
- **Markov Models vs. CNN**: Benchmarked probabilistic Markov transition models against Convolutional Neural Networks (CNN) for hotspot detection and fault classification.
- **Edge IoT Integration**: Deployed the selected models onto IoT nodes for automated real-time anomaly detection and predictive maintenance alerts.
                    `
                },
                {
                    id: 5,
                    title: "Virtual Instrumentation & Digital Oscilloscope (LabVIEW)",
                    category: "Instrumentation & Signal",
                    tags: ["LabVIEW", "Virtual Instrumentation", "Signal Processing", "Real-Time HMI", "Test Bench"],
                    description: "Real-time measurement test bench developed in LabVIEW featuring a multi-waveform signal generator and dynamic Volt/Div & ms/Div scaling.",
                    image: "assets/images/Labview3.png",
                    video: "",
                    gallery: [
                        "assets/images/Labview1.png",
                        "assets/images/Labview2.png",
                        "assets/images/Labview3.png",
                        "assets/images/Labview4.png"
                    ],
                    links: {
                        report: "assets/pdfs/RAPPORT_LABVIEW.pdf"
                    },
                    details: `
### Project Abstract
Development of a real-time virtual instrumentation bench in **LabVIEW** combining a multi-waveform signal generator (sine, square, triangle, sawtooth) and a digital oscilloscope with dynamic **Volt/Div** and **ms/Div** scaling and measurement cursors.
                    `
                },
                {
                    id: 6,
                    title: "Memory-Optimized 24H Clock & Digital Thermometer (PIC16F877A)",
                    category: "Embedded Systems",
                    tags: ["PIC16F877A", "Embedded C (MikroC)", "Proteus ISIS", "10-bit ADC", "LM35 Sensor", "RAM/Flash Optimization"],
                    description: "Multitask C firmware on PIC16F877A with low-level algorithmic optimization of Flash and RAM memory.",
                    image: "assets/images/imagePH2.png",
                    video: "",
                    gallery: [
                        "assets/images/Image1.png",
                        "assets/images/Image2.png",
                        "assets/images/Image3.png",
                        "assets/images/Image4.png",
                        "assets/images/Image5.png"
                    ],
                    links: {
                        report: "assets/pdfs/RAPPORT_H24_THERMO.pdf"
                    },
                    details: `
### Project Abstract
Design and C programming of a real-time multitask embedded system on a **PIC16F877A** microcontroller combining a 24-hour clock and a digital thermometer (**LM35** via 10-bit ADC), achieving significant **Flash and RAM optimization** by replacing heavy standard libraries with custom integer formatting routines.
                    `
                },
                {
                    id: 7,
                    title: "Complete JK Flip-Flop Logic Synthesis & CMOS Characterization",
                    category: "Embedded Systems",
                    tags: ["Digital Electronics", "74HC CMOS", "Moore FSM", "Proteus", "Noise Margins", "Timing Analysis"],
                    description: "Moore FSM modeling, logic synthesis, noise margin analysis, max frequency calculation (10.5 MHz), and real 74HC CMOS simulation.",
                    image: "assets/images/captureBasculeJK.png",
                    video: "",
                    gallery: [
                        "assets/images/simulation2.png",
                        "assets/images/simulation3reelle.png"
                    ],
                    links: {},
                    details: `
### Project Abstract
Full design of a synchronous JK flip-flop from **74HC** CMOS gates (74HC74, 74HC08, 74HC32): Moore FSM synthesis (**D = J·Q' + K'·Q**), noise margin verification, maximum frequency estimation (**10.5 MHz**), and dynamic power calculation (**16 mW** at 10 MHz).
                    `
                }
            ]
        },
        experience: {
            title: "Professional Experience & Leadership",
            filterAll: "All",
            filterPro: "R&D & Professional",
            filterAssoc: "Leadership & Extracurricular",
            items: [
                {
                    type: "pro",
                    role: "Power Electronics R&D Engineering Intern",
                    organization: "Fortico",
                    organizationUrl: "https://sitewebfortico.vercel.app/fr",
                    location: "R&D Internship",
                    period: "Jul. 2026 - Oct. 2026",
                    tags: ["KiCad", "Proteus", "Simulink", "3-Phase MPPT", "Hybrid Inverter", "PID"],
                    bullets: [
                        "Hardware design (KiCad / Proteus) of a hybrid inverter: 3-phase interleaved MPPT converter and 24V / 350VDC / 230VAC power stages.",
                        "MATLAB/Simulink simulation and PID control design: P&O MPPT algorithm, battery charging profile, and hybrid grid management."
                    ]
                },
                {
                    type: "pro",
                    role: "AI & IoT R&D Engineering Intern (PFA)",
                    organization: "Smart Automation Technologies",
                    organizationUrl: "https://www.linkedin.com/company/smart-automation-technologies/home/",
                    location: "R&D Internship",
                    period: "Jul. 2026 - Aug. 2026",
                    tags: ["Embedded AI", "Markov vs CNN", "Thermal Imaging", "IoT", "Predictive Maintenance"],
                    bullets: [
                        "Comparative study of AI models (Markov Models vs. CNNs) for industrial fault diagnostics using thermal imaging.",
                        "Deployment on IoT nodes for automated anomaly detection and predictive maintenance."
                    ]
                },
                {
                    type: "pro",
                    role: "Electrical Engineering & SCADA Supervision Intern",
                    organization: "Amendis (Veolia Group)",
                    organizationUrl: "https://www.amendis.ma/",
                    location: "Tangier, Morocco",
                    period: "Jul. 2025 - Aug. 2025",
                    tags: ["Siemens SCADA", "HV/MV/LV Grid", "Automation", "Industrial Protocols"],
                    bullets: [
                        "Analyzed electrical power distribution networks (HV/MV/LV) and industrial automation protocols.",
                        "Observed real-time grid supervision at the Central Control Desk (BCC) using Siemens SCADA systems."
                    ]
                },
                {
                    type: "pro",
                    role: "Robotics Workshop Instructor",
                    organization: "STEAM Academy",
                    organizationUrl: "https://www.facebook.com/steamacademy.ma/",
                    location: "Tangier, Morocco",
                    period: "2025 - Present",
                    tags: ["Educational Robotics", "Teaching", "Sensors & Programming"],
                    bullets: [
                        "Mentoring children and young learners in core robotics, electronics, and programming concepts."
                    ]
                },
                {
                    type: "pro",
                    role: "Private Tutor (Science & Technology)",
                    organization: "Superprof / Independent & Safouane Center",
                    organizationUrl: "https://www.superprof.ma/",
                    location: "Tangier, Morocco",
                    period: "2023 - Present",
                    tags: ["Mathematics", "Physics", "Engineering Sciences"],
                    bullets: [
                        "Tailored tutoring in mathematics, physics, and engineering sciences."
                    ]
                },
                {
                    type: "pro",
                    role: "Technical Writer (Freelance)",
                    organization: "Alphorm",
                    organizationUrl: "https://www.alphorm.com/",
                    location: "Remote",
                    period: "Aug. 2024 - Mar. 2025",
                    tags: ["Technical Writing", "Tech Communication"],
                    bullets: [
                        "Authored specialized technical articles and popularized complex engineering and IT topics for the platform's blog."
                    ]
                },
                {
                    type: "assoc",
                    role: "Deputy Head of Academic Affairs",
                    organization: "EISCLUB (ENSA International Students Club)",
                    organizationUrl: "https://www.linkedin.com/company/eisclubuae/home/",
                    location: "ENSA Tangier",
                    period: "2023 - 2024",
                    tags: ["Leadership", "Academic Coordination"],
                    bullets: [
                        "Supported the academic integration of international students at ENSA Tangier and coordinated scientific events."
                    ]
                },
                {
                    type: "assoc",
                    role: "Logistics Manager (2 Terms)",
                    organization: "TSINGY TANGER",
                    organizationUrl: "https://tsingymaroc.org/",
                    location: "Tangier, Morocco",
                    period: "2022 - 2024",
                    tags: ["Logistics", "Event Management", "Teamwork"],
                    bullets: [
                        "Managed inventory, budgeting, and field logistics for cultural and academic student events over two consecutive terms."
                    ]
                },
                {
                    type: "assoc",
                    role: "Robotics Club & Community Leadership",
                    organization: "EnsaTronics, CESAM Tangier, OJA, Enactus & FITUT",
                    organizationUrl: "https://cesamcentrale.org/category/sections-cesam/tanger/",
                    location: "Tangier & Madagascar",
                    period: "2018 - Present",
                    tags: ["EnsaTronics Robotics", "CESAM", "OJA", "FITUT Theatre"],
                    bullets: [
                        "Active member of EnsaTronics Robotics Club, CESAM Tangier, and the Organization of African Youth (OJA).",
                        "Playwright and actor at the International University Theatre Festival of Tangier (FITUT 2022).",
                        "Treasurer of MPISERVY (2018-2021) and humanitarian digital trainer for the Ministry of Health in Madagascar (Aug. 2018)."
                    ]
                }
            ]
        },
        certificates: {
            title: "Certifications & Awards",
            sections: [
                {
                    title: "Technical & Scientific Certifications",
                    description: "Alongside my GSEA engineering degree, I continuously validate my skills in numerical modeling, artificial intelligence, and applied mathematics.",
                    items: [
                        {
                            title: "Modeling & Simulation Certification (MATLAB / Simulink)",
                            issuer: "IngénieriePro",
                            date: "2025",
                            description: "Specialized technical certification focused on dynamic modeling, control systems simulation, and virtual prototyping in MATLAB/Simulink.",
                            skills: ["MATLAB/Simulink", "Systems Engineering", "Control Theory", "Virtual Prototyping"],
                            images: ["assets/images/CertificatMatlab.png"],
                            links: ["assets/pdfs/CertificatMatlab.pdf"]
                        },
                        {
                            title: "Certified Training in AI & Entrepreneurial Ideation",
                            issuer: "CIDEAL Foundation — INNO'VERT Program / ENSA Tangier",
                            date: "2025 - 2026",
                            description: "Certified training program combining Artificial Intelligence applications and sustainable entrepreneurial innovation at ENSA Tangier.",
                            skills: ["Artificial Intelligence", "INNO'VERT Innovation", "Project Ideation"],
                            images: [],
                            links: []
                        },
                        {
                            title: "Certified Participant — International Youth Math Challenge (IYMC)",
                            issuer: "IYMC (International Mathematics Competition)",
                            date: "International Award",
                            description: "Certified participation in the IYMC international mathematics challenge, demonstrating strong analytical problem-solving skills.",
                            skills: ["Applied Mathematics", "Analytical Thinking", "Problem Solving"],
                            images: [],
                            links: []
                        }
                    ]
                },
                {
                    title: "Leadership, Associative Commitment & Soft Skills",
                    description: "Successful engineering projects rely on strong teamwork, organization, and effective communication.",
                    items: [
                        {
                            title: "Logistics Manager & Board Member (3 Recognition Certificates)",
                            issuer: "TSINGY MAROC Association (Tangier Section)",
                            date: "2022 - 2024 (2 Terms)",
                            description: "Awarded multiple certificates of recognition across two terms for managing logistics and representing the Tangier section.",
                            skills: ["Resource Management", "Leadership", "Problem Solving", "Reliability"],
                            images: [
                                "assets/images/certif_tsingy.png",
                                "assets/images/CertificatTsingyTanger1ereMandat.png",
                                "assets/images/CertificatTsingyTanger2eMandat.png"
                            ],
                            links: [
                                "assets/pdfs/CertificatdeReconnaissanceChargéLogistiqueSectionTANGERTSINGYMAROC2023_2024.pdf",
                                "assets/pdfs/CertificatTsingyTanger1ereMandat.pdf",
                                "assets/pdfs/CertificatTsingyTanger2eMandat.pdf"
                            ]
                        },
                        {
                            title: "Official Participant — International University Theatre Festival (FITUT)",
                            issuer: "FITUT Tangier",
                            date: "2022",
                            description: "Playwright and performer at the 2022 International University Theatre Festival of Tangier.",
                            skills: ["Public Speaking", "Creativity", "Teamwork"],
                            images: ["assets/images/CertificatFITUT.png"],
                            links: ["assets/pdfs/CertificatFITUT.pdf"]
                        }
                    ]
                }
            ]
        },
        education: {
            title: "Academic Background",
            downloadCV: "Download my PFE CV (PDF)",
            viewCV: "Open CV in new tab",
            items: [
                {
                    degree: "State Engineering Degree — Electronic Systems and Automation Engineering (GSEA)",
                    institution: "<a href='https://ensat.ac.ma/Portail/genie-des-systemes-electroniques-et-automatiques-gsea/' target='_blank' rel='noopener' class='highlight-link'>National School of Applied Sciences (ENSA Tangier)</a> — Abdelmalek Essaâdi University",
                    period: "2022 - 2027 (3rd & Final Year of Engineering Cycle)",
                    details: "Specialties: Embedded systems, power electronics, microcontrollers (STM32, PIC, DSP), signal processing, automatic control, robotics (ROS 2), and embedded AI."
                },
                {
                    degree: "Bachelor Year 1 — Mathematics and Computer Science for Social Sciences (MISS)",
                    institution: "<a href='https://www.univ-fianarantsoa.mg/' target='_blank' rel='noopener' class='highlight-link'>University of Fianarantsoa</a>, Madagascar",
                    period: "2021 - 2022",
                    details: "Algorithms, programming, linear algebra, mathematical analysis, and probability."
                },
                {
                    degree: "Scientific Baccalaureate — Series C (Highest Honors / Mention Très Bien)",
                    institution: "Houssen Memorial School (HMS), Toliara, Madagascar",
                    period: "2020 - 2021",
                    details: "Major in Mathematics and Physics — Graduated with Highest Honors (Mention Très Bien)."
                }
            ]
        },
        actions: {
            contact: "Contact Me",
            linkedin: "LinkedIn",
            github: "GitHub",
            report: "View PDF Report",
            watchVideo: "Watch Video Demo"
        }
    }
};
