# Design Specification: 5 F!NGERS by S1mplee67

**Document Version**: 1.0.0  
**Date**: October 13, 2026  
**Author**: S1mplee67 (W3NCY?) & Antigravity  
**Status**: Approved Design  
**Project**: 5 F!NGERS — Offline Multi-Stage Touch Typing & Code Trainer  

---

## 1. Executive Summary & Goals

**5 F!NGERS** is a 100% offline, zero-dependency, open-source computer touch typing and programming syntax trainer. Built for **S1mplee67 (W3NCY?)**, it combines the disciplined pedagogical multi-stage progression of **TypingClub** with the responsive telemetry, aesthetics, and typing physics of **Monkeytype**, supercharged with a dedicated **Code Arena** covering multiple programming languages.

### Core Objectives:
1. **Multi-Stage Progressive Curriculum**: Teach touch-typing systematically from individual fingers and the home row anchor keys to full sentences, numbers, symbols, and complex code syntax.
2. **Visual Real-Time Hands & Keyboard Guidance**: Render interactive SVG left and right hands with color-coded fingers paired with an active on-screen keyboard showing home-row resting positions and target key reaches.
3. **Multi-Language Code Arena**: Train developer muscle memory on real code samples across JavaScript, Python, C#, C/C++, Java, Rust, Go, HTML/CSS, SQL, and Bash/Shell.
4. **Offline Persistence & Zero Sign-In**: Store all progress, stars, WPM/CPM records, and finger error heatmaps locally in `localStorage` / `IndexedDB`, with JSON Export/Import functionality.
5. **Aesthetics & Ergonomics**: Eye-relief dark mode and refined Cyber Slate theme (tasteful, high-contrast, zero overbearing glow), accompanied by synthetic Web Audio mechanical switch sounds (Blue, Brown, Red, Typewriter, Mute).
6. **Windows Desktop & GitHub Ready**: Include 1-click batch launcher `Run-5FINGERS.bat` and compileable C# launcher `Launcher.cs`, complete with MIT license and a GitHub presentation README.

---

## 2. System Architecture & File Structure

The project is structured with zero external dependencies to ensure it works anywhere, anytime without an internet connection or package installation.

```
5-FINGERS/
├── index.html                   # Core single-page application shell
├── css/
│   ├── style.css                # Base typography, layout, widgets, animations
│   └── themes.css               # Theme definitions (Cyber Slate, Obsidian Eye Relief, Nordic, Phosphor)
├── js/
│   ├── app.js                   # Application state coordinator and screen router
│   ├── keyboard.js              # Virtual keyboard layout, key mapping, finger zone color maps
│   ├── hands.js                 # SVG dual-hand renderer, real-time active finger animator
│   ├── curriculum.js            # Multi-stage progressive lesson tree (Home Row -> Symbols)
│   ├── code-arena.js            # Curated multi-language code snippets library
│   ├── engine.js                # Keystroke interceptor, caret animator, WPM/accuracy/consistency engine
│   ├── audio.js                 # Offline Web Audio mechanical switch sound synthesizer
│   ├── storage.js               # LocalStorage data persistence, profile manager, export/import
│   └── charts.js                # Canvas-based WPM timeline curves and 10-finger error heatmaps
├── build.bat                    # Compiles native Windows launcher via csc.exe
├── Run-5FINGERS.bat              # Instant Windows 1-click launcher
├── Launcher.cs                  # Standalone C# Windows forms/app launcher
├── README.md                    # Comprehensive documentation and project showcase
└── LICENSE                      # MIT Open Source License
```

---

## 3. Curriculum & Progression Engine (TypingClub Model)

### 3.1 Stage Breakdown
1. **Stage 1: Home Row Foundations**
   - Lesson 1.1: `f` and `j` (Index anchors, tactile bumps)
   - Lesson 1.2: `d` and `k` (Middle fingers)
   - Lesson 1.3: `s` and `l` (Ring fingers)
   - Lesson 1.4: `a` and `;` (Pinkies)
   - Lesson 1.5: Spacebar discipline (Thumb assignment)
   - Lesson 1.6: Mixed Home Row words (`as`, `ask`, `dad`, `fall`, `flask`, `salad`)
