/**
 * 5 F!NGERS - Virtual On-Screen Keyboard
 * Created by S1mplee67 (W3NCY?)
 * 
 * Renders interactive QWERTY ANSI keyboard with finger-colored zones,
 * F/J tactile bumps, active target indicators, and dual-shift guidance.
 */

class TypingKeyboard {
  constructor() {
    this.container = null;
    this.keyElements = new Map(); // keyId -> HTMLElement
    this.activeKeyElement = null;
    this.activeShiftElement = null;

    // Standard touch-typing finger color mapping
    this.fingerColors = {
      'L_PINKY': 'var(--finger-l-pinky)',
      'L_RING': 'var(--finger-l-ring)',
      'L_MIDDLE': 'var(--finger-l-middle)',
      'L_INDEX': 'var(--finger-l-index)',
      'THUMB': 'var(--finger-thumbs)',
      'R_INDEX': 'var(--finger-r-index)',
      'R_MIDDLE': 'var(--finger-r-middle)',
      'R_RING': 'var(--finger-r-ring)',
      'R_PINKY': 'var(--finger-r-pinky)'
    };

    // Character to Finger Assignment
    this.charFingerMap = {
      // Left Pinky
      '`': 'L_PINKY', '~': 'L_PINKY',
      '1': 'L_PINKY', '!': 'L_PINKY',
      'q': 'L_PINKY', 'Q': 'L_PINKY',
      'a': 'L_PINKY', 'A': 'L_PINKY',
      'z': 'L_PINKY', 'Z': 'L_PINKY',
      'tab': 'L_PINKY', 'caps': 'L_PINKY', 'l_shift': 'L_PINKY',

      // Left Ring
      '2': 'L_RING', '@': 'L_RING',
      'w': 'L_RING', 'W': 'L_RING',
      's': 'L_RING', 'S': 'L_RING',
      'x': 'L_RING', 'X': 'L_RING',

      // Left Middle
      '3': 'L_MIDDLE', '#': 'L_MIDDLE',
      'e': 'L_MIDDLE', 'E': 'L_MIDDLE',
      'd': 'L_MIDDLE', 'D': 'L_MIDDLE',
      'c': 'L_MIDDLE', 'C': 'L_MIDDLE',

      // Left Index
      '4': 'L_INDEX', '$': 'L_INDEX',
      '5': 'L_INDEX', '%': 'L_INDEX',
      'r': 'L_INDEX', 'R': 'L_INDEX',
      't': 'L_INDEX', 'T': 'L_INDEX',
      'f': 'L_INDEX', 'F': 'L_INDEX',
      'g': 'L_INDEX', 'G': 'L_INDEX',
      'v': 'L_INDEX', 'V': 'L_INDEX',
      'b': 'L_INDEX', 'B': 'L_INDEX',

      // Thumbs
      ' ': 'THUMB',

      // Right Index
      '6': 'R_INDEX', '^': 'R_INDEX',
      '7': 'R_INDEX', '&': 'R_INDEX',
      'y': 'R_INDEX', 'Y': 'R_INDEX',
      'u': 'R_INDEX', 'U': 'R_INDEX',
      'h': 'R_INDEX', 'H': 'R_INDEX',
      'j': 'R_INDEX', 'J': 'R_INDEX',
      'n': 'R_INDEX', 'N': 'R_INDEX',
      'm': 'R_INDEX', 'M': 'R_INDEX',

      // Right Middle
      '8': 'R_MIDDLE', '*': 'R_MIDDLE',
      'i': 'R_MIDDLE', 'I': 'R_MIDDLE',
      'k': 'R_MIDDLE', 'K': 'R_MIDDLE',
      ',': 'R_MIDDLE', '<': 'R_MIDDLE',

      // Right Ring
      '9': 'R_RING', '(': 'R_RING',
      'o': 'R_RING', 'O': 'R_RING',
      'l': 'R_RING', 'L': 'R_RING',
      '.': 'R_RING', '>': 'R_RING',

      // Right Pinky & Navigation
      '0': 'R_PINKY', ')': 'R_PINKY',
      '-': 'R_PINKY', '_': 'R_PINKY',
      '=': 'R_PINKY', '+': 'R_PINKY',
      'p': 'R_PINKY', 'P': 'R_PINKY',
      '[': 'R_PINKY', '{': 'R_PINKY',
      ']': 'R_PINKY', '}': 'R_PINKY',
      '\\': 'R_PINKY', '|': 'R_PINKY',
      ';': 'R_PINKY', ':': 'R_PINKY',
      '\'': 'R_PINKY', '"': 'R_PINKY',
      '/': 'R_PINKY', '?': 'R_PINKY',
      'enter': 'R_PINKY', 'backspace': 'R_PINKY', 'r_shift': 'R_PINKY',
      'escape': 'L_PINKY', 'esc': 'L_PINKY',
      'del': 'R_PINKY', 'delete': 'R_PINKY',
      'home': 'R_PINKY', 'end': 'R_PINKY',
      'pgup': 'R_PINKY', 'pageup': 'R_PINKY',
      'pgdn': 'R_PINKY', 'pagedown': 'R_PINKY',
      'arrowup': 'R_PINKY', 'arrowleft': 'R_INDEX',
      'arrowdown': 'R_MIDDLE', 'arrowright': 'R_RING'
    };

    // Characters that require Shift and which side of Shift to use
    this.shiftRules = {
      // Left hand characters -> Right Shift (right pinky)
      '~': 'R_SHIFT', '!': 'R_SHIFT', '@': 'R_SHIFT', '#': 'R_SHIFT', '$': 'R_SHIFT', '%': 'R_SHIFT',
      'Q': 'R_SHIFT', 'W': 'R_SHIFT', 'E': 'R_SHIFT', 'R_SHIFT': 'R_SHIFT', 'T': 'R_SHIFT',
      'A': 'R_SHIFT', 'S': 'R_SHIFT', 'D': 'R_SHIFT', 'F': 'R_SHIFT', 'G': 'R_SHIFT',
      'Z': 'R_SHIFT', 'X': 'R_SHIFT', 'C': 'R_SHIFT', 'V': 'R_SHIFT', 'B': 'R_SHIFT',

      // Right hand characters -> Left Shift (left pinky)
      '^': 'L_SHIFT', '&': 'L_SHIFT', '*': 'L_SHIFT', '(': 'L_SHIFT', ')': 'L_SHIFT',
      '_': 'L_SHIFT', '+': 'L_SHIFT',
      'Y': 'L_SHIFT', 'U': 'L_SHIFT', 'I': 'L_SHIFT', 'O': 'L_SHIFT', 'P': 'L_SHIFT',
      '{': 'L_SHIFT', '}': 'L_SHIFT', '|': 'L_SHIFT',
      'H': 'L_SHIFT', 'J': 'L_SHIFT', 'K': 'L_SHIFT', 'L': 'L_SHIFT',
      ':': 'L_SHIFT', '"': 'L_SHIFT',
      'N': 'L_SHIFT', 'M': 'L_SHIFT', '<': 'L_SHIFT', '>': 'L_SHIFT', '?': 'L_SHIFT'
    };
  }

