/**
 * 5 F!NGERS - Canvas Analytics Dashboard & Heatmap
 * Created by S1mplee67 (W3NCY?)
 * 
 * High-performance 2D canvas timeline graphs for WPM history
 * and 10-finger error heatmaps with color gradients.
 */

const AnalyticsRenderer = {
  renderWpmTimeline(canvas, history) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#111622';
    ctx.fillRect(0, 0, width, height);

    // If no history, show friendly placeholder
    if (!history || history.length === 0) {
      ctx.fillStyle = '#6e7a8a';
      ctx.font = '13px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Complete lessons to visualize your speed curve', width / 2, height / 2);
      return;
    }

    const padding = { top: 25, right: 30, bottom: 30, left: 45 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Determine max WPM
    let maxWpm = 60;
    history.forEach(item => {
      if (item.wpm > maxWpm) maxWpm = item.wpm + 10;
    });

    // Draw horizontal grid lines
    ctx.strokeStyle = '#1f293d';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#6e7a8a';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';

    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const yVal = Math.round((maxWpm / steps) * i);
      const y = padding.top + chartH - (i / steps) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillText(`${yVal}`, padding.left - 8, y + 3);
    }

    // Map points
    const points = history.map((item, index) => {
      const x = padding.left + (index / Math.max(1, history.length - 1)) * chartW;
      const y = padding.top + chartH - ((item.wpm || 0) / maxWpm) * chartH;
      return { x, y, wpm: item.wpm };
    });

    if (points.length === 1) {
      points.push({ x: width - padding.right, y: points[0].y, wpm: points[0].wpm });
    }

    // Draw gradient fill below curve
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(0, 229, 255, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 229, 255, 0.0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    ctx.lineTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      ctx.quadraticCurveTo(p0.x, p0.y, midX, (p0.y + p1.y) / 2);
    }
    const lastP = points[points.length - 1];
    ctx.lineTo(lastP.x, lastP.y);
    ctx.lineTo(lastP.x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw curve line
    ctx.beginPath();
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      ctx.quadraticCurveTo(p0.x, p0.y, midX, (p0.y + p1.y) / 2);
    }
    ctx.lineTo(lastP.x, lastP.y);
    ctx.stroke();

    // Draw data point dots
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#0b0e14';
      ctx.fill();
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  },

  renderFingerHeatmap(container, fingerErrors = {}) {
    if (!container) return;
    container.innerHTML = '';

    const fingerDefs = [
      { id: 'L_PINKY', label: 'L. Pinky', defaultColor: '#ff6584' },
      { id: 'L_RING', label: 'L. Ring', defaultColor: '#ff9248' },
      { id: 'L_MIDDLE', label: 'L. Middle', defaultColor: '#ffd166' },
      { id: 'L_INDEX', label: 'L. Index', defaultColor: '#06d6a0' },
      { id: 'L_THUMB', label: 'L. Thumb', defaultColor: '#29b6f6' },
      { id: 'R_THUMB', label: 'R. Thumb', defaultColor: '#29b6f6' },
      { id: 'R_INDEX', label: 'R. Index', defaultColor: '#06d6a0' },
      { id: 'R_MIDDLE', label: 'R. Middle', defaultColor: '#ffd166' },
      { id: 'R_RING', label: 'R. Ring', defaultColor: '#ff9248' },
      { id: 'R_PINKY', label: 'R. Pinky', defaultColor: '#b388ff' }
    ];

    let maxErrors = 1;
    fingerDefs.forEach(f => {
      const count = fingerErrors[f.id] || 0;
      if (count > maxErrors) maxErrors = count;
    });

    fingerDefs.forEach(f => {
      const errCount = fingerErrors[f.id] || 0;
      const severityRatio = errCount / maxErrors;

      let badgeColor = '#06d6a0'; // green for flawless
      if (severityRatio > 0.6) badgeColor = '#ff4757'; // red
      else if (severityRatio > 0.25) badgeColor = '#ffb703'; // amber

      const card = document.createElement('div');
      card.className = 'heatmap-card';
      card.style.cssText = `
        text-align: center;
        padding: 8px 10px;
        background: #141b29;
        border-radius: 8px;
        border: 1px solid #1f293d;
        flex: 1;
        min-width: 60px;
      `;

      card.innerHTML = `
        <div style="font-size: 10px; color: #8b949e; margin-bottom: 4px; font-weight: 600;">${f.label}</div>
        <div style="font-size: 16px; font-weight: 800; color: ${badgeColor}; font-family: monospace;">${errCount}</div>
        <div style="height: 4px; border-radius: 2px; background: #212c42; margin-top: 6px; overflow: hidden;">
          <div style="height: 100%; width: ${Math.round(severityRatio * 100)}%; background: ${badgeColor};"></div>
        </div>
      `;

      container.appendChild(card);
    });
  },

  renderKeyMistakesList(container, mistakes = {}) {
    if (!container) return;
    container.innerHTML = '';

    const entries = Object.entries(mistakes)
      .filter(([k, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8); // Top 8 mistakes

    if (entries.length === 0) {
      container.innerHTML = `<span style="font-size: 13px; color: #8b949e;">No repeated mistakes recorded yet. Keep typing clean!</span>`;
      return;
    }

    entries.forEach(([keyChar, count]) => {
      const badge = document.createElement('div');
      badge.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #181f2f;
        border: 1px solid #28344e;
        border-radius: 6px;
        padding: 4px 10px;
        font-family: monospace;
      `;

      const displayKey = keyChar === ' ' ? '␣ Space' : keyChar;

      badge.innerHTML = `
        <span style="font-weight: 700; color: #ff6584;">${displayKey}</span>
        <span style="font-size: 11px; color: #8b949e;">${count} miss</span>
      `;

      container.appendChild(badge);
    });
  }
};
