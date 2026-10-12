# 5 F!NGERS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build "5 F!NGERS by S1mplee67", an offline zero-dependency touch typing and programming syntax trainer combining TypingClub's progressive multi-stage finger curriculum and interactive visual hand guides with Monkeytype's real-time metrics, telemetry, and smooth aesthetics.

**Architecture:** A zero-dependency client architecture running natively in browsers or offline desktop window shells. Modular vanilla JavaScript modules handle the typing engine, SVG hands guide, virtual keyboard, multi-stage curriculum, multi-language code snippets, Web Audio mechanical switch sound synthesis, canvas analytics heatmaps, and local storage persistence. Includes Windows batch launcher `Run-5FINGERS.bat` and C# `Launcher.cs` compiled via Windows built-in `csc.exe`.

**Tech Stack:** HTML5, CSS3 (Modern Flex/Grid, Custom Properties), Vanilla Modern JavaScript (ES6+ Modules/Classes), SVG graphics, HTML5 Canvas, Web Audio API, `localStorage` & `IndexedDB`, Windows Batch, C# (.NET Framework 4.8 / .NET).

**Spec:** `docs/superpowers/specs/2026-10-13-5-fingers-typing-trainer-design.md`

## Global Constraints

- 100% Offline: zero external CDNs, npm runtime dependencies, or external font/asset network requests.
- Zero-install Windows Desktop execution via `Run-5FINGERS.bat` and optional C# compiled executable `5-FINGERS.exe`.
- Strict multi-stage unlock requirement: minimum 90% accuracy to unlock next lesson.
- Dual visual hands guide mapping all 10 fingers to their exact standard touch-typing keyboard columns.
- Personalization: branded for S1mplee67 (W3NCY?) with Cyber Slate and Midnight Obsidian Eye Relief themes.

## Review Focus

1. **Shift & Capitalization handling**: Verify Left Shift activates for right-hand keys and Right Shift activates for left-hand keys, with correct pinky guide highlights.
2. **Tab and Indentation in Code Arena**: Verify Tab and spaces in programming language code blocks are typed smoothly without moving focus away from the typing area.
3. **Accuracy & Star scoring edge-case**: Verify tests with 0 errors get 100% accuracy and 5 stars; verify scores with <90% accuracy flag the lesson as incomplete.
4. **Data resilience & zero loss**: Verify refreshing the browser or relaunching preserves all stars, high scores, completed stages, and mistake heatmaps.
5. **Audio Context resumption**: Modern browsers require user interaction before activating Web Audio; verify audio unlocks gracefully on first keystroke without console errors.

---

### Task 1: Project Scaffold, Themes CSS & Base Layout Shell

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `css/themes.css`
- Test: `tests/test-scaffold.html`

**Interfaces:**
- Produces: CSS variables for themes (`--bg-primary`, `--bg-card`, `--text-primary`, `--accent-cyan`, `--accent-amber`, `--color-l-pinky`, etc.) and main DOM containers (`#app-header`, `#hands-container`, `#keyboard-container`, `#typing-area`, `#metrics-bar`, `#stats-modal`).

- [ ] **Step 1: Write scaffold validation test**
Asserts DOM containers exist and theme CSS classes can be toggled via `document.body.className`.

- [ ] **Step 2: Create `css/themes.css`**
Define `cyber-slate` (default), `obsidian-eye-relief`, `nordic-frost`, and `retro-phosphor`.

- [ ] **Step 3: Create `css/style.css`**
Set up reset, layout grids, typography, animations, responsive design, and glassmorphism cards.

- [ ] **Step 4: Create `index.html`**
Build header (branding: S1mplee67, stage selector, theme toggle, sound toggle), main typing arena, hands container, keyboard container, and metrics bar.

- [ ] **Step 5: Verify in browser / test harness**
Confirm all containers mount and theme switching updates CSS root variables properly.

---

### Task 2: Offline Storage, Profile Data Model & Backup Engine

**Files:**
- Create: `js/storage.js`
- Test: `tests/test-storage.js`

**Interfaces:**
- Produces: `StorageManager` class with methods:
  - `loadProfile(): UserProfile`
  - `saveProgress(lessonId: string, result: { wpm, accuracy, stars, mistakes }): void`
  - `updateSettings(settings: object): void`
  - `recordFingerMistake(fingerId: string, keyChar: string): void`
  - `exportBackup(): string` (JSON)
  - `importBackup(jsonString: string): boolean`
  - `resetProgress(): void`

- [ ] **Step 1: Write failing test in `tests/test-storage.js`**
Test default profile initialization, progress saving, star computation, and export/import round-trip.

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Implement `js/storage.js`**
Implement `StorageManager` with `localStorage` adapter, fallback memory adapter, validation guards, and JSON backup generator.

