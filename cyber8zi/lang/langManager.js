import zhTW from './zh-TW.js';
import enUS from './en-US.js';
import jaJP from './ja-JP.js';
import zhCN from './zh-CN.js';

class LangManager {
    constructor() {
        this.languages = {
            'zh-TW': zhTW,
            'zh-CN': zhCN,
            'en-US': enUS,
            'ja-JP': jaJP
        };
        this.currentLang = 'zh-TW';
    }

    // 初始化語言設置
    init() {
        // 優先使用localStorage中保存的語言設置
        const savedLang = localStorage.getItem('preferred_language');
        if (savedLang && this.languages[savedLang]) {
            this.currentLang = savedLang;
        } else {
            // 如果沒有保存的語言設置，則使用瀏覽器語言
            const browserLang = navigator.language;
            this.currentLang = this.languages[browserLang] ? browserLang : 'zh-TW';
        }

        // 保存語言偏好
        localStorage.setItem('preferred_language', this.currentLang);

        // 更新頁面上的所有文字
        this.updatePageText();

        return this.currentLang;
    }

    // 切換語言
    switchLanguage(langCode) {
        if (this.languages[langCode]) {
            this.currentLang = langCode;
            localStorage.setItem('preferred_language', langCode);
            this.updatePageText();
            return true;
        }
        return false;
    }

    // 獲取當前語言的文字
    getText(key) {
        const currentLangData = this.languages[this.currentLang];
        return currentLangData[key] || key;
    }

    // 更新頁面上所有帶有 data-i18n 屬性的元素的文字
    updatePageText() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = this.getText(key);
            } else {
                element.textContent = this.getText(key);
            }
        });

        // 更新網頁標題
        document.title = this.getText('title');

        // 更新 meta 標籤
        document.querySelector('meta[name="description"]').content = this.getText('title');
        document.querySelector('meta[property="og:title"]').content = this.getText('title');
        document.querySelector('meta[property="og:description"]').content = this.getText('title');
    }

    // 獲取當前語言代碼
    getCurrentLang() {
        return this.currentLang;
    }

    // 獲取支持的語言列表
    getSupportedLanguages() {
        return Object.keys(this.languages);
    }
}

// 創建單例實例
const langManager = new LangManager();
export default langManager;