/**
 * 5 F!NGERS - Core Typing Engine & Telemetry
 * Created by S1mplee67 (W3NCY?)
 * 
 * High-precision keystroke interpreter, ultra-smooth animated caret,
 * live WPM / Accuracy / Consistency calculations, and hardware audio sync.
 */

class TypingEngine {
  constructor(options = {}) {
    this.wordsContainer = document.getElementById(options.wordsContainerId || 'words-stream');
    this.caret = document.getElementById(options.caretId || 'typing-caret');
    this.storage = options.storage || null;
    this.sound = options.sound || null;
    this.keyboard = options.keyboard || null;
    this.hands = options.hands || null;

    this.onUpdateStats = options.onUpdateStats || null;
    this.onComplete = options.onComplete || null;

    this.text = "";
    this.charSpans = [];
    this.currentIndex = 0;
    this.startTime = null;
    this.endTime = null;
    this.totalKeystrokes = 0;
    this.errorCount = 0;
    this.isFinished = false;
    this.lastKeystrokeTime = null;
    this.keystrokeIntervals = [];

    window.addEventListener('resize', () => {
      this.updateCaret();
    });
  }

  loadText(text) {
    this.text = text;
    this.currentIndex = 0;
    this.startTime = null;
    this.endTime = null;
    this.totalKeystrokes = 0;
    this.errorCount = 0;
    this.isFinished = false;
    this.lastKeystrokeTime = null;
    this.keystrokeIntervals = [];

    if (!this.wordsContainer) return;

    this.wordsContainer.innerHTML = '';
    if (this.caret) {
      this.wordsContainer.appendChild(this.caret);
    }
    this.charSpans = [];

    // Group characters into .word wrappers to prevent awkward mid-word line-wrapping
    let currentWordDiv = document.createElement('div');
    currentWordDiv.className = 'word';
    this.wordsContainer.appendChild(currentWordDiv);

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');
      span.className = 'char';
      span.dataset.index = i;

      if (char === '\n') {
        span.innerHTML = '↵<br>';
        span.classList.add('char-newline');
        currentWordDiv.appendChild(span);
        this.charSpans.push(span);

        // Break onto new line
        currentWordDiv = document.createElement('div');
        currentWordDiv.className = 'word';
        this.wordsContainer.appendChild(currentWordDiv);
      } else if (char === ' ') {
        span.innerHTML = '&nbsp;';
        span.classList.add('char-space');
        currentWordDiv.appendChild(span);
        this.charSpans.push(span);

        // After space, create new word wrapper
        currentWordDiv = document.createElement('div');
        currentWordDiv.className = 'word';
        this.wordsContainer.appendChild(currentWordDiv);
      } else {
        span.textContent = char;
        currentWordDiv.appendChild(span);
        this.charSpans.push(span);
      }
    }

    if (this.charSpans.length > 0) {
      this.charSpans[0].classList.add('current');
    }

