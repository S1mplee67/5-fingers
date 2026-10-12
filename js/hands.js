/**
 * 5 F!NGERS - Interactive Dual SVG Hands Guide
 * Created by S1mplee67 (W3NCY?)
 * 
 * Renders left and right anatomical touch-typing hands with 10 color-coded
 * fingers. Elevates and illuminates the active target finger in real time.
 */

class HandsGuide {
  constructor() {
    this.leftContainer = null;
    this.rightContainer = null;
    this.activeFingerId = null;

    this.fingerColorMap = {
      'L_PINKY': 'var(--finger-l-pinky)',
      'L_RING': 'var(--finger-l-ring)',
      'L_MIDDLE': 'var(--finger-l-middle)',
      'L_INDEX': 'var(--finger-l-index)',
      'L_THUMB': 'var(--finger-thumbs)',
      'R_THUMB': 'var(--finger-thumbs)',
      'R_INDEX': 'var(--finger-r-index)',
      'R_MIDDLE': 'var(--finger-r-middle)',
      'R_RING': 'var(--finger-r-ring)',
      'R_PINKY': 'var(--finger-r-pinky)'
    };
  }

  mount(leftContainerId, rightContainerId) {
    this.leftContainer = document.getElementById(leftContainerId);
    this.rightContainer = document.getElementById(rightContainerId);

    if (this.leftContainer) {
      this.leftContainer.innerHTML = this._generateLeftHandSvg();
    }
    if (this.rightContainer) {
      this.rightContainer.innerHTML = this._generateRightHandSvg();
    }
  }

  setActiveFinger(fingerId) {
    this.clearActive();
    if (!fingerId) return;

    // Handle generic 'THUMB' by checking target
    let fid = fingerId;
    if (fid === 'THUMB') {
      fid = 'L_THUMB'; // Default thumb highlight
    }

    const fingerEl = document.getElementById(`finger-${fid}`);
    if (fingerEl) {
      fingerEl.classList.add('active');
      const color = this.fingerColorMap[fid] || 'var(--accent-primary)';
      const body = fingerEl.querySelector('.finger-body');
      if (body) {
        body.style.stroke = color;
      }
      const pad = fingerEl.querySelector('.finger-tip-pad');
      if (pad) {
        pad.style.fill = color;
      }
      this.activeFingerId = fid;
    }
  }

  clearActive() {
    if (this.activeFingerId) {
      const el = document.getElementById(`finger-${this.activeFingerId}`);
      if (el) {
        el.classList.remove('active');
        const body = el.querySelector('.finger-body');
        if (body) body.style.stroke = '';
      }
      this.activeFingerId = null;
    }
    // Also remove any active classes globally
    document.querySelectorAll('.finger-group.active').forEach(node => {
      node.classList.remove('active');
      const body = node.querySelector('.finger-body');
      if (body) body.style.stroke = '';
    });
  }

  flashError(fingerId) {
    let fid = fingerId === 'THUMB' ? 'L_THUMB' : fingerId;
    const el = document.getElementById(`finger-${fid}`);
    if (el) {
      el.classList.add('error-flash');
      const body = el.querySelector('.finger-body');
      if (body) body.style.stroke = 'var(--color-incorrect)';
      setTimeout(() => {
        el.classList.remove('error-flash');
        if (el.id !== `finger-${this.activeFingerId}`) {
          if (body) body.style.stroke = '';
        }
      }, 180);
    }
  }

