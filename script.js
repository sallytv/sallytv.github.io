document.addEventListener('DOMContentLoaded', function() {
    // Год в футере
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Генерация шестиугольников
    function createHexagons() {
        const container = document.getElementById('hexagonBg');
        if (!container) return;

        container.innerHTML = '';

        // Увеличил количество до 22 штук
        const count = 22;

        for (let i = 0; i < count; i++) {
            const hex = document.createElement('div');
            hex.className = 'hexagon';

            // Размеры от 50 до 180px
            const size = 50 + Math.random() * 130;
            hex.style.width = size + 'px';
            hex.style.height = (size * 0.866) + 'px';

            hex.style.left = Math.random() * 100 + '%';
            hex.style.top = Math.random() * 100 + '%';

            // Прозрачность от 0.2 до 0.4 (ярче)
            hex.style.opacity = 0.2 + Math.random() * 0.25;

            // Анимация: длительность 12-30 сек, задержка 0-12 сек
            const duration = 12 + Math.random() * 18;
            const delay = Math.random() * 12;
            hex.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;

            container.appendChild(hex);
        }
    }

    createHexagons();

    // Копирование в буфер
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert(`Скопировано: ${text}`);
        }).catch(err => {
            console.error('Ошибка копирования:', err);
        });
    }

    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToCopy = button.getAttribute('data-copy');
            if (textToCopy) copyToClipboard(textToCopy);
        });
    });

    const copyTexts = document.querySelectorAll('.copy-text');
    copyTexts.forEach(span => {
        span.addEventListener('click', () => {
            const textToCopy = span.getAttribute('data-copy');
            if (textToCopy) copyToClipboard(textToCopy);
        });
    });
});