    this.updateTargetGuidance();
    this.updateCaret();
  }

  handleKey(key, event) {
    if (this.isFinished || !this.text) return;

    // Ignore solitary modifiers
    const ignored = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (ignored.includes(key)) return;

    const now = Date.now();
    if (!this.startTime) {
      this.startTime = now;
      this.lastKeystrokeTime = now;
    } else if (this.lastKeystrokeTime) {
      this.keystrokeIntervals.push(now - this.lastKeystrokeTime);
      this.lastKeystrokeTime = now;
    }

    // Handle Backspace
    if (key === 'Backspace') {
      if (event && event.preventDefault) event.preventDefault();
      if (this.currentIndex > 0) {
        // Deselect current
        if (this.charSpans[this.currentIndex]) {
          this.charSpans[this.currentIndex].classList.remove('current');
        }

        this.currentIndex--;
        const span = this.charSpans[this.currentIndex];
        span.classList.remove('correct', 'incorrect');
        span.classList.add('current');

        if (this.sound) this.sound.playClick();
        this.updateTargetGuidance();
        this.updateCaret();
        this._dispatchStats();
      }
      return;
    }

    // Normalized expected character
    const expectedChar = this.text[this.currentIndex];
    let isMatch = false;

    if (expectedChar === '\n' && (key === 'Enter' || key === '\n')) {
      isMatch = true;
    } else if (expectedChar === key) {
      isMatch = true;
    }

    this.totalKeystrokes++;

    const currentSpan = this.charSpans[this.currentIndex];
    currentSpan.classList.remove('current');

    if (isMatch) {
      currentSpan.classList.add('correct');
      if (this.sound) this.sound.playClick();
      if (this.keyboard) this.keyboard.indicatePress(expectedChar, true);
    } else {
      currentSpan.classList.add('incorrect');
      this.errorCount++;
      if (this.sound) this.sound.playError();
      if (this.keyboard) this.keyboard.indicatePress(key, false);

      // Record mistake telemetry
      const fingerId = this.keyboard ? this.keyboard.getKeyFinger(expectedChar) : null;
      if (this.hands) this.hands.flashError(fingerId);
      if (this.storage) this.storage.recordFingerMistake(fingerId, expectedChar);
    }

    this.currentIndex++;

    // Check completion
    if (this.currentIndex >= this.text.length) {
      this.finishSession();
      return;
    }

    // Advance to next char
    if (this.charSpans[this.currentIndex]) {
      this.charSpans[this.currentIndex].classList.add('current');
    }

    this.updateTargetGuidance();
    this.updateCaret();
    this._dispatchStats();
  }

  updateTargetGuidance() {
    if (this.currentIndex >= this.text.length) {
      if (this.keyboard) this.keyboard.resetHighlights();
      if (this.hands) this.hands.clearActive();
      return;
    }

    const nextChar = this.text[this.currentIndex];
    let fingerId = null;

    if (this.keyboard) {
      const info = this.keyboard.highlightTargetKey(nextChar);
      fingerId = info ? info.fingerId : null;
    }

    if (this.hands) {
      this.hands.setActiveFinger(fingerId);
    }
  }

  updateCaret() {
    if (!this.caret || !this.wordsContainer) return;

    if (this.currentIndex < this.charSpans.length) {
      const targetSpan = this.charSpans[this.currentIndex];
      const containerRect = this.wordsContainer.getBoundingClientRect();
      const spanRect = targetSpan.getBoundingClientRect();

      const left = spanRect.left - containerRect.left;
      const top = spanRect.top - containerRect.top;

      this.caret.style.transform = `translate(${left}px, ${top}px)`;
      this.caret.style.height = `${spanRect.height || 28}px`;
      this.caret.style.display = 'block';
    } else if (this.charSpans.length > 0) {
      const lastSpan = this.charSpans[this.charSpans.length - 1];
      const containerRect = this.wordsContainer.getBoundingClientRect();
      const spanRect = lastSpan.getBoundingClientRect();

      const left = spanRect.right - containerRect.left;
      const top = spanRect.top - containerRect.top;

      this.caret.style.transform = `translate(${left}px, ${top}px)`;
      this.caret.style.height = `${spanRect.height || 28}px`;
      this.caret.style.display = 'block';
    }
  }

  getStats() {
    const elapsedSeconds = this.startTime ? ((this.endTime || Date.now()) - this.startTime) / 1000 : 0;
    const elapsedMinutes = elapsedSeconds / 60 || 0.001;

    let correctChars = 0;
    for (let i = 0; i < this.currentIndex; i++) {
      if (this.charSpans[i] && this.charSpans[i].classList.contains('correct')) {
        correctChars++;
      }
    }

    const wpm = Math.round((correctChars / 5) / elapsedMinutes) || 0;
    const rawWpm = Math.round((this.currentIndex / 5) / elapsedMinutes) || 0;

    let accuracy = 100;
    if (this.totalKeystrokes > 0) {
      accuracy = Math.max(0, Math.round(((this.totalKeystrokes - this.errorCount) / this.totalKeystrokes) * 1000) / 10);
    }

    // Consistency formula based on standard deviation of keystroke intervals
    let consistency = 100;
    if (this.keystrokeIntervals.length > 3) {
      const mean = this.keystrokeIntervals.reduce((a, b) => a + b, 0) / this.keystrokeIntervals.length;
      const variance = this.keystrokeIntervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / this.keystrokeIntervals.length;
      const stdDev = Math.sqrt(variance);
      const cv = (stdDev / (mean || 1)) * 100; // coefficient of variation
      consistency = Math.max(0, Math.min(100, Math.round(100 - cv / 2)));
    }

    return {
      wpm,
      rawWpm,
      accuracy,
      consistency,
      errors: this.errorCount,
      totalKeystrokes: this.totalKeystrokes,
      timeSeconds: Math.round(elapsedSeconds)
    };
  }

  finishSession() {
    this.isFinished = true;
    this.endTime = Date.now();

    if (this.caret) {
      this.caret.style.display = 'none';
    }
    if (this.keyboard) this.keyboard.resetHighlights();
    if (this.hands) this.hands.clearActive();

    const stats = this.getStats();

    if (this.sound) {
      this.sound.playLevelComplete();
    }

    if (this.onComplete) {
      this.onComplete(stats);
    }
  }

  restart() {
    this.loadText(this.text);
  }

  _dispatchStats() {
    if (this.onUpdateStats) {
      this.onUpdateStats(this.getStats());
    }
  }
}
