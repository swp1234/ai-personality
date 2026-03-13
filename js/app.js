// AI Personality Test - Which AI Model Are You?
// Dimensions: versatility, analysis, creativity, aesthetics, playfulness, efficiency, curiosity, independence

const QUESTIONS = [
    { id: 0, icon: '\u{1F4BC}', dimension: 'work', questionKey: 'question.0', options: ['question.0a', 'question.0b', 'question.0c', 'question.0d'] },
    { id: 1, icon: '\u{1F9E9}', dimension: 'problem', questionKey: 'question.1', options: ['question.1a', 'question.1b', 'question.1c', 'question.1d'] },
    { id: 2, icon: '\u{1F3A8}', dimension: 'creative', questionKey: 'question.2', options: ['question.2a', 'question.2b', 'question.2c', 'question.2d'] },
    { id: 3, icon: '\u{1F4AC}', dimension: 'communicate', questionKey: 'question.3', options: ['question.3a', 'question.3b', 'question.3c', 'question.3d'] },
    { id: 4, icon: '\u{1F31F}', dimension: 'motivation', questionKey: 'question.4', options: ['question.4a', 'question.4b', 'question.4c', 'question.4d'] },
    { id: 5, icon: '\u{1F91D}', dimension: 'teamwork', questionKey: 'question.5', options: ['question.5a', 'question.5b', 'question.5c', 'question.5d'] },
    { id: 6, icon: '\u{1F4DA}', dimension: 'learning', questionKey: 'question.6', options: ['question.6a', 'question.6b', 'question.6c', 'question.6d'] },
    { id: 7, icon: '\u{1F525}', dimension: 'pressure', questionKey: 'question.7', options: ['question.7a', 'question.7b', 'question.7c', 'question.7d'] },
    { id: 8, icon: '\u{1F680}', dimension: 'future', questionKey: 'question.8', options: ['question.8a', 'question.8b', 'question.8c', 'question.8d'] },
    { id: 9, icon: '\u{1F308}', dimension: 'values', questionKey: 'question.9', options: ['question.9a', 'question.9b', 'question.9c', 'question.9d'] }
];

// Each option maps to score additions for each AI type
// Indices: 0=GPT, 1=Claude, 2=Gemini, 3=Midjourney, 4=DALL-E, 5=Copilot, 6=Perplexity, 7=StableDiffusion
const SCORE_MAP = {
    '0a': [3,1,2,0,0,2,1,0], // versatile approach
    '0b': [1,3,0,0,0,1,2,0], // careful & thorough
    '0c': [0,0,3,2,1,0,0,2], // explore multiple angles
    '0d': [0,0,0,0,1,3,0,2], // systematic & efficient

    '1a': [2,1,1,0,0,3,1,0], // step-by-step
    '1b': [1,3,1,0,0,0,2,0], // deep analysis
    '1c': [0,0,2,3,2,0,0,1], // visual/intuitive
    '1d': [1,0,2,0,1,0,0,3], // unconventional

    '2a': [2,1,2,1,0,1,0,0], // writing/words
    '2b': [0,0,1,3,2,0,0,2], // visual art
    '2c': [1,0,3,1,2,0,0,1], // mixing mediums
    '2d': [0,1,0,0,3,1,0,1], // playful experiments

    '3a': [3,1,1,0,0,1,0,0], // clear & articulate
    '3b': [1,3,0,0,0,0,1,0], // nuanced & careful
    '3c': [0,0,2,1,2,0,0,1], // visual storytelling
    '3d': [0,0,1,0,1,2,2,2], // concise & factual

    '4a': [2,0,2,1,1,0,0,1], // curiosity & learning
    '4b': [1,2,0,0,0,1,3,0], // mastery & depth
    '4c': [0,0,1,3,2,0,0,1], // beauty & expression
    '4d': [1,1,1,0,0,3,0,1], // helping others

    '5a': [3,1,1,0,0,1,0,0], // adaptable supporter
    '5b': [0,3,1,0,0,0,2,0], // thoughtful advisor
    '5c': [0,0,2,1,2,0,0,3], // independent contributor
    '5d': [1,0,3,1,1,1,0,0], // creative catalyst

    '6a': [2,1,2,0,0,0,1,1], // broad topics
    '6b': [0,2,0,0,0,1,3,0], // deep research
    '6c': [0,0,2,2,2,0,0,1], // hands-on experimenting
    '6d': [1,0,1,1,1,2,0,2], // practical application

    '7a': [2,0,2,0,1,1,0,1], // energized by challenge
    '7b': [0,3,0,0,0,1,2,0], // careful under pressure
    '7c': [1,1,1,2,2,0,0,0], // escape into creativity
    '7d': [0,0,1,0,0,3,0,2], // methodical & calm

    '8a': [2,0,3,1,1,0,0,1], // embrace AI future
    '8b': [0,3,0,0,0,0,2,0], // thoughtful about impact
    '8c': [0,0,1,2,2,0,0,3], // open-source future
    '8d': [2,1,0,0,0,3,1,0], // practical applications

    '9a': [3,1,1,0,0,1,0,0], // balance & harmony
    '9b': [0,3,1,0,0,0,2,0], // truth & integrity
    '9c': [0,0,2,3,2,0,0,1], // beauty & imagination
    '9d': [0,0,1,0,0,1,0,3]  // freedom & openness
};

