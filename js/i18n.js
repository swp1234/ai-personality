// i18n IIFE - wrapped in try-catch to prevent loader freeze
try {
(function() {
    'use strict';

    class I18n {
        constructor() {
            this.translations = {};
            this.supportedLanguages = ['ko', 'en', 'ja', 'zh', 'es', 'pt', 'id', 'tr', 'de', 'fr', 'hi', 'ru'];
            this.currentLang = this.detectLanguage();
            this.isLoading = false;
        }

        detectLanguage() {
            const saved = localStorage.getItem('preferredLanguage');
            if (saved && this.supportedLanguages.includes(saved)) return saved;
            const browser = navigator.language.split('-')[0].toLowerCase();
            if (this.supportedLanguages.includes(browser)) return browser;
            return 'ko';
        }

        async loadTranslations(lang) {
            if (this.isLoading) return;
            try {
                this.isLoading = true;
                if (this.translations[lang]) {
                    this.isLoading = false;
                    return this.translations[lang];
                }
                const res = await fetch('js/locales/' + lang + '.json');
                if (!res.ok) throw new Error('Failed to load: ' + lang);
                const data = await res.json();
                this.translations[lang] = data;
                this.isLoading = false;
                return data;
            } catch (e) {
                console.error('i18n load error:', e);
                this.isLoading = false;
                if (lang !== 'ko') return this.loadTranslations('ko');
            }
        }

        t(key) {
            const keys = key.split('.');
            let val = this.translations[this.currentLang];
            if (!val) return key;
            for (const k of keys) {
                if (val && typeof val === 'object' && k in val) {
                    val = val[k];
                } else {
                    return key;
                }
            }
            return val || key;
        }

        async setLanguage(lang) {
            if (!this.supportedLanguages.includes(lang)) return;
            this.currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);
            await this.loadTranslations(lang);
            this.updateUI();
            this.updateLangButtons();
        }

        updateUI() {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const text = this.t(key);
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder !== undefined) el.placeholder = text;
                } else if (el.tagName === 'META') {
                    el.setAttribute('content', text);
                } else {
                    el.textContent = text;
                }
            });
        }

        updateLangButtons() {
            document.querySelectorAll('.lang-option').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
            });
        }

        getCurrentLanguage() { return this.currentLang; }

        async init() {
            await this.loadTranslations(this.currentLang);
            this.updateUI();
            this.updateLangButtons();
        }
    }

    window.i18n = new I18n();
})();
} catch (e) {
    console.error('i18n IIFE error:', e);
}
