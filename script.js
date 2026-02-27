// Устанавливаем текущий год в футере
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Генерация фоновых шестиугольников
    function createHexagons() {
        const container = document.getElementById('hexagonBg');
        if (!container) return;

        // Удаляем старые (на всякий случай)
        container.innerHTML = '';

        // Количество шестиугольников
        const count = 18;

        for (let i = 0; i < count; i++) {
            const hex = document.createElement('div');
            hex.className = 'hexagon';

            // Случайные размеры (от 40 до 150px в ширину)
            const size = 40 + Math.random() * 110;
            hex.style.width = size + 'px';
            hex.style.height = (size * 0.866) + 'px'; // высота примерно под пропорцию шестиугольника

            // Случайное начальное положение
            hex.style.left = Math.random() * 100 + '%';
            hex.style.top = Math.random() * 100 + '%';

            // Немного разная прозрачность
            hex.style.opacity = 0.05 + Math.random() * 0.15;

            // Разные задержки и длительности анимации
            const duration = 15 + Math.random() * 20; // от 15 до 35 секунд
            const delay = Math.random() * 10; // от 0 до 10 секунд
            hex.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;

            container.appendChild(hex);
        }
    }

    createHexagons();

    // Функция копирования текста в буфер
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert(`Скопировано: ${text}`);
        }).catch(err => {
            console.error('Ошибка копирования:', err);
        });
    }

    // Назначаем обработчики на кнопки копирования
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToCopy = button.getAttribute('data-copy');
            if (textToCopy) {
                copyToClipboard(textToCopy);
            }
        });
    });

    // Копирование по клику на текст
    const copyTexts = document.querySelectorAll('.copy-text');
    copyTexts.forEach(span => {
        span.addEventListener('click', () => {
            const textToCopy = span.getAttribute('data-copy');
            if (textToCopy) {
                copyToClipboard(textToCopy);
            }
        });
    });
});