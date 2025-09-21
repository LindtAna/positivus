// Die Klasse `Chatbot` dient der Implementierung eines interaktiven Chatbots, der auf Benutzerinteraktionen reagiert und vordefinierte Dialoge anzeigt
export class Chatbot {
  // Der Konstruktor initialisiert den Chatbot mit einer Konfiguration, die das Root-Element und die Dialogdaten enthält.
  constructor(config) {
    const { root, replicas } = config;

    // Prüfung, ob die erforderlichen Konfigurationsparameter vorhanden sind, um Fehler frühzeitig zu erkennen.
    if (!root) throw new Error('Chatbot: the root key must be present in the provided data');
    if (!replicas) throw new Error('Chatbot: the replicas key must be present in the provided data.');

    // Speicherung des Root-Elements und der Dialogdaten als Instanzvariablen.
    this._$root = root; // DOM-Element, in dem der Chatbot gerendert wird.
    this._replicas = replicas; // Dialogdaten (z. B. aus einer JSON-Datei geladen).
    this._delay = 500; // Verzögerung in Millisekunden zwischen Nachrichten für eine natürlichere Darstellung.
    this._botIndex = 0; // Aktueller Index des Bot-Dialogs.
    this._contentIndex = 1; // Index für die Inhalte (wird für die Reihenfolge verwendet).
    this._start = true; // Flag, um den Startzustand des Chatbots zu markieren.
    this._params = {}; // Speichert dynamische Parameter für Platzhalter-Ersetzung.
    this._active = false; // Gibt an, ob der Chatbot aktiv ist.

    // Bindet Event-Listener für Benutzerinteraktionen.
    this._addEventListeners();
  }

  // Startet den Chatbot, wenn er noch nicht aktiv ist.
  init() {
    if (this._active) return; // Verhindert Mehrfachinitialisierung.
    this._active = true;
    this._outputContent(this._delay); // Beginnt mit dem Rendern der Inhalte mit der definierten Verzögerung.
  }

  // Hilfsmethode, um Daten für einen bestimmten Dialogschritt (Bot oder Benutzer) abzurufen.
  _getData(target, id) {
    return this._replicas[target][id.toString()]; // Zugriff auf die Daten mit Ziel (bot/human) und ID.
  }

  // Rendert die Nachrichten des Bots und die Antwortoptionen des Benutzers.
  _outputContent(interval) {
    const botData = this._getData('bot', this._botIndex); // Aktuelle Bot-Daten abrufen.
    const { human: userResponses, content: botContentTemplate } = botData; // Extrahiert Benutzerantworten und Bot-Inhalt.
    const $container = this._$root.querySelector('.chatbot__items'); // Container für Chat-Nachrichten.

    // Ersetzt Platzhalter im Bot-Inhalt, falls vorhanden.
    let botContent = Array.isArray(botContentTemplate)
      ? botContentTemplate.map(content => this._replacePlaceholders(content))
      : this._replacePlaceholders(botContentTemplate);

    // Funktion zum Rendern der Benutzerantwortoptionen als Buttons.
    const renderContent = () => {
      const $humanContent = userResponses
        .map(id => this._createButton(this._getData('human', id))) // Erstellt Buttons für jede Benutzerantwort.
        .join('');

      $container.insertAdjacentHTML('beforeend', this._createMessage('human', $humanContent)); // Fügt Benutzerantworten hinzu.
      $container.scrollTop = $container.scrollHeight; // Scrollt zum neuesten Inhalt.
    };

    // Rendert Bot-Nachrichten mit oder ohne Verzögerung.
    if (interval) {
      let times = 1; // Zähler für die Verzögerung bei mehreren Nachrichten.
      const renderBotMessages = message => {
        setTimeout(() => {
          $container.insertAdjacentHTML('beforeend', this._createMessage('bot', message)); // Fügt Bot-Nachricht hinzu.
          $container.scrollTop = $container.scrollHeight; // Scrollt zum neuesten Inhalt.
        }, interval * times++); // Verzögert das Rendern jeder Nachricht.
      };

      Array.isArray(botContent)
        ? botContent.forEach(renderBotMessages) // Verarbeitet Arrays von Nachrichten.
        : renderBotMessages(botContent); // Verarbeitet einzelne Nachrichten.

      setTimeout(renderContent, interval * times); // Rendert Benutzerantworten nach den Bot-Nachrichten.
    } else {
      // Rendert Bot-Nachrichten sofort, wenn keine Verzögerung angegeben ist.
      if (Array.isArray(botContent)) {
        botContent.forEach(message => {
          $container.insertAdjacentHTML('beforeend', this._createMessage('bot', message));
        });
      } else {
        $container.insertAdjacentHTML('beforeend', this._createMessage('bot', botContent));
      }
      renderContent(); // Rendert Benutzerantworten sofort.
    }
  }

  
  // Ersetzt Platzhalter (z. B. {{name}}) im Text mit gespeicherten Parametern.
  _replacePlaceholders(content) {
    return Object.keys(this._params).reduce((result, key) => {
      return result.replaceAll(`{{${key}}}`, this._params[key]); // Ersetzt alle Vorkommen eines Platzhalters.
    }, content);
  }

