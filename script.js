document.addEventListener('DOMContentLoaded', function() {
    // текущий год
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // тост-уведомление
    const toast = document.getElementById('toastMessage');
    let toastTimer = null;

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg || '✓ Скопировано!';
        toast.classList.add('show');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
    }

    // копирование в буфер
    async function copyText(text, btnElement) {
        try {
            await navigator.clipboard.writeText(text);
            showToast(`Скопировано: ${text}`);
            if (btnElement && btnElement.classList.contains('copy-btn')) {
                const oldHtml = btnElement.innerHTML;
                btnElement.innerHTML = '<i class="fas fa-check"></i> Готово';
                setTimeout(() => {
                    btnElement.innerHTML = oldHtml;
                }, 1000);
            }
        } catch (err) {
            showToast('❌ Ошибка, скопируй вручную');
        }
    }

    // обработчики кнопок копирования
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = btn.getAttribute('data-copy');
            if (text) copyText(text, btn);
        });
    });

    // обработчики для спанов .copy-text
    document.querySelectorAll('.copy-text').forEach(span => {
        span.addEventListener('click', () => {
            const text = span.getAttribute('data-copy');
            if (text) copyText(text, null);
        });
    });

    // генерация шестиугольников (оптимизировано)
    const hexContainer = document.getElementById('hexagonBg');
    if (hexContainer) {
        hexContainer.innerHTML = '';
        const hexCount = 8;
        for (let i = 0; i < hexCount; i++) {
            const hex = document.createElement('div');
            hex.classList.add('hexagon');
            const size = 50 + Math.random() * 110;
            hex.style.width = size + 'px';
            hex.style.height = (size * 0.866) + 'px';
            hex.style.left = Math.random() * 100 + '%';
            hex.style.top = Math.random() * 100 + '%';
            hex.style.opacity = 0.1 + Math.random() * 0.15;
            const duration = 15 + Math.random() * 20;
            const delay = Math.random() * 12;
            hex.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
            hexContainer.appendChild(hex);
        }
        // пара крупных медленных для глубины
        for (let i = 0; i < 2; i++) {
            const big = document.createElement('div');
            big.classList.add('hexagon');
            const s = 130 + Math.random() * 80;
            big.style.width = s + 'px';
            big.style.height = (s * 0.866) + 'px';
            big.style.left = Math.random() * 100 + '%';
            big.style.top = Math.random() * 100 + '%';
            big.style.opacity = 0.04;
            big.style.animation = `float ${35 + Math.random() * 30}s infinite ease-in-out`;
            hexContainer.appendChild(big);
        }
    }
	
	// ===== ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА RU/EN =====
const translations = {
    ru: {
        titleMain: "Привет, я Костя!",
        intro: "Стримлю и снимаю игры просто для души, без хайпа. Добро пожаловать в мой уголок!",
        // Карточка 1
        card1_title: "О моём контенте",
        card1_text1: "Стримить буду разные игры, делать реакции на YouTube и Twitch. Главное — кайфовать процессом, а не погоня за хайпом.",
        card1_text2: "Также я буду стримить не очень часто, 1-2 раза в месяц, как мотивация или желание появится. Не судите пожалуйста строго.",
        card1_text3: "Я застенчивый интроверт. Буду не всегда общаться голосом а в чате, но если сильно захотите то могу общаться и голосом. Только маловато и немного смущённо. Извиняйте.",
        card1_warning: "<strong>Важно:</strong> у меня слабое железо (Intel Pentium N3540, 4 ГБ ОЗУ, HDD), поэтому возможны лаги и вылеты. Но я вкладываю душу — надеюсь, вы это оцените!",
        // Карточка 2
        card2_title: "Как я принимаю всю критику.",
        card2_text: "Критику принимаю только в уважительной форме. Если хотите указать на ошибку — просто скажите спокойно, я прислушаюсь. Грубость и оскорбления сразу ведут в бан. Я за позитив!",
        // Карточка 3
        card3_title: "Мои любимые игры",
        card3_note: "🎮 Особенно обожаю игры Bethesda и Valve — они легенды!",
        // Карточка 4
        card4_title: "Что я слушаю",
        card4_text: "Включаю и просто кайфую! Главное заглушить тишину и кайфовать от звучания! :)",
        // Карточка 5
        card5_title: "Моё второе сердце — гражданская авиация",
        card5_text: "Обожаю авиакатастрофы (в смысле расследования), историю гражданских самолётов и грузовые рейсы. Военная авиация — не моё, слишком динамично. А мне нравится это чувство спокойствия: 11 км над землёй, автопилот, радио...",
        // Карточка 6
        card6_title: "Я и IT",
        card6_text: "Хочу стать фронтенд-разработчиком или SEO-специалистом. Веб-дизайн в Figma или Tilda тоже запасной вариант. Бэкенд пока страшит своей математикой :)",
        // Карточка 7 (контакты)
        card7_title: "Где со мной связаться",
        card7_steam_note: "✨ Добавляйтесь в друзья, я буду очень рад!",
        // Карточка 8 (Murko)
        card8_title: "Мой любимый стример!",
        card8_text: "Раньше я делал фанатский сайт про VTuber-стримера MurkoLiveVT, решил перенести его сюда.",
        card8_button: "Перейти в мир Murko",
        // Карточка 9 (финальная)
        card9_text: "💙 Спасибо, что прочитали! Надеюсь, вы поняли, кто я и какова моя точка зрения. Заходи на стримы — будет весело (даже с лагами)!",
        // Footer
        footer_text: "© 2026 sallytv.online — сделано с душой! :)"
    },
    en: {
        titleMain: "Hi, I'm Kostya!",
        intro: "I stream and record games just for fun, no hype. Welcome to my corner!",
        card1_title: "About My Content",
        card1_text1: "I'll stream different games, do reactions on YouTube and Twitch. The main thing is to enjoy the process, not chase hype.",
        card1_text2: "I'll stream not very often, 1-2 times a month, as motivation or desire appears. Please don't judge harshly.",
        card1_text3: "I'm a shy introvert. I won't always voice chat, but if you really want, I can. Just a little and somewhat embarrassed. Sorry.",
        card1_warning: "<strong>Important:</strong> I have weak hardware (Intel Pentium N3540, 4 GB RAM, HDD), so lags and crashes are possible. But I put my soul into it — I hope you appreciate it!",
        card2_title: "How I accept criticism",
        card2_text: "I accept criticism only in a respectful manner. If you want to point out a mistake — just say it calmly, I'll listen. Rudeness and insults lead to a ban. I'm for positivity!",
        card3_title: "My favorite games",
        card3_note: "🎮 I especially love Bethesda and Valve games — they are legends!",
        card4_title: "What I listen to",
        card4_text: "I just turn it on and enjoy! The main thing is to silence the silence and enjoy the sound! :)",
        card5_title: "My second heart — civil aviation",
        card5_text: "I love plane crashes (investigations), history of civil aircraft and cargo flights. Military aviation is not for me, too dynamic. But I like this feeling of calm: 11 km above the ground, autopilot, radio...",
        card6_title: "Me and IT",
        card6_text: "I want to become a frontend developer or SEO specialist. Web design in Figma or Tilda is also a backup option. Backend scares me with its math :)",
        card7_title: "Where to contact me",
        card7_steam_note: "✨ Add me as a friend, I'll be very glad!",
        card8_title: "My favorite streamer!",
        card8_text: "I used to make a fan site about VTuber streamer MurkoLiveVT, I decided to move it here.",
        card8_button: "Go to Murko's world",
        card9_text: "💙 Thank you for reading! I hope you understood who I am and what my point of view is. Come to the streams — it will be fun (even with lags)!",
        footer_text: "© 2026 sallytv.online — made with soul! :)"
    }
};