const AI_TYPES = {
    gpt: {
        id: 'gpt',
        emoji: '\u{1F4AC}',
        nameKey: 'type.gpt.name',
        taglineKey: 'type.gpt.tagline',
        descKey: 'type.gpt.description',
        traitsKeys: ['type.gpt.trait1', 'type.gpt.trait2', 'type.gpt.trait3', 'type.gpt.trait4'],
        metrics: { versatility: 95, analysis: 75, creativity: 70, efficiency: 85, depth: 70 },
        color: '#10A37F'
    },
    claude: {
        id: 'claude',
        emoji: '\u{1F9E0}',
        nameKey: 'type.claude.name',
        taglineKey: 'type.claude.tagline',
        descKey: 'type.claude.description',
        traitsKeys: ['type.claude.trait1', 'type.claude.trait2', 'type.claude.trait3', 'type.claude.trait4'],
        metrics: { versatility: 70, analysis: 95, creativity: 65, efficiency: 72, depth: 92 },
        color: '#D97757'
    },
    gemini: {
        id: 'gemini',
        emoji: '\u{2728}',
        nameKey: 'type.gemini.name',
        taglineKey: 'type.gemini.tagline',
        descKey: 'type.gemini.description',
        traitsKeys: ['type.gemini.trait1', 'type.gemini.trait2', 'type.gemini.trait3', 'type.gemini.trait4'],
        metrics: { versatility: 88, analysis: 72, creativity: 90, efficiency: 68, depth: 75 },
        color: '#4285F4'
    },
    midjourney: {
        id: 'midjourney',
        emoji: '\u{1F3A8}',
        nameKey: 'type.midjourney.name',
        taglineKey: 'type.midjourney.tagline',
        descKey: 'type.midjourney.description',
        traitsKeys: ['type.midjourney.trait1', 'type.midjourney.trait2', 'type.midjourney.trait3', 'type.midjourney.trait4'],
        metrics: { versatility: 50, analysis: 40, creativity: 98, efficiency: 55, depth: 60 },
        color: '#FF6B6B'
    },
    dalle: {
        id: 'dalle',
        emoji: '\u{1F3AD}',
        nameKey: 'type.dalle.name',
        taglineKey: 'type.dalle.tagline',
        descKey: 'type.dalle.description',
        traitsKeys: ['type.dalle.trait1', 'type.dalle.trait2', 'type.dalle.trait3', 'type.dalle.trait4'],
        metrics: { versatility: 65, analysis: 42, creativity: 92, efficiency: 60, depth: 48 },
        color: '#FF9F43'
    },
    copilot: {
        id: 'copilot',
        emoji: '\u{2699}',
        nameKey: 'type.copilot.name',
        taglineKey: 'type.copilot.tagline',
        descKey: 'type.copilot.description',
        traitsKeys: ['type.copilot.trait1', 'type.copilot.trait2', 'type.copilot.trait3', 'type.copilot.trait4'],
        metrics: { versatility: 72, analysis: 80, creativity: 45, efficiency: 96, depth: 65 },
        color: '#0078D4'
    },
    perplexity: {
        id: 'perplexity',
        emoji: '\u{1F50D}',
        nameKey: 'type.perplexity.name',
        taglineKey: 'type.perplexity.tagline',
        descKey: 'type.perplexity.description',
        traitsKeys: ['type.perplexity.trait1', 'type.perplexity.trait2', 'type.perplexity.trait3', 'type.perplexity.trait4'],
        metrics: { versatility: 60, analysis: 88, creativity: 50, efficiency: 78, depth: 96 },
        color: '#20B2AA'
    },
    stable: {
        id: 'stable',
        emoji: '\u{1F310}',
        nameKey: 'type.stable.name',
        taglineKey: 'type.stable.tagline',
        descKey: 'type.stable.description',
        traitsKeys: ['type.stable.trait1', 'type.stable.trait2', 'type.stable.trait3', 'type.stable.trait4'],
        metrics: { versatility: 75, analysis: 55, creativity: 85, efficiency: 62, depth: 70 },
        color: '#9B59B6'
    }
};

