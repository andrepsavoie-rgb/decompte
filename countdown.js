const TOTAL = 123 * 3600; 
let remaining = TOTAL;

function isWeekend(d) { return d.getDay() === 0 || d.getDay() === 6; }
function isActivePeriod(d) { 
  const h = d.getHours();
  if (isWeekend(d)) return true;
  return h >= 16 || h < 7;
}

function updateTimer(hEl, mEl, sEl, progressEl, percentEl, infoEl) {
  const now = new Date();
  if (isActivePeriod(now) && remaining > 0) remaining--;

  const hrs = Math.floor(remaining / 3600);
  const mins = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;

  if (hEl) hEl.textContent = hrs.toString().padStart(2,'0');
  if (mEl) mEl.textContent = mins.toString().padStart(2,'0');
  if (sEl) sEl.textContent = secs.toString().padStart(2,'0');

  if (progressEl && percentEl) {
    const done = ((TOTAL - remaining)/TOTAL) * 100;
    progressEl.style.width = done + '%';
    percentEl.textContent = done.toFixed(1) + '% complete';
  }

  if (infoEl) {
    infoEl.textContent = isWeekend(now)
      ? 'Fin de semaine : décompte actif 24h (7h à 7h)'
      : 'Semaine : décompte actif de 16h à 7h';
  }
}

setInterval(() => updateTimer(
  document.getElementById('h'),
  document.getElementById('m'),
  document.getElementById('s'),
  document.getElementById('bar'),
  document.getElementById('percent'),
  document.getElementById('info')
), 1000);
