const QUESTIONS = [
  { icon: '💼', questionKey: 'question.0', options: ['question.0a','question.0b','question.0c','question.0d'], maps: [0,1,2,5] },
  { icon: '🧩', questionKey: 'question.1', options: ['question.1a','question.1b','question.1c','question.1d'], maps: [5,1,3,7] },
  { icon: '🎨', questionKey: 'question.2', options: ['question.2a','question.2b','question.2c','question.2d'], maps: [0,3,2,4] },
  { icon: '💬', questionKey: 'question.3', options: ['question.3a','question.3b','question.3c','question.3d'], maps: [0,1,2,5] },
  { icon: '🌟', questionKey: 'question.4', options: ['question.4a','question.4b','question.4c','question.4d'], maps: [0,6,3,5] },
  { icon: '🤝', questionKey: 'question.5', options: ['question.5a','question.5b','question.5c','question.5d'], maps: [0,1,7,2] },
  { icon: '📚', questionKey: 'question.6', options: ['question.6a','question.6b','question.6c','question.6d'], maps: [0,6,2,5] },
  { icon: '🔥', questionKey: 'question.7', options: ['question.7a','question.7b','question.7c','question.7d'], maps: [0,1,3,5] },
  { icon: '🚀', questionKey: 'question.8', options: ['question.8a','question.8b','question.8c','question.8d'], maps: [2,1,7,5] },
  { icon: '🌈', questionKey: 'question.9', options: ['question.9a','question.9b','question.9c','question.9d'], maps: [0,1,3,7] }
];

const AI_TYPES = [
  { id: 'gpt', emoji: '💬', nameKey: 'type.gpt.name', taglineKey: 'type.gpt.tagline' },
  { id: 'claude', emoji: '🧠', nameKey: 'type.claude.name', taglineKey: 'type.claude.tagline' },
  { id: 'gemini', emoji: '✨', nameKey: 'type.gemini.name', taglineKey: 'type.gemini.tagline' },
  { id: 'midjourney', emoji: '🎨', nameKey: 'type.midjourney.name', taglineKey: 'type.midjourney.tagline' },
  { id: 'dalle', emoji: '🎭', nameKey: 'type.dalle.name', taglineKey: 'type.dalle.tagline' },
  { id: 'copilot', emoji: '⚙️', nameKey: 'type.copilot.name', taglineKey: 'type.copilot.tagline' },
  { id: 'perplexity', emoji: '🔎', nameKey: 'type.perplexity.name', taglineKey: 'type.perplexity.tagline' },
  { id: 'stable', emoji: '🌐', nameKey: 'type.stable.name', taglineKey: 'type.stable.tagline' }
];

class AIPersonalityApp {
  constructor() {
    this.currentQuestion = 0;
    this.answers = 0;
    this.scores = Array(8).fill(0);
    this.resultType = null;
    this.answerLocked = false;
    this.trackedStages = new Set();
    this.init();
  }

  async init() {
    if (window.i18n) await window.i18n.init();
    this.bindEvents();
    this.initTheme();
    this.hideLoader();
    this.trackStage('ai_personality_view');
  }

  trackStage(name) {
    if (this.trackedStages.has(name)) return;
    this.trackedStages.add(name);
    if (typeof gtag === 'function') gtag('event', name, { event_category: 'ai_personality_reflection' });
  }