const AI_ORDER = ['gpt', 'claude', 'gemini', 'midjourney', 'dalle', 'copilot', 'perplexity', 'stable'];

class AIPersonalityApp {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = [0, 0, 0, 0, 0, 0, 0, 0]; // 8 AI types
        this.resultType = null;
        this.init();
    }

    async init() {
        // Wait for i18n
        if (window.i18n) {
            await window.i18n.init();
        }

        this.bindEvents();
        this.initTheme();
        this.hideLoader();

        // GA4 event
        if (typeof gtag === 'function') {
            gtag('event', 'page_view', { page_title: 'AI Personality Test' });
        }
    }

    bindEvents() {
        // Start button
        const startBtn = document.getElementById('start-btn');
        if (startBtn) startBtn.addEventListener('click', () => this.startQuiz());

        // Retry button
        const retryBtn = document.getElementById('retry-btn');
        if (retryBtn) retryBtn.addEventListener('click', () => this.restart());

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) themeToggle.addEventListener('click', () => this.toggleTheme());

        // Language
        const langToggle = document.getElementById('lang-toggle');
        const langMenu = document.getElementById('lang-menu');
        if (langToggle && langMenu) {
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                langMenu.classList.toggle('hidden');
            });
            document.querySelectorAll('.lang-option').forEach(btn => {
                btn.addEventListener('click', () => {
                    const lang = btn.getAttribute('data-lang');
                    if (window.i18n) window.i18n.setLanguage(lang);
                    langMenu.classList.add('hidden');
                });
            });
            document.addEventListener('click', () => langMenu.classList.add('hidden'));
        }

        // Share buttons
        document.getElementById('share-kakao')?.addEventListener('click', () => this.shareKakao());
        document.getElementById('share-twitter')?.addEventListener('click', () => this.shareTwitter());
        document.getElementById('share-facebook')?.addEventListener('click', () => this.shareFacebook());
        document.getElementById('share-copy')?.addEventListener('click', () => this.shareCopy());
    }

    hideLoader() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.style.display = 'none', 400);
            }, 600);
        }
    }

    initTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            const toggle = document.getElementById('theme-toggle');
            if (toggle) toggle.textContent = '\u{2600}';
        }
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const toggle = document.getElementById('theme-toggle');
        if (current === 'light') {
            document.documentElement.removeAttribute('data-theme');
            if (toggle) toggle.textContent = '\u{1F319}';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (toggle) toggle.textContent = '\u{2600}';
            localStorage.setItem('theme', 'light');
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = [0, 0, 0, 0, 0, 0, 0, 0];
        this.showScreen('question-screen');
        this.renderQuestion();

        if (typeof gtag === 'function') {
            gtag('event', 'quiz_start', { event_category: 'ai_personality' });
        }
    }

    renderQuestion() {
        const q = QUESTIONS[this.currentQuestion];
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;

        // Update progress
        const fill = document.getElementById('progress-fill');
        if (fill) fill.style.width = ((this.currentQuestion / 10) * 100) + '%';

        const counter = document.getElementById('q-current');
        if (counter) counter.textContent = this.currentQuestion + 1;

        // Question icon
        const icon = document.getElementById('question-icon');
        if (icon) icon.textContent = q.icon;

        // Question text
        const text = document.getElementById('question-text');
        if (text) text.textContent = t(q.questionKey);

        // Options
        const container = document.getElementById('options-container');
        if (!container) return;
        container.innerHTML = '';

        const labels = ['A', 'B', 'C', 'D'];
        q.options.forEach((optKey, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = '<span class="option-label">' + labels[idx] + '</span><span class="option-text">' + t(optKey) + '</span>';
            btn.addEventListener('click', () => this.selectOption(q.id, idx, btn));
            container.appendChild(btn);
        });
    }

    selectOption(questionId, optionIdx, btn) {
        // Visual feedback
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Record answer
        const scoreKey = questionId + String.fromCharCode(97 + optionIdx); // e.g. "0a", "0b"
        const scoreAdd = SCORE_MAP[scoreKey];
        if (scoreAdd) {
            for (let i = 0; i < 8; i++) {
                this.scores[i] += scoreAdd[i];
            }
        }

        this.answers.push({ question: questionId, option: optionIdx });

        // Next question after brief delay
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < 10) {
                this.renderQuestion();
            } else {
                this.showAnalyzing();
            }
        }, 400);
    }

    showAnalyzing() {
        this.showScreen('analyzing-screen');

        const fill = document.getElementById('analyzing-fill');
        const percent = document.getElementById('analyzing-percent');
        const detail = document.getElementById('analyzing-detail');
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;

        const steps = [
            { pct: 20, key: 'analyzing.scanning' },
            { pct: 45, key: 'analyzing.matching' },
            { pct: 70, key: 'analyzing.comparing' },
            { pct: 90, key: 'analyzing.finalizing' },
            { pct: 100, key: 'analyzing.complete' }
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step >= steps.length) {
                clearInterval(interval);
                setTimeout(() => this.showResult(), 400);
                return;
            }
            if (fill) fill.style.width = steps[step].pct + '%';
            if (percent) percent.textContent = steps[step].pct + '%';
            if (detail) detail.textContent = t(steps[step].key);
            step++;
        }, 500);
    }

    calculateResult() {
        let maxScore = -1;
        let maxIdx = 0;
        for (let i = 0; i < 8; i++) {
            if (this.scores[i] > maxScore) {
                maxScore = this.scores[i];
                maxIdx = i;
            }
        }
        return AI_TYPES[AI_ORDER[maxIdx]];
    }

    showResult() {
        this.resultType = this.calculateResult();
        const type = this.resultType;
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;

        this.showScreen('result-screen');

        // Emoji
        const emoji = document.getElementById('result-emoji');
        if (emoji) emoji.textContent = type.emoji;

        // Title
        const title = document.getElementById('result-title');
        if (title) title.textContent = t(type.nameKey);

        // Tagline
        const tagline = document.getElementById('result-tagline');
        if (tagline) tagline.textContent = '"' + t(type.taglineKey) + '"';

        // Description
        const desc = document.getElementById('result-description');
        if (desc) desc.textContent = t(type.descKey);

        // Metrics
        const metricsGrid = document.getElementById('metrics-grid');
        if (metricsGrid) {
            metricsGrid.innerHTML = '';
            const metricLabels = {
                versatility: t('metric.versatility'),
                analysis: t('metric.analysis'),
                creativity: t('metric.creativity'),
                efficiency: t('metric.efficiency'),
                depth: t('metric.depth')
            };
            Object.entries(type.metrics).forEach(([key, val]) => {
                const row = document.createElement('div');
                row.className = 'metric-row';
                row.innerHTML = '<span class="metric-label">' + (metricLabels[key] || key) + '</span>' +
                    '<div class="metric-bar-bg"><div class="metric-bar-fill" style="background:' + type.color + '"></div></div>' +
                    '<span class="metric-value">' + val + '</span>';
                metricsGrid.appendChild(row);
                // Animate bar
                setTimeout(() => {
                    row.querySelector('.metric-bar-fill').style.width = val + '%';
                }, 100);
            });
        }

        // Percentile
        const percentile = document.getElementById('percentile-stat');
        const pctVal = Math.floor(Math.random() * 15) + 5; // 5-19%
        if (percentile) {
            percentile.innerHTML = t('result.percentile').replace('{pct}', '<strong>' + pctVal + '%</strong>').replace('{type}', t(type.nameKey));
        }

        // Traits
        const traitsList = document.getElementById('traits-list');
        if (traitsList) {
            traitsList.innerHTML = '';
            type.traitsKeys.forEach(key => {
                const tag = document.createElement('span');
                tag.className = 'trait-tag';
                tag.textContent = t(key);
                traitsList.appendChild(tag);
            });
        }

        // Confetti
        this.spawnConfetti();

        // GA4
        if (typeof gtag === 'function') {
            gtag('event', 'quiz_complete', {
                event_category: 'ai_personality',
                event_label: type.id,
                value: 1
            });
        }
    }

    spawnConfetti() {
        const container = document.getElementById('confetti-container');
        if (!container) return;
        container.innerHTML = '';
        const colors = ['#00D4AA', '#00A8E8', '#FF6B6B', '#FFD93D', '#9B59B6', '#FF9F43', '#4285F4', '#10A37F'];
        for (let i = 0; i < 40; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 2) + 's';
            piece.style.animationDuration = (2 + Math.random() * 2) + 's';
            container.appendChild(piece);
        }
    }

    restart() {
        this.showScreen('intro-screen');
        window.scrollTo(0, 0);
    }

    // Share functions
    getShareText() {
        if (!this.resultType) return '';
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;
        return t('share.text').replace('{type}', t(this.resultType.nameKey));
    }

    getShareUrl() {
        return 'https://dopabrain.com/ai-personality/';
    }

    shareKakao() {
        const text = this.getShareText();
        const url = 'https://sharer.kakao.com/talk/friends/picker/link?url=' + encodeURIComponent(this.getShareUrl()) + '&text=' + encodeURIComponent(text);
        window.open(url, '_blank', 'width=600,height=400');
    }

    shareTwitter() {
        const text = this.getShareText();
        const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(this.getShareUrl());
        window.open(url, '_blank', 'width=600,height=400');
    }

    shareFacebook() {
        const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(this.getShareUrl());
        window.open(url, '_blank', 'width=600,height=400');
    }

    async shareCopy() {
        const text = this.getShareText() + ' ' + this.getShareUrl();
        try {
            await navigator.clipboard.writeText(text);
            const btn = document.getElementById('share-copy');
            if (btn) {
                const original = btn.textContent;
                btn.textContent = '\u{2705} Copied!';
                setTimeout(() => btn.textContent = original, 2000);
            }
        } catch (e) {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
    }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new AIPersonalityApp();
});
