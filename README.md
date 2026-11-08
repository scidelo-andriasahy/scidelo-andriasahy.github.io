# Tsikomia Scidelo ANDRIASAHY — Ingénieur Systèmes Embarqués & Automatique

[![Portfolio Live](https://img.shields.io/badge/Portfolio-scidelo--andriasahy.github.io-2563eb?style=for-the-badge&logo=google-chrome&logoColor=white)](https://scidelo-andriasahy.github.io/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Tsikomia%20Scidelo%20ANDRIASAHY-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/scidelo)
[![CV PDF](https://img.shields.io/badge/CV%20PFE%20(PDF)-T%C3%A9l%C3%A9charger-10b981?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white)](https://scidelo-andriasahy.github.io/assets/pdfs/CV_ANDRIASAHY_Tsikomia_Scidelo.pdf)

Bienvenue sur le dépôt officiel du portfolio d'ingénierie de **Tsikomia Scidelo ANDRIASAHY**, élève-ingénieur en dernière année du cycle **Génie des Systèmes Électroniques et Automatiques (GSEA)** à l'**École Nationale des Sciences Appliquées de Tanger (ENSA Tanger — Université Abdelmalek Essaâdi)**.

> 🎯 **Disponibilité Stage PFE (6 mois) dès Février 2027**  
> **Domaines ciblés :** Systèmes Embarqués, Automatique Avancée, Robotique Autonome (ROS 2), Électronique de Puissance, Instrumentation (LabVIEW) & Intelligence Artificielle Embarquée.

---

## 🛠️ Compétences Techniques Clés

- **Systèmes Embarqués & Électronique :** `STM32`, `DSP TMS320C6713`, `PIC16F877A`, `ESP32`, `Arduino`, Capteurs industriels, Électronique de puissance, `KiCad`, `Proteus ISIS`.
- **Programmation & Firmware :** `C` (*Norme MISRA C*), `C++`, `Python`, `VHDL`, Firmware temps réel, `S-Functions C-MEX`, `PlatformIO`.
- **Automatique & IA Embarquée :** Régulation `PID`, Logique Floue (`FLC`), `ANFIS`, Algorithmes Génétiques (`GA`), Réseaux de Neurones (`ANN` / `CNN`), Modèles de Markov, Algorithme `MPPT P&O` entrelacé triphasé.
- **Outils & Environnements R&D :** `MATLAB / Simulink`, `ROS 2 (Humble)` & `Gazebo`, `LabVIEW`, `Siemens TIA Portal` (SCADA), `Linux (Ubuntu)`, `Git / GitHub`, `LaTeX`.

---

## 🚀 Projets Techniques & Réalisations R&D

1. **Robot Mobile Autonome AMR (`ROS 2 Humble`, `Ubuntu`, `Gazebo`, `Nav2`)**
   - Conception du jumeau numérique (`URDF/Xacro`) avec simulation multi-capteurs (`LiDAR 2D`, `IMU`).
   - Cartographie **Graph-SLAM** (`SLAM Toolbox`, solveur `Ceres`) et navigation autonome via la stack **Nav2** (*Costmaps 2D*, planification globale `A*` et locale `DWB`), validée par déploiement physique et synchronisation `TF2`.
2. **Commande & Suivi de Trajectoire d'un Bras Manipulateur 2 DDL (`MATLAB/Simulink`, `C++`, `DSP`)**
   - Modélisation dynamique accélérée par **S-Functions C-MEX (`×50`)**.
   - Étude comparative entre Réseau de Neurones (`ANN`), `PID` optimisé par Algorithme Génétique (`GA`) et Logique Floue (`FLC`), suivie de la validation logicielle en `C++` et du déploiement matériel sur carte **DSP Texas Instruments TMS320C6713**.
3. **Onduleur Hybride & MPPT Entrelacé 3 Phases (`Fortico R&D` — `KiCad`, `Proteus`, `Simulink`)**
   - Conception électronique d'un onduleur hybride comprenant un convertisseur Boost MPPT entrelacé triphasé et des étages `24V / 350VDC / 230VAC`, avec régulation `PID` et gestion hybride réseau sous Simulink.
4. **Diagnostic par Imagerie Thermique & IA Embarquée sur Nœuds IoT (`Smart Automation Technologies R&D`)**
   - Analyse comparative entre **Modèles de Markov** et **Réseaux de Neurones Convolutifs (CNN)** pour la détection automatique d'anomalies thermiques et la maintenance prédictive sur nœuds IoT.
5. **Instrumentation Virtuelle & Oscilloscope Numérique (`LabVIEW`)**
   - Développement d'un banc de mesure temps réel complet (générateur multi-signaux, gestion dynamique des calibres `Volt/Div` et `ms/Div`).
6. **Horloge H24 & Thermomètre Numérique Optimisés (`PIC16F877A`, `MikroC`, `Proteus`)**
   - Développement multitâche en C avec optimisation algorithmique bas-niveau de l'empreinte mémoire Flash et RAM.

---

## 🏗️ Architecture du Portfolio

Ce portfolio a été conçu selon une architecture **Vanilla JS modulaire pilotée par les données (Data-Driven Static Web App)**, garantissant un temps de chargement instantané, un score Lighthouse optimal et une maintenance sans dépendance lourde :

```text
├── index.html                  # Point d'entrée SEO, balises OpenGraph, Schema.org JSON-LD
├── admin.html                  # Studio visuel local pour modifier/ajouter du contenu sans coder
├── data/
│   └── content.js              # Base de données centralisée bilingue (FR / EN)
├── scripts/
│   └── app.js                  # Moteur de rendu dynamique, filtres, lecteur vidéo, modales & lightbox
├── styles/
│   └── main.css                # Design System (Glassmorphism, Thème Clair/Sombre, Responsive)
├── assets/
│   ├── images/                 # Captures Simulink/LabVIEW/Proteus, schémas SVG R&D, certificats
│   └── pdfs/                   # CV PFE (LaTeX + PDF), rapports techniques et certificats PDF
├── robots.txt                  # Directives d'indexation pour les moteurs de recherche
├── sitemap.xml                 # Plan du site XML pour Google Search Console
└── .github/workflows/
    └── deploy.yml              # Déploiement continu (CI/CD) vers GitHub Pages
```

---

## ✏️ Comment modifier ou ajouter un projet / une vidéo facilement ?

### Méthode 1 : Via le Studio Visuel intégré (`admin.html`) — *Sans toucher au code*
1. Ouvrez le site en local (ou ouvrez `/admin.html`).
2. Ajoutez ou modifiez vos projets, expériences ou votre texte de profil via les formulaires visuels.
3. Pour ajouter une **vidéo de démonstration**, collez simplement le lien YouTube (`https://youtu.be/...`) ou le chemin d'un fichier `.mp4` (`assets/videos/demo.mp4`) dans le champ **🎥 Vidéo Démo**.
4. Cliquez sur **💾 Télécharger `content.js`**, remplacez le fichier `data/content.js`, puis envoyez sur GitHub (`git commit` & `git push`).

### Méthode 2 : Directement dans `data/content.js`
Grâce à la séparation entre les données et l'affichage, vous n'avez plus besoin d'écrire de balises HTML dans `data/content.js` :
- **Ajouter une vidéo à un projet :** renseignez `"video": "https://youtu.be/VOTRE_ID"` ou `"video": "assets/videos/ma_demo.mp4"`.
- **Ajouter des images dans la galerie d'un projet :** ajoutez le chemin dans `"gallery": ["assets/images/photo1.png", "assets/images/photo2.png"]`.
- **Ajouter une expérience :** ajoutez un objet dans `experience.items` avec `"type": "pro"` (R&D / Pro) ou `"type": "assoc"` (Associatif) et une simple liste `"bullets": ["Mission 1", "Mission 2"]`.

---

## 📬 Contact

- **Nom complet :** Tsikomia Scidelo ANDRIASAHY
- **Localisation :** Tanger, Maroc (Mobilité internationale — Stage PFE)
- **Email :** [scideloandriasahy@gmail.com](mailto:scideloandriasahy@gmail.com)
- **Téléphone :** +212 777 647 362
- **LinkedIn :** [linkedin.com/in/scidelo](https://www.linkedin.com/in/scidelo)
- **Portfolio :** [scidelo-andriasahy.github.io](https://scidelo-andriasahy.github.io/)
