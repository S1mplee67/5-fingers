/**
 * 5 F!NGERS - Main Application Coordinator
 * Created by S1mplee67 (W3NCY?)
 * 
 * Orchestrates views, state, curriculum progress, code arena,
 * speed test modes, settings, audio, and offline persistence.
 */

class FiveFingersApp {
  constructor() {
    this.storage = new TypingStorage('s1mplee67_5fingers_data');
    this.profile = this.storage.loadProfile();

    this.sound = new SoundEngine(
      this.profile.settings.sound || 'cherry-blue',
      this.profile.settings.volume !== undefined ? this.profile.settings.volume : 0.5
    );

    this.keyboard = new TypingKeyboard();
    this.hands = new HandsGuide();

    this.currentMode = 'finger-school'; // 'finger-school' | 'code-arena' | 'speed-test'
    this.activeLessonId = '1.1';
    this.activeCodeLang = 'javascript';
    this.speedTestDuration = 30; // seconds
    this.speedTestLength = (this.profile && this.profile.settings && this.profile.settings.speedTestLength) || 'medium';
    this.currentTip = null;

    this.engine = new TypingEngine({
      wordsContainerId: 'words-stream',
      caretId: 'typing-caret',
      storage: this.storage,
      sound: this.sound,
      keyboard: this.keyboard,
      hands: this.hands,
      onUpdateStats: (stats) => this.handleLiveStatsUpdate(stats),
      onComplete: (result) => this.handleSessionComplete(result)
    });

    this.dom = {
      body: document.body,
      themeSelect: document.getElementById('select-theme'),
      soundSelect: document.getElementById('select-sound'),
      volumeSlider: document.getElementById('sound-volume'),
      btnSoundToggle: document.getElementById('btn-sound-toggle'),
      btnThemeToggle: document.getElementById('btn-theme-toggle'),
      btnStagesModal: document.getElementById('btn-stages-modal'),
      btnSettingsModal: document.getElementById('btn-settings-modal'),
      btnCloseStages: document.getElementById('btn-close-stages'),
      btnCloseSettings: document.getElementById('btn-close-settings'),
      btnCloseResults: document.getElementById('btn-close-results'),
      btnCloseAnalytics: document.getElementById('btn-close-analytics'),
      stagesModal: document.getElementById('stages-modal'),
      settingsModal: document.getElementById('settings-modal'),
      resultsModal: document.getElementById('results-modal'),
      analyticsModal: document.getElementById('analytics-modal'),
      stagesListContainer: document.getElementById('stages-list-container'),
      currentStageTag: document.getElementById('current-stage-tag'),
      currentLessonTitle: document.getElementById('current-lesson-title'),
      currentLessonStars: document.getElementById('current-lesson-stars'),
      valWpm: document.getElementById('val-wpm'),
      valAccuracy: document.getElementById('val-accuracy'),
      valRaw: document.getElementById('val-raw'),
      valConsistency: document.getElementById('val-consistency'),
      typingArea: document.getElementById('typing-area'),
      keystrokeCatcher: document.getElementById('keystroke-catcher'),
      btnNextLesson: document.getElementById('btn-next-lesson'),
      btnRetryLesson: document.getElementById('btn-retry-lesson'),
      btnExportBackup: document.getElementById('btn-export-backup'),
      btnImportTrigger: document.getElementById('btn-import-backup-trigger'),
      inputImportFile: document.getElementById('input-import-file'),
      btnResetData: document.getElementById('btn-reset-data'),
      wpmCanvas: document.getElementById('wpm-timeline-canvas'),
      heatmapContainer: document.getElementById('heatmap-fingers-view'),
      mistakesContainer: document.getElementById('mistakes-badges-list'),
      btnTutorialModal: document.getElementById('btn-tutorial-modal'),
      welcomeModal: document.getElementById('welcome-modal'),
      btnStartStage1: document.getElementById('btn-start-stage1'),
      checkDontShowWelcome: document.getElementById('check-dont-show-welcome'),
      tipText: document.getElementById('tip-text'),
      tipsBanner: document.getElementById('tips-banner'),
      speedTestOptions: document.getElementById('speed-test-options')
    };
  }

