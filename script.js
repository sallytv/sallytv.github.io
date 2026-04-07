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

    // лёгкая оптимизация для сенсорных устройств
    if ('ontouchstart' in window) {
        const hexes = document.querySelectorAll('.hexagon');
        hexes.forEach(h => {
            h.style.animationDuration = '30s';
        });
    }
});