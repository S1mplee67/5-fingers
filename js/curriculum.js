/**
 * 5 F!NGERS - Touch Typing Curriculum
 * Created by S1mplee67 (W3NCY?)
 * 
 * Multi-stage progressive touch-typing lessons modelled after TypingClub:
 * Home Row -> Top Row -> Bottom Row -> Capitalization/Shift -> Numbers -> Symbols.
 */

const Curriculum = {
  stages: [
    {
      id: 1,
      name: "Home Row Foundation",
      description: "Establish baseline muscle memory on the home row anchor keys (F, J, D, K, S, L, A, ;).",
      icon: "🏠",
      lessons: [
        {
          id: "1.1",
          stageId: 1,
          title: "The Index Anchors — F and J",
          instructions: "Place your index fingers on F and J. Feel the small physical tactile bumps on both keys. Keep your wrists relaxed.",
          targetKeys: ["f", "j", " "],
          text: "f j f j ff jj fj jf fff jjj fjf jfj f j f j jf fj ff jj fjf jfj ff jj f j"
        },
        {
          id: "1.2",
          stageId: 1,
          title: "The Middle Fingers — D and K",
          instructions: "Place your left middle finger on D and your right middle finger on K. Alternate smoothly without lifting your hands.",
          targetKeys: ["d", "k", "f", "j", " "],
          text: "d k d k dd kk dk kd f d j k fd jk df kj ddd kkk dfjk kfdj d k d k dd kk"
        },
        {
          id: "1.3",
          stageId: 1,
          title: "The Ring Fingers — S and L",
          instructions: "Place your left ring finger on S and your right ring finger on L. Press firmly and return to resting position.",
          targetKeys: ["s", "l", "d", "k", "f", "j", " "],
          text: "s l s l ss ll sl ls as kl sd lk sldk kdls sss lll sdf jkl lks dfj s l s l"
        },
        {
          id: "1.4",
          stageId: 1,
          title: "The Pinkies — A and Semicolon (;)",
          instructions: "Your pinkies anchor the edges of the home row. Left pinky on A, right pinky on semicolon (;).",
          targetKeys: ["a", ";", "s", "l", "d", "k", "f", "j", " "],
          text: "a ; a ; aa ;; a; ;a as l; da k; asdf ;lkj asdf ;lkj aaaa ;;;; asdf ;lkj a; a;"
        },
        {
          id: "1.5",
          stageId: 1,
          title: "Thumb Space Discipline",
          instructions: "Use your thumb to strike the space bar cleanly. Keep both index fingers resting gently on F and J.",
          targetKeys: ["a", "s", "d", "f", "j", "k", "l", ";", " "],
          text: "a s d f j k l ; as df jk l; asdf jkl; lad fad dad fall ask jak lad fad salad"
        },
        {
          id: "1.6",
          stageId: 1,
          title: "Home Row Mastery Words",
          instructions: "Combine all home row fingers into real English words without looking down at the keyboard.",
          targetKeys: ["a", "s", "d", "f", "j", "k", "l", " "],
          text: "all fall sad glad salad asks flask adds flash lads dads alfalfa salsa falls"
        }
      ]
    },
    {
      id: 2,
      name: "Top Row & Upward Reaches",
      description: "Extend fingers upward from home row resting positions to reach Q, W, E, R, T, Y, U, I, O, P.",
      icon: "⬆️",
      lessons: [
        {
          id: "2.1",
          stageId: 2,
          title: "Middle Finger Reach — E and I",
          instructions: "Reach your left middle finger up from D to E. Reach your right middle finger up from K to I.",
          targetKeys: ["e", "i", "d", "k", " "],
          text: "e i e i ee ii ei ie de ki ed ik did kid die lie see feel feed side like dill"
        },
        {
          id: "2.2",
          stageId: 2,
          title: "Index Reach — R and U",
          instructions: "Reach your left index finger up from F to R. Reach your right index finger up from J to U.",
          targetKeys: ["r", "u", "f", "j", " "],
          text: "r u r u rr uu ru ur fr ju rf uj red run rule rude free user sure fire real"
        },
        {
          id: "2.3",
          stageId: 2,
          title: "Inner Reach — T and Y",
          instructions: "Stretch your index fingers slightly inward and up. Left index hits T, right index hits Y.",
          targetKeys: ["t", "y", "f", "j", " "],
          text: "t y t y tt yy ty yt ft jy tf yj yet try take you tell type year tiny stay day"
        },
        {
          id: "2.4",
          stageId: 2,
          title: "Ring Finger Reach — W and O",
          instructions: "Reach your left ring finger up from S to W. Reach your right ring finger up from L to O.",
          targetKeys: ["w", "o", "s", "l", " "],
          text: "w o w o ww oo wo ow sw lo ws ol who how work flow show wool slow low world"
        },
        {
          id: "2.5",
          stageId: 2,
          title: "Pinky Reach — Q and P",
          instructions: "Reach your left pinky up from A to Q. Reach your right pinky up from ; to P.",
          targetKeys: ["q", "p", "a", ";", " "],
          text: "q p q p qq pp qp pq aq ;p qa p; quit play plot pass peep quick pipe pique"
        },
        {
          id: "2.6",
          stageId: 2,
          title: "Top Row Integrated Fluency",
          instructions: "Flow naturally between the top row and home row keys.",
          targetKeys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", " "],
          text: "quick power write query input output quiet reply route report poetry polite"
        }
      ]
    },
    {
      id: 3,
      name: "Bottom Row & Downward Reaches",
      description: "Extend fingers downward to conquer Z, X, C, V, B, N, M, comma, and period.",
      icon: "⬇️",
      lessons: [
        {
          id: "3.1",
          stageId: 3,
          title: "Index Downward — V and M",
          instructions: "Move left index down from F to V. Move right index down from J to M.",
          targetKeys: ["v", "m", "f", "j", " "],
          text: "v m v m vv mm vm mv fv jm vf mj view move make very visit memo vapor volume"
        },
        {
          id: "3.2",
          stageId: 3,
          title: "Middle Downward — C and Comma (,)",
          instructions: "Move left middle finger down from D to C. Move right middle finger down from K to comma (,).",
          targetKeys: ["c", ",", "d", "k", " "],
          text: "c , c , cc ,, c, ,c dc k, cd ,k call, calm, cool, come, code, cast, clean,"
        },
        {
          id: "3.3",
          stageId: 3,
          title: "Ring Downward — X and Period (.)",
          instructions: "Move left ring finger down from S to X. Move right ring finger down from L to period (.).",
          targetKeys: ["x", ".", "s", "l", " "],
          text: "x . x . xx .. x. .x sx l. xs .l fix. mix. next. exact. text. box. pixel. apex."
        },
        {
          id: "3.4",
          stageId: 3,
          title: "Pinky Downward — Z and Slash (/)",
          instructions: "Move left pinky down from A to Z. Move right pinky down from ; to slash (/).",
          targetKeys: ["z", "/", "a", ";", " "],
          text: "z / z / zz // z/ /z az ;/ za /; zero zoom zone size buzz / dev/ null/ root/"
        },
        {
          id: "3.5",
          stageId: 3,
          title: "Full Alphabet Pangram Drill",
          instructions: "Type full English sentences exercising every single letter from A to Z.",
          targetKeys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "],
          text: "the quick brown fox jumps over the lazy dog. pack my box with five dozen liquor jugs."
        }
      ]
    },
    {
      id: 4,
      name: "Capitalization & Dual Shifts",
      description: "Master dual-shift discipline: Left Pinky holds Shift for right-hand keys; Right Pinky holds Shift for left-hand keys.",
      icon: "⇧",
      lessons: [
        {
          id: "4.1",
          stageId: 4,
          title: "Right Hand Capitals (Left Shift)",
          instructions: "Hold Left Shift with your left pinky while typing right-hand capital letters.",
          targetKeys: ["Y", "U", "I", "O", "P", "H", "J", "K", "L", "N", "M"],
          text: "John Paul Mike Lisa Kevin Helen Oscar Nancy Larry Kyle James Logan Mary Peter"
        },
        {
          id: "4.2",
          stageId: 4,
          title: "Left Hand Capitals (Right Shift)",
          instructions: "Hold Right Shift with your right pinky while typing left-hand capital letters.",
          targetKeys: ["Q", "W", "E", "R", "T", "A", "S", "D", "F", "G", "Z", "X", "C", "V", "B"],
          text: "Alice Bob Charlie David Frank Grace Sam Tom Walter Brian Eric Greg Victor Scott"
        },
        {
          id: "4.3",
          stageId: 4,
          title: "Proper Sentences with Capitals",
          instructions: "Combine dual-shift coordination with punctuation in complete prose.",
          targetKeys: ["all"],
          text: "Rome Was Not Built In A Day. Learning To Type Well Takes Patience And Focus."
        }
      ]
    },
    {
      id: 5,
      name: "Number Row Mastery",
      description: "Reach up to the top number row (1 2 3 4 5 6 7 8 9 0) using precise column assignments.",
      icon: "🔢",
      lessons: [
        {
          id: "5.1",
          stageId: 5,
          title: "Index Numbers — 4, 5, 6, 7",
          instructions: "Left index reaches 4 and 5. Right index reaches 6 and 7.",
          targetKeys: ["4", "5", "6", "7", " "],
          text: "4 5 6 7 45 67 76 54 445 667 4567 7654 45 76 54 67 47 56 65 74 456 765"
        },
        {
          id: "5.2",
          stageId: 5,
          title: "Middle Numbers — 3 and 8",
          instructions: "Left middle reaches 3. Right middle reaches 8.",
          targetKeys: ["3", "8", "4", "5", "6", "7", " "],
          text: "3 8 33 88 38 83 348 873 358 863 38 83 338 883 345 678 876 543 38 38"
        },
        {
          id: "5.3",
          stageId: 5,
          title: "Ring Numbers — 2 and 9",
          instructions: "Left ring reaches 2. Right ring reaches 9.",
          targetKeys: ["2", "9", " "],
          text: "2 9 22 99 29 92 239 982 292 929 1992 2019 1999 2026 29 92 234 789 987 654"
        },
        {
          id: "5.4",
          stageId: 5,
          title: "Pinky Numbers — 1 and 0",
          instructions: "Left pinky reaches 1. Right pinky reaches 0.",
          targetKeys: ["1", "0", " "],
          text: "1 0 11 00 10 01 100 101 1000 1010 2026 1024 1984 2000 10 01 100 001 101"
        },
        {
          id: "5.5",
          stageId: 5,
          title: "Full Numbers & Numerical Codes",
          instructions: "Exercise the entire number row together.",
          targetKeys: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " "],
          text: "12345 67890 1024 2048 4096 8192 192 168 1 1 255 255 255 0 2026 8080 3000"
        }
      ]
    },
    {
      id: 6,
      name: "Punctuation & Developer Symbols",
      description: "Master essential programming symbols: braces {}, brackets [], semicolons ;, quotes, and operators.",
      icon: "⌨️",
      lessons: [
        {
          id: "6.1",
          stageId: 6,
          title: "Brackets and Parentheses",
          instructions: "Type parentheses () and square brackets [] smoothly with your right hand pinky and ring finger.",
          targetKeys: ["(", ")", "[", "]", " "],
          text: "(x) [y] (item) [index] (a + b) [0] (true) [false] [1, 2, 3] (a, b, c)"
        },
        {
          id: "6.2",
          stageId: 6,
          title: "Curly Braces & Semicolons",
          instructions: "Curly braces {} and semicolons ; are fundamental for modern software developers.",
          targetKeys: ["{", "}", ";", " "],
          text: "{ a: 1 }; { name: 'dev' }; { return x; } { if (true) { run(); } }"
        },
        {
          id: "6.3",
          stageId: 6,
          title: "Quotes, Colons & Commas",
          instructions: "Train your right pinky for quotes ('', \"\"), colons (:), and commas (,).",
          targetKeys: ["'", "\"", ":", ",", " "],
          text: "\"id\": 101, \"title\": \"5 F!NGERS\", \"author\": 'S1mplee67', \"offline\": true"
        },
        {
          id: "6.4",
          stageId: 6,
          title: "Arithmetic & Logic Operators",
          instructions: "Operators: +, -, *, /, =, %, &&, ||, !.",
          targetKeys: ["+", "-", "*", "/", "=", "%", "&", "|", "!"],
          text: "x = a + b; y = c - d; total = price * qty; avg = sum / n; valid && !error;"
        },
        {
          id: "6.5",
          stageId: 6,
          title: "Comparison & Arrows",
          instructions: "Modern developer syntax: ===, !==, <=, >=, =>, ->.",
          targetKeys: ["=", ">", "<", "!", "-", " "],
          text: "if (a === b) => { return true; } x <= 10 && y >= 20; const fn = () => {};"
        }
      ]
    },
    {
      id: 7,
      name: "Core Bigrams & Rhythm Flow",
      description: "Build fluent typing rhythm with the most common English character pairs (th, he, in, er, an, on).",
      icon: "🌊",
      lessons: [
        {
          id: "7.1",
          stageId: 7,
          title: "The Core Bigram — TH and HE",
          instructions: "Practice 'th' and 'he' without pausing. Let the two keystrokes blend into a single rhythmic impulse.",
          targetKeys: ["t", "h", "e", " "],
          text: "the then they them their there these that this the other think rather weather breathe rhythm"
        },
        {
          id: "7.2",
          stageId: 7,
          title: "Fluid Connectors — AN, IN, ER, ON",
          instructions: "Connect frequent inward rolls smoothly.",
          targetKeys: ["a", "n", "i", "e", "r", "o", " "],
          text: "an in er on and into under only plan dinner person wonder front action manner season"
        },
        {
          id: "7.3",
          stageId: 7,
          title: "Double-Letter Rapid Fire",
          instructions: "Type consecutive identical keys with quick, light double-taps.",
          targetKeys: ["e", "o", "t", "p", "f", "l", " "],
          text: "see look feel good little happen cannot between letter differ follow support connect trigger"
        },
        {
          id: "7.4",
          stageId: 7,
          title: "High-Frequency English Sprint",
          instructions: "Combine bigrams into common English everyday prose.",
          targetKeys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "],
          text: "the of and a to in is you that it he was for on are as with his they I at be this have from"
        }
      ]
    },
    {
      id: 8,
      name: "Developer Operators & Syntax Glyphs",
      description: "Drill high-intensity programming operator combinations: arrows =>, equality ===, ternaries, and chaining.",
      icon: "⚡",
      lessons: [
        {
          id: "8.1",
          stageId: 8,
          title: "Arrow Functions & Equality",
          instructions: "Arrows => and strict equality === are typed constantly in modern software.",
          targetKeys: ["=", ">", "!", "(", ")", "{", "}", ";", " "],
          text: "const fn = (x) => x * 2; if (a === b) { return true; } if (item !== null) { process(); }"
        },
        {
          id: "8.2",
          stageId: 8,
          title: "Logical Operators & Ternaries",
          instructions: "&&, ||, and ternary (? :) conditions with smooth finger movement.",
          targetKeys: ["&", "|", "?", ":", ">", "<", "'", ";", " "],
          text: "isValid && isReady; value || defaultValue; const result = count > 0 ? 'active' : 'idle';"
        },
        {
          id: "8.3",
          stageId: 8,
          title: "Array Chaining & Indexing",
          instructions: "Square brackets [] and chained higher-order methods.",
          targetKeys: ["[", "]", ".", "(", ")", ">", "=", " "],
          text: "items[0].name; list.map(x => x.id).filter(Boolean); data.reduce((acc, curr) => acc + curr, 0);"
        },
        {
          id: "8.4",
          stageId: 8,
          title: "Destructuring & Template Literals",
          instructions: "Curly braces {} and template literal backticks ``.",
          targetKeys: ["{", "}", "`", "$", ":", ";", " "],
          text: "const { id, title } = payload; const msg = `User #${id}: ${title.toUpperCase()}`; log(msg);"
        }
      ]
    },
    {
      id: 9,
      name: "Real-World Architecture & Flow",
      description: "Type realistic production code blocks across async functions, classes, and typed interfaces.",
      icon: "🏗️",
      lessons: [
        {
          id: "9.1",
          stageId: 9,
          title: "Async / Await API Fetching",
          instructions: "Simulate real asynchronous networking boilerplate.",
          targetKeys: ["a", "s", "y", "n", "c", "w", "f", "e", "t", "h", "(", ")", "{", "}", ";"],
          text: "async function loadData(url) { const res = await fetch(url); return await res.json(); }"
        },
        {
          id: "9.2",
          stageId: 9,
          title: "Class Constructor & Event Emitter",
          instructions: "Object-oriented programming patterns with methods and Maps.",
          targetKeys: ["c", "l", "a", "s", "t", "r", "u", "o", "(", ")", "{", "}", ";"],
          text: "class EventEmitter { constructor() { this.events = new Map(); } emit(name, data) { } }"
        },
        {
          id: "9.3",
          stageId: 9,
          title: "Generic Interface Contract",
          instructions: "TypeScript generics <T> and contract definitions.",
          targetKeys: ["<", ">", ":", ";", "{", "}", " "],
          text: "interface Config<T> { readonly id: string; payload: T; active: boolean; validate(): boolean; }"
        }
      ]
    },
    {
      id: 10,
      name: "Grandmaster Endurance Marathon",
      description: "The ultimate touch-typing benchmark: long multi-sentence endurance testing rhythm, stamina, and zero errors.",
      icon: "🏆",
      lessons: [
        {
          id: "10.1",
          stageId: 10,
          title: "The 10-Finger Speed Crucible",
          instructions: "Maintain a steady pace without pausing or looking down.",
          targetKeys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", " "],
          text: "Consistency beats raw speed every single day. Keep your wrists hovering smoothly above the desk, breathe evenly, and let muscle memory drive every keystroke."
        },
        {
          id: "10.2",
          stageId: 10,
          title: "Full Keyboard Symphony",
          instructions: "Combine prose, symbols, numbers, and functions in a final master challenge.",
          targetKeys: ["f", "u", "n", "c", "t", "i", "o", "(", ")", "{", "}", "=", ";", "\"", "'", "1", "0"],
          text: "function benchmark(runs = 1000) { for (let i = 0; i < runs; i++) { calculate(i * 1.5, [1, 2, 3]); } return 'Passed 100%!'; }"
        }
      ]
    }
  ],

  getLesson(id) {
    for (const stage of this.stages) {
      const found = stage.lessons.find(l => l.id === id);
      if (found) return found;
    }
    return null;
  },

  getAllLessons() {
    const list = [];
    for (const stage of this.stages) {
      list.push(...stage.lessons);
    }
    return list;
  },

  calculateStars(wpm, accuracy) {
    if (accuracy < 90.0) {
      return 0; // Failed pass threshold
    }
    if (accuracy >= 99.0 && wpm >= 65) {
      return 5;
    }
    if (accuracy >= 98.0 && wpm >= 50) {
      return 4;
    }
    if (accuracy >= 96.0 && wpm >= 35) {
      return 3;
    }
    if (accuracy >= 93.0 && wpm >= 20) {
      return 2;
    }
    return 1;
  },

  isLessonUnlocked(lessonId, completedLessons) {
    if (lessonId === "1.1") return true;

    const all = this.getAllLessons();
    const idx = all.findIndex(l => l.id === lessonId);
    if (idx <= 0) return true;

    // Check immediate predecessor
    const prevLesson = all[idx - 1];
    const prevRecord = completedLessons && completedLessons[prevLesson.id];
    return !!(prevRecord && prevRecord.stars >= 1);
  },

  getNextLessonId(currentLessonId) {
    const all = this.getAllLessons();
    const idx = all.findIndex(l => l.id === currentLessonId);
    if (idx >= 0 && idx < all.length - 1) {
      return all[idx + 1].id;
    }
    return null;
  },

  isStageCompleted(stageId, completedLessons) {
    const stage = this.stages.find(s => s.id === stageId);
    if (!stage) return false;
    if (!completedLessons) return false;
    return stage.lessons.every(lesson => {
      const rec = completedLessons[lesson.id];
      return rec && rec.stars >= 1;
    });
  }
};