  _generateLeftHandSvg() {
    return `
      <svg viewBox="0 0 220 150" class="hand-svg" xmlns="http://www.w3.org/2000/svg">
        <style>
          .hand-silhouette { fill: var(--bg-surface-elevated); stroke: var(--border-subtle); stroke-width: 1.5; opacity: 0.95; }
          .knuckle-arc { fill: none; stroke: rgba(255, 255, 255, 0.08); stroke-width: 1.2; stroke-dasharray: 2 3; }
          .finger-group { cursor: pointer; transition: transform 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: 50% 100%; }
          .finger-group.active { transform: translateY(-7px); }
          .finger-group.error-flash { transform: translateY(-2px) scale(0.96); }
          .finger-body { fill: var(--bg-surface-elevated); stroke: var(--border-subtle); stroke-width: 1.5; transition: stroke 0.15s ease, fill 0.15s ease; }
          .finger-group.active .finger-body { stroke-width: 2; }
          .finger-tip-pad { transition: all 0.18s ease; }
          .finger-group.active .finger-tip-pad { filter: drop-shadow(0 0 8px currentColor); transform: scale(1.15); transform-origin: center; }
          .finger-group.error-flash .finger-tip-pad { fill: var(--color-incorrect) !important; filter: drop-shadow(0 0 10px #ff4757); }
          .finger-joint { stroke: rgba(255, 255, 255, 0.1); stroke-width: 1; stroke-linecap: round; }
        </style>

        <!-- Ergonomic Palm & Wrist Base -->
        <path class="hand-silhouette" d="M 50 148 C 45 130, 22 110, 22 92 C 22 84, 26 80, 32 78 C 38 76, 58 72, 96 70 C 130 72, 142 80, 150 88 C 158 96, 178 108, 172 124 C 166 136, 142 144, 110 148 Z" />
        <path class="knuckle-arc" d="M 32 82 Q 95 68 148 86" />

        <!-- Left Pinky -->
        <g id="finger-L_PINKY" class="finger-group">
          <path class="finger-body" d="M 24 88 C 22 68, 24 50, 26 40 C 27 34, 39 34, 40 40 C 42 50, 42 70, 40 86 Z" />
          <line class="finger-joint" x1="26" y1="58" x2="39" y2="58" />
          <line class="finger-joint" x1="28" y1="72" x2="38" y2="72" />
          <circle id="pad-L_PINKY" class="finger-tip-pad" cx="33" cy="42" r="5" style="fill: var(--finger-l-pinky);" />
        </g>

        <!-- Left Ring -->
        <g id="finger-L_RING" class="finger-group">
          <path class="finger-body" d="M 52 80 C 50 58, 52 38, 54 26 C 55 20, 69 20, 70 26 C 72 38, 72 60, 70 78 Z" />
          <line class="finger-joint" x1="54" y1="46" x2="69" y2="46" />
          <line class="finger-joint" x1="55" y1="62" x2="68" y2="62" />
          <circle id="pad-L_RING" class="finger-tip-pad" cx="62" cy="28" r="5.5" style="fill: var(--finger-l-ring);" />
        </g>

        <!-- Left Middle -->
        <g id="finger-L_MIDDLE" class="finger-group">
          <path class="finger-body" d="M 82 76 C 80 50, 82 28, 84 16 C 85 10, 99 10, 100 16 C 102 28, 102 52, 100 75 Z" />
          <line class="finger-joint" x1="84" y1="38" x2="99" y2="38" />
          <line class="finger-joint" x1="85" y1="56" x2="98" y2="56" />
          <circle id="pad-L_MIDDLE" class="finger-tip-pad" cx="92" cy="18" r="5.5" style="fill: var(--finger-l-middle);" />
        </g>

        <!-- Left Index (Anchor F) -->
        <g id="finger-L_INDEX" class="finger-group">
          <path class="finger-body" d="M 112 78 C 112 56, 114 38, 116 26 C 117 20, 131 20, 132 26 C 134 38, 132 58, 128 80 Z" />
          <line class="finger-joint" x1="116" y1="46" x2="130" y2="46" />
          <line class="finger-joint" x1="117" y1="62" x2="129" y2="62" />
          <circle id="pad-L_INDEX" class="finger-tip-pad" cx="124" cy="28" r="5.5" style="fill: var(--finger-l-index);" />
        </g>

        <!-- Left Thumb (Spacebar) -->
        <g id="finger-L_THUMB" class="finger-group">
          <path class="finger-body" d="M 144 94 C 150 86, 162 76, 172 70 C 178 66, 186 76, 180 82 C 170 92, 158 104, 150 114 Z" />
          <line class="finger-joint" x1="158" y1="86" x2="170" y2="92" />
          <circle id="pad-L_THUMB" class="finger-tip-pad" cx="174" cy="76" r="5.5" style="fill: var(--finger-thumbs);" />
        </g>
      </svg>
    `;
  }

