Website + rule-based chatbot 
[positivus-landing-two.vercel.app/](https://positivus-landing-two.vercel.app/)

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

**Screenshot 1: Desktop-Ansicht**  
*(Hier Screenshot einfügen)*

**Screenshot 2: Mobile-Ansicht**  
*(Hier Screenshot einfügen)*

## Funktionalität
- Komponentenbasierte SCSS-Struktur für UI-Elemente
- Regelbasierter Chatbot mit klickbaren Antwortoptionen
- Interaktive Link-Animation im Header
- Modularer Aufbau mit separaten JS-Komponenten
- Dynamische Inhaltsdarstellung mit Platzhalter-Ersetzung

## Projektstruktur

positivus/ ├── index.html // Hauptseite ├── chatbot.js // Chatbot-Logik ├── letters.js // Link-Animation im Header ├── slider.js // Slider-Skript ├── dialogue.json // Dialogstruktur für den Chatbot ├── styles/ │ ├── blocks/ // UI-Komponenten │ ├── chatbot/ // Chatbot-Stile │ ├── _globals.scss // Basisstile │ ├── _variables.scss // Farb- und Typografievariablen │ ├── _mixins.scss // SCSS-Mixins │ ├── _media.scss // Media Queries │ ├── styles.scss // Haupt-SCSS-Datei │ └── styles.css // Kompilierte CSS-Datei └── README.md // Dokumentation


## Komponentenbasierte SCSS-Architektur

Die SCSS-Dateien sind nach dem Prinzip der Modularität und Wiederverwendbarkeit strukturiert:

- `blocks/` enthält UI-Komponenten wie Buttons, Karten, Sektionen
- `chatbot/` kapselt alle Stile für den Chatbot
- Globale Dateien wie `_variables.scss`, `_mixins.scss`, `_normalize.scss` sorgen für Konsistenz und Skalierbarkeit

Diese Struktur ermöglicht eine klare Trennung von Layout, Logik und Design und erleichtert die Erweiterung des Projekts.

## Chatbot: Logik und Umsetzung

Der Chatbot basiert auf einer regelgesteuerten Dialogstruktur, die in `dialogue.json` definiert ist. Die Logik wird vollständig im Frontend über `chatbot.js` umgesetzt.

### Hauptfunktionen

- Asynchrone Initialisierung und Datenabruf via `fetch()`
- Zeitverzögerte Ausgabe von Bot-Nachrichten zur Simulation eines Gesprächs
- Dynamische Platzhalter-Ersetzung (`{{param}}`) im Text
- Antwortbuttons mit Verlinkung zu Folge-Repliken
- Reset- und Close-Funktion zur Steuerung des Dialogflusses

**Screenshot: Chatbot-Interaktion**  
*(Hier Screenshot einfügen)*

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

## Link-Animation im Header
Die Datei letters.js implementiert eine Mikroanimation für Navigationslinks:

-Jeder Buchstabe eines Links wird bei Hover temporär durch zufällige Zeichen ersetzt
-Nach mehreren Iterationen wird der Originaltext wiederhergestellt
-Die Animation erzeugt einen subtilen "Verschlüsselungseffekt" und verbessert die visuelle Dynamik

Technische Details:
-Verwendung von setInterval mit gestaffelter Verzögerung
-Originalzeichen werden über data-letter gespeichert
-Keine Beeinträchtigung der Funktionalität oder Barrierefreiheit




