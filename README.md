# 5 F!NGERS by S1mplee67

<div align="center">

```
  ███████╗    ███████╗██╗███╗   ██╗ ██████╗ ███████╗██████╗ ███████╗
  ██╔════╝    ██╔════╝██║████╗  ██║██╔════╝ ██╔════╝██╔══██╗██╔════╝
  ███████╗    █████╗  ██║██╔██╗ ██║██║  ███╗█████╗  ██████╔╝███████╗
  ╚════██║    ██╔══╝  ██║██║╚██╗██║██║   ██║██╔══╝  ██╔══██╗╚════██║
  ███████║    ██║     ██║██║ ╚████║╚██████╔╝███████╗██║  ██║███████║
  ╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
```

### ⚡ Offline Touch Typing & Multi-Language Code Trainer
*Disciplined Muscle Memory Training • Visual Hands Guidance • Monkeytype Telemetry*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011-0078D6.svg)](Run-5FINGERS.bat)
[![Dependencies: Zero](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Vanilla)-success.svg)](#features)
[![Author: S1mplee67](https://img.shields.io/badge/Author-S1mplee67%20(W3NCY%3F)-cyan.svg)](https://github.com/S1mplee67)

</div>

---

## 🌟 Overview

**5 F!NGERS** is a fast, 100% offline computer touch-typing tutor and developer syntax training app. Created by **S1mplee67 (W3NCY?)**, it combines the disciplined pedagogical multi-stage progression of **[TypingClub](https://www.typingclub.com/)** with the modern telemetry, microsecond caret physics, and aesthetic feel of **[Monkeytype](https://monkeytype.com/)**.

Unlike standard typing websites that require constant internet connections, logins, or paid subscription tiers, **5 F!NGERS** runs directly on your Windows PC with **zero external dependencies, zero sign-in, and zero tracking**, while persistently saving all your progress, stars, WPM improvement charts, and finger mistake heatmaps locally.

---

## 🚀 Key Features

### 1. 🖐 Multi-Stage Finger School (TypingClub Methodology)
- **Pedagogical Progression**: Starts slowly with single fingers and anchors (`F` and `J` physical bumps) before expanding to home row, top row, bottom row, numbers, and symbols.
- **Strict Accuracy Gate**: Lessons require **≥90% accuracy** to unlock the next level, cementing muscle memory before speed.
- **Star Rating System**: Earn 1 to 5 stars on every lesson based on your combined speed and accuracy.

### 2. 👐 Dual Animated Visual Hands Guide
- Real-time vector SVG illustration of both Left and Right hands.
- Highlights and elevates the exact finger responsible for the upcoming key in real time:
  - **Left Hand**: Pinky (`Q, A, Z`), Ring (`W, S, X`), Middle (`E, D, C`), Index (`R, F, V, T, G, B`), Thumb (`Space`)
  - **Right Hand**: Thumb (`Space`), Index (`Y, U, H, J, N, M`), Middle (`I, K, ,`), Ring (`O, L, .`), Pinky (`P, ;, /, etc.`)
- **Dual-Shift Rules**: Enforces proper touch-typing shift discipline (Left pinky holds Shift for right-hand keys; Right pinky holds Shift for left-hand keys).

### 3. 💻 Developer Code Arena (10 Programming Languages)
Train real-world coding muscle memory (brackets `{}`, parentheses `()`, indents, semicolons `;`, arrow functions `=>`, operators `===`):
- **JavaScript / TypeScript** (ES6 async/await, functional pipelines, classes)
- **Python 3** (Comprehensions, context managers, algorithms)
- **C# / .NET** (LINQ queries, generics, pattern matching)
- **C & C++** (STL algorithms, lambdas, pointers)
- **Java** (Streams API, try-with-resources, multithreading)
- **Rust** (Result matching, traits, ownership syntax)
- **Go / Golang** (Goroutines, channels, HTTP handlers, struct tags)
- **SQL** (GROUP BY, HAVING, multi-table INNER JOINs, window functions)
- **HTML5 & CSS3** (Flexbox components, custom properties, responsive grids)
- **Bash / Linux Shell** (Pipes `grep | awk | sort`, flags, scripts)

### 4. ⚡ Monkeytype-Style Telemetry & Physics
- Butter-smooth animated caret with sub-millisecond input responsiveness.
- Live real-time meters for **WPM, Raw WPM, Accuracy %, and Consistency %**.
- 25-word speed sprints for rapid warmups.

### 5. 🔊 Synthetic Mechanical Keyboard Audio (Zero External Files)
Synthesized live via the Web Audio API without needing external sound samples:
- **Cherry MX Blue**: Crisp tactile click.
- **Cherry MX Red**: Smooth linear clack.
- **Cherry MX Brown**: Subdued tactile bump.
- **Vintage Typewriter**: Heavy mechanical thud with completion carriage bell chime.
- **Mute**: Pure silent mode for quiet environments.

### 6. 🎨 Hand-Crafted Visual Themes
- **Cyber Slate (Default)**: Deep carbon slate with tactical cyan accents.
- **Midnight Obsidian (Eye Relief)**: Pure OLED dark with warm sepia parchment text for late-night typing sessions.
- **Nordic Frost**: Cold graphite with arctic blue highlights.
- **Retro Phosphor**: Classic terminal phosphor green.

### 7. 📊 Offline Analytics & 10-Finger Error Heatmaps
- Interactive 2D canvas curve tracking your WPM speed over time.
- 10-finger error heatmap visually pinpointing your weakest fingers.
- Top mistyped key badges (e.g. `p`, `b`, `;`).
- 1-Click **JSON Export & Import** backup to save or transfer your progress anytime.

---

## 🛠️ Quick Start (Windows)

No installation or node modules required!

### Option 1: Instant Launcher
Double-click:
```bat
Run-5FINGERS.bat
```

### Option 2: Standalone Windows Executable
If you want to compile the native C# desktop launcher executable (`5-FINGERS.exe`), run:
```bat
build.bat
```
*(Uses the Windows built-in .NET Framework compiler `csc.exe` — zero downloads required!)*

---

## 📂 Project Architecture

```
5-FINGERS/
├── index.html               # Main application shell
├── css/
│   ├── style.css            # Layout, typography, responsive design
│   └── themes.css           # Cyber Slate, Eye Relief, Nordic, Phosphor palettes
├── js/
│   ├── app.js               # Application coordinator & event dispatcher
│   ├── storage.js           # Offline persistence & JSON export/import
│   ├── audio.js             # Web Audio API mechanical switch synthesizer
│   ├── keyboard.js          # Interactive virtual keyboard & finger color zones
│   ├── hands.js             # SVG dual-hand visual guide & active finger animator
│   ├── curriculum.js        # Multi-stage progressive lesson tree & unlock logic
│   ├── code-arena.js        # 10-language programming snippet library
│   ├── engine.js            # Typing input engine & real-time telemetry
│   └── charts.js            # Canvas speed curves & 10-finger mistake heatmaps
├── build.bat                # Compiles native Windows launcher via csc.exe
├── Run-5FINGERS.bat          # 1-click batch launcher
├── Launcher.cs              # Native C# desktop window launcher
├── README.md                # Documentation & showcase
└── LICENSE                  # MIT License
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|:---|:---|
| `Tab + Enter` | Instant restart current lesson |
| `Ctrl + Enter` | Fast reload drill |
| `Esc` | Close any open modal dialog |

---

## 👤 About the Author

Created by **[S1mplee67 (W3NCY?)](https://github.com/S1mplee67)**  
Fourth-year Computer Engineering student at **ICCT Colleges, Cainta, Philippines**.  
Creator of **[Duplicates by S1mplee67](https://github.com/S1mplee67/duplicates-by-s1mplee67)**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Free for personal, educational, and commercial use.
