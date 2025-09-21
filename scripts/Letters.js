export function initLetters() {

// Definiert eine Konstante mit allen Buchstaben des Alphabets (groß und klein), die für die zufällige Buchstabenauswahl verwendet werden.
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// Wählt alle Elemente mit der Klasse 'header__menu-link' aus und iteriert über sie.
document.querySelectorAll('.header__menu-link').forEach(link => {
  // Fügt jedem Link-Element einen Event-Listener für das 'mouseenter'-Ereignis hinzu.
  link.addEventListener('mouseenter', () => {
    // Wählt alle <span>-Elemente innerhalb des Links aus.
    const spans = link.querySelectorAll('span');
    // Iteriert über jedes <span>-Element mit seinem Index.
    spans.forEach((span, index) => {
      // Zähler für die Anzahl der Iterationen (Buchstabenwechsel).
      let iterations = 0;
      // Definiert die maximale Anzahl an Buchstabenwechseln pro Span.
      const maxIterations = 5; // Anzahl der Buchstabenwechsel
      // Startet ein Intervall, das wiederholt ausgeführt wird.
      const interval = setInterval(() => {
        // Prüft, ob die maximale Anzahl an Iterationen erreicht ist.
        if (iterations >= maxIterations) {
          // Setzt den ursprünglichen Buchstaben aus dem data-Attribut zurück.
          span.textContent = span.dataset.letter; // Setzt den finalen Buchstaben
          // Beendet das Intervall, um weitere Ausführungen zu stoppen.
          clearInterval(interval);
          return;
        }
        // Generiert einen zufälligen Buchstaben aus der `letters`-Konstante.
        span.textContent = letters[Math.floor(Math.random() * letters.length)];
        // Erhöht den Iterationszähler.
        iterations++;
      }, 50 + index * 20); // Verzögerung: 50ms Basis + 20ms pro Span-Index für einen gestaffelten Effekt
    });
  });
});

}