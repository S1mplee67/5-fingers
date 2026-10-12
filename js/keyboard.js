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

      // Right Pinky
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
      'enter': 'R_PINKY', 'backspace': 'R_PINKY', 'r_shift': 'R_PINKY'
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

    const layout = [
      // Row 0: Number Row
      [
        { id: '`', label: '` ~', finger: 'L_PINKY' },
        { id: '1', label: '1 !', finger: 'L_PINKY' },
        { id: '2', label: '2 @', finger: 'L_RING' },
        { id: '3', label: '3 #', finger: 'L_MIDDLE' },
        { id: '4', label: '4 $', finger: 'L_INDEX' },
        { id: '5', label: '5 %', finger: 'L_INDEX' },
        { id: '6', label: '6 ^', finger: 'R_INDEX' },
        { id: '7', label: '7 &', finger: 'R_INDEX' },
        { id: '8', label: '8 *', finger: 'R_MIDDLE' },
        { id: '9', label: '9 (', finger: 'R_RING' },
        { id: '0', label: '0 )', finger: 'R_PINKY' },
        { id: '-', label: '- _', finger: 'R_PINKY' },
        { id: '=', label: '= +', finger: 'R_PINKY' },
        { id: 'backspace', label: 'Backspace', class: 'key-backspace', finger: 'R_PINKY' }
      ],
      // Row 1: Top Row
      [
        { id: 'tab', label: 'Tab', class: 'key-tab', finger: 'L_PINKY' },
        { id: 'q', label: 'Q', finger: 'L_PINKY' },
        { id: 'w', label: 'W', finger: 'L_RING' },
        { id: 'e', label: 'E', finger: 'L_MIDDLE' },
        { id: 'r', label: 'R', finger: 'L_INDEX' },
        { id: 't', label: 'T', finger: 'L_INDEX' },
        { id: 'y', label: 'Y', finger: 'R_INDEX' },
        { id: 'u', label: 'U', finger: 'R_INDEX' },
        { id: 'i', label: 'I', finger: 'R_MIDDLE' },
        { id: 'o', label: 'O', finger: 'R_RING' },
        { id: 'p', label: 'P', finger: 'R_PINKY' },
        { id: '[', label: '[ {', finger: 'R_PINKY' },
        { id: ']', label: '] }', finger: 'R_PINKY' },
        { id: '\\', label: '\\ |', finger: 'R_PINKY' }
      ],
      // Row 2: Home Row
      [
        { id: 'caps', label: 'Caps', class: 'key-caps', finger: 'L_PINKY' },
        { id: 'a', label: 'A', finger: 'L_PINKY' },
        { id: 's', label: 'S', finger: 'L_RING' },
        { id: 'd', label: 'D', finger: 'L_MIDDLE' },
        { id: 'f', label: 'F', bump: true, finger: 'L_INDEX' },
        { id: 'g', label: 'G', finger: 'L_INDEX' },
        { id: 'h', label: 'H', finger: 'R_INDEX' },
        { id: 'j', label: 'J', bump: true, finger: 'R_INDEX' },
        { id: 'k', label: 'K', finger: 'R_MIDDLE' },
        { id: 'l', label: 'L', finger: 'R_RING' },
        { id: ';', label: '; :', finger: 'R_PINKY' },
        { id: '\'', label: '\' "', finger: 'R_PINKY' },
        { id: 'enter', label: 'Enter', class: 'key-enter', finger: 'R_PINKY' }
      ],
      // Row 3: Bottom Row
      [
        { id: 'l_shift', label: 'Shift', class: 'key-shift-l', finger: 'L_PINKY' },
        { id: 'z', label: 'Z', finger: 'L_PINKY' },
        { id: 'x', label: 'X', finger: 'L_RING' },
        { id: 'c', label: 'C', finger: 'L_MIDDLE' },
        { id: 'v', label: 'V', finger: 'L_INDEX' },
        { id: 'b', label: 'B', finger: 'L_INDEX' },
        { id: 'n', label: 'N', finger: 'R_INDEX' },
        { id: 'm', label: 'M', finger: 'R_INDEX' },
        { id: ',', label: ', <', finger: 'R_MIDDLE' },
        { id: '.', label: '. >', finger: 'R_RING' },
        { id: '/', label: '/ ?', finger: 'R_PINKY' },
        { id: 'r_shift', label: 'Shift', class: 'key-shift-r', finger: 'R_PINKY' }
      ],
      // Row 4: Space Row
      [
        { id: 'l_ctrl', label: 'Ctrl', finger: 'L_PINKY' },
        { id: 'l_alt', label: 'Alt', finger: 'THUMB' },
        { id: ' ', label: 'Space', class: 'key-space', finger: 'THUMB' },
        { id: 'r_alt', label: 'Alt', finger: 'THUMB' },
        { id: 'r_ctrl', label: 'Ctrl', finger: 'R_PINKY' }
      ]
    ];

    layout.forEach(rowDef => {
      const rowEl = document.createElement('div');
      rowEl.className = 'kb-row';

      rowDef.forEach(k => {
        const keyEl = document.createElement('div');
        keyEl.className = 'kb-key' + (k.class ? ' ' + k.class : '') + (k.bump ? ' bump' : '');
        keyEl.dataset.key = k.id;
        keyEl.dataset.finger = k.finger;
        keyEl.textContent = k.label;

        // Apply subtle finger color accent to border
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