  getKeyFinger(char) {
    if (!char) return null;
    return this.charFingerMap[char] || this.charFingerMap[char.toLowerCase()] || null;
  }

  getShiftRequirement(char) {
    if (!char) return { needsShift: false };
    const shiftKey = this.shiftRules[char];
    return {
      needsShift: !!shiftKey,
      shiftKey: shiftKey || null
    };
  }

  mount(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.container.innerHTML = '';
    this.keyElements.clear();

    // Authentic 75% Mechanical Keyboard Layout (84-key ANSI)
    const layout = [
      // Row 0: Function Row + Del
      [
        { id: 'esc', label: 'Esc', class: 'u-1 key-accent', finger: 'L_PINKY' },
        { id: 'f1', label: 'F1', class: 'u-1 key-subtle', finger: 'L_RING' },
        { id: 'f2', label: 'F2', class: 'u-1 key-subtle', finger: 'L_RING' },
        { id: 'f3', label: 'F3', class: 'u-1 key-subtle', finger: 'L_MIDDLE' },
        { id: 'f4', label: 'F4', class: 'u-1 key-subtle', finger: 'L_INDEX' },
        { id: 'f5', label: 'F5', class: 'u-1 key-subtle', finger: 'L_INDEX' },
        { id: 'f6', label: 'F6', class: 'u-1 key-subtle', finger: 'R_INDEX' },
        { id: 'f7', label: 'F7', class: 'u-1 key-subtle', finger: 'R_INDEX' },
        { id: 'f8', label: 'F8', class: 'u-1 key-subtle', finger: 'R_MIDDLE' },
        { id: 'f9', label: 'F9', class: 'u-1 key-subtle', finger: 'R_MIDDLE' },
        { id: 'f10', label: 'F10', class: 'u-1 key-subtle', finger: 'R_RING' },
        { id: 'f11', label: 'F11', class: 'u-1 key-subtle', finger: 'R_RING' },
        { id: 'f12', label: 'F12', class: 'u-1 key-subtle', finger: 'R_PINKY' },
        { id: 'del', label: 'Del', class: 'u-1 key-nav', finger: 'R_PINKY' }
      ],
      // Row 1: Number Row + Home
      [
        { id: '`', label: '` ~', class: 'u-1', finger: 'L_PINKY' },
        { id: '1', label: '1 !', class: 'u-1', finger: 'L_PINKY' },
        { id: '2', label: '2 @', class: 'u-1', finger: 'L_RING' },
        { id: '3', label: '3 #', class: 'u-1', finger: 'L_MIDDLE' },
        { id: '4', label: '4 $', class: 'u-1', finger: 'L_INDEX' },
        { id: '5', label: '5 %', class: 'u-1', finger: 'L_INDEX' },
        { id: '6', label: '6 ^', class: 'u-1', finger: 'R_INDEX' },
        { id: '7', label: '7 &', class: 'u-1', finger: 'R_INDEX' },
        { id: '8', label: '8 *', class: 'u-1', finger: 'R_MIDDLE' },
        { id: '9', label: '9 (', class: 'u-1', finger: 'R_RING' },
        { id: '0', label: '0 )', class: 'u-1', finger: 'R_PINKY' },
        { id: '-', label: '- _', class: 'u-1', finger: 'R_PINKY' },
        { id: '=', label: '= +', class: 'u-1', finger: 'R_PINKY' },
        { id: 'backspace', label: 'Backspace', class: 'u-2 key-backspace', finger: 'R_PINKY' },
        { id: 'home', label: 'Home', class: 'u-1 key-nav', finger: 'R_PINKY' }
      ],
      // Row 2: Top Row + PgUp
      [
        { id: 'tab', label: 'Tab', class: 'u-1-5 key-tab', finger: 'L_PINKY' },
        { id: 'q', label: 'Q', class: 'u-1', finger: 'L_PINKY' },
        { id: 'w', label: 'W', class: 'u-1', finger: 'L_RING' },
        { id: 'e', label: 'E', class: 'u-1', finger: 'L_MIDDLE' },
        { id: 'r', label: 'R', class: 'u-1', finger: 'L_INDEX' },
        { id: 't', label: 'T', class: 'u-1', finger: 'L_INDEX' },
        { id: 'y', label: 'Y', class: 'u-1', finger: 'R_INDEX' },
        { id: 'u', label: 'U', class: 'u-1', finger: 'R_INDEX' },
        { id: 'i', label: 'I', class: 'u-1', finger: 'R_MIDDLE' },
        { id: 'o', label: 'O', class: 'u-1', finger: 'R_RING' },
        { id: 'p', label: 'P', class: 'u-1', finger: 'R_PINKY' },
        { id: '[', label: '[ {', class: 'u-1', finger: 'R_PINKY' },
        { id: ']', label: '] }', class: 'u-1', finger: 'R_PINKY' },
        { id: '\\', label: '\\ |', class: 'u-1-5', finger: 'R_PINKY' },
        { id: 'pgup', label: 'PgUp', class: 'u-1 key-nav', finger: 'R_PINKY' }
      ],
      // Row 3: Home Row + PgDn
      [
        { id: 'caps', label: 'Caps', class: 'u-1-75 key-caps', finger: 'L_PINKY' },
        { id: 'a', label: 'A', class: 'u-1', finger: 'L_PINKY' },
        { id: 's', label: 'S', class: 'u-1', finger: 'L_RING' },
        { id: 'd', label: 'D', class: 'u-1', finger: 'L_MIDDLE' },
        { id: 'f', label: 'F', class: 'u-1', bump: true, finger: 'L_INDEX' },
        { id: 'g', label: 'G', class: 'u-1', finger: 'L_INDEX' },
        { id: 'h', label: 'H', class: 'u-1', finger: 'R_INDEX' },
        { id: 'j', label: 'J', class: 'u-1', bump: true, finger: 'R_INDEX' },
        { id: 'k', label: 'K', class: 'u-1', finger: 'R_MIDDLE' },
        { id: 'l', label: 'L', class: 'u-1', finger: 'R_RING' },
        { id: ';', label: '; :', class: 'u-1', finger: 'R_PINKY' },
        { id: '\'', label: '\' "', class: 'u-1', finger: 'R_PINKY' },
        { id: 'enter', label: 'Enter', class: 'u-2-25 key-enter', finger: 'R_PINKY' },
        { id: 'pgdn', label: 'PgDn', class: 'u-1 key-nav', finger: 'R_PINKY' }
      ],
      // Row 4: Bottom Row + Up Arrow + End
      [
        { id: 'l_shift', label: 'Shift', class: 'u-2-25 key-shift-l', finger: 'L_PINKY' },
        { id: 'z', label: 'Z', class: 'u-1', finger: 'L_PINKY' },
        { id: 'x', label: 'X', class: 'u-1', finger: 'L_RING' },
        { id: 'c', label: 'C', class: 'u-1', finger: 'L_MIDDLE' },
        { id: 'v', label: 'V', class: 'u-1', finger: 'L_INDEX' },
        { id: 'b', label: 'B', class: 'u-1', finger: 'L_INDEX' },
        { id: 'n', label: 'N', class: 'u-1', finger: 'R_INDEX' },
        { id: 'm', label: 'M', class: 'u-1', finger: 'R_INDEX' },
        { id: ',', label: ', <', class: 'u-1', finger: 'R_MIDDLE' },
        { id: '.', label: '. >', class: 'u-1', finger: 'R_RING' },
        { id: '/', label: '/ ?', class: 'u-1', finger: 'R_PINKY' },
        { id: 'r_shift', label: 'Shift', class: 'u-1-75 key-shift-r', finger: 'R_PINKY' },
        { id: 'arrowup', label: '▲', class: 'u-1 key-arrow key-arrow-up', finger: 'R_PINKY' },
        { id: 'end', label: 'End', class: 'u-1 key-nav', finger: 'R_PINKY' }
      ],
      // Row 5: Space Row + Arrows Cluster
      [
        { id: 'l_ctrl', label: 'Ctrl', class: 'u-1-25 key-mod', finger: 'L_PINKY' },
        { id: 'l_win', label: 'Win', class: 'u-1-25 key-mod', finger: 'L_PINKY' },
        { id: 'l_alt', label: 'Alt', class: 'u-1-25 key-mod', finger: 'THUMB' },
        { id: ' ', label: 'Space', class: 'u-6-25 key-space', finger: 'THUMB' },
        { id: 'r_alt', label: 'Alt', class: 'u-1 key-mod', finger: 'THUMB' },
        { id: 'fn', label: 'Fn', class: 'u-1 key-mod', finger: 'R_PINKY' },
        { id: 'r_ctrl', label: 'Ctrl', class: 'u-1 key-mod', finger: 'R_PINKY' },
        { id: 'arrowleft', label: '◄', class: 'u-1 key-arrow key-arrow-left', finger: 'R_INDEX' },
        { id: 'arrowdown', label: '▼', class: 'u-1 key-arrow key-arrow-down', finger: 'R_MIDDLE' },
        { id: 'arrowright', label: '►', class: 'u-1 key-arrow key-arrow-right', finger: 'R_RING' }
      ]
    ];

    layout.forEach((rowDef, rowIdx) => {
      const rowEl = document.createElement('div');
      rowEl.className = `kb-row kb-row-${rowIdx}`;

      rowDef.forEach(k => {
        const keyEl = document.createElement('div');
        keyEl.className = 'kb-key' + (k.class ? ' ' + k.class : '') + (k.bump ? ' bump' : '');
        keyEl.dataset.key = k.id;
        keyEl.dataset.finger = k.finger;
        keyEl.textContent = k.label;

        // Apply subtle finger color accent to keycap base
        const fingerColor = this.fingerColors[k.finger];
        if (fingerColor) {
          keyEl.style.borderBottomColor = fingerColor;
          keyEl.style.borderBottomWidth = '3px';
        }

        this.keyElements.set(k.id.toLowerCase(), keyEl);
        rowEl.appendChild(keyEl);
      });

      this.container.appendChild(rowEl);
    });
  }