  bindEvents() {
    document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
    document.getElementById('retry-btn').addEventListener('click', () => this.restart());
    document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
    const langMenu = document.getElementById('lang-menu');
    document.getElementById('lang-toggle').addEventListener('click', event => {
      event.stopPropagation();
      langMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.lang-option').forEach(button => button.addEventListener('click', async event => {
      event.stopPropagation();
      await window.i18n.setLanguage(button.dataset.lang);
      langMenu.classList.add('hidden');
      if (document.getElementById('question-screen').classList.contains('active')) this.renderQuestion();
      if (document.getElementById('result-screen').classList.contains('active')) this.showResult();
    }));
    document.addEventListener('click', () => langMenu.classList.add('hidden'));
    document.getElementById('share-page').addEventListener('click', () => this.sharePage());
    document.getElementById('next-action').addEventListener('click', () => this.trackStage('ai_personality_next_click'));
    document.querySelector('.related-grid').addEventListener('click', event => {
      if (event.target.closest('.related-card')) this.trackStage('ai_personality_related_click');
    });
  }

  hideLoader() {
    const loader = document.getElementById('app-loader');
    loader.classList.add('hidden');
    setTimeout(() => { loader.style.display = 'none'; }, 400);
  }

  initTheme() {
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.getElementById('theme-toggle').textContent = '☀';
    }
  }

  toggleTheme() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    if (light) document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('theme-toggle').textContent = light ? '🌙' : '☀';
    localStorage.setItem('theme', light ? 'dark' : 'light');
  }

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
  }

  startQuiz() {
    this.currentQuestion = 0;
    this.answers = 0;
    this.scores = Array(8).fill(0);
    this.resultType = null;
    this.showScreen('question-screen');
    this.renderQuestion();
    this.trackStage('ai_personality_start');
  }

  renderQuestion() {
    this.answerLocked = false;
    const question = QUESTIONS[this.currentQuestion];
    const t = window.i18n.t.bind(window.i18n);
    document.getElementById('progress-fill').style.width = `${((this.currentQuestion + 1) / QUESTIONS.length) * 100}%`;
    document.getElementById('q-current').textContent = this.currentQuestion + 1;
    document.getElementById('question-icon').textContent = question.icon;
    document.getElementById('question-text').textContent = t(question.questionKey);
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    question.options.forEach((key, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'option-btn';
      button.innerHTML = `<span class="option-label">${String.fromCharCode(65 + index)}</span><span class="option-text">${t(key)}</span>`;
      button.addEventListener('click', () => this.selectOption(index, button));
      container.appendChild(button);
    });
    document.getElementById('question-text').setAttribute('tabindex', '-1');
    document.getElementById('question-text').focus({ preventScroll: true });
  }

  selectOption(optionIndex, selectedButton) {
    if (this.answerLocked) return;
    this.answerLocked = true;
    document.querySelectorAll('.option-btn').forEach(button => {
      button.disabled = true;
      button.classList.toggle('selected', button === selectedButton);
    });
    this.scores[QUESTIONS[this.currentQuestion].maps[optionIndex]] += 1;
    this.answers += 1;
    if (this.answers === 5) this.trackStage('ai_personality_progress');
    setTimeout(() => {
      this.currentQuestion += 1;
      if (this.currentQuestion < QUESTIONS.length) this.renderQuestion();
      else this.showResult();
    }, 350);
  }

  calculateResult() {
    let winner = 0;
    for (let index = 1; index < this.scores.length; index += 1) {
      if (this.scores[index] > this.scores[winner]) winner = index;
    }
    return AI_TYPES[winner];
  }

  showResult() {
    this.resultType = this.calculateResult();
    const t = window.i18n.t.bind(window.i18n);
    const lang = window.i18n.getCurrentLanguage();
    this.showScreen('result-screen');
    document.getElementById('result-emoji').textContent = this.resultType.emoji;
    document.getElementById('result-title').textContent = t(this.resultType.nameKey);
    document.getElementById('result-tagline').textContent = t(this.resultType.taglineKey);
    document.getElementById('next-action').href = `/future-self/?lang=${lang}&source=ai_personality_result`;
    document.querySelector('[data-related-slug="brain-type"]').href = `/brain-type/?lang=${lang}&source=ai_personality_result`;
    document.querySelector('[data-related-slug="work-style"]').href = `/work-style/?lang=${lang}&source=ai_personality_result`;
    this.trackStage('ai_personality_complete');
  }

  restart() {
    this.showScreen('intro-screen');
  }

  async sharePage() {
    const shareData = {
      title: window.i18n.t('meta.page_title'),
      text: window.i18n.t('share.text'),
      url: 'https://dopabrain.com/ai-personality/'
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(shareData.url);
      document.getElementById('share-status').textContent = window.i18n.t('share.success');
      this.trackStage('ai_personality_share');
    } catch (error) {
      document.getElementById('share-status').textContent = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.aiPersonalityApp = new AIPersonalityApp();
});