let currentLang = 'ru';

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    if (!t) return;

    // Заголовок и интро
    document.querySelector('h1').textContent = t.titleMain;
    document.querySelector('.intro').textContent = t.intro;

    // Карточка 1
    const cards = document.querySelectorAll('.card');
    // По порядку: 0 - О моём контенте, 1 - Критика, 2 - Игры, 3 - Музыка, 4 - Авиация, 5 - IT, 6 - Контакты, 7 - Murko, 8 - Финальная
    if (cards[0]) {
        cards[0].querySelector('h2').innerHTML = `<i class="fas fa-gamepad"></i> ${t.card1_title}`;
        const paragraphs = cards[0].querySelectorAll('p');
        if (paragraphs[0]) paragraphs[0].textContent = t.card1_text1;
        if (paragraphs[1]) paragraphs[1].textContent = t.card1_text2;
        if (paragraphs[2]) paragraphs[2].textContent = t.card1_text3;
        const warning = cards[0].querySelector('.warning p');
        if (warning) warning.innerHTML = t.card1_warning;
    }
    if (cards[1]) {
        cards[1].querySelector('h2').innerHTML = `<i class="fas fa-comment-dots"></i> ${t.card2_title}`;
        cards[1].querySelector('p').textContent = t.card2_text;
    }
    if (cards[2]) {
        cards[2].querySelector('h2').innerHTML = `<i class="fas fa-heart"></i> ${t.card3_title}`;
        const note = cards[2].querySelector('.note');
        if (note) note.textContent = t.card3_note;
    }
    if (cards[3]) {
        cards[3].querySelector('h2').innerHTML = `<i class="fas fa-music"></i> ${t.card4_title}`;
        cards[3].querySelector('p').textContent = t.card4_text;
    }
    if (cards[4]) {
        cards[4].querySelector('h2').innerHTML = `<i class="fas fa-plane"></i> ${t.card5_title}`;
        cards[4].querySelector('p').textContent = t.card5_text;
    }
    if (cards[5]) {
        cards[5].querySelector('h2').innerHTML = `<i class="fas fa-laptop-code"></i> ${t.card6_title}`;
        cards[5].querySelector('p').textContent = t.card6_text;
    }
    if (cards[6]) {
        cards[6].querySelector('h2').innerHTML = `<i class="fas fa-address-card"></i> ${t.card7_title}`;
        const steamNote = cards[6].querySelector('.steam-note');
        if (steamNote) steamNote.textContent = t.card7_steam_note;
    }
    if (cards[7]) {
        cards[7].querySelector('h2').innerHTML = `<i class="fas fa-folder-open"></i> ${t.card8_title}`;
        cards[7].querySelector('p').textContent = t.card8_text;
        const btn = cards[7].querySelector('.bio-button');
        if (btn) btn.textContent = t.card8_button;
    }
    if (cards[8]) {
        cards[8].querySelector('p').innerHTML = t.card9_text;
    }

    // Footer
    const footer = document.querySelector('footer p');
    if (footer) footer.innerHTML = t.footer_text;

    // Обновить активную кнопку
    document.getElementById('langRu').classList.toggle('active', lang === 'ru');
    document.getElementById('langEn').classList.toggle('active', lang === 'en');
}

// Добавить обработчики на кнопки после полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const ruBtn = document.getElementById('langRu');
    const enBtn = document.getElementById('langEn');
    if (ruBtn && enBtn) {
        ruBtn.addEventListener('click', () => setLanguage('ru'));
        enBtn.addEventListener('click', () => setLanguage('en'));
    }
    // Установить русский по умолчанию (активная кнопка уже будет)
    setLanguage('ru');
});