2. **Stage 2: Top Row & Upward Reaches**
   - Lesson 2.1: `e` and `i` (Middle fingers reach up)
   - Lesson 2.2: `r` and `u` (Index reach up)
   - Lesson 2.3: `t` and `y` (Index inner reach up)
   - Lesson 2.4: `w` and `o` (Ring fingers reach up)
   - Lesson 2.5: `q` and `p` (Pinkies reach up)
   - Lesson 2.6: Top Row mixed integration drills
3. **Stage 3: Bottom Row & Downward Reaches**
   - Lesson 3.1: `v` and `m` (Index down)
   - Lesson 3.2: `c` and `,` (Middle down)
   - Lesson 3.3: `x` and `.` (Ring down)
   - Lesson 3.4: `z` and `/` (Pinky down)
   - Lesson 3.5: Full alphabet sentence drills ("The quick brown fox jumps over the lazy dog")
4. **Stage 4: Capitalization & Dual-Shift Discipline**
   - Rule enforcement: Left Shift used for right-hand keys; Right Shift used for left-hand keys.
   - Drills for proper shift timing and pinky anchoring.
5. **Stage 5: Number Row & Reaches**
   - Lessons for numbers `1` through `0` with strict finger column assignments.
6. **Stage 6: Punctuation & Developer Symbols**
   - Parentheses `()`, Brackets `[]`, Braces `{}`, Colons `:`, Semicolons `;`, Quotes `""` and `''`, Operators `+`, `-`, `=`, `*`, `/`, `>`, `<`.
7. **Stage 7: Code Arena**
   - Practical real-world syntax snippets for:
     - JavaScript / TypeScript (ES6 functions, promises, objects, arrays)
     - Python (comprehensions, definitions, dictionaries, indentation)
     - C# / .NET (classes, properties, LINQ queries, namespaces)
     - C & C++ (pointers, structs, includes, loops)
     - Java (methods, classes, try-catch, annotations)
     - Rust (match statements, mut, enums, structs)
     - Go (goroutines, interfaces, error handling)
     - SQL (SELECT, JOIN, WHERE, GROUP BY, aggregations)
     - HTML & CSS (tags, attributes, flexbox, selectors)
     - Bash / Shell (pipes, flags, variables, command chains)
8. **Stage 8: Monkeytype Sprint Arena (Speed Tests)**
   - Timed modes: 15s, 30s, 60s, 120s
   - Word count modes: 10, 25, 50, 100 words
   - Custom text / paste-your-own text mode.

### 3.2 Unlock & Grading Rules
- **Star Thresholds**:
  - 1 Star: 90% Accuracy
  - 2 Stars: 93% Accuracy + 20 WPM
  - 3 Stars: 96% Accuracy + 35 WPM
  - 4 Stars: 98% Accuracy + 50 WPM
  - 5 Stars: 99%+ Accuracy + 65+ WPM
- **Progression Lock**: A lesson requires at least 1 Star (≥90% Accuracy) to unlock the next level, cementing proper finger discipline before speed.

---

## 4. Visual Hands & Keyboard System

### 4.1 Finger Assignment & Color Zones
- **Left Hand**:
  - Pinky: `#ff6b8b` (Soft Coral) -> `Q, A, Z, 1, Tab, Caps, L-Shift, Ctrl`
  - Ring: `#ffa26b` (Peach) -> `W, S, X, 2`
  - Middle: `#ffd166` (Warm Amber) -> `E, D, C, 3`
  - Index: `#06d6a0` (Mint / Emerald) -> `R, F, V, T, G, B, 4, 5`
  - Thumb: `#118ab2` (Tactical Slate) -> `Spacebar` (Left half)
- **Right Hand**:
  - Thumb: `#118ab2` (Tactical Slate) -> `Spacebar` (Right half)
  - Index: `#06d6a0` (Mint / Emerald) -> `Y, H, N, U, J, M, 6, 7`
  - Middle: `#ffd166` (Warm Amber) -> `I, K, ,, 8`
  - Ring: `#ffa26b` (Peach) -> `O, L, ., 9`
  - Pinky: `#b5838d` / `#c77dff` (Purple / Violet) -> `P, ;, /, 0, -, =, [, ], ', Enter, R-Shift, Backspace`

### 4.2 Interactive Animation
- Active key is highlighted on the virtual keyboard.
- In the dual SVG hand graphics, the exact active finger is raised, highlighted, and given an animated pulse dot.
- Hitting the wrong key illuminates the incorrect key in soft crimson `#ef476f` and guides the user to the correct finger without halting playback.