  // Erstellt das HTML für eine Nachricht (Bot oder Benutzer).
  _createMessage(type, content, state = '') {
    return `<div class="chatbot__item chatbot__item_${type}"><div class="chatbot__content chatbot__content_${type}${state}">${content}</div></div>`;
  }


  // Erstellt einen Button für eine Benutzerantwort mit einem Verweis auf den nächsten Bot-Dialog.
  _createButton({ bot, content }) {
    return `<button class="btn" type="button" data-bot-index="${bot}">${content}</button>`;
  }


  // Fügt einen Event-Listener für Klicks auf das Root-Element hinzu.
  _addEventListeners() {
    this._$root.addEventListener('click', this._handleClick.bind(this)); // Bindet die Klick-Handler-Methode.
  }


  // Verarbeitet Klick-Events im Chatbot (z. B. auf Buttons, Schließen- oder Zurücksetzen-Elemente).
  _handleClick(event) {
    const $target = event.target;

    if ($target.dataset.botIndex) {
      this._handleBotIndex($target); // Behandelt Klicks auf Benutzerantwort-Buttons.
    } else if ($target.classList.contains('chatbot__close')) {
      this._closeChatbot(); // Schließt den Chatbot.
    } else if ($target.classList.contains('chatbot__reset')) {
      this.reset(); // Setzt den Chatbot zurück.
    }
  }


  // Verarbeitet die Auswahl eines Benutzerantwort-Buttons und aktualisiert den Dialog.
  _handleBotIndex($target) {
    this._botIndex = Number($target.dataset.botIndex); // Setzt den neuen Bot-Dialog-Index.
    const userResponse = this._humanResponseToDisabled($target); // Deaktiviert die Benutzerantwort.
    this._outputContent(this._delay); // Rendert den nächsten Dialogschritt.
  }


  // Deaktiviert die Benutzerantwort nach der Auswahl und zeigt nur den ausgewählten Text an.
  _humanResponseToDisabled($target) {
    const $container = $target.closest('.chatbot__content_human'); // Container der Benutzerantwort.
    const content = $target.innerHTML; // Text der ausgewählten Antwort.

    $container.innerHTML = content; // Ersetzt Buttons durch den ausgewählten Text.
    $container.classList.remove('chatbot__content_human'); // Entfernt aktive Klasse.
    $container.classList.add('chatbot__content_human-disabled'); // Fügt deaktivierte Klasse hinzu.

    return content; // Gibt den ausgewählten Text zurück.
  }


  // Schließt den Chatbot und zeigt das Icon wieder an.
  _closeChatbot() {
    this._$root.classList.add('chatbot_hidden'); // Blendet den Chatbot aus.
    document.querySelector('.chatbot__icon').classList.remove('d-none'); // Zeigt das Icon wieder an.
  }

