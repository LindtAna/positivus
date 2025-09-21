export function initButtonGlow() {
  
  // Wählt alle Elemente mit der Klasse 'button--glow' aus
const glowButtons = document.querySelectorAll('.button--glow');

// Iteriert über alle Buttons mit Glow-Effekt
glowButtons.forEach(button => {
  // Dauer für einen kompletten Animationszyklus in Millisekunden
  const duration = 4000;
  // Versatz für den äußeren Glüheffekt in Pixeln
  const offset = 3;
  // Startzeitpunkt für die Animation, initial null
  let startTime = null;

  // Animationsfunktion, die den Glüheffekt aktualisiert
  function updateGlow(ts) {
    // Setzt die Startzeit beim ersten Aufruf
    if (!startTime) startTime = ts;
    // Berechnet die vergangene Zeit innerhalb des Zyklus
    const elapsed = (ts - startTime) % duration;
    // Normalisiert die Zeit auf einen Wert zwischen 0 und 1
    const t = elapsed / duration;

    // Aktuelle Abmessungen des Buttons holen (für Responsive Design)
    const { width: w, height: h } = button.getBoundingClientRect();
    // Umfang des Buttons berechnen (2 * Breite + 2 * Höhe)
    const perim = 2 * (w + h);
    // Distanz entlang des Umfangs basierend auf der Zeit
    const dist = perim * t;

    // Variablen für die Position des Glüheffekts
    let xPx, yPx;

    // Logik für die Bewegung entlang des Button-Randes
    if (dist < w) {
      // Obere Kante: Bewegung von links nach rechts
      xPx = dist;
      yPx = 0;
    } else if (dist < w + h) {
      // Rechte Kante: Bewegung von oben nach unten
      xPx = w;
      yPx = dist - w;
    } else if (dist < 2 * w + h) {
      // Untere Kante: Bewegung von rechts nach links
      xPx = w - (dist - w - h);
      yPx = h;
    } else {
      // Linke Kante: Bewegung von unten nach oben
      xPx = 0;
      yPx = h - (dist - 2 * w - h);
    }

    // Versatz für den äußeren Glüheffekt hinzufügen
    xPx += offset;
    yPx += offset;

    // Äußere Abmessungen des Buttons inkl. Versatz berechnen
    const wOuter = w + 2 * offset;
    const hOuter = h + 2 * offset;
    // Position in Prozent umrechnen für die CSS-Variable
    const xPct = (xPx / wOuter) * 100;
    const yPct = (yPx / hOuter) * 100;
    // CSS-Variable '--glow-position' mit den berechneten Prozentwerten setzen
    button.style.setProperty('--glow-position', `${xPct}% ${yPct}%`);

    // Nächsten Animationsframe anfordern
    requestAnimationFrame(updateGlow);
  }

  // Animation starten
  requestAnimationFrame(updateGlow);
});

}