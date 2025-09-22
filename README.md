# Positivus Landing Page

[Live Demo](https://positivus-landing-two.vercel.app)

Moderne, einseitige Website mit einem regelbasierten Chatbot, entwickelt mit HTML, SCSS und Vanilla JavaScript.
Die Dialoglogik on Chatbot basiert auf vordefinierten Replikstrukturen, die über ein JSON-Format gesteuert werden.
Komponentenbasierter Aufbau, interaktive Benutzerführung und visuelle Details für ein hochwertiges Nutzererlebnis.

## Design

Die Benutzeroberfläche ist **responsiv** und **modular** aufgebaut.
SCSS-Komponenten sorgen für eine klare Struktur und einfache Wartbarkeit.
Der Fokus liegt auf minimalistischer Gestaltung, klarer Typografie und intuitiver Navigation.

### Design in Figma

Das UI-Design basiert auf dem folgenden Figma-Template:  
[Positivus Landing Page Design](https://www.figma.com/community/file/1230604708032389430)


## Funktionalität
- Komponentenbasierte SCSS-Struktur für UI-Elemente
- Regelbasierter Chatbot mit klickbaren Antwortoptionen
- Interaktive Link-Animation im Header
- Modularer Aufbau mit separaten JS-Komponenten
- Dynamische Inhaltsdarstellung mit Platzhalter-Ersetzung

## Projektstruktur

```text
positivus/
├── fonts/
├── images/
├── scripts/
│   ├── main.js
│   ├── ButtonGlow.js
│   ├── Letters.js
│   ├── Slider.js
│   └── Chatbot/
│       ├── Chatbot.js
│       └── dialogue.json
├── styles/
│   ├── blocks/
│   │   ├── _banner.scss
│   │   ├── _burger-button.scss
│   │   ├── _contact-us.scss
│   │   ├── _field.scss
│   │   └── … (andere Blocks)
│   ├── chatbot/
│   │   ├── animations.scss
│   │   ├── _chatbot-buttons.scss
│   │   ├── _chatbot.scss
│   │   └── _scrollbar.scss
│   ├── _globals.scss
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _media.scss
│   ├── styles.scss
│   └── styles.css
├── index.html
└── README.md
            
```

## Komponentenbasierte SCSS-Architektur

Die SCSS-Dateien sind nach dem Prinzip der Modularität und Wiederverwendbarkeit strukturiert:

- `blocks/` enthält UI-Komponenten wie Buttons, Karten, Sektionen
- `chatbot/` kapselt alle Stile für den Chatbot
- Globale Dateien wie `_variables.scss`, `_mixins.scss`, `_normalize.scss` sorgen für Konsistenz und Skalierbarkeit

Diese Struktur ermöglicht eine klare Trennung von Layout, Logik und Design und erleichtert die Erweiterung des Projekts.

## Chatbot: Logik und Umsetzung

Der Chatbot basiert auf einer regelgesteuerten Dialogstruktur, die in `scripts/Chatbot/dialogue.json` definiert ist. Die Logik wird vollständig über `scripts/Chatbot/Chatbot.js` umgesetzt.

### Hauptfunktionen

- Asynchrone Initialisierung und Datenabruf via `fetch()`
- Zeitverzögerte Ausgabe von Bot-Nachrichten zur Simulation eines Gesprächs
- Dynamische Platzhalter-Ersetzung (`{{param}}`) im Text
- Antwortbuttons mit Verlinkung zu Folge-Repliken
- Reset- und Close-Funktion zur Steuerung des Dialogflusses


## Chatbot-Interaktion
![ChatBot](https://github.com/LindtAna/positivus/blob/main/chatbot.png?raw=true)

### Beispielstruktur aus `scripts/Chatbot/dialogue.json`

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
 `Letters.js` -  Implementiert eine Mikroanimation für Navigationslinks:

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






