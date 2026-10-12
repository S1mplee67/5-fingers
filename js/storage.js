/**
 * 5 F!NGERS - Offline Local Storage Manager
 * Created by S1mplee67 (W3NCY?)
 * 
 * Manages zero-signin offline profiles, lesson progression stars,
 * key error heatmaps, preferences, and JSON backup/restore.
 */

class TypingStorage {
  constructor(storageKey = 's1mplee67_5fingers_data') {
    this.storageKey = storageKey;
    this.memoryCache = null;
  }

  getDefaultProfile() {
    return {
      version: '1.0.0',
      user: 'S1mplee67',
      createdDate: new Date().toISOString(),
      settings: {
        theme: 'theme-cyber-slate',
        sound: 'cherry-blue',
        volume: 0.5,
        caretStyle: 'smooth-line',
        fontSize: 'medium'
      },
      progress: {
        currentStage: 1,
        unlockedLessons: ['1.1'],
        completedLessons: {} // { "1.1": { stars: 5, bestWpm: 50, accuracy: 99, attempts: 1 } }
      },
      stats: {
        totalTests: 0,
        totalTimeSeconds: 0,
        totalCharsTyped: 0,
        highestWpm: 0,
        averageAccuracy: 100,
        fingerErrors: {
          'L_PINKY': 0,
          'L_RING': 0,
          'L_MIDDLE': 0,
          'L_INDEX': 0,
          'L_THUMB': 0,
          'R_THUMB': 0,
          'R_INDEX': 0,
          'R_MIDDLE': 0,
          'R_RING': 0,
          'R_PINKY': 0
        },
        keyMistakes: {} // e.g. { "f": 2, "j": 1 }
      },
      history: []
    };
  }

  loadProfile() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        const defaultProfile = this.getDefaultProfile();
        this.saveProfile(defaultProfile);
        return defaultProfile;
      }
      const parsed = JSON.parse(raw);
      // Merge defaults in case new fields were added
      return this._mergeWithDefaults(parsed);
    } catch (e) {
      console.warn('Storage read fallback to memory cache:', e);
      return this.memoryCache || this.getDefaultProfile();
    }
  }

  saveProfile(profile) {
    try {
      this.memoryCache = profile;
      localStorage.setItem(this.storageKey, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }
  }

  saveProgress(lessonId, result) {
    const profile = this.loadProfile();
    const existing = profile.progress.completedLessons[lessonId] || {
      bestWpm: 0,
      accuracy: 0,
      stars: 0,
      attempts: 0
    };

    const newBestWpm = Math.max(existing.bestWpm, result.wpm || 0);
    const newBestStars = Math.max(existing.stars, result.stars || 0);
    const newBestAccuracy = Math.max(existing.accuracy, result.accuracy || 0);

    profile.progress.completedLessons[lessonId] = {
      bestWpm: newBestWpm,
      accuracy: newBestAccuracy,
      stars: newBestStars,
      attempts: existing.attempts + 1,
      lastCompleted: new Date().toISOString()
    };

    // Update global stats
    profile.stats.totalTests += 1;
    profile.stats.highestWpm = Math.max(profile.stats.highestWpm, result.wpm || 0);

    // Save history record
    profile.history.push({
      timestamp: Date.now(),
      lessonId: lessonId,
      wpm: result.wpm || 0,
      accuracy: result.accuracy || 100,
      stars: result.stars || 0
    });

    this.saveProfile(profile);
    return profile;
  }

  unlockLesson(lessonId) {
    const profile = this.loadProfile();
    if (!profile.progress.unlockedLessons.includes(lessonId)) {
      profile.progress.unlockedLessons.push(lessonId);
      this.saveProfile(profile);
    }
  }

  updateSettings(newSettings) {
    const profile = this.loadProfile();
    profile.settings = Object.assign({}, profile.settings, newSettings);
    this.saveProfile(profile);
    return profile.settings;
  }

  recordFingerMistake(fingerId, keyChar) {
    const profile = this.loadProfile();
    if (fingerId && profile.stats.fingerErrors[fingerId] !== undefined) {
      profile.stats.fingerErrors[fingerId] += 1;
    }
    if (keyChar) {
      const lower = keyChar.toLowerCase();
      profile.stats.keyMistakes[lower] = (profile.stats.keyMistakes[lower] || 0) + 1;
    }
    this.saveProfile(profile);
  }

  exportBackup() {
    const profile = this.loadProfile();
    return JSON.stringify(profile, null, 2);
  }

  importBackup(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        const merged = this._mergeWithDefaults(parsed);
        this.saveProfile(merged);
        return true;
      }
    } catch (e) {
      console.error('Invalid backup JSON format:', e);
    }
    return false;
  }

  resetProgress() {
    const fresh = this.getDefaultProfile();
    this.saveProfile(fresh);
    return fresh;
  }

  _mergeWithDefaults(parsed) {
    const def = this.getDefaultProfile();
    return {
      version: parsed.version || def.version,
      user: parsed.user || def.user,
      createdDate: parsed.createdDate || def.createdDate,
      settings: Object.assign({}, def.settings, parsed.settings),
      progress: {
        currentStage: (parsed.progress && parsed.progress.currentStage) || def.progress.currentStage,
        unlockedLessons: (parsed.progress && Array.isArray(parsed.progress.unlockedLessons)) ? parsed.progress.unlockedLessons : def.progress.unlockedLessons,
        completedLessons: (parsed.progress && parsed.progress.completedLessons) || {}
      },
      stats: {
        totalTests: (parsed.stats && parsed.stats.totalTests) || 0,
        totalTimeSeconds: (parsed.stats && parsed.stats.totalTimeSeconds) || 0,
        totalCharsTyped: (parsed.stats && parsed.stats.totalCharsTyped) || 0,
        highestWpm: (parsed.stats && parsed.stats.highestWpm) || 0,
        averageAccuracy: (parsed.stats && parsed.stats.averageAccuracy) || 100,
        fingerErrors: Object.assign({}, def.stats.fingerErrors, parsed.stats && parsed.stats.fingerErrors),
        keyMistakes: Object.assign({}, parsed.stats && parsed.stats.keyMistakes)
      },
      history: (parsed.history && Array.isArray(parsed.history)) ? parsed.history : []
    };
  }
}
