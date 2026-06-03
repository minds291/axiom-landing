        document.addEventListener('DOMContentLoaded', () => {
            // === Логика меню ===
            const menuToggle = document.getElementById('menu-toggle');
            const menuClose = document.getElementById('menu-close');
            const dropdownMenu = document.getElementById('dropdown-menu');
            const menuLinks = dropdownMenu.querySelectorAll('.nav-menu .nav-item');

            function openMenu() {
                dropdownMenu.classList.add('active');
            }

            function closeMenu() {
                dropdownMenu.classList.remove('active');
            }

            menuToggle.addEventListener('click', openMenu);
            menuClose.addEventListener('click', closeMenu);
            
            document.addEventListener('click', (event) => {
                const isClickInside = dropdownMenu.contains(event.target) || menuToggle.contains(event.target);
                if (!isClickInside && dropdownMenu.classList.contains('active')) {
                    closeMenu();
                }
            });

            menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
            // Получаем значение атрибута href (например, "#catalog-section")
            const targetId = this.getAttribute('href');

            // Проверяем, что ссылка действительно является хэшем/ID (начинается с #)
            if (targetId.startsWith('#')) {
                // Отменяем стандартное резкое перепрыгивание браузера
                e.preventDefault(); 

                // Находим элемент на странице с таким ID
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // 1. Закрываем выпадающее меню (убираем класс active)
                    dropdownMenu.classList.remove('active');

                    // 2. Делаем плавный скролл к секции
                            targetSection.scrollIntoView({
                                behavior: 'smooth', // Плавный эффект
                                block: 'start'      // Выравнивание по верхнему краю
                            });
                            }
                        }
                    });
                });
            });

            // === Логика слайдера отзывов ===
            const track = document.getElementById('testimonial-track');
            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');
            let currentSlide = 0;
            const totalSlides = document.querySelectorAll('.slide').length;

            function updateSlider() {
                track.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Визуально отключаем кнопки на крайних слайдах
                if (currentSlide === 0) {
                    btnPrev.classList.add('disabled');
                } else {
                    btnPrev.classList.remove('disabled');
                }
                
                if (currentSlide === totalSlides - 1) {
                    btnNext.classList.add('disabled');
                } else {
                    btnNext.classList.remove('disabled');
                }
            }

            // Инициализируем состояние кнопок при загрузке
            updateSlider();

            btnNext.addEventListener('click', () => {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                    updateSlider();
                }
            });

            btnPrev.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            });

            // === Логика паузы видео в галерее ===
            const galleryVideo = document.getElementById('gallery-video');
            const btnPause = document.getElementById('btn-gallery-pause');
            const pauseIcon = document.getElementById('pause-icon');
            const playIcon = document.getElementById('play-icon');

            if (btnPause && galleryVideo) {
                btnPause.addEventListener('click', () => {
                    if (galleryVideo.paused) {
                        galleryVideo.play();
                        pauseIcon.style.display = 'block';
                        playIcon.style.display = 'none';
                    } else {
                        galleryVideo.pause();
                        pauseIcon.style.display = 'none';
                        playIcon.style.display = 'block';
                    }
                });
            }

            // === Логика подписки на рассылку ===
            const newsletterForm = document.getElementById('newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const input = newsletterForm.querySelector('.newsletter-input');
                    const btn = newsletterForm.querySelector('.newsletter-btn');
                    
                    if (input.value) {
                        const originalBtnContent = btn.innerHTML;
                        const originalPlaceholder = input.placeholder;
                        
                        input.value = '';
                        input.placeholder = 'Спасибо за подписку!';
                        input.disabled = true;
                        
                        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                        
                        setTimeout(() => {
                            input.disabled = false;
                            input.placeholder = originalPlaceholder;
                            btn.innerHTML = originalBtnContent;
                        }, 3000);
                    }
                });
            }