- [ ] **Step 4: Run test to verify it passes**

---

### Task 3: Mechanical Keyboard Web Audio Synthesizer

**Files:**
- Create: `js/audio.js`
- Test: `tests/test-audio.js`

**Interfaces:**
- Produces: `SoundEngine` class with methods:
  - `init(): Promise<void>`
  - `setSwitch(type: 'cherry-blue' | 'cherry-red' | 'cherry-brown' | 'typewriter' | 'mute'): void`
  - `setVolume(level: number): void`
  - `playClick(): void`
  - `playError(): void`
  - `playLevelComplete(): void`

- [ ] **Step 1: Write test in `tests/test-audio.js`**
Verify switch type switching, volume scaling, and silent fallback if AudioContext is unsupported.

- [ ] **Step 2: Run test to verify initial state**

- [ ] **Step 3: Implement `js/audio.js`**
Construct parametric Web Audio synthesis nodes:
  - Cherry Blue: bandpass filtered pulse at 2.8kHz with fast exponential decay.
  - Cherry Red: damped sine clack at 180Hz.
  - Cherry Brown: double micro-click at 450Hz & 200Hz.
  - Typewriter: mechanical impact wave + completion bell chime at 2.2kHz.

- [ ] **Step 4: Verify audio playback on interaction**

---

### Task 4: Interactive Virtual Keyboard & Dynamic Finger Color Zones

**Files:**
- Create: `js/keyboard.js`
- Test: `tests/test-keyboard.js`

**Interfaces:**
- Produces: `VirtualKeyboard` class with methods:
  - `mount(containerId: string): void`
  - `highlightTargetKey(char: string): { keyElement: HTMLElement, fingerId: string }`
  - `indicatePress(char: string, isCorrect: boolean): void`
  - `getKeyFinger(char: string): string`
  - `resetHighlights(): void`

- [ ] **Step 1: Write failing test in `tests/test-keyboard.js`**
Verify key-to-finger mapping (e.g. `'f'` -> `'L_INDEX'`, `'p'` -> `'R_PINKY'`, `' '` -> `'THUMB'`).

- [ ] **Step 2: Run test to verify mapping logic fails**

- [ ] **Step 3: Implement `js/keyboard.js`**
Render full ANSI 60%/TKL keyboard layout with finger color coding, home row anchors (`F` and `J` bumps), active key glow, and keypress ripple animation.

- [ ] **Step 4: Run test to verify key resolution passes**

---

### Task 5: Interactive Dual SVG Hands Guide & Real-Time Finger Animator

**Files:**
- Create: `js/hands.js`
- Test: `tests/test-hands.js`

**Interfaces:**
- Produces: `HandsGuide` class with methods:
  - `mount(containerId: string): void`
  - `setActiveFinger(fingerId: string): void`
  - `flashError(fingerId: string): void`
  - `clearActive(): void`

- [ ] **Step 1: Write test in `tests/test-hands.js`**
Verify all 10 fingers (`L_PINKY`, `L_RING`, `L_MIDDLE`, `L_INDEX`, `L_THUMB`, `R_THUMB`, `R_INDEX`, `R_MIDDLE`, `R_RING`, `R_PINKY`) map to SVG finger nodes.

- [ ] **Step 2: Implement SVG dual hands in `js/hands.js`**
Create clean, high-precision SVG left and right hand illustrations. Implement dynamic finger elevation, color illumination, and pulse animations.

- [ ] **Step 3: Verify finger animation visual transitions**

---

### Task 6: Multi-Stage Progression Curriculum & Star Unlock Rules

**Files:**
- Create: `js/curriculum.js`
- Test: `tests/test-curriculum.js`

**Interfaces:**
- Produces: `Curriculum` object with:
  - `stages: Stage[]`
  - `getLesson(id: string): Lesson`
  - `isLessonUnlocked(lessonId: string, completedLessons: object): boolean`
  - `calculateStars(wpm: number, accuracy: number): number`

- [ ] **Step 1: Write failing test in `tests/test-curriculum.js`**
Verify Stage 1 through Stage 6 lessons exist, unlocking rule enforces ≥90% accuracy, and star calculation handles boundaries correctly.

- [ ] **Step 2: Implement `js/curriculum.js`**
Populate structured lessons for:
  - Stage 1: Home Row (F, J, D, K, S, L, A, ;, Space, mixed words)
  - Stage 2: Top Row (E, I, R, U, T, Y, W, O, Q, P)
  - Stage 3: Bottom Row (V, M, C, comma, X, dot, Z, slash)
  - Stage 4: Capitalization & Dual Shifts
  - Stage 5: Numbers Row (1 to 0)
  - Stage 6: Punctuation & Developer symbols

