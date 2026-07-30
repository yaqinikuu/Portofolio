document.addEventListener('DOMContentLoaded', function() {
				const slides = document.getElementById('carouselSlides');
				const slideItems = document.querySelectorAll('.carousel-slide');
				const prevBtn = document.getElementById('prevBtn');
				const nextBtn = document.getElementById('nextBtn');
				const dots = document.querySelectorAll('.dot');
				const wrapper = document.querySelector('.carousel-wrapper');

				let currentIndex = 0;
				const totalSlides = slideItems.length;
				let autoSlideTimer;

				function updateCarousel(index) {
					if (index < 0) {
						currentIndex = totalSlides - 1;
					} else if (index >= totalSlides) {
						currentIndex = 0;
					} else {
						currentIndex = index;
					}

					// Pergerakan horizontal slides
					slides.style.transform = `translateX(-${currentIndex * 100}%)`;

					// Update status aktif pada indikator titik (dots)
					dots.forEach((dot, idx) => {
						if (idx === currentIndex) {
							dot.classList.add('active');
						} else {
							dot.classList.remove('active');
						}
					});
				}

				// Event listener tombol Next & Prev
				if (nextBtn && prevBtn) {
					nextBtn.addEventListener('click', () => {
						updateCarousel(currentIndex + 1);
						resetAutoSlide();
					});

					prevBtn.addEventListener('click', () => {
						updateCarousel(currentIndex - 1);
						resetAutoSlide();
					});
				}

				// Event listener klik pada titik indikator
				dots.forEach((dot) => {
					dot.addEventListener('click', (e) => {
						const targetIndex = parseInt(e.target.getAttribute('data-index'));
						updateCarousel(targetIndex);
						resetAutoSlide();
					});
				});

				// Fitur Auto-Slide otomatis setiap 5 detik
				function startAutoSlide() {
					autoSlideTimer = setInterval(() => {
						updateCarousel(currentIndex + 1);
					}, 5000);
				}

				function resetAutoSlide() {
					clearInterval(autoSlideTimer);
					startAutoSlide();
				}

				// Hentikan auto-slide saat mouse di atas slider (hover)
				if (wrapper) {
					wrapper.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
					wrapper.addEventListener('mouseleave', () => startAutoSlide());
				}

				// Mulai timer slide pertama kali
				startAutoSlide();
			});