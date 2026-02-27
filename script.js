// Устанавливаем текущий год в футере
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Функция копирования текста в буфер
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            // Визуальная обратная связь (можно заменить на alert)
            alert(`Скопировано: ${text}`);
        }).catch(err => {
            console.error('Ошибка копирования:', err);
        });
    }

    // Назначаем обработчики на кнопки копирования
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // чтобы не сработало на span, если есть
            const textToCopy = button.getAttribute('data-copy');
            if (textToCopy) {
                copyToClipboard(textToCopy);
            }
        });
    });

    // Также можно копировать по клику на сам текст
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