  // Setzt den Chatbot auf den Anfangszustand zurück.
  reset() {
    this.constructor.resetTemplate(); // Setzt das HTML-Template zurück.
    this._botIndex = 0; // Setzt den Dialog-Index zurück.
    this._contentIndex = 1; // Setzt den Inhalts-Index zurück.
    this._start = true; // Setzt den Startzustand zurück.
    this._params = {}; // Leert die Parameter.
    this._active = false; // Deaktiviert den Chatbot.
    localStorage.removeItem('chatbot'); // Entfernt gespeicherte Daten aus localStorage.
    this.init(); // Startet den Chatbot neu.
  }


  // Statische Methode zum Erstellen des HTML-Templates für den Chatbot.
  static createTemplate() {
    const existingRoot = document.querySelector('.chatbot'); // Prüft, ob ein Chatbot bereits existiert.
    if (existingRoot) return existingRoot; // Gibt bestehendes Root-Element zurück.

    const chatbot = document.createElement('div'); // Erstellt ein neues Chatbot-Element.
    chatbot.className = 'chatbot chatbot_hidden'; // Setzt die CSS-Klassen.
    chatbot.innerHTML = `
      <div class="chatbot__header">
        <span class="chatbot__close"></span>Answers in Clicks<span class="chatbot__reset"></span>
      </div>
      <div class="chatbot__wrapper">
        <div class="chatbot__items"></div>
      </div>`;
    
    document.body.appendChild(chatbot); // Fügt den Chatbot dem DOM hinzu.
    return chatbot;
  }


  // Statische Methode zum Zurücksetzen des HTML-Templates.
  static resetTemplate() {
    const $root = document.querySelector('.chatbot'); // Wählt das Chatbot-Root-Element.
    if ($root) {
      $root.innerHTML = `
        <div class="chatbot__header">
          <span class="chatbot__close"></span>Answers in Clicks<span class="chatbot__reset"></span>
        </div>
        <div class="chatbot__wrapper">
          <div class="chatbot__items"></div>
        </div>`; // Setzt das HTML zurück.
    }
  }
}

export function initChatbot() {
  // Konfigurationsobjekt für den Chatbot.
  const configChatbot = {
    btn: '.chatbot__icon', // CSS-Selektor für den Button, der den Chatbot öffnet.
    replicas: './scripts/Chatbot/dialogue.json', // Pfad zur JSON-Datei mit Dialogdaten.
    root: Chatbot.createTemplate(), // Erstellt das Root-Element für den Chatbot.
  };

  let chatbot = null; // Speichert die Chatbot-Instanz.


  // Fügt einen Event-Listener für das Öffnen des Chatbots hinzu.
  document.querySelector(configChatbot.btn).addEventListener("click", function () {
    this.classList.add('d-none'); // Blendet das Icon aus.
    const $tooltip = this.querySelector('.chatbot__tooltip');
    if ($tooltip) {
      $tooltip.classList.add('d-none'); // Blendet den Tooltip aus, falls vorhanden.
    }

    configChatbot.root.classList.toggle('chatbot_hidden'); // Schaltet die Sichtbarkeit des Chatbots um.

    if (chatbot) return; // Verhindert erneutes Laden, wenn der Chatbot bereits initialisiert ist.



    // Lädt die Dialogdaten aus der JSON-Datei und initialisiert den Chatbot.
    fetch(configChatbot.replicas)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); // Prüft auf HTTP-Fehler.
        return response.json(); // Parst die JSON-Daten.
      })
      .then(data => {
        configChatbot.replicas = data; // Speichert die geladenen Daten.
        chatbot = new Chatbot(configChatbot); // Erstellt eine neue Chatbot-Instanz.
        chatbot.init(); // Startet den Chatbot.
      })
      .catch(error => console.error("Script loading error of the chatbot:", error)); // Loggt Fehler beim Laden.
 });
}