---

## 5. Telemetry, Analytics & Storage

### 5.1 Metrics Calculated
- **WPM**: Words per minute (`(Total characters / 5) / Minutes`).
- **Raw WPM**: Speed including corrected errors.
- **Accuracy**: `(Correct characters / Total keypresses) * 100`.
- **Consistency**: Keystroke timing standard deviation percentage.
- **Finger Error Heatmap**: Error counters indexed by finger (L1-L5, R1-R5) and individual key characters.

### 5.2 Offline Data Model
Stored in `localStorage` under key `s1mplee67_5fingers_data`:
```json
{
  "version": "1.0.0",
  "user": "S1mplee67",
  "settings": {
    "theme": "cyber-slate",
    "sound": "cherry-blue",
    "volume": 0.5,
    "caretStyle": "smooth-line",
    "fontSize": "medium"
  },
  "progress": {
    "completedLessons": {
      "1.1": { "stars": 5, "bestWpm": 48, "accuracy": 99.2, "attempts": 3, "timestamp": 1791849600000 }
    },
    "currentStage": 1,
    "unlockedLessons": ["1.1", "1.2"]
  },
  "stats": {
    "totalTests": 14,
    "totalTimeSeconds": 840,
    "totalCharsTyped": 4200,
    "highestWpm": 72,
    "averageAccuracy": 97.4,
    "fingerErrors": { "L_Pinky": 12, "R_Middle": 4 },
    "keyMistakes": { "p": 15, ";": 9, "b": 6 }
  },
  "history": [
    { "date": "2026-10-13T00:30:00Z", "mode": "lesson", "id": "1.1", "wpm": 45, "accuracy": 98.5 }
  ]
}
```

### 5.3 Export / Import
- `Export Backup`: Generates downloadable `5FINGERS_backup_S1mplee67.json`.
- `Import Backup`: Uploads and parses JSON, restores state seamlessly.

---

## 6. Audio Synthesizer (Zero External Files)

Using standard HTML5 `AudioContext`:
- **Cherry MX Blue**: High-frequency bandpass click (2800 Hz) with sharp attack (0.005s) and release (0.02s).
- **Cherry MX Red**: Low soft thud (180 Hz damped sine wave, linear decay).
- **Cherry MX Brown**: Subtle mid-frequency double-tap bump (450 Hz + 200 Hz).
- **Typewriter**: Mechanical clack with completion carriage bell chime (2200 Hz ping).
- **Mute**: Audio node disconnect.

---

## 7. Themes & Visual Presentation

1. **Cyber Slate (Default)**: `#0b0e14` background, `#151b26` cards, `#00e5ff` tactical cyan accents, `#ffd166` amber alerts, `#e2e8f0` crisp text.
2. **Midnight Obsidian (Eye Relief)**: `#07080a` OLED pitch black, `#121316` cards, `#dcd7ba` warm sepia text, `#7e9cd8` subdued blue highlights (zero eye fatigue).
3. **Nordic Frost**: `#10141d` background, `#1b2230` cards, `#70b0ff` glacier blue accents.
4. **Retro Phosphor CRT**: `#080d09` background, `#101812` cards, `#39ff14` phosphor green accents with optional scanlines.

---

## 8. Verification & Test Plan

1. **Lesson Tree Verification**: Verify that Lesson 1.1 unlocks Lesson 1.2 on reaching ≥90% accuracy; verify that <90% accuracy keeps the next lesson locked and prompts for retry.
2. **Finger Indicator Verification**: Verify every key (A-Z, 0-9, space, shift, symbols) triggers the exact matching finger elevation and color highlight on both left and right hands.
3. **Code Arena Verification**: Verify indentation (spaces/tabs), braces `{}` and syntax symbols are properly processed by the typing engine.
4. **Offline Persistence**: Verify closing and refreshing the browser keeps all completed lessons, stars, and heatmap counters intact. Verify Export/Import JSON works.
5. **Audio Synthesis**: Verify sound effects play cleanly with zero latency without downloading any external audio files.
6. **Windows Desktop & Build Scripts**: Verify `Run-5FINGERS.bat` launches the app; verify `build.bat` compiles `Launcher.cs` into `5-FINGERS.exe` using .NET's `csc.exe`.