- [ ] **Step 3: Run tests to verify all curriculum stages pass**

---

### Task 7: Multi-Language Code Arena Library & Syntax Formatter

**Files:**
- Create: `js/code-arena.js`
- Test: `tests/test-code-arena.js`

**Interfaces:**
- Produces: `CodeArena` object with:
  - `languages: string[]`
  - `getSnippets(lang: string): CodeSnippet[]`
  - `getRandomSnippet(lang: string, difficulty?: 'beginner' | 'intermediate' | 'advanced'): CodeSnippet`

- [ ] **Step 1: Write test in `tests/test-code-arena.js`**
Verify support for JavaScript, Python, C#, C/C++, Java, Rust, Go, SQL, HTML/CSS, and Bash snippets.

- [ ] **Step 2: Implement `js/code-arena.js`**
Curate clean, authentic code snippets for every supported language covering brackets, functions, imports, loops, and indentations.

- [ ] **Step 3: Verify snippet normalization and character encoding**

---

### Task 8: Core Typing Engine, Caret Physics & Metric Telemetry

**Files:**
- Create: `js/engine.js`
- Test: `tests/test-engine.js`

**Interfaces:**
- Produces: `TypingEngine` class with methods:
  - `startLesson(text: string, onUpdate: callback, onFinish: callback): void`
  - `handleKey(key: string, event: KeyboardEvent): void`
  - `getStats(): { wpm: number, rawWpm: number, accuracy: number, consistency: number, errors: number }`
  - `restart(): void`

- [ ] **Step 1: Write test in `tests/test-engine.js`**
Simulate typing sequence, verify WPM formula, accuracy computation, smooth caret positioning, and backspace behavior.

- [ ] **Step 2: Implement `js/engine.js`**
Build Monkeytype-style character stream engine with smooth animated caret, error tracking, timing arrays, and keystroke interceptors.

- [ ] **Step 3: Run engine tests and verify telemetry accuracy**

---

### Task 9: Analytics Canvas Dashboard, Speed Curve & 10-Finger Heatmap

**Files:**
- Create: `js/charts.js`
- Test: `tests/test-charts.js`

**Interfaces:**
- Produces: `AnalyticsRenderer` class with methods:
  - `renderWpmTimeline(canvas: HTMLCanvasElement, history: Array<{ x, y }>): void`
  - `renderFingerHeatmap(canvas: HTMLCanvasElement, fingerErrors: object): void`
  - `renderKeyMistakesList(container: HTMLElement, mistakes: object): void`

- [ ] **Step 1: Write test in `tests/test-charts.js`**
Verify canvas rendering functions without errors on empty or populated datasets.

- [ ] **Step 2: Implement `js/charts.js`**
Draw smooth quadratic curve graphs for WPM over time and a visual color-coded 10-finger mistake heatmap.

- [ ] **Step 3: Verify canvas graphics render crisp on high-DPI displays**

---

### Task 10: App Orchestration, Windows Desktop Integration & GitHub Package

**Files:**
- Create: `js/app.js`
- Create: `Run-5FINGERS.bat`
- Create: `Launcher.cs`
- Create: `build.bat`
- Create: `README.md`
- Create: `LICENSE`

**Interfaces:**
- Orchestrates all modules in `js/app.js`.
- Produces executable launcher script and comprehensive GitHub documentation for S1mplee67.

- [ ] **Step 1: Implement `js/app.js`**
Bind DOM events, route between Lesson Tree, Code Arena, Speed Test, and Analytics views, wire keyboard/hands events, and handle results modal.

- [ ] **Step 2: Implement `Launcher.cs`, `build.bat`, and `Run-5FINGERS.bat`**
Windows offline launcher script and native C# compiler script matching *Duplicates by S1mplee67* design.

- [ ] **Step 3: Create `README.md` and `LICENSE` (MIT)**
Create documentation with branding for S1mplee67 (W3NCY?), feature lists, keyboard shortcut guides, and offline instructions.

---

### Task 11: End-to-End System Verification & Self-Check Suite

**Files:**
- Create: `tests/run-all-tests.html`

- [ ] **Step 1: Build automated offline test suite**
Checks that curriculum unlocks, storage writes, audio plays, keyboard lights up, code arena loads all languages, and analytics compute properly.

- [ ] **Step 2: Execute verification suite in browser**
Confirm 100% of test assertions pass.

- [ ] **Step 3: Verify Windows launcher scripts**
Confirm `Run-5FINGERS.bat` launches cleanly.
