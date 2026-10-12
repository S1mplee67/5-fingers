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
      fingerEl.style.fill = color;
      fingerEl.style.stroke = color;
      this.activeFingerId = fid;
    }
  }

  clearActive() {
    if (this.activeFingerId) {
      const el = document.getElementById(`finger-${this.activeFingerId}`);
      if (el) {
        el.classList.remove('active');
        el.style.fill = '';
        el.style.stroke = '';
      }
      this.activeFingerId = null;
    }
    // Also remove any active classes globally
    document.querySelectorAll('.finger-group.active').forEach(node => {
      node.classList.remove('active');
      node.style.fill = '';
      node.style.stroke = '';
    });
  }

  flashError(fingerId) {
    let fid = fingerId === 'THUMB' ? 'L_THUMB' : fingerId;
    const el = document.getElementById(`finger-${fid}`);
    if (el) {
      el.classList.add('error-flash');
      el.style.stroke = 'var(--color-incorrect)';
      setTimeout(() => {
        el.classList.remove('error-flash');
        if (el.id !== `finger-${this.activeFingerId}`) {
          el.style.stroke = '';
        }
      }, 180);
    }
  }

  _generateLeftHandSvg() {
    return `
      <svg viewBox="0 0 200 120" class="hand-svg" xmlns="http://www.w3.org/2000/svg">
        <style>
          .finger-group { cursor: pointer; transition: transform 0.15s cubic-bezier(0.18, 0.89, 0.32, 1.28), fill 0.15s ease, stroke 0.15s ease; }
          .finger-group.active { transform: translateY(-7px); filter: drop-shadow(0 0 8px currentColor); }
          .finger-group.error-flash { transform: translateY(-3px) scale(0.96); filter: drop-shadow(0 0 10px #ff4757); }
          .hand-palm { fill: var(--bg-surface-elevated); stroke: var(--border-subtle); stroke-width: 1.5; }
          .finger-core { fill: var(--bg-surface-elevated); stroke: var(--border-subtle); stroke-width: 1.5; }
          .finger-cap { fill: var(--border-subtle); transition: fill 0.15s ease; }
          .finger-txt { font-size: 8px; font-weight: 700; fill: var(--text-muted); text-anchor: middle; user-select: none; }
        </style>

        <!-- Palm -->
        <path class="hand-palm" d="M 28 85 C 28 65, 38 52, 60 52 L 140 52 C 160 52, 172 65, 172 85 C 172 108, 155 116, 100 116 C 45 116, 28 108, 28 85 Z" />

        <!-- Left Pinky -->
        <g id="finger-L_PINKY" class="finger-group">
          <rect class="finger-core" x="28" y="24" width="16" height="42" rx="8" />
          <circle class="finger-cap" cx="36" cy="32" r="5" style="fill: var(--finger-l-pinky);" />
          <text class="finger-txt" x="36" y="55">P</text>
        </g>

        <!-- Left Ring -->
        <g id="finger-L_RING" class="finger-group">
          <rect class="finger-core" x="52" y="14" width="18" height="52" rx="9" />
          <circle class="finger-cap" cx="61" cy="23" r="5.5" style="fill: var(--finger-l-ring);" />
          <text class="finger-txt" x="61" y="55">R</text>
        </g>

        <!-- Left Middle -->
        <g id="finger-L_MIDDLE" class="finger-group">
          <rect class="finger-core" x="78" y="8" width="18" height="58" rx="9" />
          <circle class="finger-cap" cx="87" cy="17" r="5.5" style="fill: var(--finger-l-middle);" />
          <text class="finger-txt" x="87" y="55">M</text>
        </g>

        <!-- Left Index -->
        <g id="finger-L_INDEX" class="finger-group">
          <rect class="finger-core" x="104" y="16" width="18" height="50" rx="9" />
          <circle class="finger-cap" cx="113" cy="25" r="5.5" style="fill: var(--finger-l-index);" />
          <text class="finger-txt" x="113" y="55">I</text>
        </g>

        <!-- Left Thumb -->
        <g id="finger-L_THUMB" class="finger-group">
          <rect class="finger-core" x="136" y="46" width="34" height="18" rx="9" transform="rotate(-25 136 46)" />
          <circle class="finger-cap" cx="160" cy="46" r="5.5" style="fill: var(--finger-thumbs);" />
          <text class="finger-txt" x="145" y="66">T</text>
        </g>
      </svg>
    `;
  }

  _generateRightHandSvg() {
    return `
      <svg viewBox="0 0 200 120" class="hand-svg" xmlns="http://www.w3.org/2000/svg">
        <style>
          .finger-group { cursor: pointer; transition: transform 0.15s cubic-bezier(0.18, 0.89, 0.32, 1.28), fill 0.15s ease, stroke 0.15s ease; }
          .finger-group.active { transform: translateY(-7px); filter: drop-shadow(0 0 8px currentColor); }
          .finger-group.error-flash { transform: translateY(-3px) scale(0.96); filter: drop-shadow(0 0 10px #ff4757); }
          .hand-palm { fill: var(--bg-surface-elevated); stroke: var(--border-subtle); stroke-width: 1.5; }
          .finger-core { fill: var(--bg-surface-elevated); stroke: var(--border-subtle); stroke-width: 1.5; }
          .finger-cap { fill: var(--border-subtle); transition: fill 0.15s ease; }
          .finger-txt { font-size: 8px; font-weight: 700; fill: var(--text-muted); text-anchor: middle; user-select: none; }
        </style>

        <!-- Palm -->
        <path class="hand-palm" d="M 28 85 C 28 65, 38 52, 60 52 L 140 52 C 160 52, 172 65, 172 85 C 172 108, 155 116, 100 116 C 45 116, 28 108, 28 85 Z" />

        <!-- Right Thumb -->
        <g id="finger-R_THUMB" class="finger-group">
          <rect class="finger-core" x="30" y="32" width="34" height="18" rx="9" transform="rotate(25 30 32)" />
          <circle class="finger-cap" cx="40" cy="46" r="5.5" style="fill: var(--finger-thumbs);" />
          <text class="finger-txt" x="55" y="66">T</text>
        </g>

        <!-- Right Index -->
        <g id="finger-R_INDEX" class="finger-group">
          <rect class="finger-core" x="78" y="16" width="18" height="50" rx="9" />
          <circle class="finger-cap" cx="87" cy="25" r="5.5" style="fill: var(--finger-r-index);" />
          <text class="finger-txt" x="87" y="55">I</text>
        </g>

        <!-- Right Middle -->
        <g id="finger-R_MIDDLE" class="finger-group">
          <rect class="finger-core" x="104" y="8" width="18" height="58" rx="9" />
          <circle class="finger-cap" cx="113" cy="17" r="5.5" style="fill: var(--finger-r-middle);" />
          <text class="finger-txt" x="113" y="55">M</text>
        </g>

        <!-- Right Ring -->
        <g id="finger-R_RING" class="finger-group">
          <rect class="finger-core" x="130" y="14" width="18" height="52" rx="9" />
          <circle class="finger-cap" cx="139" cy="23" r="5.5" style="fill: var(--finger-r-ring);" />
          <text class="finger-txt" x="139" y="55">R</text>
        </g>

        <!-- Right Pinky -->
        <g id="finger-R_PINKY" class="finger-group">
          <rect class="finger-core" x="156" y="24" width="16" height="42" rx="8" />
          <circle class="finger-cap" cx="164" cy="32" r="5" style="fill: var(--finger-r-pinky);" />
          <text class="finger-txt" x="164" y="55">P</text>
        </g>
      </svg>
    `;
  }
}
