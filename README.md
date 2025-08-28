# Positivus Landing Page

**Live-Demo:** [positivus-landing-two.vercel.app](https://positivus-landing-two.vercel.app)

# Positivus

Moderne, einseitige Website mit einem regelbasierten Chatbot, entwickelt mit HTML, SCSS und Vanilla JavaScript.
Komponentenbasierter Aufbau, interaktive Benutzerführung und visuelle Details für ein hochwertiges Nutzererlebnis.

## Projektbeschreibung

Positivus ist eine Demo-Website mit integriertem Chatbot, der Benutzer durch die Inhalte der Seite führt.
Die Dialoglogik basiert auf vordefinierten Replikstrukturen, die über ein JSON-Format gesteuert werden. Die Seite kombiniert visuelle Klarheit mit funktionaler Interaktivität.

## Design

Die Benutzeroberfläche ist responsiv und modular aufgebaut.
SCSS-Komponenten sorgen für eine klare Struktur und einfache Wartbarkeit.
Der Fokus liegt auf minimalistischer Gestaltung, klarer Typografie und intuitiver Navigation.

## 1: Desktop-Ansicht
![Desktop-Ansicht](https://github.com/LindtAna/positivus/blob/main/positiv.png?raw=true)



##  2: Mobile-Ansicht
![Mobile-Ansicht](https://github.com/LindtAna/positivus/blob/main/positivus%20mobile.png?raw=true)


## Funktionalität
- Komponentenbasierte SCSS-Struktur für UI-Elemente
- Regelbasierter Chatbot mit klickbaren Antwortoptionen
- Interaktive Link-Animation im Header
- Modularer Aufbau mit separaten JS-Komponenten
- Dynamische Inhaltsdarstellung mit Platzhalter-Ersetzung

## Projektstruktur

```text
positivus/
├── index.html              // Hauptseite
├── chatbot.js              // Chatbot-Logik
├── letters.js              // Link-Animation im Header
├── slider.js               // Slider-Skript
├── buttonglow.js           // Skript für den Glüheffekt des Buttons
├── dialogue.json           // Dialogstruktur für den Chatbot
├── styles/
│   ├── blocks/             // UI-Komponenten
│   ├── chatbot/            // Chatbot-Stile
│   ├── _globals.scss       // Basisstile
│   ├── _variables.scss     // Farb- und Typografievariablen
│   ├── _mixins.scss        // SCSS-Mixins
│   ├── _media.scss         // Media Queries
│   ├── styles.scss         // Haupt-SCSS-Datei
│   └── styles.css          // Kompilierte CSS-Datei
└── README.md               // Dokumentation
```



## Komponentenbasierte SCSS-Architektur

Die SCSS-Dateien sind nach dem Prinzip der Modularität und Wiederverwendbarkeit strukturiert:

- `blocks/` enthält UI-Komponenten wie Buttons, Karten, Sektionen
- `chatbot/` kapselt alle Stile für den Chatbot
- Globale Dateien wie `_variables.scss`, `_mixins.scss`, `_normalize.scss` sorgen für Konsistenz und Skalierbarkeit

Diese Struktur ermöglicht eine klare Trennung von Layout, Logik und Design und erleichtert die Erweiterung des Projekts.

## Chatbot: Logik und Umsetzung

Der Chatbot basiert auf einer regelgesteuerten Dialogstruktur, die in `dialogue.json` definiert ist. Die Logik wird vollständig über `chatbot.js` umgesetzt.

### Hauptfunktionen

- Asynchrone Initialisierung und Datenabruf via `fetch()`
- Zeitverzögerte Ausgabe von Bot-Nachrichten zur Simulation eines Gesprächs
- Dynamische Platzhalter-Ersetzung (`{{param}}`) im Text
- Antwortbuttons mit Verlinkung zu Folge-Repliken
- Reset- und Close-Funktion zur Steuerung des Dialogflusses


## Chatbot-Interaktion
![ChatBot](https://github.com/LindtAna/positivus/blob/main/chatbot.png?raw=true)

### Beispielstruktur aus `dialogue.json`

```json
{
  "bot": {
    "0": {
      "content": ["Welcome to our website! I'm your assistant bot. How can I help you today?", "Please choose a topic below to get started:"],
      "human": [0, 1, 2, 3]
    },

    "1": {
  "content": [
    "You can find all the information about our services <a href=\"#services\">here</a>.",
    "Would you like help with anything else?"
  ],
  "human": [4, 5]
}
```

## Features

 ### Link-Animation im Header
Die Datei letters.js implementiert eine Mikroanimation für Navigationslinks:

-Jeder Buchstabe eines Links wird bei Hover temporär durch zufällige Zeichen ersetzt
-Nach mehreren Iterationen wird der Originaltext wiederhergestellt
-Die Animation erzeugt einen subtilen "Verschlüsselungseffekt" und verbessert die visuelle Dynamik

Technische Details:
-Verwendung von setInterval mit gestaffelter Verzögerung
-Originalzeichen werden über data-letter gespeichert
-Keine Beeinträchtigung der Funktionalität oder Barrierefreiheit

### Glow-Button 
  Interaktiver Button mit fließendem, animiertem Leuchteffekt am Rand.  
  - SCSS-Implementierung mit Pseudo-Element `::before` und radialem Gradient  
  - JavaScript-Animation berechnet die Position entlang des Button-Rands  
  - Automatische Anpassung an verschiedene Button-Größen (responsive)  
  - Konfigurierbare CSS-Variablen