  init() {
    // 1. Mount virtual hardware UI
    this.keyboard.mount('keyboard-container');
    this.hands.mount('left-hand-svg', 'right-hand-svg');

    // 2. Apply saved preferences
    this.applyTheme(this.profile.settings.theme || 'theme-cyber-slate');
    this.sound.setSwitch(this.profile.settings.sound || 'cherry-blue');
    this.sound.setVolume(this.profile.settings.volume || 0.5);

    // 3. Bind UI event listeners
    this.bindEvents();

    // 4. Update Navigation Lock State for Code Arena
    this.updateNavigationLockState();

    // 5. Load initial lesson
    this.loadCurrentLesson();

    // 6. Open onboarding tutorial on first launch
    if (!this.profile.settings.hasSeenTutorial) {
      this.openWelcomeModal();
    }
  }

  bindEvents() {
    // Global typing interceptor
    window.addEventListener('keydown', (e) => this.handleGlobalKeyDown(e));

    // Keep focus inside typing catcher when clicking typing area
    if (this.dom.typingArea) {
      this.dom.typingArea.addEventListener('click', () => {
        if (this.dom.keystrokeCatcher) this.dom.keystrokeCatcher.focus();
        this.dom.typingArea.classList.add('focused');
      });
    }

    // Nav Mode switching
    document.querySelectorAll('.nav-modes .nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = btn.dataset.mode;
        if (mode === 'analytics') {
          this.openAnalyticsModal();
        } else {
          this.switchMode(mode);
        }
      });
    });

    // Theme toggle button
    if (this.dom.btnThemeToggle) {
      this.dom.btnThemeToggle.addEventListener('click', () => {
        const themes = ['theme-cyber-slate', 'theme-obsidian-eye-relief', 'theme-nordic-frost', 'theme-retro-phosphor'];
        const currentIdx = themes.indexOf(this.profile.settings.theme);
        const nextTheme = themes[(currentIdx + 1) % themes.length];
        this.applyTheme(nextTheme);
      });
    }

    // Sound toggle button (cycles cherry-blue -> cherry-red -> cherry-brown -> typewriter -> mute)
    if (this.dom.btnSoundToggle) {
      this.dom.btnSoundToggle.addEventListener('click', () => {
        const sounds = ['cherry-blue', 'cherry-red', 'cherry-brown', 'typewriter', 'mute'];
        const currentIdx = sounds.indexOf(this.sound.switchType);
        const nextSound = sounds[(currentIdx + 1) % sounds.length];
        this.sound.setSwitch(nextSound);
        this.storage.updateSettings({ sound: nextSound });
        this.dom.btnSoundToggle.textContent = nextSound === 'mute' ? '🔇' : '🔊';
        if (this.dom.soundSelect) this.dom.soundSelect.value = nextSound;
      });
    }

    // Modal Triggers
    if (this.dom.btnStagesModal) this.dom.btnStagesModal.addEventListener('click', () => this.openStagesModal());
    if (this.dom.btnSettingsModal) this.dom.btnSettingsModal.addEventListener('click', () => this.openSettingsModal());
    if (this.dom.btnTutorialModal) this.dom.btnTutorialModal.addEventListener('click', () => this.openWelcomeModal());

    // Tutorial Start Button
    if (this.dom.btnStartStage1) {
      this.dom.btnStartStage1.addEventListener('click', () => {
        if (this.dom.checkDontShowWelcome && this.dom.checkDontShowWelcome.checked) {
          this.storage.updateSettings({ hasSeenTutorial: true });
        }
        this.closeModals();
        this.switchMode('finger-school');
        this.activeLessonId = '1.1';
        this.loadCurrentLesson();
        if (this.dom.keystrokeCatcher) this.dom.keystrokeCatcher.focus();
      });
    }

    // RNG Tips banner click to roll another pro tip
    if (this.dom.tipsBanner) {
      this.dom.tipsBanner.addEventListener('click', () => {
        this.setRandomTip();
      });
    }

    // Speed test length selector buttons (Short / Medium / Long)
    document.querySelectorAll('.speed-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const length = btn.dataset.length;
        if (length) this.setSpeedTestLength(length);
      });
    });

    // Modal Close Buttons
    if (this.dom.btnCloseStages) this.dom.btnCloseStages.addEventListener('click', () => this.closeModals());
    if (this.dom.btnCloseSettings) this.dom.btnCloseSettings.addEventListener('click', () => this.closeModals());
    if (this.dom.btnCloseResults) this.dom.btnCloseResults.addEventListener('click', () => this.closeModals());
    if (this.dom.btnCloseAnalytics) this.dom.btnCloseAnalytics.addEventListener('click', () => this.closeModals());

    // Modal overlays close on outside click
    [this.dom.stagesModal, this.dom.settingsModal, this.dom.resultsModal, this.dom.analyticsModal, this.dom.welcomeModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.closeModals();
        });
      }
    });

    // Settings Dropdowns & Volume
    if (this.dom.themeSelect) {
      this.dom.themeSelect.value = this.profile.settings.theme;
      this.dom.themeSelect.addEventListener('change', (e) => this.applyTheme(e.target.value));
    }
    if (this.dom.soundSelect) {
      this.dom.soundSelect.value = this.profile.settings.sound;
      this.dom.soundSelect.addEventListener('change', (e) => {
        this.sound.setSwitch(e.target.value);
        this.storage.updateSettings({ sound: e.target.value });
      });
    }
    if (this.dom.volumeSlider) {
      this.dom.volumeSlider.value = this.profile.settings.volume;
      this.dom.volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.sound.setVolume(val);
        this.storage.updateSettings({ volume: val });
      });
    }

    // Results Modal Buttons
    if (this.dom.btnNextLesson) {
      this.dom.btnNextLesson.addEventListener('click', () => {
        this.closeModals();
        const nextId = Curriculum.getNextLessonId(this.activeLessonId);
        if (nextId) {
          this.activeLessonId = nextId;
          this.loadCurrentLesson();
        } else {
          this.openStagesModal();
        }
      });
    }
    if (this.dom.btnRetryLesson) {
      this.dom.btnRetryLesson.addEventListener('click', () => {
        this.closeModals();
        this.engine.restart();
      });
    }

    // Backup & Restore
    if (this.dom.btnExportBackup) {
      this.dom.btnExportBackup.addEventListener('click', () => this.exportBackupFile());
    }
    if (this.dom.btnImportTrigger && this.dom.inputImportFile) {
      this.dom.btnImportTrigger.addEventListener('click', () => this.dom.inputImportFile.click());
      this.dom.inputImportFile.addEventListener('change', (e) => this.importBackupFile(e));
    }
    if (this.dom.btnResetData) {
      this.dom.btnResetData.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all typing progress?')) {
          this.storage.resetProgress();
          location.reload();
        }
      });
    }
  }

  handleGlobalKeyDown(e) {
    // If a modal is open, don't capture into typing engine
    if (document.querySelector('.modal-overlay.active')) return;

    // Prevent spacebar scrolling and tab focus loss
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      e.preventDefault(); // prevent losing focus
    }

    // Hotkey: Ctrl + Enter to restart
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      this.engine.restart();
      return;
    }

    // Pass to engine
    this.engine.handleKey(e.key, e);
  }

  loadCurrentLesson() {
    this.profile = this.storage.loadProfile();

    if (this.currentMode === 'finger-school') {
      if (this.dom.speedTestOptions) this.dom.speedTestOptions.style.display = 'none';
      if (this.dom.currentLessonStars) this.dom.currentLessonStars.style.display = 'block';

      const lesson = Curriculum.getLesson(this.activeLessonId) || Curriculum.getLesson('1.1');
      this.activeLessonId = lesson.id;

      if (this.dom.currentStageTag) this.dom.currentStageTag.textContent = `Stage ${lesson.id}`;
      if (this.dom.currentLessonTitle) this.dom.currentLessonTitle.textContent = lesson.title;

      const record = this.profile.progress.completedLessons[lesson.id];
      const starsCount = record ? record.stars : 0;
      if (this.dom.currentLessonStars) {
        this.dom.currentLessonStars.textContent = '★'.repeat(starsCount) + '☆'.repeat(5 - starsCount);
      }

      // Rotate Contextual RNG Tip
      if (lesson.id === '1.1') {
        this.setRandomTip('1.1');
      } else {
        this.setRandomTip();
      }

      this.engine.loadText(lesson.text);

    } else if (this.currentMode === 'code-arena') {
      if (this.dom.speedTestOptions) this.dom.speedTestOptions.style.display = 'none';
      if (this.dom.currentLessonStars) this.dom.currentLessonStars.style.display = 'block';

      const snippet = CodeArena.getRandomSnippet(this.activeCodeLang);
      if (snippet) {
        const meta = CodeArena.languageMeta[this.activeCodeLang];
        if (this.dom.currentStageTag) this.dom.currentStageTag.textContent = `${meta ? meta.icon : '💻'} ${this.activeCodeLang.toUpperCase()}`;
        if (this.dom.currentLessonTitle) this.dom.currentLessonTitle.textContent = snippet.title;
        if (this.dom.currentLessonStars) this.dom.currentLessonStars.textContent = 'CODE MODE';

        this.setRandomTip();
        this.engine.loadText(snippet.code);
      }

    } else if (this.currentMode === 'speed-test') {
      if (this.dom.speedTestOptions) this.dom.speedTestOptions.style.display = 'flex';
      if (this.dom.currentLessonStars) this.dom.currentLessonStars.style.display = 'none';

      document.querySelectorAll('.speed-opt-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.length === this.speedTestLength);
      });

      // Word count mapping for Short (15w), Medium (30w), Long (60w)
      const countMap = {
        'short': 15,
        'medium': 30,
        'long': 60
      };
      const count = countMap[this.speedTestLength] || 30;

      const titlesMap = {
        'short': { tag: '⚡ SPRINT (15W)', title: '15 Words Speed Sprint' },
        'medium': { tag: '⚡ SPRINT (30W)', title: '30 Words Standard Sprint' },
        'long': { tag: '⚡ SPRINT (60W)', title: '60 Words Endurance Sprint' }
      };
      const meta = titlesMap[this.speedTestLength] || titlesMap['medium'];

      if (this.dom.currentStageTag) this.dom.currentStageTag.textContent = meta.tag;
      if (this.dom.currentLessonTitle) this.dom.currentLessonTitle.textContent = meta.title;

      const practiceWords = "the be of and a to in he have it that for they i with as not on she at by this we you do but his from they say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us find tell ask work seem feel try leave call world house school system hand part place case week company problem order line end word program question side state eye head point child water room mother area money story fact month lot right study book eye job word business issue side kind four head far";
      const wordsArr = practiceWords.split(' ');
      const selection = [];
      for (let i = 0; i < count; i++) {
        selection.push(wordsArr[Math.floor(Math.random() * wordsArr.length)]);
      }
      const testText = selection.join(' ');

      this.setRandomTip();
      this.engine.loadText(testText);
    }

    this.resetMetricsDisplay();
  }

  handleLiveStatsUpdate(stats) {
    if (this.dom.valWpm) this.dom.valWpm.textContent = stats.wpm;
    if (this.dom.valAccuracy) this.dom.valAccuracy.textContent = `${stats.accuracy}%`;
    if (this.dom.valRaw) this.dom.valRaw.textContent = stats.rawWpm;
    if (this.dom.valConsistency) this.dom.valConsistency.textContent = `${stats.consistency}%`;
  }

  handleSessionComplete(result) {
    // 1. Calculate stars
    const stars = Curriculum.calculateStars(result.wpm, result.accuracy);
    const passed = stars >= 1;

    // 2. Save progress if in Finger School
    if (this.currentMode === 'finger-school') {
      const wasCodeUnlocked = this.isCodeArenaUnlocked();

      this.storage.saveProgress(this.activeLessonId, {
        wpm: result.wpm,
        accuracy: result.accuracy,
        stars: stars,
        mistakes: result.errors
      });

      if (passed) {
        const nextId = Curriculum.getNextLessonId(this.activeLessonId);
        if (nextId) this.storage.unlockLesson(nextId);
      }

      this.profile = this.storage.loadProfile();
      this.updateNavigationLockState();

      if (!wasCodeUnlocked && this.isCodeArenaUnlocked()) {
        const badgeEl = document.getElementById('results-status-badge');
        if (badgeEl) {
          badgeEl.innerHTML = 'PROGRESS UNLOCKED<br><span style="color: var(--accent-primary); font-size: 13px;">🎉 STAGE 1 COMPLETE — CODE ARENA UNLOCKED!</span>';
        }
      }
    }

    // 3. Show Results Modal
    const titleEl = document.getElementById('results-title');
    const starsEl = document.getElementById('results-stars-display');
    const badgeEl = document.getElementById('results-status-badge');
    const resWpm = document.getElementById('res-wpm');
    const resAcc = document.getElementById('res-acc');
    const resErrors = document.getElementById('res-errors');

    if (titleEl) titleEl.textContent = passed ? 'Lesson Passed! 🎉' : 'Needs Practice (Min 90% Acc)';
    if (starsEl) starsEl.textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);
    if (badgeEl) {
      badgeEl.textContent = passed ? 'PROGRESS UNLOCKED' : 'LOCKED — TRY AGAIN';
      badgeEl.style.color = passed ? 'var(--color-correct)' : 'var(--color-incorrect)';
    }
    if (resWpm) resWpm.textContent = `${result.wpm} WPM`;
    if (resAcc) resAcc.textContent = `${result.accuracy}%`;
    if (resErrors) resErrors.textContent = `${result.errors}`;

    if (this.dom.btnNextLesson) {
      this.dom.btnNextLesson.style.display = passed ? 'inline-block' : 'none';
    }

    if (this.dom.resultsModal) {
      this.dom.resultsModal.classList.add('active');
    }
  }

  isCodeArenaUnlocked() {
    return Curriculum.isStageCompleted(1, this.profile.progress.completedLessons);
  }

  updateNavigationLockState() {
    const codeBtn = document.querySelector('.nav-btn[data-mode="code-arena"]');
    if (!codeBtn) return;

    const unlocked = this.isCodeArenaUnlocked();
    if (unlocked) {
      codeBtn.classList.remove('nav-locked');
      codeBtn.innerHTML = '<span>💻</span> Code Arena';
      codeBtn.title = 'Code Arena: Practice 10 Real Programming Languages';
    } else {
      codeBtn.classList.add('nav-locked');
      codeBtn.innerHTML = '<span>🔒</span> Code Arena <span class="lock-pill">Stage 1 Req</span>';
      codeBtn.title = '🔒 Locked — Complete all 6 lessons of Stage 1 (Home Row Foundation) with ≥90% accuracy to unlock!';
    }
  }

  switchMode(mode) {
    if (mode === 'code-arena' && !this.isCodeArenaUnlocked()) {
      alert('🔒 Code Arena is locked!\n\nTo unlock the Code Arena, complete all 6 lessons of Stage 1 (Home Row Foundation) with at least 90% accuracy.');
      this.currentMode = 'finger-school';
      this.activeLessonId = '1.1';
      document.querySelectorAll('.nav-modes .nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === 'finger-school');
      });
      this.loadCurrentLesson();
      return;
    }

    this.currentMode = mode;

    document.querySelectorAll('.nav-modes .nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    this.loadCurrentLesson();
  }

  applyTheme(themeClass) {
    const validThemes = ['theme-cyber-slate', 'theme-obsidian-eye-relief', 'theme-nordic-frost', 'theme-retro-phosphor'];
    validThemes.forEach(t => document.body.classList.remove(t));
    document.body.classList.add(themeClass);

    this.profile.settings.theme = themeClass;
    this.storage.updateSettings({ theme: themeClass });

    if (this.dom.themeSelect) this.dom.themeSelect.value = themeClass;
  }

  openStagesModal() {
    this.profile = this.storage.loadProfile();
    const container = this.dom.stagesListContainer;
    if (!container) return;

    container.innerHTML = '';

    Curriculum.stages.forEach(stage => {
      const stageCard = document.createElement('div');
      stageCard.style.cssText = `
        background: var(--bg-surface-elevated);
        border: 1px solid var(--border-subtle);
        border-radius: 10px;
        padding: 14px 18px;
        margin-bottom: 14px;
      `;

      let lessonsHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; margin-top: 10px;">';

      stage.lessons.forEach(l => {
        const isUnlocked = Curriculum.isLessonUnlocked(l.id, this.profile.progress.completedLessons);
        const record = this.profile.progress.completedLessons[l.id];
        const stars = record ? record.stars : 0;
        const bestWpm = record ? record.bestWpm : 0;

        const starStr = isUnlocked ? ('★'.repeat(stars) + '☆'.repeat(5 - stars)) : '🔒 LOCKED';
        const activeBorder = this.activeLessonId === l.id ? 'border: 1px solid var(--accent-primary);' : '';

        lessonsHtml += `
          <button class="nav-btn" data-lesson-id="${l.id}" ${!isUnlocked ? 'disabled' : ''} style="display: flex; flex-direction: column; align-items: flex-start; padding: 8px; ${activeBorder}">
            <span style="font-size: 11px; font-weight: 700; color: var(--accent-primary);">${l.id}</span>
            <span style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${l.title.split('—')[0]}</span>
            <span style="font-size: 10px; color: #ffb703; margin-top: 4px;">${starStr}</span>
            ${bestWpm > 0 ? `<span style="font-size: 9px; color: var(--text-muted);">${bestWpm} WPM</span>` : ''}
          </button>
        `;
      });

      lessonsHtml += '</div>';

      stageCard.innerHTML = `
        <div style="font-weight: 700; font-size: 14px;">${stage.icon} Stage ${stage.id}: ${stage.name}</div>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${stage.description}</div>
        ${lessonsHtml}
      `;

      container.appendChild(stageCard);
    });

    // Bind lesson click
    container.querySelectorAll('button[data-lesson-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lid = btn.dataset.lessonId;
        this.activeLessonId = lid;
        this.closeModals();
        this.switchMode('finger-school');
      });
    });

    if (this.dom.stagesModal) this.dom.stagesModal.classList.add('active');
  }

  openWelcomeModal() {
    if (this.dom.welcomeModal) this.dom.welcomeModal.classList.add('active');
  }

  openSettingsModal() {
    if (this.dom.settingsModal) this.dom.settingsModal.classList.add('active');
  }

  openAnalyticsModal() {
    this.profile = this.storage.loadProfile();

    if (this.dom.wpmCanvas) {
      AnalyticsRenderer.renderWpmTimeline(this.dom.wpmCanvas, this.profile.history);
    }
    if (this.dom.heatmapContainer) {
      AnalyticsRenderer.renderFingerHeatmap(this.dom.heatmapContainer, this.profile.stats.fingerErrors);
    }
    if (this.dom.mistakesContainer) {
      AnalyticsRenderer.renderKeyMistakesList(this.dom.mistakesContainer, this.profile.stats.keyMistakes);
    }

    if (this.dom.analyticsModal) this.dom.analyticsModal.classList.add('active');
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    if (this.dom.keystrokeCatcher) this.dom.keystrokeCatcher.focus();
  }

  resetMetricsDisplay() {
    if (this.dom.valWpm) this.dom.valWpm.textContent = '0';
    if (this.dom.valAccuracy) this.dom.valAccuracy.textContent = '100%';
    if (this.dom.valRaw) this.dom.valRaw.textContent = '0';
    if (this.dom.valConsistency) this.dom.valConsistency.textContent = '100%';
  }

  exportBackupFile() {
    const jsonStr = this.storage.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `5FINGERS_Backup_S1mplee67_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importBackupFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result;
      const success = this.storage.importBackup(content);
      if (success) {
        alert('Progress imported successfully!');
        location.reload();
      } else {
        alert('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  }

  setSpeedTestLength(length) {
    if (!['short', 'medium', 'long'].includes(length)) return;
    this.speedTestLength = length;
    this.storage.updateSettings({ speedTestLength: length });

    document.querySelectorAll('.speed-opt-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.length === length);
    });

    if (this.currentMode === 'speed-test') {
      this.loadCurrentLesson();
    }
  }

  setRandomTip(preferCategory = null) {
    if (!this.dom.tipText) return;

    const catalog = FiveFingersApp.TIPS_CATALOG;
    if (!catalog || catalog.length === 0) return;

    let pool = catalog;
    if (preferCategory) {
      const filtered = catalog.filter(t => t.category === preferCategory);
      if (filtered.length > 0) pool = filtered;
    }

    let chosen = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && chosen.text === this.currentTip) {
      const others = pool.filter(t => t.text !== this.currentTip);
      chosen = others[Math.floor(Math.random() * others.length)] || chosen;
    }

    this.currentTip = chosen.text;

    this.dom.tipText.style.opacity = '0';
    setTimeout(() => {
      this.dom.tipText.innerHTML = `<strong>${chosen.label}:</strong> ${chosen.text}`;
      this.dom.tipText.style.opacity = '1';
    }, 120);
  }

  static get TIPS_CATALOG() {
    return [
      {
        category: '1.1',
        label: 'Index Anchors',
        text: 'Feel the physical bumps on F and J with your index fingers. Rest other fingers on A, S, D, K, L, ;. Eyes on screen!'
      },
      {
        category: 'home-row',
        label: 'The Radar Baseline',
        text: 'Always return your fingers to the home row (A-S-D-F and J-K-L-;) after reaching for top or bottom row keys.'
      },
      {
        category: 'technique',
        label: 'Visual Decoupling',
        text: 'Never look down at your keyboard. Glancing at keys breaks short-term visual memory and slows down neuro-motor adaptation.'
      },
      {
        category: 'technique',
        label: 'The 98% Accuracy Rule',
        text: 'Accuracy produces speed; speed never produces accuracy. Prioritize 98%+ precision first, and velocity will naturally follow.'
      },
      {
        category: 'technique',
        label: 'Opposite Shift Principle',
        text: 'Always hold Shift with the opposite hand! When capitalizing left-hand keys (e.g. A, S, D), hold Right Shift with your right pinky.'
      },
      {
        category: 'technique',
        label: 'Metronome Cadence',
        text: 'Strive for an even, musical cadence rather than sudden frantic bursts. Consistent keystroke intervals minimize stutter.'
      },
      {
        category: 'technique',
        label: 'Word Chunking',
        text: 'Elite typists do not read letter-by-letter. Train your brain to parse whole syllables and prefixes (e.g. "tion", "ing", "pre").'
      },
      {
        category: 'technique',
        label: 'Backspace Discipline',
        text: 'Avoid frantic spamming of Backspace. When a typo happens, pause for half a second, diagnose the finger miss, and re-type smoothly.'
      },
      {
        category: 'technique',
        label: 'Dedicated Spacebar Thumb',
        text: 'Assign one designated thumb (typically of your dominant hand) to the Spacebar. Keep the other thumb lightly floating.'
      },
      {
        category: 'technique',
        label: 'Double Letter Bounce',
        text: 'When typing double letters ("ll", "ee", "tt"), bounce your finger with a crisp double-tap rather than grinding the keycap down.'
      },
      {
        category: 'ergonomics',
        label: 'Hovering Pianist Wrists',
        text: 'Never rest your wrists flat against the desk while actively typing. Float your wrists slightly above the desk to prevent carpal tunnel strain.'
      },
      {
        category: 'ergonomics',
        label: '90-Degree Elbow Angle',
        text: 'Adjust your chair height so your forearms rest parallel to the desk floor with elbows bent at a relaxed 90° to 100° angle.'
      },
      {
        category: 'ergonomics',
        label: 'The 20-20-20 Rule',
        text: 'Every 20 minutes of typing, look at an object 20 feet away for at least 20 seconds to relax your eyes and eliminate fatigue.'
      },
      {
        category: 'ergonomics',
        label: 'Relax Traps & Shoulders',
        text: 'Unclench your jaw and drop your shoulders. Physical tension in your upper traps radiates directly into sluggish finger tendons.'
      },
      {
        category: 'ergonomics',
        label: 'Pre-Session Finger Warmups',
        text: 'Cold tendons cause stiff keystrokes. Spend 30 seconds rolling your wrists and doing gentle finger flexes before high-speed sprints.'
      },
      {
        category: 'ergonomics',
        label: 'Neutral Wrist Alignment',
        text: 'Keep your wrists straight in neutral extension — avoid cocking them upward or twisting outward (ulnar deviation).'
      },
      {
        category: 'developer',
        label: 'Curly Braces {} Reach',
        text: 'Curly braces are struck with your right pinky via Shift + [ and Shift + ]. Practice reaching without shifting your entire palm.'
      },
      {
        category: 'developer',
        label: 'Parentheses () Muscle Memory',
        text: 'Reach for ( and ) using Shift with keys 9 and 0 using your right ring and pinky fingers. Essential for function calls!'
      },
      {
        category: 'developer',
        label: 'Semicolon Precision',
        text: 'In C, C++, Java, and JS, semicolons are everywhere. Your right pinky rests directly on it — simply tap without moving your wrist.'
      },
      {
        category: 'developer',
        label: 'Snake_case Underscore',
        text: 'Python and SQL use snake_case extensively. Practice reaching the underscore (`_` = Shift + `-`) cleanly with your right pinky.'
      },
      {
        category: 'developer',
        label: 'CamelCase Shift Pulses',
        text: 'When typing camelCase (`getUserData`), use micro-pulses on the opposite Shift key so your hands maintain home-row equilibrium.'
      },
      {
        category: 'developer',
        label: 'Terminal Hotkeys',
        text: 'Master command-line shortcuts like Ctrl+C (interrupt), Ctrl+L (clear screen), and Ctrl+R (reverse history search) blindfolded.'
      },
      {
        category: 'developer',
        label: 'Indentation Tab Control',
        text: 'Reach Tab using your left pinky without lifting your left palm off the desk. Never hit space four times manually!'
      },
      {
        category: 'developer',
        label: 'Quote Marks & Strings',
        text: 'Single and double quotes (\' and ") are controlled by your right pinky. Keep your right index finger anchored on J as a compass.'
      },
      {
        category: 'developer',
        label: 'Code Navigation Keys',
        text: 'Use Home, End, and Arrow keys in combination with Ctrl and Shift to leap word-by-word and highlight code without touching the mouse.'
      },
      {
        category: 'hardware',
        label: 'Mechanical Actuation Point',
        text: 'Mechanical switches actuate halfway through the key stroke. You do not need to bottom out against the switch plate with heavy force.'
      },
      {
        category: 'hardware',
        label: 'Linear vs Tactile Switches',
        text: 'Red switches provide linear smoothness; Brown switches give a gentle tactile bump at actuation; Blue switches add a loud click.'
      },
      {
        category: 'hardware',
        label: 'N-Key Rollover (NKRO)',
        text: 'Full NKRO prevents ghosting, ensuring every single simultaneous keypress registers accurately during ultra-fast bursts.'
      },
      {
        category: 'hardware',
        label: '75% Compact Layout',
        text: 'A 75% mechanical keyboard keeps arrow and function keys close, reducing shoulder reach to the mouse by over 8 centimeters.'
      },
      {
        category: 'hardware',
        label: 'PBT Keycaps vs ABS',
        text: 'PBT keycaps have a textured matte finish that resists finger grease shine, providing superior tactile grip during long practice runs.'
      },
      {
        category: 'hardware',
        label: '75% Arrow Cluster',
        text: 'The arrow keys on a 75% board sit directly underneath your right Shift. Train your right hand to locate them without looking.'
      },
      {
        category: 'technique',
        label: 'Pinky Strengthening',
        text: 'Pinky fingers are the weakest but handle the most critical keys (Shift, Enter, Backspace, Tab). Treat pinky drills like gym sets!'
      },
      {
        category: 'technique',
        label: 'The Center Line Rule',
        text: 'Left index handles 4, 5, R, T, F, G, V, B. Right index handles 6, 7, Y, U, H, J, N, M. Never let your hands cross the center line!'
      },
      {
        category: 'technique',
        label: 'Number Row Reaches',
        text: 'Reach up to the number row with the corresponding finger (A->1, S->2, D->3, F->4/5) and snap back immediately to home row.'
      },
      {
        category: 'technique',
        label: 'Heatmap Diagnostic',
        text: 'Open the Analytics modal regularly to inspect your Finger Heatmap and Mistake Badges. Target your specific weak fingers.'
      },
      {
        category: 'technique',
        label: 'Don\'t Panic on Typos',
        text: 'When a red error shows up, do not rush frantically to catch up. Take a calm breath, steady your tempo, and continue in rhythm.'
      }
    ];
  }
}

// Auto-boot on load
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('typing-area')) {
    window.app = new FiveFingersApp();
    window.app.init();
  }
});