  _generateRightHandSvg() {
    return `
      <svg viewBox="0 0 220 150" class="hand-svg" xmlns="http://www.w3.org/2000/svg">
        <style>
          .hand-silhouette { fill: var(--bg-surface-elevated); stroke: var(--border-subtle); stroke-width: 1.5; opacity: 0.95; }
          .knuckle-arc { fill: none; stroke: rgba(255, 255, 255, 0.08); stroke-width: 1.2; stroke-dasharray: 2 3; }
          .finger-group { cursor: pointer; transition: transform 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: 50% 100%; }
          .finger-group.active { transform: translateY(-7px); }
          .finger-group.error-flash { transform: translateY(-2px) scale(0.96); }
          .finger-body { fill: var(--bg-surface-elevated); stroke: var(--border-subtle); stroke-width: 1.5; transition: stroke 0.15s ease, fill 0.15s ease; }
          .finger-group.active .finger-body { stroke-width: 2; }
          .finger-tip-pad { transition: all 0.18s ease; }
          .finger-group.active .finger-tip-pad { filter: drop-shadow(0 0 8px currentColor); transform: scale(1.15); transform-origin: center; }
          .finger-group.error-flash .finger-tip-pad { fill: var(--color-incorrect) !important; filter: drop-shadow(0 0 10px #ff4757); }
          .finger-joint { stroke: rgba(255, 255, 255, 0.1); stroke-width: 1; stroke-linecap: round; }
        </style>

        <!-- Ergonomic Palm & Wrist Base (Mirrored) -->
        <path class="hand-silhouette" d="M 170 148 C 175 130, 198 110, 198 92 C 198 84, 194 80, 188 78 C 182 76, 162 72, 124 70 C 90 72, 78 80, 70 88 C 62 96, 42 108, 48 124 C 54 136, 78 144, 110 148 Z" />
        <path class="knuckle-arc" d="M 188 82 Q 125 68 72 86" />

        <!-- Right Thumb (Spacebar) -->
        <g id="finger-R_THUMB" class="finger-group">
          <path class="finger-body" d="M 76 94 C 70 86, 58 76, 48 70 C 42 66, 34 76, 40 82 C 50 92, 62 104, 70 114 Z" />
          <line class="finger-joint" x1="62" y1="86" x2="50" y2="92" />
          <circle id="pad-R_THUMB" class="finger-tip-pad" cx="46" cy="76" r="5.5" style="fill: var(--finger-thumbs);" />
        </g>

        <!-- Right Index (Anchor J) -->
        <g id="finger-R_INDEX" class="finger-group">
          <path class="finger-body" d="M 108 78 C 108 56, 106 38, 104 26 C 103 20, 89 20, 88 26 C 86 38, 88 58, 92 80 Z" />
          <line class="finger-joint" x1="104" y1="46" x2="90" y2="46" />
          <line class="finger-joint" x1="103" y1="62" x2="91" y2="62" />
          <circle id="pad-R_INDEX" class="finger-tip-pad" cx="96" cy="28" r="5.5" style="fill: var(--finger-r-index);" />
        </g>

        <!-- Right Middle -->
        <g id="finger-R_MIDDLE" class="finger-group">
          <path class="finger-body" d="M 138 76 C 140 50, 138 28, 136 16 C 135 10, 121 10, 120 16 C 118 28, 118 52, 120 75 Z" />
          <line class="finger-joint" x1="136" y1="38" x2="121" y2="38" />
          <line class="finger-joint" x1="135" y1="56" x2="122" y2="56" />
          <circle id="pad-R_MIDDLE" class="finger-tip-pad" cx="128" cy="18" r="5.5" style="fill: var(--finger-r-middle);" />
        </g>

        <!-- Right Ring -->
        <g id="finger-R_RING" class="finger-group">
          <path class="finger-body" d="M 168 80 C 170 58, 168 38, 166 26 C 165 20, 151 20, 150 26 C 148 38, 148 60, 150 78 Z" />
          <line class="finger-joint" x1="166" y1="46" x2="151" y2="46" />
          <line class="finger-joint" x1="165" y1="62" x2="152" y2="62" />
          <circle id="pad-R_RING" class="finger-tip-pad" cx="158" cy="28" r="5.5" style="fill: var(--finger-r-ring);" />
        </g>

        <!-- Right Pinky -->
        <g id="finger-R_PINKY" class="finger-group">
          <path class="finger-body" d="M 196 88 C 198 68, 196 50, 194 40 C 193 34, 181 34, 180 40 C 178 50, 178 70, 180 86 Z" />
          <line class="finger-joint" x1="194" y1="58" x2="181" y2="58" />
          <line class="finger-joint" x1="192" y1="72" x2="182" y2="72" />
          <circle id="pad-R_PINKY" class="finger-tip-pad" cx="187" cy="42" r="5" style="fill: var(--finger-r-pinky);" />
        </g>
      </svg>
    `;
  }
}