  highlightTargetKey(char) {
    this.resetHighlights();
    if (!char) return null;

    let targetKeyId = char.toLowerCase();
    const shiftReq = this.getShiftRequirement(char);

    // Map symbol to its primary key id if needed
    targetKeyId = this._resolveKeyId(char);

    const el = this.keyElements.get(targetKeyId);
    const fingerId = this.getKeyFinger(char);

    if (el) {
      el.classList.add('active-target');
      const fingerColor = this.fingerColors[fingerId] || 'var(--accent-primary)';
      el.style.borderColor = fingerColor;
      el.style.color = fingerColor;
      this.activeKeyElement = el;
    }

    if (shiftReq.needsShift) {
      const shiftId = shiftReq.shiftKey === 'L_SHIFT' ? 'l_shift' : 'r_shift';
      const shiftEl = this.keyElements.get(shiftId);
      if (shiftEl) {
        shiftEl.classList.add('active-target');
        shiftEl.style.borderColor = 'var(--finger-l-pinky)';
        this.activeShiftElement = shiftEl;
      }
    }

    return {
      keyElement: el,
      fingerId: fingerId,
      needsShift: shiftReq.needsShift,
      shiftKey: shiftReq.shiftKey
    };
  }

  indicatePress(char, isCorrect) {
    const keyId = this._resolveKeyId(char);
    const el = this.keyElements.get(keyId);
    if (!el) return;

    const className = isCorrect ? 'pressed-correct' : 'pressed-wrong';
    el.classList.add(className);
    setTimeout(() => {
      el.classList.remove(className);
    }, 120);
  }

  resetHighlights() {
    if (this.activeKeyElement) {
      this.activeKeyElement.classList.remove('active-target');
      this.activeKeyElement.style.borderColor = '';
      this.activeKeyElement.style.color = '';
      this.activeKeyElement = null;
    }
    if (this.activeShiftElement) {
      this.activeShiftElement.classList.remove('active-target');
      this.activeShiftElement.style.borderColor = '';
      this.activeShiftElement = null;
    }
  }

  _resolveKeyId(char) {
    const symbolMap = {
      '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5',
      '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
      '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\',
      ':': ';', '"': '\'', '<': ',', '>': '.', '?': '/'
    };
    return (symbolMap[char] || char).toLowerCase();
  }
}
