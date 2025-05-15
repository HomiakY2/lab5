document.addEventListener('DOMContentLoaded', () => {
    // 1. Зберігання даних у браузері
    const browserInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language
    };
    localStorage.setItem('browserInfo', JSON.stringify(browserInfo));
    
    const browserInfoElement = document.getElementById('browser-info');
    const storedInfo = JSON.parse(localStorage.getItem('browserInfo'));
    browserInfoElement.textContent = `Браузер: ${storedInfo.userAgent}, Платформа: ${storedInfo.platform}, Мова: ${storedInfo.language}`;

    // 2. Отримання коментарів з JSONPlaceholder
    const variantNumber = 25; 
    fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
        .then(response => response.json())
        .then(comments => {
            const commentsList = document.getElementById('comments-list');
            comments.forEach(comment => {
                const commentElement = document.createElement('article');
                commentElement.innerHTML = `
                    <h3>${comment.name}</h3>
                    <p><strong>Email:</strong> ${comment.email}</p>
                    <p>${comment.body}</p>
                `;
                commentsList.appendChild(commentElement);
            });
        })
        .catch(error => console.error('Помилка при отриманні коментарів:', error));

    // 3. Модальне вікно з формою
    const modal = document.getElementById('feedback-modal');
    const closeBtn = document.querySelector('.close');

    setTimeout(() => {
        modal.style.display = 'flex';
    }, 60000);

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 4. Переключення денного/нічного режиму
	const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentHour = new Date().getHours();
    const savedTheme = localStorage.getItem('theme');

    // Функція для застосування теми
    const applyTheme = (theme) => {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(theme);
        localStorage.setItem('theme', theme);
    };

    // Обробник кліку для перемикання теми
    themeToggle.addEventListener('click', () => {
        // Якщо це checkbox, перевіряємо checked
        if (themeToggle.type === 'checkbox') {
            if (themeToggle.checked) {
                applyTheme('dark-theme');
            } else {
                applyTheme('light-theme');
            }
        } else {
            // Якщо це button, перемикаємо тему
            const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
            applyTheme(currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme');
        }
    });

	const hour = new Date().getHours();
	const isNight = hour < 7 || hour >= 21;
	if (isNight) {
		document.body.classList.add('dark-theme');
		themeToggle.checked = true;
		} else {
			themeToggle.checked = false;
		}

});