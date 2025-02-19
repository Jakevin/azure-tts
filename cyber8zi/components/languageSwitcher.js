export function createLanguageSwitcher(langManager) {
    const container = document.createElement('div');
    container.className = 'language-switcher';
    container.style.cssText = `
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 1000;
    `;

    const languages = {
        'zh-TW': '繁體中文',
        'zh-CN': '简体中文',
        'en-US': 'English',
        'ja-JP': '日本語'
    };

    const select = document.createElement('select');
    select.className = 'lang-select';
    select.style.cssText = `
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #f0f0f0;
        color: #333;
        cursor: pointer;
        font-size: 14px;
        min-width: 120px;
        outline: none;
        transition: all 0.3s ease;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 16px;
        padding-right: 32px;
    `;

    // 滑鼠懸停效果
    select.addEventListener('mouseover', () => {
        select.style.backgroundColor = '#e8e8e8';
        select.style.borderColor = '#ccc';
    });

    select.addEventListener('mouseout', () => {
        select.style.backgroundColor = '#f0f0f0';
        select.style.borderColor = '#ddd';
    });

    // 焦點效果
    select.addEventListener('focus', () => {
        select.style.boxShadow = '0 0 0 2px rgba(255,69,0,0.2)';
        select.style.borderColor = '#ff4500';
    });

    select.addEventListener('blur', () => {
        select.style.boxShadow = 'none';
        select.style.borderColor = '#ddd';
    });

    // 添加選項
    Object.entries(languages).forEach(([langCode, langName]) => {
        const option = document.createElement('option');
        option.value = langCode;
        option.textContent = langName;
        option.selected = langManager.getCurrentLang() === langCode;
        select.appendChild(option);
    });

    // 切換語言事件
    select.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        langManager.switchLanguage(selectedLang);
    });

    container.appendChild(select);
    return container;
}